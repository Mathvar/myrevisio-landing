import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — My Revisio",
  description: "Conditions générales d'utilisation de My Revisio : description du service, responsabilités, paiements et tarifs.",
}

export default function TermsPage() {
  return (
    <div className="blog-article">
      <a href="/" className="legal-back">← Retour</a>

      <h1>Conditions générales d&apos;utilisation</h1>

      <h2>Objet du service</h2>
      <p>
        My Revisio est un outil SaaS permettant aux freelances de suivre les tours de révisions de leurs
        projets clients, et de gérer la facturation des révisions supplémentaires.
      </p>

      <h2>Rôle de My Revisio</h2>
      <p>
        My Revisio n&apos;est pas partie au contrat conclu entre le freelance et son client. My Revisio fournit
        uniquement un outil de suivi et de communication.
      </p>
      <p>
        My Revisio ne touche jamais les fonds échangés entre le freelance et son client. Les paiements
        s&apos;effectuent directement entre les deux parties, par les moyens choisis par le freelance.
      </p>

      <h2>Responsabilité du freelance</h2>
      <p>
        Le freelance est seul responsable des informations de paiement (lien PayPal, Lydia, Stripe, IBAN, etc.)
        qu&apos;il renseigne et qui sont affichées à ses clients sur My Revisio.
      </p>

      <h2>Plans et tarifs</h2>
      <ul>
        <li>Plan gratuit : jusqu&apos;à 2 projets actifs simultanément</li>
        <li>Plan Pro : 12 € / mois, sans engagement, résiliable à tout moment</li>
      </ul>

      <h2>Limitation de responsabilité</h2>
      <p>
        My Revisio agit en tant qu&apos;hébergeur des contenus saisis par ses utilisateurs (informations de
        projets, retours et feedbacks clients). My Revisio ne saurait être tenu responsable du contenu,
        de l&apos;exactitude ou des conséquences des informations saisies par les freelances ou leurs clients.
      </p>
    </div>
  )
}
