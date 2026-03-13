'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AUTH_PATHS = ['/platform/login', '/platform/signup'];

const navItems = [
  { href: '/platform', label: 'Dashboard', icon: '◉', exact: true, section: 'Geral' },
  { href: '/platform/flows', label: 'Automação', icon: '⚡', section: 'Ferramentas' },
  { href: '/platform/templates', label: 'Templates', icon: '📄', section: 'Ferramentas' },
  { href: '/platform/onboarding', label: 'Onboarding', icon: '✦', section: 'Conta' },
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Auth pages render full-screen without sidebar
  if (AUTH_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  const sections = [...new Set(navItems.map((i) => i.section))];

  return (
    <div className="pf-shell">
      {/* Sidebar */}
      <aside className="pf-sidebar">
        <div className="pf-sidebar-logo">
          <img src="/assets/logo.svg" alt="ASKBI" />
          <div className="pf-sidebar-brand">
            <div className="pf-sidebar-title">ASKBI</div>
            <div className="pf-sidebar-sub">Plataforma</div>
          </div>
        </div>

        <nav className="pf-nav">
          {sections.map((section) => (
            <div key={section}>
              <div className="pf-nav-section">{section}</div>
              {navItems
                .filter((i) => i.section === section)
                .map((item) => {
                  const active = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`pf-nav-item${active ? ' pf-nav-active' : ''}`}
                    >
                      <span className="pf-nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="pf-sidebar-footer">
          <Link href="/platform/logout" className="pf-nav-item pf-logout">
            <span className="pf-nav-icon">↩</span>
            <span>Terminar sessão</span>
          </Link>
          <Link href="/" className="pf-nav-item" style={{ opacity: 0.4, fontSize: '0.66rem' }}>
            <span className="pf-nav-icon">←</span>
            <span>Site público</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="pf-main">
        {children}
      </main>
    </div>
  );
}
