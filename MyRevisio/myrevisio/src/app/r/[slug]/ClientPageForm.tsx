'use client'

import { useState } from 'react'

type Project = {
  id: string
  name: string
  client_name: string
  revisions_included: number
  revisions_used: number
  price_per_extra: number
  status: string
}

type FreelancePayment = {
  payment_link: string | null
  iban: string | null
  bic: string | null
}

type Feedback = {
  id: string
  content: string
  submitted_at: string
  revision_number: number
}

export default function ClientPageForm({
  project,
  feedbacks,
  isQuotaReached,
  freelancePayment,
}: {
  project: Project
  feedbacks: Feedback[]
  isQuotaReached: boolean
  freelancePayment: FreelancePayment
}) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [payLoading, setPayLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paidUnlocked, setPaidUnlocked] = useState(false)
  const [notifyLoading, setNotifyLoading] = useState(false)

  async function handlePay() {
    setPayLoading(true)
    try {
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, quantity }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setPayLoading(false)
    }
  }

  async function handlePaidClaimed() {
    setNotifyLoading(true)
    try {
      await fetch('/api/notify-payment-claimed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id }),
      })
    } finally {
      setNotifyLoading(false)
      setPaidUnlocked(true)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: project.id,
        content,
        revision_number: project.revisions_used + 1,
        is_extra: isQuotaReached,
      }),
    })

    if (!res.ok) {
      setError('Une erreur est survenue. Réessayez.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setContent('')
    setLoading(false)
  }

  if (success) {
    return (
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h2>Retour envoyé !</h2>
        <p>Votre retour a bien été transmis. Merci !</p>
      </div>
    )
  }

  return (
    <div>
      {isQuotaReached && !paidUnlocked ? (
        <div className="quota-box">
          <p className="quota-title">Vous avez utilisé toutes vos révisions incluses.</p>

          {freelancePayment.payment_link ? (
            /* Cas 1 : lien de paiement externe */
            <>
              <p style={{ fontSize: 14, color: '#4a4540', marginBottom: 20 }}>
                Une révision supplémentaire vous sera facturée{' '}
                <strong>{project.price_per_extra} € HT</strong>.
              </p>
              <a
                href={freelancePayment.payment_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: '#e84c1e',
                  color: 'white',
                  borderRadius: 10,
                  padding: '12px 22px',
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginBottom: 12,
                }}
              >
                Payer {project.price_per_extra} € HT
              </a>
              <button
                onClick={handlePaidClaimed}
                disabled={notifyLoading}
                style={{
                  display: 'block', width: '100%',
                  background: 'white', color: '#e84c1e',
                  border: '2px solid #e84c1e', borderRadius: 10,
                  padding: '11px 22px', fontSize: 14, fontWeight: 600,
                  cursor: notifyLoading ? 'not-allowed' : 'pointer',
                  opacity: notifyLoading ? 0.7 : 1,
                }}
              >
                {notifyLoading ? 'Envoi...' : "J'ai payé, soumettre mon retour"}
              </button>
            </>
          ) : freelancePayment.iban ? (
            /* Cas 2 : virement bancaire */
            <>
              <p style={{ fontSize: 14, color: '#4a4540', marginBottom: 16 }}>
                Effectuez un virement de{' '}
                <strong>{project.price_per_extra} € HT</strong> sur ce compte :
              </p>
              <div style={{
                background: '#f2ede6',
                border: '1px solid rgba(15,14,13,0.1)',
                borderRadius: 10,
                padding: '14px 16px',
                marginBottom: 16,
                fontSize: 14,
                lineHeight: 1.8,
              }}>
                <div><span style={{ color: '#9a8f85', fontSize: 12 }}>IBAN</span></div>
                <div style={{ fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8 }}>
                  {freelancePayment.iban}
                </div>
                {freelancePayment.bic && (
                  <>
                    <div><span style={{ color: '#9a8f85', fontSize: 12 }}>BIC</span></div>
                    <div style={{ fontWeight: 600, letterSpacing: '0.05em' }}>
                      {freelancePayment.bic}
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={handlePaidClaimed}
                disabled={notifyLoading}
                style={{
                  display: 'block', width: '100%',
                  background: '#e84c1e', color: 'white',
                  border: 'none', borderRadius: 10,
                  padding: '12px 22px', fontSize: 15, fontWeight: 600,
                  cursor: notifyLoading ? 'not-allowed' : 'pointer',
                  opacity: notifyLoading ? 0.7 : 1,
                }}
              >
                {notifyLoading ? 'Envoi...' : "J'ai payé, soumettre mon retour"}
              </button>
            </>
          ) : (
            /* Cas 3 : Stripe */
            <>
              <p style={{ fontSize: 14, color: '#4a4540', marginBottom: 16 }}>
                Choisissez le nombre de révisions supplémentaires :
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 16 }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '2px solid #e84c1e', background: 'white', color: '#e84c1e',
                    fontSize: 20, fontWeight: 700,
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    opacity: quantity <= 1 ? 0.35 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                  }}
                >−</button>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#0f0e0d', minWidth: 32, textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '2px solid #e84c1e', background: 'white', color: '#e84c1e',
                    fontSize: 20, fontWeight: 700,
                    cursor: quantity >= 10 ? 'not-allowed' : 'pointer',
                    opacity: quantity >= 10 ? 0.35 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                  }}
                >+</button>
              </div>
              <p style={{ fontSize: 14, color: '#4a4540', marginBottom: 14, textAlign: 'center' }}>
                Total : <strong>{(project.price_per_extra * quantity).toFixed(2).replace('.', ',')} € HT</strong>
              </p>
              <button
                onClick={handlePay}
                disabled={payLoading}
                style={{
                  background: '#e84c1e', color: 'white', border: 'none',
                  borderRadius: 10, padding: '12px 22px', fontSize: 15, fontWeight: 600,
                  cursor: payLoading ? 'not-allowed' : 'pointer',
                  opacity: payLoading ? 0.7 : 1, width: '100%',
                }}
              >
                {payLoading ? 'Redirection...' : `Payer ${(project.price_per_extra * quantity).toFixed(2).replace('.', ',')} € HT`}
              </button>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="auth-field">
            <label>Vos retours</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Décrivez vos retours et modifications souhaitées..."
              rows={5}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid var(--border-strong)',
                borderRadius: 10,
                fontSize: 14,
                color: 'var(--text)',
                background: 'white',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer mes retours'}
          </button>
        </form>
      )}

      {feedbacks.length > 0 && (
        <div className="feedbacks-list">
          <h3>Historique des retours</h3>
          {feedbacks.map(fb => (
            <div key={fb.id} className="feedback-item">
              <div className="feedback-header">
                <span className="feedback-number">Révision #{fb.revision_number}</span>
                <span className="feedback-date">
                  {new Date(fb.submitted_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="feedback-content">{fb.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}