'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Início' },
  { href: '/association', label: 'A Associação' },
  { href: '/karate', label: 'Karate' },
  { href: '/classes', label: 'Aulas' },
  { href: '/instructors', label: 'Instrutores' },
  { href: '/gallery', label: 'Galeria' },
  { href: '/news', label: 'Notícias' },
  { href: '/contact', label: 'Contactos' },
  { href: '/inscriptions', label: 'Inscrever' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={[open ? 'nav-open' : '', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')}>
      <div className="nav">
        {/* Brand */}
        <Link href="/" className="brand" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid rgba(201,21,30,0.5)',
            flexShrink: 0,
            boxShadow: '0 0 14px rgba(201,21,30,0.18)',
          }}>
            <img
              src="/assets/logo-assoc.png"
              alt="Logo Associação Shotokan"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1>Associação Shotokan</h1>
            <span>Beira Interior</span>
          </div>
        </Link>

        {/* Hamburger toggle — visible on mobile */}
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation links */}
        <nav className="nav-links" aria-label="Navegação principal">
          <ul>
            {links.map((link) => {
              const active = pathname === link.href;
              const isInscrever = link.href === '/inscriptions';
              return (
                <li key={link.href}>
                  <Link
                    className={[
                      active && !isInscrever ? 'is-active' : '',
                      isInscrever ? 'btn primary' : '',
                    ].filter(Boolean).join(' ')}
                    href={link.href}
                    style={isInscrever ? { fontSize: '0.66rem', padding: '8px 14px', marginLeft: 4 } : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
