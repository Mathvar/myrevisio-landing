import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — My Revisio',
  description: 'Politique de confidentialité de My Revisio : données collectées, finalité, hébergement et droits RGPD.',
}

export default function PrivacyPage() {
  return (
    <div className="blog-article">
      <a href="/" className="legal-back">← Retour</a>

      <h1>Politique de confidentialité</h1>

      <p className="article-intro">
        My Revisio attache une grande importance à la protection de vos données personnelles.
        Cette page explique quelles données sont collectées, pourquoi, et comment exercer vos droits.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est Marie VARAGNAT, éditrice de My Revisio.
      </p>

      <h2>Données collectées</h2>
      <p>
        My Revisio collecte uniquement les données nécessaires au fonctionnement du service :
      </p>
      <ul>
        <li>Adresse email</li>
        <li>Prénom</li>
        <li>Informations relatives aux projets créés sur la plateforme</li>
        <li>Feedbacks et retours soumis par les clients des freelances</li>
      </ul>

      <h2>Finalité du traitement</h2>
      <p>
        Ces données sont utilisées exclusivement pour la fourniture du service My Revisio :
        gestion du compte, suivi des projets et des révisions, et communication avec les utilisateurs.
      </p>

      <h2>Hébergement des données</h2>
      <p>
        Les données sont hébergées chez Supabase (Union européenne) pour la base de données,
        et chez Vercel (États-Unis) pour l&apos;hébergement de l&apos;application.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données sont conservées tant que le compte est actif. Elles sont supprimées sur simple
        demande de l&apos;utilisateur, ou automatiquement à la clôture du compte.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
        de vos données. Pour exercer ces droits, contactez-nous à l&apos;adresse{' '}
        <a href="mailto:contact@myrevisio.com">contact@myrevisio.com</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        My Revisio n&apos;utilise aucun cookie publicitaire ni de traceur tiers à des fins commerciales.
      </p>
    </div>
  )
}
