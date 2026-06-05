import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ClientPageForm from './ClientPageForm'

export default async function ClientPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!project) notFound()

  const { data: feedbacks } = await supabase
    .from('feedbacks')
    .select('*')
    .eq('project_id', project.id)
    .order('submitted_at', { ascending: false })

  const isQuotaReached = project.revisions_used >= project.revisions_included

  return (
    <div className="client-layout">
      <div className="client-card">
        <div className="auth-logo" style={{ marginBottom: 24 }}>
          <div className="logo-dot">R</div>
          <span className="logo-name">My Revisio</span>
        </div>

        <h1 className="client-project-name">{project.name}</h1>
        <p className="client-subtitle">
          Projet de <strong>{project.client_name}</strong>
        </p>

        {project.description && (
          <p className="client-description">{project.description}</p>
        )}

        <div className="revision-counter">
          <div className="counter-numbers">
            <span className="counter-used">{project.revisions_used}</span>
            <span className="counter-sep"> / </span>
            <span className="counter-total">{project.revisions_included}</span>
          </div>
          <p className="counter-label">révisions utilisées</p>
          <div className="progress-bar" style={{ margin: '12px 0 0' }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((project.revisions_used / project.revisions_included) * 100, 100)}%`,
                background: isQuotaReached ? 'var(--accent)' : 'var(--green)',
              }}
            />
          </div>
        </div>

        <ClientPageForm
          project={project}
          feedbacks={feedbacks || []}
          isQuotaReached={isQuotaReached}
        />
      </div>
    </div>
  )
}