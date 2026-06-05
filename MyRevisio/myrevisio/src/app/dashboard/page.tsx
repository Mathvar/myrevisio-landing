import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

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

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="auth-logo">
            <div className="logo-dot">R</div>
            <span className="logo-name">My Revisio</span>
          </div>
          <div className="header-right">
            <span className="header-name">Bonjour, {profile?.first_name || 'Freelance'} 👋</span>
            <form action="/auth/signout" method="post">
              <button type="submit" className="btn-signout">Déconnexion</button>
            </form>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-top">
          <h1>Mes projets</h1>
          <Link href="/dashboard/new" className="btn-new">
            + Nouveau projet
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map(project => (
              <Link href={`/dashboard/${project.id}`} key={project.id} className="project-card">
                <div className="project-card-top">
                  <span className={`project-status status-${project.status}`}>
                    {project.status === 'active' ? 'Actif' : project.status === 'completed' ? 'Quota atteint' : 'Clôturé'}
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
            <h2>Aucun projet pour l'instant</h2>
            <p>Créez votre premier projet et partagez le lien avec votre client.</p>
            <Link href="/dashboard/new" className="btn-new">
              + Créer mon premier projet
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}