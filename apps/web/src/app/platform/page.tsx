'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { SkeletonCard } from '../components/Skeleton';

type Me = { id: string; email: string; name?: string | null; onboardingComplete: boolean };

const ALERTS = [
  { type: 'red',    label: 'Karate Machico — quota 2025 em atraso',     meta: 'Vencido há 42 dias' },
  { type: 'yellow', label: '2 cédulas de treinador expiram em 60 dias',  meta: 'A. Silva · P. Jardim' },
  { type: 'yellow', label: 'Shotokan Caniço — seguro coletivo pendente', meta: 'Prazo: 31 Jan' },
  { type: 'blue',   label: 'Campeonato Regional — inscrições fecham em 12 dias', meta: '3 Mai 2025' },
];

const UPCOMING = [
  { name: 'Torneio Inter-Clubes',         date: '22 Mar 2025', type: 'Competição', badge: 'green' },
  { name: 'Exame de Kyus — Avançados',    date: '28 Abr 2025', type: 'Exame',      badge: 'yellow' },
  { name: 'Campeonato Regional Madeira',  date: '3 Mai 2025',  type: 'Competição', badge: 'green' },
  { name: 'Exame de Dan — Shodan',        date: '15 Jun 2025', type: 'Exame',      badge: 'yellow' },
];

/* ── SVG Icons ──────────────────────────────────────────────────── */
const IcoAtletas    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="5" r="2"/><path d="M9 19l1.5-7-2.5-3h8l-2.5 3L15 19M7 13l2-2M17 13l-2-2"/></svg>;
const IcoClubes     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-6h6v6"/></svg>;
const IcoTreinadores= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoFinanceiro = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>;
const IcoCompetições= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M8 21h8m-4-4v4M5 3H3v6c0 3.314 4.03 6 9 6s9-2.686 9-6V3h-2M5 3h14"/></svg>;
const IcoComunicacao= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>;

const QUICK_ACCESS = [
  { href: '/platform/clubes',      icon: <IcoClubes />,      label: 'Clubes' },
  { href: '/platform/atletas',     icon: <IcoAtletas />,     label: 'Atletas' },
  { href: '/platform/treinadores', icon: <IcoTreinadores />, label: 'Treinadores' },
  { href: '/platform/competicoes', icon: <IcoCompetições />, label: 'Competições' },
  { href: '/platform/financeiro',  icon: <IcoFinanceiro />,  label: 'Financeiro' },
  { href: '/platform/comunicacao', icon: <IcoComunicacao />, label: 'Comunicação' },
];

const FINANCEIRO = [
  { label: 'Quotas cobradas',      value: '€1.000', pct: 80 },
  { label: 'Taxas de exame',       value: '€240',   pct: 48 },
  { label: 'Taxas de competição',  value: '€420',   pct: 67 },
];

const alertColor: Record<string, string> = {
  red:    'rgba(201,21,30,0.85)',
  yellow: 'rgba(212,168,67,0.85)',
  blue:   'rgba(59,130,246,0.85)',
};
const alertBg: Record<string, string> = {
  red:    'rgba(201,21,30,0.08)',
  yellow: 'rgba(212,168,67,0.06)',
  blue:   'rgba(59,130,246,0.06)',
};

export default function PlatformPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    apiFetch<Me>('/auth/me')
      .then(setMe)
      .catch(() => {
        setMe({ id: 'demo', email: 'admin@askbi.pt', name: 'Administrador', onboardingComplete: true });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div style={{ height: 60, marginBottom: 24 }}>
          <div style={{ height: 24, width: 200, background: '#1a1a1a', borderRadius: 6, marginBottom: 8, animation: 'shimmer 1.5s infinite' }} />
          <div style={{ height: 14, width: 140, background: '#1a1a1a', borderRadius: 4, animation: 'shimmer 1.5s infinite' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
        <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="pf-welcome">
        <h2>Bem‑vindo à Plataforma</h2>
        <p>Área interna de gestão da Associação Regional de Karate. Faz login para aceder ao dashboard.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn primary" href="/platform/login">Entrar</Link>
          <Link className="btn" href="/platform/signup">Criar conta</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="pf-header">
        <div className="pf-header-text">
          <div className="pf-header-title">
            Olá{me.name ? `, ${me.name.split(' ')[0]}` : ''}
          </div>
          <div className="pf-header-sub">
            Dashboard · {new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
        {!me.onboardingComplete && (
          <Link href="/platform/onboarding" className="btn primary" style={{ fontSize: '0.68rem', padding: '8px 14px' }}>
            Completar onboarding
          </Link>
        )}
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { icon: <IcoAtletas />,     n: '135', label: 'Atletas ativos',       color: '#C9151E' },
          { icon: <IcoClubes />,      n: '4/5', label: 'Clubes em dia',        color: '#16a34a' },
          { icon: <IcoTreinadores />, n: '7/9', label: 'Treinadores válidos',  color: '#D4A843' },
          { icon: <IcoFinanceiro />,  n: '€1k', label: 'Receita 2025',         color: '#3b82f6' },
        ].map((kpi, i) => (
          <div key={i} style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '18px 20px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9,
              background: `${kpi.color}15`,
              border: `1px solid ${kpi.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: kpi.color,
            }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F6F4F1', lineHeight: 1 }}>{kpi.n}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(246,244,241,0.45)', marginTop: 4 }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Panels */}
      <div className="pf-panels">
        {/* Alertas + Acesso rápido */}
        <div className="pf-panel">
          <div className="pf-panel-head">
            <span>Alertas ativos</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.3)' }}>{ALERTS.length} pendentes</span>
          </div>

          {ALERTS.map((a, i) => (
            <div key={i} style={{
              borderRadius: 7, padding: '9px 12px', marginBottom: 6,
              background: alertBg[a.type],
              borderLeft: `3px solid ${alertColor[a.type]}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#F6F4F1' }}>{a.label}</div>
              <div style={{ fontSize: '0.65rem', color: alertColor[a.type], whiteSpace: 'nowrap', flexShrink: 0 }}>{a.meta}</div>
            </div>
          ))}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(246,244,241,0.5)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Acesso rápido
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {QUICK_ACCESS.map(item => (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 8px', borderRadius: 8, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(246,244,241,0.6)', fontSize: '0.68rem', fontWeight: 500,
                  transition: 'all 0.15s ease', cursor: 'pointer',
                }}>
                  <span style={{ color: 'rgba(246,244,241,0.5)' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Eventos + Financeiro */}
        <div className="pf-panel">
          <div className="pf-panel-head">
            <span>Próximos eventos</span>
            <Link href="/platform/calendario" style={{ fontSize: '0.68rem', color: '#D4A843', textDecoration: 'none' }}>
              Calendário
            </Link>
          </div>

          {UPCOMING.map(ev => (
            <div key={ev.name} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#F6F4F1', marginBottom: 2 }}>{ev.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{ev.date} · {ev.type}</div>
              </div>
              <div style={{
                fontSize: '0.62rem', fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                background: ev.badge === 'green' ? 'rgba(22,163,74,0.15)' : 'rgba(212,168,67,0.12)',
                color: ev.badge === 'green' ? '#4ade80' : '#D4A843',
              }}>
                {ev.type}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(246,244,241,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Resumo financeiro 2025
            </div>
            {FINANCEIRO.map(row => (
              <div key={row.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 5 }}>
                  <span style={{ color: 'rgba(246,244,241,0.55)' }}>{row.label}</span>
                  <span style={{ color: '#D4A843', fontWeight: 600 }}>{row.value}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: 'rgba(212,168,67,0.6)', borderRadius: 2, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
