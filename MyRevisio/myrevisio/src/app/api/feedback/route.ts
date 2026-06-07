import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const { project_id, content, revision_number, is_extra } = await req.json()

  if (!project_id || !content || revision_number == null) {
    return NextResponse.json({ error: 'Paramètres manquants.' }, { status: 400 })
  }

  const { error: feedbackError } = await supabase
    .from('feedbacks')
    .insert({ project_id, content, revision_number, is_extra })

  if (feedbackError) {
    return NextResponse.json({ error: feedbackError.message }, { status: 500 })
  }

  const { data: project } = await supabase
    .from('projects')
    .select('name, client_name, user_id, revisions_used')
    .eq('id', project_id)
    .single()

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable.' }, { status: 404 })
  }

  await supabase
    .from('projects')
    .update({ revisions_used: project.revisions_used + 1 })
    .eq('id', project_id)

  // Envoi email — best-effort, ne bloque pas la réponse en cas d'échec
  try {
    const extraLabel = is_extra ? ` <span style="color:#e84c1e;font-weight:600">(révision extra)</span>` : ''

    const { data, error: emailError } = await resend.emails.send({
      from: 'My Revisio <onboarding@resend.dev>',
      to: 'mathvar2004@gmail.com',
      subject: `Nouveau retour — ${project.name}`,
      html: `
        <meta charset="utf-8">
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f0e0d">
          <p style="font-size:14px;color:#9a8f85;margin-bottom:24px">My Revisio</p>
          <h2 style="font-size:22px;margin-bottom:8px">Nouveau retour client</h2>
          <p style="font-size:15px;color:#4a4540;margin-bottom:24px">
            <strong>${project.client_name}</strong> vient de soumettre un retour sur le projet <strong>${project.name}</strong>.
          </p>
          <div style="background:#f2ede6;border-radius:10px;padding:16px 20px;margin-bottom:24px">
            <p style="font-size:13px;color:#9a8f85;margin-bottom:8px">
              Révision #${revision_number}${extraLabel}
            </p>
            <p style="font-size:15px;color:#0f0e0d;line-height:1.6;margin:0">${content}</p>
          </div>
          <p style="font-size:13px;color:#9a8f85">— My Revisio</p>
        </div>
      `,
    })

    if (emailError) {
      console.error('[Resend] Erreur:', JSON.stringify(emailError), (emailError as Error).message)
    } else {
      console.log('[Resend] Email envoyé, id:', data?.id)
    }
  } catch (err) {
    console.error('[Resend] Exception:', String(err))
  }

  return NextResponse.json({ ok: true })
}
