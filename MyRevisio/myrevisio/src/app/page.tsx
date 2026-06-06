import Link from 'next/link'

function Logo() {
  return (
    <div className="auth-logo">
      <div className="logo-dot">R</div>
      <span className="logo-name">My Revisio</span>
    </div>
  )
}

export default function LandingPage() {
  return (
    <>
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <Logo />
          <div className="landing-nav-links">
            <Link href="/auth/login" className="btn-ghost">Se connecter</Link>
            <Link href="/auth/register" className="btn-cta">Commencer gratuitement</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section>
        <div className="landing-hero">
          <div className="landing-badge">✦ Pour les freelances créatifs</div>
          <h1>
            Suivez les révisions de vos clients,{' '}
            <em>sans friction</em>
          </h1>
          <p>
            Créez un lien unique par projet. Votre client soumet ses retours,
            le compteur tourne. Plus de mauvaises surprises.
          </p>
          <div className="landing-cta-group">
            <Link href="/auth/register" className="btn-cta-lg">
              Créer un compte gratuit →
            </Link>
            <Link href="/auth/login" className="btn-ghost-lg">
              Se connecter
            </Link>
          </div>
          <p className="landing-hint">Gratuit pour commencer · Aucune carte bancaire requise</p>

          {/* Mockup */}
          <div className="landing-mockup">
            <div className="mockup-header">
              <span className="mockup-title">Mes projets</span>
              <span className="btn-cta" style={{ cursor: 'default' }}>+ Nouveau projet</span>
            </div>
            <div className="mockup-grid">
              {[
                { name: 'Refonte site web', client: 'Studio Lumière', used: 2, total: 3, pct: 67 },
                { name: 'Identité visuelle', client: 'Café Lento', used: 1, total: 2, pct: 50 },
                { name: 'App mobile v2', client: 'Nova SAS', used: 0, total: 4, pct: 0 },
              ].map((p) => (
                <div key={p.name} className="mockup-card">
                  <div className="mockup-card-label">
                    <span className="project-status status-active">Actif</span>
                  </div>
                  <div className="mockup-card-name">{p.name}</div>
                  <div className="mockup-card-client">{p.client}</div>
                  <div className="mockup-progress">
                    <div className="mockup-progress-fill" style={{ width: `${p.pct}%` }} />
                  </div>
                  <div className="mockup-progress-text">{p.used} / {p.total} révisions</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-features-inner">
          <div className="section-label">Fonctionnalités</div>
          <h2 className="section-title">Tout ce qu'il faut, rien de superflu</h2>
          <p className="section-subtitle">
            My Revisio est pensé pour les freelances qui facturent au projet
            et ont besoin de cadrer les allers-retours clients.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Lien client unique</h3>
              <p>
                Chaque projet génère une URL dédiée à partager avec votre client.
                Pas de compte requis de son côté.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔢</div>
              <h3>Compteur automatique</h3>
              <p>
                Chaque retour soumis décrémente le quota. Vous voyez en temps réel
                où en est chaque projet.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Historique des retours</h3>
              <p>
                Tous les feedbacks sont conservés dans la fiche projet.
                Un référentiel clair pour vous et votre client.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Quota dépassé</h3>
              <p>
                Quand le quota est atteint, le client voit le montant
                de la révision supplémentaire — défini par vous.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Multi-projets</h3>
              <p>
                Gérez tous vos clients depuis un seul tableau de bord.
                Filtrez par statut, archivez les projets terminés.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rapide à configurer</h3>
              <p>
                Créer un projet prend moins d'une minute.
                Nom, client, quota, prix — et c'est parti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps">
        <div className="section-label">Comment ça marche</div>
        <h2 className="section-title">Prêt en 3 étapes</h2>
        <p className="section-subtitle" style={{ marginBottom: 56 }}>
          De la création du projet à la réception du premier retour client,
          il faut moins de deux minutes.
        </p>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Créez un projet</h3>
            <p>
              Renseignez le nom du projet, le nom du client, le nombre de révisions incluses
              et le tarif d'une révision supplémentaire.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Partagez le lien</h3>
            <p>
              Copiez l'URL unique générée et envoyez-la à votre client
              par email, Notion, ou dans votre devis.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Suivez les révisions</h3>
            <p>
              Votre client soumet ses retours via la page dédiée.
              Vous visualisez tout depuis votre tableau de bord.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="landing-cta-section">
        <h2>Commencez dès aujourd'hui</h2>
        <p>
          Fini les révisions illimitées non facturées.
          My Revisio pose un cadre clair, dès le premier projet.
        </p>
        <Link href="/auth/register" className="btn-cta-dark">
          Créer mon compte gratuit →
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 My Revisio · Fait pour les freelances créatifs</p>
      </footer>
    </>
  )
}
