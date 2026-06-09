import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — My Revisio',
  description: 'Guides et conseils pour les freelances créatifs : gérer les révisions clients, cadrer les devis, facturer les extras sans friction.',
  alternates: {
    canonical: 'https://myrevisio.com/blog',
  },
}

const articles = [
  {
    slug: 'comment-gerer-revisions-clients-freelance',
    tag: 'Guide freelance',
    date: '15 avril 2026',
    read: '8 min',
    title: 'Comment gérer les révisions clients quand on est freelance créatif',
    description: "Tu as mis « 3 révisions incluses » dans ton devis. Ton client vient de te demander sa 7ème modification. Ce scénario, presque tous les freelances créatifs le vivent. Voici comment l'éviter définitivement.",
  },
  {
    slug: 'combien-revisions-inclure-devis-freelance',
    tag: 'Guide freelance',
    date: '28 avril 2026',
    read: '6 min',
    title: 'Combien de révisions inclure dans un devis freelance ?',
    description: "2 révisions ? 3 ? 5 ? Illimitées ? La réponse n'est pas universelle. Trop peu et le client se sent bridé. Trop et tu travailles gratuitement. Voici comment trouver le bon équilibre selon ton type de projet.",
  },
  {
    slug: 'client-depasse-revisions-que-faire',
    tag: 'Guide freelance',
    date: '12 mai 2026',
    read: '7 min',
    title: 'Mon client dépasse les révisions : que faire ?',
    description: "Ton client vient de demander sa 5ème révision alors que tu en avais inclus 2. Voici exactement quoi faire, dans quel ordre, et avec quelles formulations — sans créer de conflit.",
  },
]

export default function BlogIndex() {
  return (
    <>
      <nav className="blog-nav">
        <a href="https://myrevisio.com" className="blog-nav-logo">
          <span></span>My Revisio
        </a>
        <a href="https://myrevisio.com/#tarifs" className="blog-nav-cta">
          Essayer gratuitement
        </a>
      </nav>

      <div className="blog-index">
        <div className="blog-index-header">
          <p className="blog-index-label">Blog</p>
          <h1>Guides pour freelances créatifs</h1>
          <p className="blog-index-sub">
            Révisions, devis, facturation — tout ce qu&apos;il faut savoir pour arrêter de perdre de l&apos;argent
            sur les allers-retours clients.
          </p>
        </div>

        <div className="blog-index-list">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="blog-card"
            >
              <div className="blog-card-meta">
                <span className="blog-card-tag">{article.tag}</span>
                <span className="blog-card-dot">·</span>
                <span className="blog-card-date">{article.date}</span>
                <span className="blog-card-dot">·</span>
                <span className="blog-card-read">{article.read} de lecture</span>
              </div>
              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-desc">{article.description}</p>
              <span className="blog-card-cta">Lire l&apos;article →</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .blog-index {
          max-width: 720px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .blog-index-header {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(26,24,20,0.1);
        }

        .blog-index-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #e84c1e;
          margin-bottom: 0.75rem;
        }

        .blog-index h1 {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 600;
          line-height: 1.2;
          color: #1a1814;
          margin-bottom: 0.75rem;
        }

        .blog-index-sub {
          font-size: 1rem;
          color: #4a453e;
          line-height: 1.7;
          max-width: 520px;
          margin: 0;
        }

        .blog-index-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .blog-card {
          display: block;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(26,24,20,0.1);
          text-decoration: none;
          transition: transform 0.15s;
        }

        .blog-card:first-child { padding-top: 0; }

        .blog-card:hover { transform: translateX(4px); }

        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .blog-card-tag {
          font-size: 0.72rem;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 999px;
          background: #fce9e3;
          color: #e84c1e;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .blog-card-dot { color: rgba(26,24,20,0.15); font-size: 0.8rem; }

        .blog-card-date,
        .blog-card-read { font-size: 0.8rem; color: #9a918a; }

        .blog-card-title {
          font-family: 'Lora', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #1a1814;
          line-height: 1.3;
          margin-bottom: 0.6rem;
        }

        .blog-card-desc {
          font-size: 0.92rem;
          color: #4a453e;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .blog-card-cta {
          font-size: 0.85rem;
          font-weight: 500;
          color: #e84c1e;
        }

        @media (max-width: 640px) {
          .blog-index { padding: 2.5rem 1.25rem 4rem; }
        }
      `}</style>
    </>
  )
}
