'use client'

import { useState } from 'react'

interface Props {
  plan: string
}

export default function BillingButton({ plan }: Props) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  const handlePortal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  if (plan === 'pro') {
    return (
      <button onClick={handlePortal} disabled={loading} className="btn-manage-plan">
        {loading ? 'Chargement…' : 'Gérer mon abonnement'}
      </button>
    )
  }

  return (
    <button onClick={handleUpgrade} disabled={loading} className="btn-upgrade">
      {loading ? 'Chargement…' : 'Passer au Pro — 12 €/mois'}
    </button>
  )
}
