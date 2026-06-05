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
}: {
  project: Project
  feedbacks: Feedback[]
  isQuotaReached: boolean
}) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      {isQuotaReached ? (
        <div className="quota-box">
          <p className="quota-title">Vous avez utilisé toutes vos révisions incluses.</p>
          <p className="quota-price">
            Le tour suivant est facturé <strong>{project.price_per_extra} € HT</strong>.
          </p>
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