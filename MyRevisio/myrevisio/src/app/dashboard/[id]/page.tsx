import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CopyLinkButton from './CopyLinkButton'
import LogoutButton from '../LogoutButton'
import CloseProjectButton from './CloseProjectButton'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!project) notFound()

  const [{ data: feedbacks }, { data: profile }] = await Promise.all([
    supabase
      .from('feedbacks')
      .select('*')
      .eq('project_id', project.id)
      .order('submitted_at', { ascending: false }),
    supabase
      .from('users')
      .select('first_name')
      .eq('id', user.id)
      .single(),
  ])

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/r/${project.slug}`
  const progressPct = Math.min((project.revisions_used / project.revisions_included) * 100, 100)
  const isQuotaReached = project.revisions_used >= project.revisions_included

  const statusLabel: Record<string, string> = {
    active: 'Actif',
    completed: 'Quota atteint',
    archived: 'Clôturé',
    closed: 'Clôturé',
  }

  const createdAt = new Date(project.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="auth-logo">
            <img src="/apple-touch-icon.png" alt="My Revisio" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <span className="logo-name">My Revisio</span>
          </div>
          <div className="header-right">
            <Link href="/dashboard" className="btn-signout">← Retour</Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-main" style={{ paddingBottom: 48 }}>
        <div style={{ paddingTop: 48, marginBottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 600, fontFamily: "'DM Serif Display', serif", marginBottom: 6 }}>
              {project.name}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>
              {project.client_name}
            </p>
          </div>
          <span className={`project-status status-${project.status}`} style={{ flexShrink: 0, marginTop: 6 }}>
            {statusLabel[project.status] ?? project.status}
          </span>
        </div>

        <div className="detail-grid">
          {/* Colonne principale */}
          <div>
            <div className="detail-card">
              <h2>Révisions</h2>
              <div className="revision-detail">
                <span className="revision-big">{project.revisions_used}</span>
                <span className="revision-sep"> / </span>
                <span className="revision-total">{project.revisions_included}</span>
              </div>
              <div className="progress-bar" style={{ height: 8, marginBottom: 8 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${progressPct}%`,
                    background: isQuotaReached ? 'var(--accent)' : 'var(--green)',
                  }}
                />
              </div>
              <span className="progress-text">
                {project.revisions_used} révision{project.revisions_used !== 1 ? 's' : ''} utilisée{project.revisions_used !== 1 ? 's' : ''} sur {project.revisions_included} incluse{project.revisions_included !== 1 ? 's' : ''}
              </span>
              {isQuotaReached && (
                <div className="quota-box" style={{ marginTop: 16 }}>
                  <p className="quota-title">Quota atteint</p>
                  <p className="quota-price">
                    Chaque révision supplémentaire est facturée {project.price_per_extra} €
                  </p>
                </div>
              )}
            </div>

            <div className="detail-card">
              <h2>Retours clients</h2>
              {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <div key={fb.id} className="feedback-item">
                    <div className="feedback-header">
                      <span className="feedback-number">
                        Révision #{fb.revision_number}
                        {fb.is_extra && (
                          <span className="feedback-extra-badge">Extra</span>
                        )}
                      </span>
                      <span className="feedback-date">
                        {new Date(fb.submitted_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="feedback-content">{fb.content}</p>
                  </div>
                ))
              ) : (
                <p className="detail-empty">Aucun retour pour l'instant.</p>
              )}
            </div>
          </div>

          {/* Colonne latérale */}
          <div>
            <div className="detail-card">
              <h2>Lien partageable</h2>
              <CopyLinkButton url={shareUrl} />
            </div>

            <div className="detail-card">
              <h2>Informations</h2>
              <div className="info-row">
                <span className="info-label">Révisions incluses</span>
                <span className="info-value">{project.revisions_included}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Prix extra</span>
                <span className="info-value">{project.price_per_extra} € / révision</span>
              </div>
              {project.description && (
                <div className="info-row info-row-col">
                  <span className="info-label">Description</span>
                  <span className="info-description">{project.description}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Créé le</span>
                <span className="info-value">{createdAt}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Identifiant</span>
                <span className="info-value info-slug">/{project.slug}</span>
              </div>
            </div>
          </div>
        </div>

        {project.status !== 'closed' && (
          <div style={{ marginTop: 32 }}>
            <CloseProjectButton projectId={project.id} />
          </div>
        )}
      </main>
    </div>
  )
}
