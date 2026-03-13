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
              <img src="/assets/logo.svg" alt="Associação Shotokan" />
              <div className="footer-brand-name">Associação Shotokan</div>
              <p className="footer-brand-sub">
                Karate‑Do tradicional com foco em técnica, disciplina e crescimento pessoal. Para todas as idades e níveis.
              </p>
              <div className="gold-sep" style={{ marginTop: 4 }} />
              <p style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
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
              <p>📍 Rua do Dojo, 12 — Covilhã</p>
              <p>✉️ contacto@shotokan.pt</p>
              <p>📞 +351 900 000 000</p>
              <p>🕐 Seg–Sex · 18:00–22:00</p>
              <Link href="/inscriptions" style={{ marginTop: 10, color: 'rgba(241,194,50,0.75)', fontWeight: 500 }}>
                Inscrever agora →
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Associação Shotokan Karate‑Do</span>
            <span style={{ color: 'rgba(246,244,241,0.15)', letterSpacing: '0.2em' }}>空手道</span>
            <Link href="/platform/login" style={{ color: 'rgba(246,244,241,0.22)', textDecoration: 'none' }}>
              Área reservada
            </Link>
          </div>
        </footer>

        <AppEffects />
      </body>
    </html>
  );
}
