'use client'

import { useState } from 'react'

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="copy-link-box">
        <span className="copy-link-url">{url}</span>
        <button
          onClick={handleCopy}
          className={`btn-copy${copied ? ' copied' : ''}`}
        >
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Partagez ce lien avec votre client pour qu'il puisse soumettre ses retours.
      </p>
    </>
  )
}
