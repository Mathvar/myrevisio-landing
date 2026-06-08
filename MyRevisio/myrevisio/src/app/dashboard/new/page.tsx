import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NewProjectForm from './NewProjectForm'

export default async function NewProjectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('users')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'

  const { count: activeCount } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'active')

  const isAtLimit = plan === 'free' && (activeCount ?? 0) >= 2

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="auth-logo">
            <img src="/apple-touch-icon.png" alt="My Revisio" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <span className="logo-name">My Revisio</span>
          </div>
          <Link href="/dashboard" className="btn-signout">
            ← Retour
          </Link>
        </div>
      </header>

      <main className="dashboard-main" style={{ maxWidth: 600 }}>
        {isAtLimit ? (
          <div className="auth-card" style={{ maxWidth: '100%', textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
            <h1 style={{ fontSize: 22, marginBottom: 12 }}>Limite atteinte</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Vous avez atteint la limite de 2 projets actifs sur le plan gratuit.
            </p>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-block',
                background: '#e84c1e',
                color: 'white',
                borderRadius: 10,
                padding: '12px 28px',
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              Passer au Pro
            </Link>
          </div>
        ) : (
          <>
            <h1 style={{ marginBottom: 8 }}>Nouveau projet</h1>
            <p className="auth-subtitle" style={{ marginBottom: 32 }}>
              Remplissez les informations du projet pour générer le lien client.
            </p>
            <NewProjectForm />
          </>
        )}
      </main>
    </div>
  )
}
