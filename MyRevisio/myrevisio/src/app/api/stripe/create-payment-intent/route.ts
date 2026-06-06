import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json()
    const supabase = await createClient()

    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (!project) {
      return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Révision supplémentaire — ${project.name}`,
            },
            unit_amount: Math.round(project.price_per_extra * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { projectId: project.id },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/r/${project.slug}?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/r/${project.slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe payment error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
