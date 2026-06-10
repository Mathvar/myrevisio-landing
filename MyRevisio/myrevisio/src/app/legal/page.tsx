import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — My Revisio',
  description: 'Mentions légales de My Revisio : éditeur, hébergeur et directrice de publication.',
}

export default function LegalPage() {
  return (
    <div className="blog-article">
      <a href="/" className="legal-back">← Retour</a>

      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Le site My Revisio est édité par Marie VARAGNAT, micro-entreprise dont le numéro SIRET est en cours
        d&apos;immatriculation.
      </p>
      <p>
        Adresse : 30240 Le Grau-du-Roi<br />
        Email : contact@myrevisio.com
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.
      </p>

      <h2>Directrice de publication</h2>
      <p>
        Marie VARAGNAT.
      </p>
    </div>
  )
}
