import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BillingButton from './BillingButton'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: profile } = await supabase
    .from('users')
    .select('first_name, plan')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const openProjects = projects?.filter(p => p.status !== 'closed') ?? []
  const closedProjects = projects?.filter(p => p.status === 'closed') ?? []
  const activeCount = projects?.filter(p => p.status === 'active').length ?? 0
  const isAtLimit = plan === 'free' && activeCount >= 2

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="auth-logo">
            <img src="/apple-touch-icon.png" alt="My Revisio" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <span className="logo-name">My Revisio</span>
          </div>
          <div className="header-right">
            <span className="header-name nav-desktop-only">Bonjour, {profile?.first_name || 'Freelance'} 👋</span>
            <Link href="/dashboard/profile" className="btn-signout nav-desktop-only">Mon profil</Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-main" style={{ paddingTop: '24px' }}>
        <div className="plan-banner">
          <div className="plan-banner-left">
            <span className={`plan-badge ${plan === 'pro' ? 'plan-badge-pro' : 'plan-badge-free'}`}>
              {plan === 'pro' ? '✦ Pro' : 'Free'}
            </span>
            {plan === 'free' && (
              <span className="plan-banner-hint">{activeCount} / 2 projets actifs</span>
            )}
          </div>
          <BillingButton plan={plan} />
        </div>

        {isAtLimit && (
          <div className="limit-banner">
            <span className="limit-banner-icon">⚠️</span>
            <span>
              Vous avez atteint la limite de 2 projets actifs.{' '}
              <strong>Passez au Pro</strong> pour des projets illimités.
            </span>
          </div>
        )}

        <div className="dashboard-top">
          <h1>Mes projets</h1>
          {isAtLimit ? (
            <span className="btn-new btn-new-disabled" aria-disabled="true">
              + Nouveau projet
            </span>
          ) : (
            <Link href="/dashboard/new" className="btn-new">
              + Nouveau projet
            </Link>
          )}
        </div>

        {openProjects.length > 0 ? (
          <div className="projects-grid">
            {openProjects.map(project => (
              <Link href={`/dashboard/${project.id}`} key={project.id} className="project-card">
                <div className="project-card-top">
                  <span className={`project-status status-${project.status}`}>
                    {project.status === 'active' ? 'Actif' : 'Quota atteint'}
                  </span>
                  <span className="project-slug">/{project.slug}</span>
                </div>
                <h2 className="project-name">{project.name}</h2>
                <p className="project-client">{project.client_name}</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min((project.revisions_used / project.revisions_included) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {project.revisions_used} / {project.revisions_included} révisions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h2>Aucun projet pour l&apos;instant</h2>
            <p>Créez votre premier projet et partagez le lien avec votre client.</p>
            <Link href="/dashboard/new" className="btn-new">
              + Créer mon premier projet
            </Link>
          </div>
        )}

        {closedProjects.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16 }}>
              Projets clôturés
            </h2>
            <div className="projects-grid">
              {closedProjects.map(project => (
                <Link href={`/dashboard/${project.id}`} key={project.id} className="project-card" style={{ opacity: 0.7 }}>
                  <div className="project-card-top">
                    <span className="project-status" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                      Clôturé
                    </span>
                    <span className="project-slug">/{project.slug}</span>
                  </div>
                  <h2 className="project-name">{project.name}</h2>
                  <p className="project-client">{project.client_name}</p>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min((project.revisions_used / project.revisions_included) * 100, 100)}%`, background: 'var(--text-muted)' }}
                      />
                    </div>
                    <span className="progress-text">
                      {project.revisions_used} / {project.revisions_included} révisions
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
