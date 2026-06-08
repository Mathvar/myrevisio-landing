'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function Logo() {
  return (
    <div className="auth-logo">
      <div className="logo-dot">R</div>
      <span className="logo-name">My Revisio</span>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="auth-field">
      <label>{label}</label>
      {children}
    </div>
  )
}

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user?.identities?.length === 0) {
      setError('__duplicate__')
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('Compte créé, mais la connexion automatique a échoué. Connectez-vous manuellement.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <Logo />
        <div className="badge-green">✓ 2 projets gratuits, sans carte bancaire</div>
        <h1>Créer un compte</h1>
        <p className="auth-subtitle">Pour freelances créatifs</p>
        <form onSubmit={handleSubmit}>
          <Field label="Prénom">
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Sophie" required />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sophie@design.fr" required />
          </Field>
          <Field label="Mot de passe">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="8 caractères minimum" minLength={8} required />
          </Field>
          {error && error !== '__duplicate__' && <p className="auth-error">{error}</p>}
          {error === '__duplicate__' && (
            <p className="auth-error">
              Un compte existe déjà avec cet email.{' '}
              <Link href="/auth/login" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
                Se connecter →
              </Link>
            </p>
          )}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
        <p className="auth-footer">
          Déjà un compte ? <Link href="/auth/login">Se connecter →</Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}