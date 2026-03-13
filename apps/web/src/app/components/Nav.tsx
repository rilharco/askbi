'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

  return (
    <header className={open ? 'nav-open' : ''}>
      <div className="nav">
        <div className="brand">
          <img src="/assets/logo.svg" alt="Logo Associação Shotokan" />
          <div>
            <h1>Associação Shotokan</h1>
            <span>Beira Interior</span>
          </div>
        </div>
        <button className="nav-toggle" type="button" aria-label="Abrir menu" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <nav className="nav-links">
          <ul>
            {links.map((link) => {
              const active = pathname === link.href;
              const isInscrever = link.href === '/inscriptions';
              return (
                <li key={link.href}>
                  <Link
                    className={[
                      active ? 'is-active' : '',
                      isInscrever ? 'btn primary' : '',
                    ].filter(Boolean).join(' ')}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={isInscrever ? { fontSize: '0.62rem', padding: '7px 12px' } : undefined}
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
