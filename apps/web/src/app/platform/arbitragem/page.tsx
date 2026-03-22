'use client';
import { useState } from 'react';

type Arbitro = {
  initials: string; name: string; clube: string; num: string;
  nivel: string; dan: string; licenca: string; licencaStatus: string;
  competicoes: number; escalas: string[];
  alerts: string[];
  email: string; telefone: string; dataNasc: string; naturalidade: string;
  formacoes: { nome: string; entidade: string; ano: string; validade: string }[];
  historicoComps: { nome: string; data: string; funcao: string; resultado: string }[];
};

const ARBITROS: Arbitro[] = [
  {
    initials: 'JM', name: 'João Mota', clube: 'Clube Karate Funchal', num: 'A-0021',
    nivel: 'Nacional', dan: '4º Dan', licenca: '31 Dez 2025', licencaStatus: 'green',
    competicoes: 14, escalas: ['Camp. Regional 2025 — Principal'],
    alerts: [],
    email: 'joao.mota@karate.pt', telefone: '+351 912 345 001',
    dataNasc: '12/03/1975', naturalidade: 'Funchal',
    formacoes: [
      { nome: 'Curso Árbitro Nacional', entidade: 'FPK', ano: '2019', validade: '2025' },
      { nome: 'Arbitragem Kumite', entidade: 'WKF', ano: '2021', validade: '2026' },
    ],
    historicoComps: [
      { nome: 'Camp. Regional 2024', data: 'Mai 2024', funcao: 'Principal', resultado: 'Concluído' },
      { nome: 'Torneio Inter-Clubes 2024', data: 'Mar 2024', funcao: 'Principal', resultado: 'Concluído' },
      { nome: 'Copa Madeira 2023', data: 'Jun 2023', funcao: 'Principal', resultado: 'Concluído' },
    ],
  },
  {
    initials: 'CF', name: 'Carla Freitas', clube: 'Shotokan Caniço', num: 'A-0038',
    nivel: 'Regional', dan: '2º Dan', licenca: '30 Jun 2025', licencaStatus: 'yellow',
    competicoes: 8, escalas: ['Camp. Regional 2025 — Mesa'],
    alerts: ['Licença expira em 78 dias — renovação necessária'],
    email: 'carla.freitas@shotokan.pt', telefone: '+351 912 345 002',
    dataNasc: '25/07/1988', naturalidade: 'Santa Cruz',
    formacoes: [
      { nome: 'Curso Árbitro Regional', entidade: 'ARM', ano: '2018', validade: '2025' },
    ],
    historicoComps: [
      { nome: 'Camp. Regional 2024', data: 'Mai 2024', funcao: 'Mesa', resultado: 'Concluído' },
      { nome: 'Torneio Inter-Clubes 2024', data: 'Mar 2024', funcao: 'Campo', resultado: 'Concluído' },
    ],
  },
  {
    initials: 'RP', name: 'Rui Pereira', clube: 'Clube Karate Funchal', num: 'A-0055',
    nivel: 'Regional', dan: '3º Dan', licenca: '31 Mar 2026', licencaStatus: 'green',
    competicoes: 6, escalas: ['Camp. Regional 2025 — Campo'],
    alerts: [],
    email: 'rui.pereira@karatefunchal.pt', telefone: '+351 912 345 003',
    dataNasc: '08/11/1982', naturalidade: 'Funchal',
    formacoes: [
      { nome: 'Curso Árbitro Regional', entidade: 'ARM', ano: '2020', validade: '2026' },
    ],
    historicoComps: [
      { nome: 'Camp. Regional 2024', data: 'Mai 2024', funcao: 'Campo', resultado: 'Concluído' },
      { nome: 'Copa Madeira 2023', data: 'Jun 2023', funcao: 'Mesa', resultado: 'Concluído' },
    ],
  },
  {
    initials: 'MB', name: 'Marco Baptista', clube: 'Karate Câmara de Lobos', num: 'A-0067',
    nivel: 'Regional', dan: '2º Dan', licenca: '30 Set 2025', licencaStatus: 'yellow',
    competicoes: 3, escalas: [],
    alerts: ['Licença expira em 170 dias'],
    email: 'marco.baptista@kcl.pt', telefone: '+351 912 345 004',
    dataNasc: '14/02/1991', naturalidade: 'Câmara de Lobos',
    formacoes: [
      { nome: 'Curso Árbitro Regional', entidade: 'ARM', ano: '2022', validade: '2025' },
    ],
    historicoComps: [
      { nome: 'Torneio Inter-Clubes 2024', data: 'Mar 2024', funcao: 'Mesa', resultado: 'Concluído' },
    ],
  },
];

const ESCALAS = [
  {
    comp: 'Campeonato Regional da Madeira 2025',
    data: '3 Mai 2025',
    arbitros: [
      { nome: 'João Mota', funcao: 'Árbitro Principal', confirmado: true },
      { nome: 'Carla Freitas', funcao: 'Árbitro de Mesa', confirmado: true },
      { nome: 'Rui Pereira', funcao: 'Árbitro de Campo', confirmado: true },
    ],
  },
  {
    comp: 'Copa da Madeira 2025',
    data: '28 Jun 2025',
    arbitros: [
      { nome: 'João Mota', funcao: 'Árbitro Principal', confirmado: false },
      { nome: 'Marco Baptista', funcao: 'Árbitro de Mesa', confirmado: false },
    ],
  },
];

const nivelColor: Record<string, string> = {
  'Nacional': '#f1c232',
  'Regional': '#60a5fa',
  'Local': '#a78bfa',
};

function FichaArbitro({ arb, onClose }: { arb: Arbitro; onClose: () => void }) {
  const nc = nivelColor[arb.nivel] || '#60a5fa';
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div className="pf-avatar" style={{ width: 56, height: 56, fontSize: '1rem', background: `${nc}22`, color: nc, border: `2px solid ${nc}55` }}>{arb.initials}</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{arb.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(246,244,241,0.45)', marginBottom: 8 }}>Nº {arb.num} · {arb.clube}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge" style={{ background: `${nc}22`, color: nc, border: `1px solid ${nc}44`, fontSize: '0.62rem' }}>{arb.nivel}</span>
                <span className="badge badge-dim" style={{ fontSize: '0.62rem' }}>{arb.dan}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(246,244,241,0.4)', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Licença válida até', val: arb.licenca, color: arb.licencaStatus === 'green' ? '#4ade80' : '#f1c232' },
            { label: 'Competições', val: arb.competicoes.toString() },
            { label: 'Escalas ativas', val: arb.escalas.length.toString() },
          ].map(k => (
            <div key={k.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: k.color || '#f6f4f1' }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Dados pessoais */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Dados pessoais</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Email', val: arb.email },
              { label: 'Telefone', val: arb.telefone },
              { label: 'Data nasc.', val: arb.dataNasc },
              { label: 'Naturalidade', val: arb.naturalidade },
            ].map(row => (
              <div key={row.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{row.label}</div>
                <div style={{ fontSize: '0.78rem' }}>{row.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formações */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Formações e certificações</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {arb.formacoes.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 500 }}>{f.nome}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{f.entidade} · {f.ano}</div>
                </div>
                <span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>Válido até {f.validade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico competições */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Histórico de arbitragem</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {arb.historicoComps.map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <div style={{ fontSize: '0.78rem' }}>{h.nome}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{h.data} · {h.funcao}</div>
                </div>
                <span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>{h.resultado}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        {arb.alerts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Alertas</div>
            {arb.alerts.map((al, i) => (
              <div key={i} className="alert-item alert-yellow" style={{ padding: '8px 12px', marginBottom: 6, fontSize: '0.72rem' }}>
                <span className="alert-item-label">{al}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Renovar licença</button>
          <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Editar dados</button>
          <button className="btn primary" style={{ flex: 1, fontSize: '0.7rem' }}>Designar escala</button>
        </div>
      </div>
    </div>
  );
}

export default function ArbitragemPage() {
  const [selected, setSelected] = useState<Arbitro | null>(null);
  const validos = ARBITROS.filter(a => a.alerts.length === 0).length;

  return (
    <>
      {selected && <FichaArbitro arb={selected} onClose={() => setSelected(null)} />}

      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M9 — Arbitragem</div>
          <div className="mod-hd-sub">{ARBITROS.length} árbitros registados · {validos} com licença válida</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary">+ Novo árbitro</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat">
          <span className="pf-stat-icon">⚖</span>
          <div className="pf-stat-n">{ARBITROS.length}</div>
          <div className="pf-stat-l">Total árbitros</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">✅</span>
          <div className="pf-stat-n">{validos}</div>
          <div className="pf-stat-l">Licenças válidas</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">⚠</span>
          <div className="pf-stat-n">{ARBITROS.length - validos}</div>
          <div className="pf-stat-l">Com alertas</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📋</span>
          <div className="pf-stat-n">{ESCALAS.length}</div>
          <div className="pf-stat-l">Escalas ativas</div>
        </div>
      </div>

      {/* Arbitrators */}
      <div className="card-grid" style={{ marginBottom: 24 }}>
        {ARBITROS.map((a) => (
          <div key={a.num} className="mod-card" style={{ cursor: 'pointer' }} onClick={() => setSelected(a)}>
            <div className="mod-card-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="pf-avatar" style={{ width: 36, height: 36, fontSize: '0.68rem' }}>{a.initials}</div>
                <div>
                  <div className="mod-card-name">{a.name}</div>
                  <div className="mod-card-sub">Nº {a.num} · {a.clube}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span className="badge" style={{ background: `${nivelColor[a.nivel]}22`, color: nivelColor[a.nivel], border: `1px solid ${nivelColor[a.nivel]}44`, fontSize: '0.58rem' }}>
                  {a.nivel}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.45)' }}>{a.dan}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.72rem', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(246,244,241,0.45)' }}>Licença válida até</span>
                <span style={{ color: a.licencaStatus === 'green' ? '#4ade80' : '#f1c232' }}>{a.licenca}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(246,244,241,0.45)' }}>Competições arbitradas</span>
                <span>{a.competicoes}</span>
              </div>
            </div>

            {a.escalas.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Escalas designadas</div>
                {a.escalas.map((e, i) => (
                  <div key={i} style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.6)', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: 4 }}>{e}</div>
                ))}
              </div>
            )}

            {a.alerts.length > 0 && (
              <div>
                {a.alerts.map((al, i) => (
                  <div key={i} className="alert-item alert-yellow" style={{ padding: '6px 8px', marginBottom: 4, fontSize: '0.64rem' }}>
                    <span className="alert-item-label">{al}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }} onClick={e => e.stopPropagation()}>
              <button className="btn" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={() => setSelected(a)}>Histórico</button>
              <button className="btn primary" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={() => setSelected(a)}>Ficha</button>
            </div>
          </div>
        ))}
      </div>

      {/* Escalas */}
      <div className="pf-panel">
        <div className="pf-panel-head">
          <span>Escalas de arbitragem</span>
          <button className="btn primary" style={{ fontSize: '0.65rem', padding: '5px 12px' }}>+ Nova escala</button>
        </div>
        {ESCALAS.map((e, i) => (
          <div key={i} style={{ marginBottom: i < ESCALAS.length - 1 ? 16 : 0, paddingBottom: i < ESCALAS.length - 1 ? 16 : 0, borderBottom: i < ESCALAS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{e.comp}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{e.data}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {e.arbitros.map((ar) => (
                <div key={ar.nome} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '8px 12px', flex: '1 1 200px' }}>
                  <div className="pf-avatar" style={{ width: 28, height: 28, fontSize: '0.6rem' }}>
                    {ar.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 500 }}>{ar.nome}</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{ar.funcao}</div>
                  </div>
                  <span className={`badge ${ar.confirmado ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: '0.58rem' }}>
                    {ar.confirmado ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: '0.63rem', color: 'rgba(246,244,241,0.3)' }}>
              ⚠ Conflito de interesses verificado automaticamente — árbitros do mesmo clube que atletas em prova são sinalizados
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
