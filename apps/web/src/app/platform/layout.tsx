'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ToastProvider } from '../components/Toast';

const AUTH_PATHS = ['/platform/login', '/platform/signup'];

/* ── SVG Icons ──────────────────────────────────────────────────── */
const Icon = {
  dashboard:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  clubes:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-6h6v6"/></svg>,
  atletas:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="5" r="2"/><path d="M9 19l1.5-7-2.5-3h8l-2.5 3L15 19M7 13l2-2M17 13l-2-2"/></svg>,
  treinadores:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  competicoes:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M8 21h8m-4-4v4M5 3H3v6c0 3.314 4.03 6 9 6s9-2.686 9-6V3h-2M5 3h14"/></svg>,
  arbitragem:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M12 3v18m-9-6l9-3 9 3M3 9l9 3 9-3"/></svg>,
  financeiro:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22"/></svg>,
  calendario:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  comunicacao:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  onboarding:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  logout:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  site:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  hamburger:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  close:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  chevronLeft:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M15 18l-6-6 6-6"/></svg>,
  chevronRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>,
};

type NavKey = keyof typeof Icon;

const NAV_ITEMS: { href: string; label: string; icon: NavKey; exact?: boolean; section: string }[] = [
  { href: '/platform',            label: 'Dashboard',    icon: 'dashboard',   exact: true, section: 'Geral' },
  { href: '/platform/clubes',     label: 'Clubes',       icon: 'clubes',      section: 'Módulos' },
  { href: '/platform/atletas',    label: 'Atletas',      icon: 'atletas',     section: 'Módulos' },
  { href: '/platform/treinadores',label: 'Treinadores',  icon: 'treinadores', section: 'Módulos' },
  { href: '/platform/competicoes',label: 'Competições',  icon: 'competicoes', section: 'Módulos' },
  { href: '/platform/arbitragem', label: 'Arbitragem',   icon: 'arbitragem',  section: 'Módulos' },
  { href: '/platform/financeiro', label: 'Financeiro',   icon: 'financeiro',  section: 'Gestão' },
  { href: '/platform/calendario', label: 'Calendário',   icon: 'calendario',  section: 'Gestão' },
  { href: '/platform/comunicacao',label: 'Comunicação',  icon: 'comunicacao', section: 'Gestão' },
  { href: '/platform/onboarding', label: 'Onboarding',   icon: 'onboarding',  section: 'Conta' },
];

const SIDEBAR_W  = 220;
const COLLAPSED_W = 60;

/* ── Sidebar content (shared between desktop & mobile) ──────────── */
function SidebarContent({
  collapsed,
  pathname,
  onClose,
}: {
  collapsed: boolean;
  pathname: string;
  onClose?: () => void;
}) {
  const sections = [...new Set(NAV_ITEMS.map(i => i.section))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: collapsed ? '20px 0' : '20px 16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        minHeight: 64,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
          border: '1.5px solid rgba(201,21,30,0.5)', flexShrink: 0,
          background: 'rgba(255,255,255,0.04)',
        }}>
          <img src="/assets/logo-assoc.png" alt="ASKBI" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', color: '#F6F4F1', textTransform: 'uppercase' }}>ASKBI</div>
            <div style={{ fontSize: '0.55rem', color: 'rgba(201,21,30,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Plataforma</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {sections.map(section => (
          <div key={section}>
            {!collapsed && (
              <div style={{
                fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(246,244,241,0.25)',
                padding: '10px 16px 4px',
              }}>
                {section}
              </div>
            )}
            {NAV_ITEMS.filter(i => i.section === section).map(item => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: collapsed ? 0 : 10,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    padding: collapsed ? '10px 0' : '9px 16px',
                    margin: '1px 6px', borderRadius: 7,
                    background: active ? 'rgba(201,21,30,0.15)' : 'transparent',
                    color: active ? '#F6F4F1' : 'rgba(246,244,241,0.5)',
                    textDecoration: 'none', fontSize: '0.78rem', fontWeight: active ? 600 : 400,
                    borderLeft: active ? '2px solid #C9151E' : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{Icon[item.icon]}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 6px' }}>
        <Link href="/platform/logout" onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '9px 0' : '9px 10px',
          borderRadius: 7, color: 'rgba(201,21,30,0.7)',
          textDecoration: 'none', fontSize: '0.78rem',
          transition: 'all 0.15s ease',
        }}
          title={collapsed ? 'Terminar sessão' : undefined}>
          {Icon.logout}
          {!collapsed && <span>Terminar sessão</span>}
        </Link>
        <Link href="/" onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '9px 0' : '9px 10px',
          borderRadius: 7, color: 'rgba(246,244,241,0.3)',
          textDecoration: 'none', fontSize: '0.75rem',
          transition: 'all 0.15s ease',
        }}
          title={collapsed ? 'Site público' : undefined}>
          {Icon.site}
          {!collapsed && <span>Site público</span>}
        </Link>
      </div>
    </div>
  );
}

/* ── Main Layout ────────────────────────────────────────────────── */
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (AUTH_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  const sidebarWidth = collapsed ? COLLAPSED_W : SIDEBAR_W;

  return (
    <ToastProvider>
      <div style={{ display: 'flex', height: '100dvh', background: '#080808', overflow: 'hidden' }}>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 40 }}
          />
        )}

        {/* Desktop Sidebar */}
        <aside style={{
          width: sidebarWidth, flexShrink: 0,
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transition: 'width 0.2s ease',
          overflow: 'hidden',
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
        }}
          className="pf-sidebar-desktop"
        >
          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              position: 'absolute', top: 20, right: -12, zIndex: 20,
              width: 24, height: 24, borderRadius: '50%',
              background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(246,244,241,0.5)',
              transition: 'all 0.15s ease',
            }}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {collapsed ? Icon.chevronRight : Icon.chevronLeft}
          </button>
          <SidebarContent collapsed={collapsed} pathname={pathname} />
        </aside>

        {/* Mobile Drawer */}
        <aside style={{
          position: 'fixed', left: 0, top: 0, bottom: 0,
          width: SIDEBAR_W,
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          zIndex: 50,
          transform: mobileOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
          transition: 'transform 0.25s ease',
        }}
          className="pf-sidebar-mobile"
        >
          <SidebarContent collapsed={false} pathname={pathname} onClose={() => setMobileOpen(false)} />
        </aside>

        {/* Main area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Top bar */}
          <header style={{
            height: 56, flexShrink: 0,
            background: 'rgba(8,8,8,0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '0 20px',
            backdropFilter: 'blur(8px)',
            position: 'sticky', top: 0, zIndex: 30,
          }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 8,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', color: 'rgba(246,244,241,0.7)',
              }}
              className="pf-hamburger"
              aria-label="Menu"
            >
              {mobileOpen ? Icon.close : Icon.hamburger}
            </button>

            {/* Breadcrumb */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(246,244,241,0.35)', letterSpacing: '0.08em' }}>
                ASKBI
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(246,244,241,0.2)', margin: '0 6px' }}>/</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(246,244,241,0.65)', fontWeight: 500 }}>
                {NAV_ITEMS.find(i => i.exact ? pathname === i.href : pathname.startsWith(i.href))?.label ?? 'Plataforma'}
              </span>
            </div>

            {/* Season badge */}
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
              color: 'rgba(212,168,67,0.8)', border: '1px solid rgba(212,168,67,0.2)',
              borderRadius: 4, padding: '3px 8px', textTransform: 'uppercase',
            }}>
              Época 2025
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .pf-sidebar-desktop { display: none !important; }
          .pf-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .pf-sidebar-mobile { display: none !important; }
        }
      `}</style>
    </ToastProvider>
  );
}
