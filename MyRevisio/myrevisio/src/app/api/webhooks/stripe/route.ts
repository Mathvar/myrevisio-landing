import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature invalide:', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.mode === 'subscription') {
        await adminSupabase
          .from('users')
          .update({
            plan: 'pro',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
          })
          .eq('email', session.customer_email)
      }

      if (session.mode === 'payment') {
        const projectId = session.metadata?.projectId
        if (!projectId) break

        const { data: project } = await adminSupabase
          .from('projects')
          .select('name, client_name, slug, revisions_included, price_per_extra, user_id')
          .eq('id', projectId)
          .single()

        if (!project) break

        const quantity = parseInt(session.metadata?.quantity ?? '1', 10)
        await adminSupabase
          .from('projects')
          .update({ revisions_included: project.revisions_included + quantity })
          .eq('id', projectId)

        const { data: owner } = await adminSupabase
          .from('users')
          .select('email')
          .eq('id', project.user_id)
          .single()

        if (owner?.email) {
          try {
            await resend.emails.send({
              from: 'My Revisio <onboarding@resend.dev>',
              to: owner.email,
              subject: `Révision extra payée — ${project.name}`,
              html: `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f0e0d">
                  <p style="font-size:14px;color:#9a8f85;margin-bottom:24px">My Revisio</p>
                  <h2 style="font-size:22px;margin-bottom:8px">${quantity > 1 ? `${quantity} révisions supplémentaires payées` : 'Révision supplémentaire payée'}</h2>
                  <p style="font-size:15px;color:#4a4540;margin-bottom:24px">
                    <strong>${project.client_name}</strong> vient de payer ${quantity > 1 ? `${quantity} révisions supplémentaires` : 'une révision supplémentaire'}
                    sur le projet <strong>${project.name}</strong>.
                  </p>
                  <div style="background:#f2ede6;border-radius:10px;padding:16px 20px;margin-bottom:24px">
                    <p style="font-size:13px;color:#9a8f85;margin-bottom:4px">Montant facturé</p>
                    <p style="font-size:18px;font-weight:600;color:#0f0e0d;margin:0">${project.price_per_extra * quantity} € HT</p>
                  </div>
                  <p style="font-size:14px;color:#4a4540">
                    Le client peut maintenant soumettre ses retours sur
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/r/${project.slug}" style="color:#e84c1e">la page du projet</a>.
                  </p>
                  <p style="font-size:13px;color:#9a8f85;margin-top:32px">— My Revisio</p>
                </div>
              `,
            })
          } catch (err) {
            console.error('[Resend] Erreur email extra:', String(err))
          }
        }
      }

      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await adminSupabase
        .from('users')
        .update({ plan: 'free' })
        .eq('stripe_customer_id', subscription.customer)
      break
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const plan = subscription.status === 'active' ? 'pro' : 'free'
      await adminSupabase
        .from('users')
        .update({ plan })
        .eq('stripe_customer_id', subscription.customer)
      break
    }
  }

  return NextResponse.json({ received: true })
}
