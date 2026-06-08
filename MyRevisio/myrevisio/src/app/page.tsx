'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroEmail, setHeroEmail] = useState('')
  const [footerEmail, setFooterEmail] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.lp .fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index)
  }

  const handleCTA = (email = '') => {
    const url = email ? `/auth/register?email=${encodeURIComponent(email)}` : '/auth/register'
    window.location.href = url
  }

  const faqItems = [
    {
      q: 'Mon client doit créer un compte ?',
      a: 'Non. Ton client reçoit un lien unique. Il clique, il voit son espace projet, il soumet son retour. Aucune inscription, aucun mot de passe. Ça marche sur mobile et desktop.',
    },
    {
      q: 'Comment la facturation extra fonctionne-t-elle ?',
      a: 'Tu connectes ton compte Stripe (gratuit). Tu définis un prix par tour supplémentaire. Quand le quota est atteint, le client voit automatiquement un message et un bouton de paiement. Le virement arrive sur ton Stripe directement.',
    },
    {
      q: "C'est quoi la limite du plan gratuit ?",
      a: 'Le plan gratuit te donne 2 projets actifs simultanément. Quand un projet est clôturé, tu peux en ouvrir un nouveau. La facturation automatique des extras et le branding personnalisé sont réservés au plan Pro.',
    },
    {
      q: 'Mes données sont-elles en sécurité ?',
      a: "Tes projets et les retours clients sont stockés sur des serveurs européens. Aucune donnée n'est revendue à des tiers. Tu peux supprimer ton compte à tout moment.",
    },
    {
      q: 'Puis-je annuler à tout moment ?',
      a: "Oui. Tu gères ton abonnement depuis ton espace client sans passer par le support. Annulation en 1 clic, aucune question posée. Tu reviens sur le plan gratuit avec tes 2 projets actifs.",
    },
  ]

  return (
    <div className="lp">
      <style>{`
        .lp *, .lp *::before, .lp *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          --ink: #0f0e0d;
          --ink-soft: #4a4540;
          --ink-muted: #9a8f85;
          --paper: #faf8f5;
          --paper-warm: #f2ede6;
          --lp-accent: #e84c1e;
          --accent-soft: #fce9e3;
          --accent-dark: #c03a10;
          --lp-green: #1a6b3c;
          --green-soft: #e3f0e9;
          --lp-border: rgba(15,14,13,0.1);
          --border-strong: rgba(15,14,13,0.2);
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'DM Sans', system-ui, sans-serif;
          --r: 10px;
          font-family: var(--sans);
          background: var(--paper);
          color: var(--ink);
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* NAV */
        .lp-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,248,245,0.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--lp-border);
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 60px;
        }
        .lp-nav-logo {
          font-family: var(--serif);
          font-size: 1.2rem;
          color: var(--ink);
          text-decoration: none;
          display: flex; align-items: center; gap: 8px;
        }
        .lp-nav-logo span {
          display: inline-block;
          width: 8px; height: 8px;
          background: var(--lp-accent);
          border-radius: 50%;
        }
        .lp-nav-links { display: flex; align-items: center; gap: 1.5rem; }
        .lp-nav-links a {
          font-size: 0.875rem;
          color: var(--ink-soft);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-nav-links a:hover { color: var(--ink); }
        .lp-btn-nav {
          background: var(--ink);
          color: var(--paper) !important;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          font-size: 0.8rem !important;
          font-weight: 500;
          transition: background 0.2s, transform 0.15s !important;
        }
        .lp-btn-nav:hover { background: var(--lp-accent) !important; transform: translateY(-1px); }
        .lp-hamburger {
          display: none;
          background: none;
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          color: var(--ink);
          font-size: 1.1rem;
          line-height: 1;
          padding: 0.3rem 0.55rem;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .lp-hamburger:hover { border-color: var(--ink); }
        .lp-mobile-menu {
          position: absolute;
          top: 60px;
          left: 0; right: 0;
          background: rgba(250,248,245,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-strong);
          display: flex;
          flex-direction: column;
          z-index: 99;
        }
        .lp-mobile-menu a {
          padding: 0.9rem 1rem;
          font-size: 0.95rem;
          color: var(--ink-soft);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s, background 0.15s;
        }
        .lp-mobile-menu a:last-child { border-bottom: none; }
        .lp-mobile-menu a:hover { color: var(--ink); background: var(--paper-warm); }
        .lp-mobile-menu-cta {
          margin: 0.75rem 1rem 1rem;
          padding: 0.8rem 1rem !important;
          background: var(--ink) !important;
          color: var(--paper) !important;
          border-radius: 10px;
          text-align: center;
          font-weight: 500;
          font-size: 0.9rem !important;
          border-bottom: none !important;
          transition: background 0.2s !important;
        }
        .lp-mobile-menu-cta:hover { background: var(--lp-accent) !important; }
        @media (min-width: 769px) { .lp-mobile-menu { display: none; } }

        /* HERO */
        .lp-hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .lp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--accent-soft);
          color: var(--accent-dark);
          font-size: 0.78rem; font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }
        .lp-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--lp-accent);
          border-radius: 50%;
          animation: lp-pulse 1.8s ease infinite;
        }
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .lp h1 {
          font-family: var(--serif);
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.1;
          color: var(--ink);
          margin-bottom: 1.25rem;
        }
        .lp h1 em {
          font-style: italic;
          color: var(--lp-accent);
        }

        .lp-hero-sub {
          font-size: 1.05rem;
          color: var(--ink-soft);
          margin-bottom: 2rem;
          line-height: 1.7;
          max-width: 440px;
        }

        .lp-cta-group { display: flex; flex-direction: column; gap: 0.75rem; }
        .lp-email-form { display: flex; gap: 8px; }
        .lp-email-form input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1.5px solid var(--border-strong);
          border-radius: var(--r);
          font-family: var(--sans);
          font-size: 0.9rem;
          background: white;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s;
        }
        .lp-email-form input:focus { border-color: var(--lp-accent); }
        .lp-email-form input::placeholder { color: var(--ink-muted); }

        .lp-btn-primary {
          background: var(--lp-accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--r);
          font-family: var(--sans);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .lp-btn-primary:hover { background: var(--accent-dark); transform: translateY(-1px); }

        .lp-cta-note {
          font-size: 0.78rem;
          color: var(--ink-muted);
          display: flex; align-items: center; gap: 6px;
        }
        .lp-cta-note::before { content: '✓'; color: var(--lp-green); font-weight: 700; }

        /* HERO VISUAL */
        .lp-hero-visual { position: relative; }
        .lp-mockup-card {
          background: white;
          border: 1.5px solid var(--border-strong);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 60px rgba(15,14,13,0.08), 0 4px 12px rgba(15,14,13,0.04);
          position: relative;
          animation: lp-floatCard 4s ease-in-out infinite;
        }
        @keyframes lp-floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .lp-mockup-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .lp-mockup-title { font-size: 0.8rem; font-weight: 600; color: var(--ink); }
        .lp-mockup-tag {
          font-size: 0.7rem; font-weight: 600;
          padding: 3px 8px; border-radius: 999px;
          background: var(--green-soft); color: var(--lp-green);
        }
        .lp-mockup-project {
          font-family: var(--serif);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--ink);
        }
        .lp-mockup-client { font-size: 0.8rem; color: var(--ink-muted); margin-bottom: 1.25rem; }

        .lp-revision-bar-wrap { margin-bottom: 0.75rem; }
        .lp-revision-bar-label {
          display: flex; justify-content: space-between;
          font-size: 0.78rem; color: var(--ink-soft);
          margin-bottom: 6px;
        }
        .lp-revision-bar-label span:last-child { font-weight: 600; color: var(--lp-accent); }
        .lp-revision-bar {
          height: 8px;
          background: var(--paper-warm);
          border-radius: 999px;
          overflow: hidden;
        }
        .lp-revision-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--lp-accent) 0%, #ff7043 100%);
          animation: lp-fillBar 2s ease forwards;
          width: var(--fill);
        }
        @keyframes lp-fillBar { from { width: 0; } to { width: var(--fill); } }

        .lp-mockup-divider { height: 1px; background: var(--lp-border); margin: 1rem 0; }

        .lp-mockup-feedback-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 0.65rem 0;
          border-bottom: 1px solid var(--lp-border);
        }
        .lp-mockup-feedback-item:last-child { border-bottom: none; }
        .lp-fb-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 700;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .lp-fb-dot-1 { background: #e8f0fb; color: #185FA5; }
        .lp-fb-dot-2 { background: #faeeda; color: #854F0B; }
        .lp-fb-dot-3 { background: #fce9e3; color: var(--accent-dark); }
        .lp-fb-text { font-size: 0.78rem; color: var(--ink-soft); line-height: 1.4; }
        .lp-fb-num { font-size: 0.68rem; color: var(--ink-muted); margin-top: 2px; }

        .lp-mockup-alert {
          margin-top: 1rem;
          background: var(--accent-soft);
          border: 1px solid rgba(232,76,30,0.2);
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          display: flex; align-items: center; gap: 8px;
          font-size: 0.78rem; color: var(--accent-dark);
          font-weight: 500;
        }
        .lp-mockup-alert::before { content: '⚠️'; font-size: 0.85rem; }

        .lp-float-badge {
          position: absolute;
          background: white;
          border: 1.5px solid var(--border-strong);
          border-radius: 10px;
          padding: 0.5rem 0.85rem;
          font-size: 0.75rem; font-weight: 600;
          box-shadow: 0 8px 24px rgba(15,14,13,0.1);
          white-space: nowrap;
        }
        .lp-float-badge-1 {
          top: -16px; right: -12px;
          color: var(--lp-green); background: var(--green-soft);
          border-color: rgba(26,107,60,0.2);
          animation: lp-floatBadge1 3s ease-in-out infinite;
        }
        .lp-float-badge-2 {
          bottom: -14px; left: -16px;
          animation: lp-floatBadge2 3.5s ease-in-out infinite;
        }
        @keyframes lp-floatBadge1 {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes lp-floatBadge2 {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
        }

        /* QUOTES STRIP */
        .lp-quotes-strip {
          background: var(--ink);
          padding: 1rem 0;
          overflow: hidden;
          position: relative;
        }
        .lp-quotes-scroll {
          display: flex;
          gap: 3rem;
          animation: lp-scrollLeft 28s linear infinite;
          width: max-content;
        }
        @keyframes lp-scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .lp-quote-item {
          font-size: 0.8rem;
          color: rgba(250,248,245,0.6);
          white-space: nowrap;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .lp-quote-item strong { color: rgba(250,248,245,0.9); }
        .lp-quote-sep { color: rgba(250,248,245,0.2); font-size: 1rem; }

        /* SOCIAL PROOF */
        .lp-social-proof {
          border-top: 1px solid var(--lp-border);
          padding: 3rem 2rem;
          display: flex; justify-content: center; gap: 3rem;
          flex-wrap: wrap;
          background: white;
        }
        .lp-proof-item { text-align: center; }
        .lp-proof-num {
          font-family: var(--serif);
          font-size: 2rem;
          color: var(--ink);
          display: block;
        }
        .lp-proof-label { font-size: 0.8rem; color: var(--ink-muted); }

        /* SECTIONS */
        .lp-section { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
        .lp-section-label {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--lp-accent);
          margin-bottom: 0.75rem;
        }
        .lp h2 {
          font-family: var(--serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .lp-section-sub {
          font-size: 1rem; color: var(--ink-soft);
          max-width: 560px; line-height: 1.7;
          margin-bottom: 3rem;
        }

        /* STEPS */
        .lp-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .lp-step {
          background: white;
          border: 1.5px solid var(--lp-border);
          border-radius: 16px;
          padding: 1.75rem;
          position: relative;
          transition: border-color 0.2s, transform 0.2s;
        }
        .lp-step:hover { border-color: var(--border-strong); transform: translateY(-3px); }
        .lp-step-num {
          font-family: var(--serif);
          font-size: 3rem;
          color: var(--border-strong);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .lp-step-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .lp-step h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--ink); }
        .lp-step p { font-size: 0.85rem; color: var(--ink-soft); line-height: 1.6; }

        /* PAIN */
        .lp-pain-section {
          background: var(--paper-warm);
          border-top: 1px solid var(--lp-border);
          border-bottom: 1px solid var(--lp-border);
        }
        .lp-pain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .lp-pain-list { display: flex; flex-direction: column; gap: 1rem; }
        .lp-pain-item {
          display: flex; gap: 12px;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          border: 1.5px solid var(--lp-border);
          background: white;
          transition: transform 0.2s;
        }
        .lp-pain-item:hover { transform: translateX(4px); }
        .lp-pain-emoji { font-size: 1.25rem; flex-shrink: 0; margin-top: 2px; }
        .lp-pain-text { font-size: 0.88rem; color: var(--ink-soft); line-height: 1.5; }
        .lp-pain-text strong { color: var(--ink); display: block; margin-bottom: 2px; font-size: 0.9rem; }

        /* FEATURES */
        .lp-features-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
        .lp-feature-card {
          border: 1.5px solid var(--lp-border);
          border-radius: 16px;
          padding: 1.5rem;
          background: white;
          transition: border-color 0.2s, transform 0.2s;
        }
        .lp-feature-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
        .lp-feature-card.lp-featured {
          border-color: var(--lp-accent);
          background: var(--accent-soft);
        }
        .lp-feature-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .lp-feature-card h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--ink); }
        .lp-feature-card p { font-size: 0.83rem; color: var(--ink-soft); line-height: 1.6; }

        /* PRICING */
        .lp-pricing-section { background: var(--ink); }
        .lp-pricing-section .lp-section-label { color: var(--lp-accent); }
        .lp-pricing-section h2 { color: var(--paper); }
        .lp-pricing-section .lp-section-sub { color: rgba(250,248,245,0.6); }

        .lp-pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; max-width: 700px; }
        .lp-price-card {
          border: 1.5px solid rgba(250,248,245,0.12);
          border-radius: 16px;
          padding: 1.75rem;
          background: rgba(250,248,245,0.05);
        }
        .lp-price-card.lp-highlighted {
          border-color: var(--lp-accent);
          background: rgba(232,76,30,0.08);
          position: relative;
        }
        .lp-price-card.lp-highlighted::before {
          content: 'Recommandé';
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: var(--lp-accent);
          color: white;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em;
          padding: 3px 12px; border-radius: 999px;
          text-transform: uppercase;
        }
        .lp-price-label { font-size: 0.8rem; color: rgba(250,248,245,0.5); margin-bottom: 0.5rem; }
        .lp-price-amount {
          font-family: var(--serif);
          font-size: 2.5rem;
          color: var(--paper);
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        .lp-price-amount span { font-size: 1rem; font-family: var(--sans); color: rgba(250,248,245,0.5); }
        .lp-price-desc { font-size: 0.8rem; color: rgba(250,248,245,0.5); margin-bottom: 1.25rem; }
        .lp-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .lp-price-features li {
          font-size: 0.83rem;
          color: rgba(250,248,245,0.75);
          display: flex; align-items: center; gap: 8px;
        }
        .lp-price-features li::before { content: '✓'; color: var(--lp-accent); font-weight: 700; flex-shrink: 0; }
        .lp-price-features li.lp-muted { color: rgba(250,248,245,0.3); }
        .lp-price-features li.lp-muted::before { content: '–'; color: rgba(250,248,245,0.2); }

        .lp-btn-white {
          display: block; width: 100%; text-align: center;
          padding: 0.75rem;
          border-radius: var(--r);
          font-size: 0.88rem; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: transform 0.15s, opacity 0.2s;
          background: rgba(250,248,245,0.1);
          color: var(--paper);
          border: 1.5px solid rgba(250,248,245,0.15);
        }
        .lp-btn-white:hover { transform: translateY(-1px); opacity: 0.85; }
        .lp-btn-accent {
          background: var(--lp-accent);
          color: white;
          border-color: var(--lp-accent);
        }
        .lp-btn-accent:hover { background: var(--accent-dark); opacity: 1; }

        /* TESTIMONIALS */
        .lp-testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
        .lp-testimonial {
          background: white;
          border: 1.5px solid var(--lp-border);
          border-radius: 16px;
          padding: 1.5rem;
          transition: transform 0.2s;
        }
        .lp-testimonial:hover { transform: translateY(-3px); }
        .lp-testimonial-quote {
          font-family: var(--serif);
          font-size: 1.05rem;
          font-style: italic;
          color: var(--ink);
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        .lp-testimonial-author { display: flex; align-items: center; gap: 10px; }
        .lp-author-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 700;
          flex-shrink: 0;
        }
        .lp-av-1 { background: #e8f0fb; color: #185FA5; }
        .lp-av-2 { background: #faeeda; color: #854F0B; }
        .lp-av-3 { background: var(--green-soft); color: var(--lp-green); }
        .lp-author-name { font-size: 0.83rem; font-weight: 600; color: var(--ink); }
        .lp-author-role { font-size: 0.75rem; color: var(--ink-muted); }

        /* FAQ */
        .lp-faq-list { display: flex; flex-direction: column; gap: 0; max-width: 720px; }
        .lp-faq-item { border-bottom: 1px solid var(--lp-border); padding: 1.25rem 0; }
        .lp-faq-q {
          font-size: 0.95rem; font-weight: 600; color: var(--ink);
          cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          gap: 1rem;
          user-select: none;
        }
        .lp-faq-chevron { font-size: 0.8rem; color: var(--ink-muted); transition: transform 0.2s; flex-shrink: 0; }
        .lp-faq-item.lp-open .lp-faq-chevron { transform: rotate(180deg); }
        .lp-faq-a {
          font-size: 0.88rem; color: var(--ink-soft);
          line-height: 1.7;
          max-height: 0; overflow: hidden;
          transition: max-height 0.3s ease, padding-top 0.2s;
        }
        .lp-faq-item.lp-open .lp-faq-a { max-height: 200px; padding-top: 0.75rem; }

        /* CTA FINAL */
        .lp-cta-final {
          background: var(--paper-warm);
          border-top: 1px solid var(--lp-border);
          text-align: center;
          padding: 6rem 2rem;
        }
        .lp-cta-final h2 { margin-bottom: 1rem; }
        .lp-cta-final p { color: var(--ink-soft); margin-bottom: 2rem; max-width: 480px; margin-left: auto; margin-right: auto; }
        .lp-cta-final .lp-email-form { max-width: 420px; margin: 0 auto 0.75rem; }

        /* FOOTER */
        .lp-footer {
          background: var(--ink);
          color: rgba(250,248,245,0.4);
          text-align: center;
          padding: 2rem;
          font-size: 0.78rem;
        }
        .lp-footer a { color: rgba(250,248,245,0.6); text-decoration: none; }
        .lp-footer a:hover { color: var(--paper); }

        /* ANIMATIONS */
        .lp .fade-up {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lp .fade-up.visible { opacity: 1; transform: none; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .lp-hero { grid-template-columns: 1fr; gap: 3rem; padding: 3rem 1.25rem; }
          .lp-hero-visual { order: -1; }
          .lp-steps { grid-template-columns: 1fr; }
          .lp-pain-grid { grid-template-columns: 1fr; gap: 2rem; }
          .lp-features-grid { grid-template-columns: 1fr; }
          .lp-pricing-grid { grid-template-columns: 1fr; }
          .lp-testimonials-grid { grid-template-columns: 1fr; }
          .lp-email-form { flex-direction: column; }
          .lp-social-proof { gap: 2rem; }
          .lp-nav { padding: 0 1rem; position: relative; }
          .lp-nav-links a { display: none; }
          .lp-hamburger { display: block; }
          .lp-section { padding: 3.5rem 1.25rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="lp-nav">
        <a href="#" className="lp-nav-logo"><span></span>My Revisio</a>
        <div className="lp-nav-links">
          <a href="#fonctionnement">Comment ça marche</a>
          <a href="#tarifs">Tarifs</a>
          <a href="/blog">Blog</a>
          <a href="#tarifs" className="lp-btn-nav">Commencer gratuitement</a>
          <button
            className="lp-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="lp-mobile-menu">
            <a href="#fonctionnement" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
            <a href="#tarifs" onClick={() => setMenuOpen(false)}>Tarifs</a>
            <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
            <a href="#tarifs" className="lp-mobile-menu-cta" onClick={() => setMenuOpen(false)}>Commencer gratuitement</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section>
        <div className="lp-hero">
          <div className="lp-hero-content">
            <div className="lp-badge">Outil pour freelances créatifs</div>
            <h1>Ton client vient de demander sa 7ème révision.<br /><em>T&apos;en avais inclus 2.</em></h1>
            <p className="lp-hero-sub">My Revisio suit automatiquement les tours de révision, montre le compteur à ton client, et lui envoie le lien de paiement quand il dépasse. Zéro discussion. Zéro email gêné.</p>
            <div className="lp-cta-group">
              <div className="lp-email-form">
                <input type="email" placeholder="ton@email.com" value={heroEmail} onChange={e => setHeroEmail(e.target.value)} />
                <button className="lp-btn-primary" onClick={() => handleCTA(heroEmail)}>Essayer gratuitement</button>
              </div>
              <div className="lp-cta-note">Gratuit pour 2 projets actifs · Aucune CB requise · Annulation en 1 clic</div>
            </div>
          </div>
          <div className="lp-hero-visual">
            <div className="lp-float-badge lp-float-badge-1">✓ Tour supplémentaire facturé</div>
            <div className="lp-mockup-card">
              <div className="lp-mockup-header">
                <span className="lp-mockup-title">Identité visuelle — TechStart</span>
                <span className="lp-mockup-tag">Actif</span>
              </div>
              <div className="lp-mockup-project">Refonte logo + charte</div>
              <div className="lp-mockup-client">Client : Marie Dubois · Lien envoyé il y a 3 jours</div>
              <div className="lp-revision-bar-wrap">
                <div className="lp-revision-bar-label">
                  <span>Révisions incluses</span>
                  <span>3 / 3 utilisées</span>
                </div>
                <div className="lp-revision-bar">
                  <div className="lp-revision-bar-fill" style={{'--fill': '100%'} as React.CSSProperties}></div>
                </div>
              </div>
              <div className="lp-mockup-divider"></div>
              <div className="lp-mockup-feedback-item">
                <div className="lp-fb-dot lp-fb-dot-1">MD</div>
                <div>
                  <div className="lp-fb-text">Révision 1 — &quot;Peut-on essayer en bleu marine ?&quot;</div>
                  <div className="lp-fb-num">Tour 1 · il y a 8 jours</div>
                </div>
              </div>
              <div className="lp-mockup-feedback-item">
                <div className="lp-fb-dot lp-fb-dot-2">MD</div>
                <div>
                  <div className="lp-fb-text">Révision 2 — &quot;Super ! On peut changer la typo ?&quot;</div>
                  <div className="lp-fb-num">Tour 2 · il y a 5 jours</div>
                </div>
              </div>
              <div className="lp-mockup-feedback-item">
                <div className="lp-fb-dot lp-fb-dot-3">MD</div>
                <div>
                  <div className="lp-fb-text">Révision 3 — &quot;En fait on repart sur le concept initial&quot;</div>
                  <div className="lp-fb-num">Tour 3 · il y a 2 jours</div>
                </div>
              </div>
              <div className="lp-mockup-alert">
                Quota atteint — Tour supplémentaire : 80 € · Lien de paiement envoyé automatiquement
              </div>
            </div>
            <div className="lp-float-badge lp-float-badge-2">80 € encaissés automatiquement 💸</div>
          </div>
        </div>
      </section>

      {/* QUOTES STRIP */}
      <div className="lp-quotes-strip">
        <div className="lp-quotes-scroll">
          <div className="lp-quote-item"><strong>&quot;J&apos;ai sûrement perdu 5 000 € cette année</strong> juste en révisions oubliées&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Mon client vient de demander sa 9ème révision.</strong> J&apos;en avais inclus 2.&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Je me sens trop mal pour facturer extra</strong> parce que je n&apos;avais pas de preuve&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Juste une petite modif de rien du tout&quot;</strong> — mon client, pour la 6ème fois</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Je passe 2h par semaine</strong> à écrire des emails &apos;c&apos;était une révision sup&apos;&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;J&apos;ai sûrement perdu 5 000 € cette année</strong> juste en révisions oubliées&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Mon client vient de demander sa 9ème révision.</strong> J&apos;en avais inclus 2.&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Je me sens trop mal pour facturer extra</strong> parce que je n&apos;avais pas de preuve&quot;</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Juste une petite modif de rien du tout&quot;</strong> — mon client, pour la 6ème fois</div><span className="lp-quote-sep">·</span>
          <div className="lp-quote-item"><strong>&quot;Je passe 2h par semaine</strong> à écrire des emails &apos;c&apos;était une révision sup&apos;&quot;</div><span className="lp-quote-sep">·</span>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="lp-social-proof">
        <div className="lp-proof-item">
          <span className="lp-proof-num">2 min</span>
          <span className="lp-proof-label">pour créer et partager un projet</span>
        </div>
        <div className="lp-proof-item">
          <span className="lp-proof-num">0</span>
          <span className="lp-proof-label">login requis pour ton client</span>
        </div>
        <div className="lp-proof-item">
          <span className="lp-proof-num">100%</span>
          <span className="lp-proof-label">automatique — tu n&apos;as rien à faire</span>
        </div>
        <div className="lp-proof-item">
          <span className="lp-proof-num">Gratuit</span>
          <span className="lp-proof-label">pour 2 projets actifs</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="fonctionnement" style={{background: 'white', borderTop: '1px solid rgba(15,14,13,0.1)'}}>
        <div className="lp-section">
          <div className="lp-section-label">Comment ça marche</div>
          <h2>3 étapes. Moins de 2 minutes.</h2>
          <p className="lp-section-sub">Pas d&apos;onboarding compliqué. Pas de formation pour ton client. Tu crées, tu envoies, ça tourne tout seul.</p>
          <div className="lp-steps">
            <div className="lp-step fade-up">
              <div className="lp-step-num">01</div>
              <div className="lp-step-icon">📋</div>
              <h3>Tu crées le projet</h3>
              <p>Nom du client, nombre de révisions incluses, prix du tour supplémentaire. 60 secondes chrono.</p>
            </div>
            <div className="lp-step fade-up" style={{transitionDelay: '0.1s'}}>
              <div className="lp-step-num">02</div>
              <div className="lp-step-icon">🔗</div>
              <h3>Tu partages le lien</h3>
              <p>My Revisio génère une URL unique. Ton client clique, voit son compteur de révisions, soumet son retour. Sans créer de compte.</p>
            </div>
            <div className="lp-step fade-up" style={{transitionDelay: '0.2s'}}>
              <div className="lp-step-num">03</div>
              <div className="lp-step-icon">⚡</div>
              <h3>Le reste est automatique</h3>
              <p>Quota atteint → ton client voit le message et le lien de paiement. Toi tu reçois une notif. Aucun email gêné à écrire.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAIN SECTION */}
      <div className="lp-pain-section">
        <div className="lp-section">
          <div className="lp-pain-grid">
            <div>
              <div className="lp-section-label">Tu te reconnais ?</div>
              <h2>Le scope creep coûte vrai argent.</h2>
              <p className="lp-section-sub" style={{marginBottom: 0}}>Ces situations arrivent à tous les freelances créatifs. Tous les mois. My Revisio les élimine une par une.</p>
            </div>
            <div className="lp-pain-list">
              <div className="lp-pain-item fade-up">
                <div className="lp-pain-emoji">😤</div>
                <div className="lp-pain-text">
                  <strong>Tu n&apos;oses pas facturer</strong>
                  Parce que tu n&apos;as aucune preuve que t&apos;étais à la 3ème révision et pas à la 2ème.
                </div>
              </div>
              <div className="lp-pain-item fade-up" style={{transitionDelay: '0.05s'}}>
                <div className="lp-pain-emoji">🙈</div>
                <div className="lp-pain-text">
                  <strong>Ton client &quot;ne savait pas&quot;</strong>
                  Ton contrat mentionnait 2 révisions. Lui n&apos;avait pas lu le contrat. La discussion recommence.
                </div>
              </div>
              <div className="lp-pain-item fade-up" style={{transitionDelay: '0.1s'}}>
                <div className="lp-pain-emoji">📧</div>
                <div className="lp-pain-text">
                  <strong>Tu passes des heures à écrire des emails</strong>
                  &quot;Cette demande dépasse le scope initial, je dois donc…&quot; — tu l&apos;as écrit 50 fois cette année.
                </div>
              </div>
              <div className="lp-pain-item fade-up" style={{transitionDelay: '0.15s'}}>
                <div className="lp-pain-emoji">💸</div>
                <div className="lp-pain-text">
                  <strong>Tu travailles pour rien</strong>
                  Un logo devient une charte complète. Une révision devient une refonte. Tu finis le mois à -0 €.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{borderTop: '1px solid rgba(15,14,13,0.1)'}}>
        <div className="lp-section">
          <div className="lp-section-label">Ce que tu obtiens</div>
          <h2>Tout ce qu&apos;il faut.<br />Rien de superflu.</h2>
          <p className="lp-section-sub">My Revisio est volontairement simple. Un seul problème résolu, parfaitement.</p>
          <div className="lp-features-grid">
            <div className="lp-feature-card lp-featured fade-up">
              <div className="lp-feature-icon">🔢</div>
              <h3>Compteur visible en temps réel</h3>
              <p>Ton client voit combien de tours il lui reste à chaque fois qu&apos;il ouvre le lien. Transparent, sans ambiguïté, sans discussion.</p>
            </div>
            <div className="lp-feature-card fade-up" style={{transitionDelay: '0.05s'}}>
              <div className="lp-feature-icon">🔗</div>
              <h3>Lien client sans login</h3>
              <p>Ton client n&apos;a pas besoin de créer de compte. Il clique sur le lien, il voit son espace projet, il soumet son retour. C&apos;est tout.</p>
            </div>
            <div className="lp-feature-card fade-up" style={{transitionDelay: '0.1s'}}>
              <div className="lp-feature-icon">💳</div>
              <h3>Facturation extra automatique</h3>
              <p>Tu définis le prix du tour supplémentaire. Quand le quota est atteint, le lien de paiement Stripe s&apos;affiche automatiquement côté client.</p>
            </div>
            <div className="lp-feature-card fade-up" style={{transitionDelay: '0.15s'}}>
              <div className="lp-feature-icon">🔔</div>
              <h3>Alertes email instantanées</h3>
              <p>Tu sais immédiatement quand un client soumet un retour ou dépasse son quota. Pas besoin d&apos;aller vérifier.</p>
            </div>
            <div className="lp-feature-card fade-up" style={{transitionDelay: '0.2s'}}>
              <div className="lp-feature-icon">📁</div>
              <h3>Historique archivé</h3>
              <p>Chaque retour client est horodaté et sauvegardé. En cas de litige, tu as la preuve de ce qui a été demandé et quand.</p>
            </div>
            <div className="lp-feature-card fade-up" style={{transitionDelay: '0.25s'}}>
              <div className="lp-feature-icon">🎨</div>
              <h3>Branding personnalisé</h3>
              <p>Ajoute ton logo sur l&apos;espace client. Ton client voit ta marque, pas My Revisio. Professionnel, soigné, à ton image.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="lp-pricing-section">
        <div className="lp-section" id="tarifs">
          <div className="lp-section-label">Tarifs</div>
          <h2>Simple. Honnête.<br />Sans surprise.</h2>
          <p className="lp-section-sub">Un plan gratuit pour démarrer. Un plan pro pour ne plus jamais perdre un euro de révision.</p>
          <div className="lp-pricing-grid">
            <div className="lp-price-card">
              <div className="lp-price-label">Gratuit</div>
              <div className="lp-price-amount">0 €<span> / mois</span></div>
              <div className="lp-price-desc">Pour essayer sans risque</div>
              <ul className="lp-price-features">
                <li>2 projets actifs simultanés</li>
                <li>Compteur de révisions</li>
                <li>Lien client sans login</li>
                <li>Alertes email</li>
                <li className="lp-muted">Facturation automatique extra</li>
                <li className="lp-muted">Branding personnalisé</li>
                <li className="lp-muted">Historique archivé illimité</li>
              </ul>
              <a href="#" className="lp-btn-white" onClick={handleCTA}>Commencer gratuitement</a>
            </div>
            <div className="lp-price-card lp-highlighted">
              <div className="lp-price-label">Pro</div>
              <div className="lp-price-amount">12 €<span> / mois</span></div>
              <div className="lp-price-desc">Essai 14 jours · Annulation à tout moment</div>
              <ul className="lp-price-features">
                <li>Projets illimités</li>
                <li>Compteur de révisions</li>
                <li>Lien client sans login</li>
                <li>Alertes email instantanées</li>
                <li>Facturation automatique extra</li>
                <li>Branding personnalisé</li>
                <li>Historique archivé illimité</li>
              </ul>
              <a href="#" className="lp-btn-white lp-btn-accent" onClick={handleCTA}>Démarrer l&apos;essai gratuit</a>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{borderTop: '1px solid rgba(15,14,13,0.1)'}}>
        <div className="lp-section">
          <div className="lp-section-label">Ils l&apos;utilisent</div>
          <h2>Ce que disent les freelances</h2>
          <p className="lp-section-sub">Des retours authentiques de graphistes, motion designers et illustrateurs qui ont arrêté de perdre de l&apos;argent.</p>
          <div className="lp-testimonials-grid">
            <div className="lp-testimonial fade-up">
              <div className="lp-testimonial-quote">&quot;En un mois j&apos;ai facturé 3 tours supplémentaires qui avant passaient dans les pertes. 240 € récupérés. L&apos;abonnement est rentabilisé pour les 20 prochaines années.&quot;</div>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar lp-av-1">SC</div>
                <div>
                  <div className="lp-author-name">Sophie C.</div>
                  <div className="lp-author-role">Graphiste freelance, Lyon</div>
                </div>
              </div>
            </div>
            <div className="lp-testimonial fade-up" style={{transitionDelay: '0.1s'}}>
              <div className="lp-testimonial-quote">&quot;La meilleure partie ? Mes clients ne sont pas choqués. Ils voient le compteur, ils savent exactement où ils en sont. Plus de surprise, plus de discussion.&quot;</div>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar lp-av-2">TM</div>
                <div>
                  <div className="lp-author-name">Thomas M.</div>
                  <div className="lp-author-role">Motion designer, Paris</div>
                </div>
              </div>
            </div>
            <div className="lp-testimonial fade-up" style={{transitionDelay: '0.2s'}}>
              <div className="lp-testimonial-quote">&quot;J&apos;avais peur que ça crée des tensions avec mes clients. En fait c&apos;est l&apos;inverse. Le cadre est clair dès le départ, tout le monde est plus serein.&quot;</div>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar lp-av-3">AL</div>
                <div>
                  <div className="lp-author-name">Amandine L.</div>
                  <div className="lp-author-role">Illustratrice indépendante, Bordeaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{background: 'var(--paper-warm, #f2ede6)', borderTop: '1px solid rgba(15,14,13,0.1)'}}>
        <div className="lp-section">
          <div className="lp-section-label">Questions fréquentes</div>
          <h2>Ce que tu te demandes sûrement</h2>
          <div className="lp-faq-list" style={{marginTop: '2rem'}}>
            {faqItems.map((item, index) => (
              <div key={index} className={`lp-faq-item${openFaqIndex === index ? ' lp-open' : ''}`}>
                <div className="lp-faq-q" onClick={() => toggleFaq(index)}>
                  {item.q} <span className="lp-faq-chevron">▼</span>
                </div>
                <div className="lp-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="lp-cta-final">
        <div className="lp-section-label" style={{textAlign: 'center'}}>Prêt à arrêter de perdre de l&apos;argent ?</div>
        <h2>Commence aujourd&apos;hui.<br />Gratuit. Sans CB.</h2>
        <p>Rejoins les freelances créatifs qui ont arrêté d&apos;offrir des révisions gratuites sans le vouloir.</p>
        <div className="lp-email-form">
          <input type="email" placeholder="ton@email.com" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
          <button className="lp-btn-primary" onClick={() => handleCTA(footerEmail)}>Commencer →</button>
        </div>
        <div className="lp-cta-note" style={{justifyContent: 'center'}}>Gratuit pour 2 projets · Aucune CB requise · 14 jours d&apos;essai Pro offerts</div>
      </div>

      {/* FOOTER */}
      <footer className="lp-footer">
        <p>© 2026 My Revisio · <a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a> · <a href="#">Contact</a></p>
        <p style={{marginTop: '0.5rem', opacity: 0.5}}>Conçu pour les graphistes, motion designers et illustrateurs freelances.</p>
      </footer>
    </div>
  )
}
