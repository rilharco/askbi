import './globals.css';
import Nav from './components/Nav';
import AppEffects from './components/AppEffects';
import IntroScreen from './components/IntroScreen';
import Cursor from './components/Cursor';
import Link from 'next/link';

export const metadata = {
  title: 'Associação Shotokan',
  description: 'Site oficial da Associação Shotokan Karate‑Do — Beira Interior'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {/* Scroll progress bar */}
        <div id="scroll-progress" />

        {/* Film grain overlay */}
        <div className="grain" aria-hidden="true" />

        {/* Intro animation (shows once per session) */}
        <IntroScreen />

        {/* Custom cursor (desktop only) */}
        <Cursor />

        <Nav />
        <main>{children}</main>

        <footer>
          <div className="footer-content">
            <div className="footer-brand">
              <img
                src="/assets/logo-assoc.png"
                alt="Associação Shotokan"
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(201,21,30,0.35)' }}
              />
              <div className="footer-brand-name">ASKBI</div>
              <p className="footer-brand-sub">
                Karate‑Do tradicional com foco em técnica, disciplina e crescimento pessoal. Para todas as idades e níveis.
              </p>
              <div className="gold-sep" style={{ marginTop: 4 }} />
              <p style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Beira Interior · Portugal
              </p>
            </div>

            <div className="footer-col">
              <h4>Associação</h4>
              <Link href="/">Início</Link>
              <Link href="/association">A Associação</Link>
              <Link href="/karate">Karate‑Do</Link>
              <Link href="/classes">Aulas e Horários</Link>
              <Link href="/instructors">Instrutores</Link>
              <Link href="/gallery">Galeria</Link>
              <Link href="/news">Notícias</Link>
            </div>

            <div className="footer-col">
              <h4>Contacto</h4>
              <p>
                <span className="footer-col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </span>
                Rua do Dojo, 12 — Covilhã
              </p>
              <p>
                <span className="footer-col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                contacto@shotokan.pt
              </p>
              <p>
                <span className="footer-col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                +351 900 000 000
              </p>
              <p>
                <span className="footer-col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3.5 3.5"/>
                  </svg>
                </span>
                Seg–Sex · 18:00–22:00
              </p>
              <Link href="/inscriptions" style={{ marginTop: 10, color: 'rgba(212,168,67,0.72)', fontWeight: 500, gap: 0 }}>
                Inscrever agora
              </Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Associação Shotokan Karate‑Do da Beira Interior</span>
            <span style={{ color: 'rgba(246,244,241,0.12)', letterSpacing: '0.2em' }}>空手道</span>
            <Link href="/platform/login" style={{ color: 'rgba(246,244,241,0.2)', textDecoration: 'none' }}>
              Área reservada
            </Link>
          </div>
        </footer>

        <AppEffects />
      </body>
    </html>
  );
}
