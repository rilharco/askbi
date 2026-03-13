'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Me = { id: string; email: string; name?: string | null; onboardingComplete: boolean };

const MEMBERS = [
  { initials: 'JS', name: 'João Silva', rank: 'Shodan', pct: 100, color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)' },
  { initials: 'ML', name: 'Maria Lopes', rank: '3º Kyu', pct: 72, color: '#7c4a1c' },
  { initials: 'PM', name: 'Pedro Martins', rank: '5º Kyu', pct: 50, color: '#2a9d4c' },
  { initials: 'AF', name: 'Ana Ferreira', rank: '7º Kyu', pct: 28, color: '#f08020' },
  { initials: 'RC', name: 'Rui Costa', rank: '9º Kyu', pct: 10, color: '#e8e8e8' },
];

const EXAMS = [
  { name: 'Exame de Kyus — Avançados', date: '28 Abr 2025', status: 'Confirmado', gold: true },
  { name: 'Exame infantil', date: '10 Mai 2025', status: 'Confirmado', gold: true },
  { name: 'Exame de Dan — Shodan', date: '15 Jun 2025', status: 'A confirmar', gold: false },
];

export default function PlatformPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    apiFetch<Me>('/auth/me').then(setMe).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pf-loading">A carregar</div>;
  }

  if (!me) {
    return (
      <div className="pf-welcome">
        <h2>Bem‑vindo à Plataforma</h2>
        <p>Área interna de gestão da Associação Shotokan. Faz login para aceder ao dashboard, gerir membros e consultar graduações.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn primary" href="/platform/login">Entrar</Link>
          <Link className="btn" href="/platform/signup">Criar conta</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pf-header">
        <div className="pf-header-text">
          <div className="pf-header-title">
            Olá{me.name ? `, ${me.name.split(' ')[0]}` : ''} 👋
          </div>
          <div className="pf-header-sub">Dashboard · {new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </div>
        {!me.onboardingComplete && (
          <Link href="/platform/onboarding" className="btn primary" style={{ fontSize: '0.68rem', padding: '8px 14px' }}>
            Completar onboarding →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="pf-stats">
        <div className="pf-stat">
          <span className="pf-stat-icon">👥</span>
          <div className="pf-stat-n">127</div>
          <div className="pf-stat-l">Total membros</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📅</span>
          <div className="pf-stat-n">3</div>
          <div className="pf-stat-l">Exames próximos</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🥋</span>
          <div className="pf-stat-n">24</div>
          <div className="pf-stat-l">Graduados este ano</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">✅</span>
          <div className="pf-stat-n">93%</div>
          <div className="pf-stat-l">Presença média</div>
        </div>
      </div>

      {/* Panels */}
      <div className="pf-panels">
        {/* Members panel */}
        <div className="pf-panel">
          <div className="pf-panel-head">
            <span>Membros recentes</span>
            <Link href="/platform">Ver todos →</Link>
          </div>
          {MEMBERS.map((m) => (
            <div className="pf-member-row" key={m.name}>
              <div className="pf-avatar">{m.initials}</div>
              <div className="pf-member-info">
                <div className="pf-member-name">{m.name}</div>
                <div className="pf-belt-row">
                  <div className="pf-belt-bar">
                    <div
                      className="pf-belt-fill"
                      style={{ width: `${m.pct}%`, background: m.color, border: (m as any).border }}
                    />
                  </div>
                  <div className="pf-belt-label">{m.rank}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exams panel */}
        <div className="pf-panel">
          <div className="pf-panel-head">
            <span>Próximos exames</span>
            <Link href="/platform">Agendar →</Link>
          </div>
          {EXAMS.map((ex) => (
            <div className="pf-exam-row" key={ex.name}>
              <div>
                <div className="pf-exam-name">{ex.name}</div>
                <div className="pf-exam-date">{ex.date}</div>
              </div>
              <div className={`pf-badge ${ex.gold ? 'pf-badge-gold' : 'pf-badge-dim'}`}>
                {ex.status}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="pf-panel-head" style={{ marginBottom: 10, border: 'none', padding: 0 }}>
              <span>Ferramentas</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Link href="/platform/flows" className="platform-card" style={{ padding: '12px 14px', fontSize: '0.76rem' }}>
                <div style={{ fontSize: '1rem', marginBottom: 6 }}>⚡</div>
                <div style={{ marginBottom: 4, fontWeight: 500 }}>Automação</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.5)' }}>Flows e regras</div>
              </Link>
              <Link href="/platform/templates" className="platform-card" style={{ padding: '12px 14px', fontSize: '0.76rem' }}>
                <div style={{ fontSize: '1rem', marginBottom: 6 }}>📄</div>
                <div style={{ marginBottom: 4, fontWeight: 500 }}>Templates</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.5)' }}>Documentos</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
