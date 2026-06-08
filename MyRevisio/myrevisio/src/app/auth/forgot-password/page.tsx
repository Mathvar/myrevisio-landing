'use client'

import { useState } from 'react'
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })

    if (error) {
      setError('Une erreur est survenue. Vérifiez votre adresse email.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <Logo />
        <h1>Mot de passe oublié</h1>
        <p className="auth-subtitle">Entrez votre email pour recevoir un lien de réinitialisation.</p>

        {sent ? (
          <>
            <div style={{
              background: 'var(--green-soft)',
              color: 'var(--green)',
              fontSize: '14px',
              padding: '14px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              lineHeight: '1.5',
            }}>
              Un email vous a été envoyé avec un lien de réinitialisation.
            </div>
            <p className="auth-footer">
              <Link href="/auth/login">← Retour à la connexion</Link>
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="sophie@design.fr"
                required
              />
            </Field>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
            </button>
          </form>
        )}

        {!sent && (
          <p className="auth-footer">
            <Link href="/auth/login">← Retour à la connexion</Link>
          </p>
        )}
      </div>
    </div>
  )
}
