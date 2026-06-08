'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProfileForm({
  userId,
  initialPaymentLink,
  initialIban,
  initialBic,
}: {
  userId: string
  initialPaymentLink: string
  initialIban: string
  initialBic: string
}) {
  const [paymentLink, setPaymentLink] = useState(initialPaymentLink)
  const [iban, setIban] = useState(initialIban)
  const [bic, setBic] = useState(initialBic)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSaved(false)

    const supabase = createClient()
    const { error } = await supabase
      .from('users')
      .update({
        payment_link: paymentLink || null,
        iban: iban || null,
        bic: bic || null,
      })
      .eq('id', userId)

    if (error) {
      setError('Une erreur est survenue. Réessayez.')
      setLoading(false)
      return
    }

    setSaved(true)
    setLoading(false)
  }

  return (
    <div className="auth-card" style={{ maxWidth: '100%' }}>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 16 }}>
            Informations de paiement
          </div>

          {/* Option 1 : lien de paiement */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
              Option 1 — Lien de paiement
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              PayPal, Lydia, Sumeria, lien Stripe personnalisé…
            </div>
            <div className="auth-field" style={{ marginBottom: 0 }}>
              <label>Lien de paiement</label>
              <input
                type="url"
                value={paymentLink}
                onChange={e => setPaymentLink(e.target.value)}
                placeholder="https://paypal.me/tonnom"
              />
            </div>
          </div>

          {/* Séparateur */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>OU</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Option 2 : IBAN / BIC */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '16px 20px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
              Option 2 — Virement bancaire
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              Votre IBAN sera affiché au client quand le quota est atteint.
            </div>
            <div className="auth-field">
              <label>IBAN</label>
              <input
                type="text"
                value={iban}
                onChange={e => setIban(e.target.value.toUpperCase())}
                placeholder="FR76 3000 6000 0112 3456 7890 189"
              />
            </div>
            <div className="auth-field" style={{ marginBottom: 0 }}>
              <label>BIC</label>
              <input
                type="text"
                value={bic}
                onChange={e => setBic(e.target.value.toUpperCase())}
                placeholder="BNPAFRPP"
              />
            </div>
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        {saved && (
          <div style={{
            background: 'var(--green-soft)',
            color: 'var(--green)',
            fontSize: 13,
            padding: '10px 14px',
            borderRadius: 8,
            marginBottom: 12,
          }}>
            ✓ Profil enregistré.
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  )
}
