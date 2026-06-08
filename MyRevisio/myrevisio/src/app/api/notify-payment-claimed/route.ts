import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json()

    const { data: project } = await adminSupabase
      .from('projects')
      .select('name, price_per_extra, user_id')
      .eq('id', projectId)
      .single()

    if (!project) {
      return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
    }

    const { data: user } = await adminSupabase
      .from('users')
      .select('email')
      .eq('id', project.user_id)
      .single()

    if (user?.email) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        subject: `Paiement déclaré — ${project.name}`,
        html: `
          <p>Bonjour,</p>
          <p>Votre client dit avoir payé <strong>${project.price_per_extra} € HT</strong> pour une révision supplémentaire sur le projet <strong>${project.name}</strong>.</p>
          <p>Vérifiez votre compte pour confirmer la réception du paiement.</p>
          <p>— My Revisio</p>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notify payment error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
