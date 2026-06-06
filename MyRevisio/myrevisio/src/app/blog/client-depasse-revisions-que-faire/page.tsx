import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mon client dépasse les révisions : que faire ? — My Revisio',
  description: "Ton client vient de demander sa 5ème révision alors que tu en avais inclus 2. Voici exactement quoi faire, quoi dire, et comment facturer sans créer de conflit.",
  openGraph: {
    title: 'Mon client dépasse les révisions : que faire ?',
    description: "Ton client vient de demander sa 5ème révision alors que tu en avais inclus 2. Voici exactement quoi faire et quoi dire.",
    url: 'https://myrevisio.com/blog/client-depasse-revisions-que-faire',
  },
  alternates: {
    canonical: 'https://myrevisio.com/blog/client-depasse-revisions-que-faire',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mon client dépasse les révisions : que faire ?',
  description: "Ton client vient de demander sa 5ème révision alors que tu en avais inclus 2. Voici exactement quoi faire, quoi dire, et comment facturer sans créer de conflit.",
  author: { '@type': 'Organization', name: 'My Revisio' },
  publisher: { '@type': 'Organization', name: 'My Revisio', url: 'https://myrevisio.com' },
  datePublished: '2026-06-02',
  url: 'https://myrevisio.com/blog/client-depasse-revisions-que-faire',
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
          <span className="meta-read">7 min de lecture</span>
        </div>

        <h1>Mon client dépasse les révisions : que faire ?</h1>

        <p className="article-intro">
          Tu as livré. Ton client a retouché, modifié, changé d&apos;avis. Et là, une nouvelle demande arrive —
          alors que tu avais clairement indiqué &quot;3 révisions incluses&quot; dans ton devis. Ce moment est
          inconfortable pour presque tous les freelances. Voici exactement quoi faire, dans quel ordre,
          et avec quelles formulations.
        </p>

        <h2>D&apos;abord : pourquoi tu ne dois pas laisser passer</h2>

        <p>
          L&apos;erreur la plus commune est de faire la révision supplémentaire &quot;pour garder une bonne relation
          avec le client&quot; en se disant qu&apos;on mentionnera le sujet la prochaine fois. La prochaine fois ne
          vient jamais. Et le client retient que les révisions sont gratuites.
        </p>

        <p>
          Laisser passer une fois, c&apos;est communiquer au client que la limite n&apos;était pas vraiment une limite.
          La prochaine demande excessive devient encore plus difficile à refuser.
        </p>

        <div className="pullquote">
          <p>
            &quot;Je n&apos;osais jamais facturer les extras parce que je n&apos;avais aucune preuve de ce qu&apos;on avait
            fait. Maintenant le client voit lui-même le compteur — c&apos;est lui qui sait qu&apos;il dépasse,
            pas moi qui dois lui annoncer.&quot;
          </p>
        </div>

        <h2>Le plan d&apos;action en 4 étapes</h2>

        <ol className="step-list step-list-accent">
          <li>
            <div>
              <div className="step-title">Vérifie que tu as bien les preuves</div>
              <div className="step-body">
                Avant de répondre, retrouve les emails ou messages des tours précédents. Note les dates
                et un résumé de chaque demande. C&apos;est ta base factuelle si le client conteste.
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="step-title">Réponds rapidement, sans laisser traîner</div>
              <div className="step-body">
                Plus tu attends, plus la situation devient difficile. Une réponse dans les 24h est la règle.
                Le silence est interprété comme un accord tacite.
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="step-title">Formule ta réponse avec les bons mots</div>
              <div className="step-body">
                Factuel, sans reproche, avec une solution claire. Tu n&apos;es pas en train de punir le client —
                tu appliques simplement ce qui était convenu.
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="step-title">Envoie la facture dès accord</div>
              <div className="step-body">
                Ne commence pas la révision supplémentaire avant confirmation et idéalement paiement.
                C&apos;est professionnel et ça évite les mauvaises surprises.
              </div>
            </div>
          </li>
        </ol>

        <h2>Les emails types à copier-coller</h2>

        <p>Voici trois situations et les formulations adaptées à chacune.</p>

        <h3>Situation 1 — Le client ne sait probablement pas qu&apos;il dépasse</h3>

        <div className="email-box">
          <div className="email-label">Email à envoyer</div>
          <div className="email-subject">Objet : Suite à votre dernière demande — révisions</div>
          <div className="email-body">{`Bonjour [Prénom],

Je reviens vers vous au sujet de votre dernière demande de modifications.

Pour mémoire, votre devis incluait 3 tours de révisions. Nous avons déjà effectué :
— Tour 1 le [date] : [résumé rapide]
— Tour 2 le [date] : [résumé rapide]
— Tour 3 le [date] : [résumé rapide]

Votre demande actuelle correspond donc à un 4ème tour, facturé [prix] € HT selon les conditions de votre devis.

Souhaitez-vous que je procède à ces modifications dans ce cadre ? Je vous envoie une facture dès votre confirmation.

Cordialement,
[Prénom]`}</div>
        </div>

        <h3>Situation 2 — Le client conteste et dit &quot;ce n&apos;était qu&apos;une petite modification&quot;</h3>

        <div className="email-box">
          <div className="email-label">Email à envoyer</div>
          <div className="email-subject">Objet : Révisions — précisions</div>
          <div className="email-body">{`Bonjour [Prénom],

Je comprends que certaines demandes peuvent sembler mineures prises individuellement.

Notre devis définissait un "tour de révisions" comme l'ensemble des retours transmis en une seule fois. Chacun des trois tours précédents a bien été traité comme tel, quelle que soit leur ampleur.

Votre demande actuelle constitue donc un 4ème tour indépendamment de sa taille, conformément aux conditions convenues.

Je reste disponible pour effectuer ces modifications pour [prix] € HT.

Cordialement,
[Prénom]`}</div>
        </div>

        <h3>Situation 3 — Le client dit &quot;je ne savais pas, ce n&apos;était pas clair dans le devis&quot;</h3>

        <div className="email-box">
          <div className="email-label">Email à envoyer</div>
          <div className="email-subject">Objet : Révisions — clarification</div>
          <div className="email-body">{`Bonjour [Prénom],

Je comprends que ce point n'était peut-être pas suffisamment visible dans le devis. Pour les futurs projets, je mettrai en place un système qui vous permettra de voir votre compteur de révisions en temps réel — ainsi il n'y a aucune surprise.

Pour le projet en cours, afin de trouver une solution satisfaisante pour les deux parties, je vous propose d'effectuer cette révision supplémentaire à [prix réduit] € HT (au lieu de [prix normal] €) à titre exceptionnel.

Cela vous convient-il ?

Cordialement,
[Prénom]`}</div>
        </div>

        <div className="callout callout-green">
          <div className="callout-title">Conseil important</div>
          <p>
            La troisième situation est la plus délicate. Faire un geste commercial exceptionnel une fois
            n&apos;est pas une faiblesse — c&apos;est de l&apos;intelligence relationnelle. Mais utilise la formulation
            &quot;à titre exceptionnel&quot; et mets bien en place le système de suivi pour que ça ne se reproduise plus.
          </p>
        </div>

        <h2>Si le client refuse de payer</h2>

        <p>C&apos;est rare, mais ça arrive. Voici les options dans l&apos;ordre.</p>

        <h3>Option 1 — Ne pas livrer la révision supplémentaire</h3>
        <p>
          Tu n&apos;es pas obligé d&apos;effectuer un travail non rémunéré. Livre les fichiers finaux tels qu&apos;ils sont
          à l&apos;issue du dernier tour inclus, et indique clairement que les modifications demandées seront
          réalisées dès règlement de la facture supplémentaire.
        </p>

        <h3>Option 2 — Proposer un avoir sur la prochaine commande</h3>
        <p>
          Si c&apos;est un client récurrent que tu veux garder, tu peux proposer d&apos;absorber le coût cette fois
          et de déduire le montant de la prochaine facture. C&apos;est un geste commercial, pas une abdication.
        </p>

        <h3>Option 3 — Accepter la perte et tirer la leçon</h3>
        <p>
          Si le montant est faible et le client difficile, parfois la meilleure décision est de clore le
          projet et de ne pas retravailler avec ce client. Une relation client qui n&apos;est pas rentable est
          une relation qui coûte de l&apos;énergie.
        </p>

        <h2>Comment éviter cette situation à l&apos;avenir</h2>

        <p>
          La meilleure solution reste de ne jamais arriver à cette conversation. Voici les trois mesures
          préventives les plus efficaces.
        </p>

        <ul>
          <li>
            <strong>Définir clairement les révisions dans le devis</strong> — nombre de tours,
            définition d&apos;un tour, prix des extras
          </li>
          <li>
            <strong>Rappeler le quota au démarrage du projet</strong> — un email de bienvenue qui
            récapitule les conditions
          </li>
          <li>
            <strong>Rendre le compteur visible</strong> — utiliser un outil comme My Revisio qui montre
            au client combien de tours il lui reste, en temps réel
          </li>
        </ul>

        <p>
          Quand le client voit lui-même son compteur diminuer, il n&apos;y a plus de surprise. Il consolide ses
          retours, il réfléchit avant d&apos;envoyer, et la conversation sur la facturation ne se produit tout
          simplement pas.
        </p>

        <div className="summary-box">
          <h3>Ce qu&apos;il faut retenir</h3>
          <ul>
            <li>Ne jamais laisser passer sans rien dire — ça valide que les limites ne sont pas réelles</li>
            <li>Répondre vite, avec des faits, sans reproche</li>
            <li>Avoir les preuves écrites des tours précédents</li>
            <li>Proposer une solution (payer les extras) avant de bloquer la livraison</li>
            <li>La meilleure solution est préventive : rendre le compteur visible dès le début</li>
          </ul>
        </div>

        <div className="cta-box">
          <h3>Plus jamais cette conversation</h3>
          <p>
            Avec My Revisio, ton client voit son compteur de révisions en temps réel. Quand il dépasse,
            la facturation est automatique. Tu n&apos;as plus rien à annoncer.
          </p>
          <a href="https://myrevisio.com" className="cta-btn">Essayer gratuitement →</a>
          <div className="cta-note">Gratuit pour 2 projets · Aucune CB requise</div>
        </div>

        <div className="article-footer">
          <a href="#" className="tag">révisions clients</a>
          <a href="#" className="tag">scope creep</a>
          <a href="#" className="tag">facturation freelance</a>
          <a href="#" className="tag">gestion client</a>
          <a href="#" className="tag">graphiste freelance</a>
          <a href="#" className="tag">motion designer</a>
        </div>

      </article>
    </>
  )
}
