'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function generateSlug() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function NewProjectForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [revisionsIncluded, setRevisionsIncluded] = useState(3)
  const [pricePerExtra, setPricePerExtra] = useState(80)
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    const slug = generateSlug()

    const { error } = await supabase.from('projects').insert({
      user_id: user.id,
      slug,
      name,
      client_name: clientName,
      revisions_included: revisionsIncluded,
      price_per_extra: pricePerExtra,
      description,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="auth-card" style={{ maxWidth: '100%' }}>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Nom du projet *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Refonte site web"
            required
          />
        </div>

        <div className="auth-field">
          <label>Nom du client</label>
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Dupont & Associés"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="auth-field">
            <label>Révisions incluses *</label>
            <input
              type="number"
              value={revisionsIncluded}
              onChange={e => setRevisionsIncluded(Number(e.target.value))}
              min={1}
              max={20}
              required
            />
          </div>
          <div className="auth-field">
            <label>Prix/révision extra (€)</label>
            <input
              type="number"
              value={pricePerExtra}
              onChange={e => setPricePerExtra(Number(e.target.value))}
              min={0}
              step={10}
            />
          </div>
        </div>

        <div className="auth-field">
          <label>Description (optionnelle)</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Contexte du projet, notes pour le client..."
            rows={3}
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
          {loading ? 'Création...' : 'Créer le projet'}
        </button>
      </form>
    </div>
  )
}
