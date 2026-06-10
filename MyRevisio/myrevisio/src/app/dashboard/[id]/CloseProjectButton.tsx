'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CloseProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClose() {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir clôturer ce projet ? Le lien client ne sera plus accessible.'
    )
    if (!confirmed) return

    setLoading(true)
    const response = await fetch('/api/projects/close', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId })
    })

    if (!response.ok) {
      console.error('Erreur clôture: réponse serveur non ok')
      alert('Une erreur est survenue. Veuillez réessayer.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <button
      onClick={handleClose}
      disabled={loading}
      style={{
        background: 'white',
        color: 'var(--text-muted)',
        border: '1px solid var(--border-strong)',
        borderRadius: 10,
        padding: '9px 18px',
        fontSize: 13,
        fontWeight: 500,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        fontFamily: 'inherit',
        transition: 'color 0.15s, border-color 0.15s',
      }}
    >
      {loading ? 'Clôture...' : 'Clôturer le projet'}
    </button>
  )
}
