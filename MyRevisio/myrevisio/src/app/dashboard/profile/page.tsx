import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from './ProfileForm'
import LogoutButton from '../LogoutButton'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('users')
    .select('first_name, payment_link, iban, bic')
    .eq('id', user.id)
    .single()

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="auth-logo">
            <img src="/apple-touch-icon.png" alt="My Revisio" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <span className="logo-name">My Revisio</span>
          </div>
          <div className="header-right">
            <Link href="/dashboard" className="btn-signout">← Dashboard</Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-main" style={{ paddingTop: 48, maxWidth: 600 }}>
        <h1 style={{ fontSize: 32, fontWeight: 600, fontFamily: "'DM Serif Display', serif", marginBottom: 8 }}>
          Mon profil
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 32 }}>
          Gérez vos informations de paiement pour les révisions supplémentaires.
        </p>

        <ProfileForm
          userId={user.id}
          initialPaymentLink={profile?.payment_link ?? ''}
          initialIban={profile?.iban ?? ''}
          initialBic={profile?.bic ?? ''}
        />
      </main>
    </div>
  )
}
