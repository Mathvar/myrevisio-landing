import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Combien de révisions inclure dans un devis freelance ? — My Revisio',
  description: "2, 3 ou 5 révisions dans ton devis ? La bonne réponse dépend de ton type de projet. Guide complet avec exemples concrets pour graphistes et motion designers freelances.",
  openGraph: {
    title: 'Combien de révisions inclure dans un devis freelance ?',
    description: '2, 3 ou 5 révisions ? La bonne réponse dépend de ton type de projet. Guide complet avec exemples.',
    url: 'https://myrevisio.com/blog/combien-revisions-inclure-devis-freelance',
  },
  alternates: {
    canonical: 'https://myrevisio.com/blog/combien-revisions-inclure-devis-freelance',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Combien de révisions inclure dans un devis freelance ?',
  description: '2, 3 ou 5 révisions dans ton devis ? La bonne réponse dépend de ton type de projet. Guide complet pour graphistes et motion designers freelances.',
  author: { '@type': 'Organization', name: 'My Revisio' },
  publisher: { '@type': 'Organization', name: 'My Revisio', url: 'https://myrevisio.com' },
  datePublished: '2026-06-02',
  url: 'https://myrevisio.com/blog/combien-revisions-inclure-devis-freelance',
}

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="blog-nav">
        <a href="https://myrevisio.com" className="blog-nav-logo">
          <span></span>My Revisio
        </a>
        <a href="https://myrevisio.com/#tarifs" className="blog-nav-cta">
          Essayer gratuitement
        </a>
      </nav>

      <article className="blog-article">

        <div className="article-meta">
          <span className="meta-tag">Guide freelance</span>
          <span className="meta-dot">·</span>
          <span className="meta-date">2 juin 2026</span>
          <span className="meta-dot">·</span>
          <span className="meta-read">6 min de lecture</span>
        </div>

        <h1>Combien de révisions inclure dans un devis freelance ?</h1>

        <p className="article-intro">
          2 révisions ? 3 ? 5 ? Illimitées ? La question revient dans chaque devis et la réponse n&apos;est pas
          universelle. Trop peu et le client se sent bridé. Trop et tu travailles gratuitement. Voici comment
          trouver le bon équilibre selon ton type de projet.
        </p>

        <h2>Pourquoi &quot;illimité&quot; est une très mauvaise idée</h2>

        <p>
          Certains freelances proposent des révisions &quot;illimitées&quot; pour rassurer le client et décrocher le
          projet. C&apos;est une erreur qui se paye cher. Sans limite, le client n&apos;a aucune incitation à consolider
          ses retours ni à prendre des décisions rapidement. Un projet qui devrait prendre 3 semaines s&apos;étire
          sur 3 mois.
        </p>

        <p>
          Les révisions illimitées ne créent pas de la satisfaction client — elles créent de l&apos;indécision
          client. Le cadre est paradoxalement rassurant pour les deux parties : il force le client à réfléchir
          avant d&apos;envoyer ses retours.
        </p>

        <div className="pullquote">
          <p>
            &quot;Depuis que j&apos;ai limité à 3 révisions, mes clients préparent mieux leurs retours. Ils consolident
            tout dans un seul email au lieu de m&apos;envoyer des modifications au fur et à mesure.&quot;
          </p>
        </div>

        <h2>Le bon nombre selon le type de projet</h2>

        <p>Il n&apos;existe pas de réponse universelle, mais voici les standards du marché par type de prestation.</p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type de projet</th>
                <th>Révisions recommandées</th>
                <th>Pourquoi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Logo simple</strong></td>
                <td>2–3 tours</td>
                <td>Projet court, décisions rapides attendues</td>
              </tr>
              <tr>
                <td><strong>Identité visuelle complète</strong></td>
                <td>3–4 tours</td>
                <td>Plus de livrables, plus de points de friction</td>
              </tr>
              <tr>
                <td><strong>Motion design / animation</strong></td>
                <td>2 tours</td>
                <td>Chaque révision est coûteuse en temps de rendu</td>
              </tr>
              <tr>
                <td><strong>Illustration</strong></td>
                <td>2–3 tours</td>
                <td>Distinguer esquisse / finalisation / retouches</td>
              </tr>
              <tr>
                <td><strong>Site web (design)</strong></td>
                <td>3–4 tours par page</td>
                <td>Beaucoup d&apos;éléments, beaucoup de retours possibles</td>
              </tr>
              <tr>
                <td><strong>Affiche / visuel one-shot</strong></td>
                <td>2 tours</td>
                <td>Projet simple, brief court</td>
              </tr>
              <tr>
                <td><strong>Charte graphique</strong></td>
                <td>4–5 tours</td>
                <td>Document complexe, validation de plusieurs parties</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Comment structurer les tours selon les phases</h2>

        <p>
          Pour les projets complexes, une bonne pratique est de découper les révisions par phase plutôt que
          de donner un quota global.
        </p>

        <h3>Exemple pour une identité visuelle</h3>

        <div className="callout">
          <div className="callout-title">Structure recommandée</div>
          <p>
            <strong>Phase 1 — Exploration :</strong> 2 propositions de direction créative, 1 tour de retours<br /><br />
            <strong>Phase 2 — Développement :</strong> 2 tours de révisions sur la direction choisie<br /><br />
            <strong>Phase 3 — Finalisation :</strong> 1 tour de retours mineurs (typographie, couleurs, espacements)<br /><br />
            <strong>Total : 4 tours</strong> — mais chaque tour a un rôle clair
          </p>
        </div>

        <p>
          Cette structure évite le problème classique où le client revient sur des décisions prises en phase 1
          alors qu&apos;on est en phase 3. Chaque phase a une validation formelle avant de passer à la suivante.
        </p>

        <h2>Comment présenter les révisions dans ton devis</h2>

        <p>
          La formulation dans ton devis est aussi importante que le chiffre. Voici les erreurs à éviter
          et les formulations qui protègent.
        </p>

        <h3>Formulations à éviter</h3>

        <ul>
          <li>&quot;Révisions incluses&quot; — sans préciser combien</li>
          <li>&quot;Révisions raisonnables&quot; — qui définit &quot;raisonnable&quot; ?</li>
          <li>&quot;Modifications mineures incluses&quot; — qu&apos;est-ce qui est mineur ?</li>
          <li>&quot;Jusqu&apos;à satisfaction&quot; — c&apos;est une invitation aux révisions infinies</li>
        </ul>

        <h3>Formulations qui protègent</h3>

        <div className="callout">
          <div className="callout-title">Formulation recommandée</div>
          <p>
            &quot;Le présent devis inclut <strong>3 tours de révisions</strong>. Un tour correspond à l&apos;ensemble
            des retours transmis en une seule fois. Les retours doivent être communiqués dans un délai de{' '}
            <strong>5 jours ouvrés</strong> après chaque livraison. Tout tour supplémentaire sera facturé{' '}
            <strong>90 € HT</strong>.&quot;
          </p>
        </div>

        <h2>Quel prix facturer les révisions supplémentaires ?</h2>

        <p>
          La règle générale : le prix d&apos;un tour supplémentaire doit être suffisamment élevé pour que le
          client prépare sérieusement ses retours, mais pas si élevé qu&apos;il perçoive ça comme punitif.
        </p>

        <p>
          Un bon repère : calcule ton taux journalier et divise par 3 à 4. Si tu factures 400 €/jour, un
          tour de révisions supplémentaire devrait être entre 100 et 130 €.
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Profil</th>
                <th>TJM indicatif</th>
                <th>Prix tour supplémentaire</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Graphiste junior</td>
                <td>200–300 €</td>
                <td>60–80 €</td>
              </tr>
              <tr>
                <td>Graphiste confirmé</td>
                <td>300–450 €</td>
                <td>80–120 €</td>
              </tr>
              <tr>
                <td>Motion designer</td>
                <td>400–600 €</td>
                <td>100–150 €</td>
              </tr>
              <tr>
                <td>DA / Senior</td>
                <td>500–700 €</td>
                <td>130–180 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Comment suivre les révisions efficacement</h2>

        <p>
          Définir le bon nombre de révisions dans ton devis c&apos;est bien. Avoir un système pour les suivre
          et les montrer au client c&apos;est encore mieux.
        </p>

        <p>
          Le problème le plus courant : le client ne sait pas combien de tours il a déjà utilisés. Il envoie
          ses retours de bonne foi, sans réaliser qu&apos;il dépasse le quota. Résultat : la conversation sur la
          facturation devient difficile parce qu&apos;il est surpris.
        </p>

        <p>
          La solution la plus simple : utiliser un outil qui génère un lien partageable par projet. Le client
          voit son compteur en temps réel, sans avoir à te demander. Quand le quota est atteint, le système
          l&apos;informe automatiquement.
        </p>

        <p>
          C&apos;est exactement ce que fait{' '}
          <a
            href="https://myrevisio.com"
            style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}
          >
            My Revisio
          </a>{' '}
          — un lien unique par projet, un compteur visible, une facturation automatique des extras.
        </p>

        <div className="summary-box">
          <h3>En résumé</h3>
          <ul>
            <li>Ne jamais proposer de révisions illimitées — ça nuit aux deux parties</li>
            <li>2-3 tours pour les projets courts, 3-5 pour les projets complexes</li>
            <li>Pour les gros projets, découper par phase avec validation à chaque étape</li>
            <li>Inclure dans le devis : nombre de tours, définition d&apos;un tour, délai de retour, prix des extras</li>
            <li>Rendre le compteur visible au client pour éviter les surprises</li>
          </ul>
        </div>

        <div className="cta-box">
          <h3>Suis tes révisions automatiquement</h3>
          <p>
            My Revisio génère un lien unique par projet. Ton client voit son compteur en temps réel.
            Gratuit pour 2 projets actifs — aucune CB requise.
          </p>
          <a href="https://myrevisio.com" className="cta-btn">Essayer gratuitement →</a>
          <div className="cta-note">2 min pour créer ton premier projet</div>
        </div>

        <div className="article-footer">
          <a href="#" className="tag">devis freelance</a>
          <a href="#" className="tag">révisions clients</a>
          <a href="#" className="tag">graphiste freelance</a>
          <a href="#" className="tag">motion design</a>
          <a href="#" className="tag">tarifs freelance</a>
        </div>

      </article>
    </>
  )
}
