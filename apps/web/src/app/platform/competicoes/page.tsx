'use client';
import { useState } from 'react';

type Comp = {
  id: string; nome: string; data: string; local: string;
  status: string; inscritos: number; categorias: number;
  arbitros: string[]; escaloes: string[]; resultados: boolean;
  organizador: string; email: string; telefone: string;
  inscricoesFim: string; taxaInscricao: string;
  clubesInscritos: { nome: string; atletas: number }[];
  resultadosList: { lugar: string; atleta: string; clube: string; categoria: string }[];
};

const COMPS: Comp[] = [
  {
    id: 'C2025-001',
    nome: 'Torneio Inter-Clubes Madeira',
    data: '22 Mar 2025',
    local: 'Pavilhão Municipal Funchal',
    status: 'Concluído',
    inscritos: 62,
    categorias: 8,
    arbitros: ['João Mota', 'Carla Freitas'],
    escaloes: ['Infantis A — Kata', 'Infantis B — Kata', 'Juvenis — Kata', 'Juvenis — Kumite'],
    resultados: true,
    organizador: 'Associação Regional de Karate da Madeira',
    email: 'geral@karate-madeira.pt',
    telefone: '+351 291 000 001',
    inscricoesFim: '10 Mar 2025',
    taxaInscricao: '€8 / atleta',
    clubesInscritos: [
      { nome: 'Clube Karate Funchal', atletas: 22 },
      { nome: 'Shotokan Caniço', atletas: 18 },
      { nome: 'Karate Câmara de Lobos', atletas: 12 },
      { nome: 'Academia KSA', atletas: 10 },
    ],
    resultadosList: [
      { lugar: '1º', atleta: 'Ana Costa', clube: 'KF', categoria: 'Juvenis Kata F' },
      { lugar: '2º', atleta: 'João Silva', clube: 'SC', categoria: 'Juvenis Kata M' },
      { lugar: '3º', atleta: 'Marta Alves', clube: 'KCL', categoria: 'Infantis Kata F' },
    ],
  },
  {
    id: 'C2025-004',
    nome: 'Campeonato Regional da Madeira 2025',
    data: '3 Mai 2025',
    local: 'Pavilhão do Caniço',
    status: 'Inscrições abertas',
    inscritos: 84,
    categorias: 12,
    arbitros: ['João Mota', 'Carla Freitas', 'Rui Pereira'],
    escaloes: ['Infantis A — Kata', 'Infantis B — Kata', 'Juvenis — Kata', 'Juvenis — Kumite', 'Juniores — Kata', 'Juniores — Kumite', 'Seniores — Kata', 'Seniores — Kumite'],
    resultados: false,
    organizador: 'Associação Regional de Karate da Madeira',
    email: 'geral@karate-madeira.pt',
    telefone: '+351 291 000 001',
    inscricoesFim: '20 Abr 2025',
    taxaInscricao: '€10 / atleta',
    clubesInscritos: [
      { nome: 'Clube Karate Funchal', atletas: 28 },
      { nome: 'Shotokan Caniço', atletas: 21 },
      { nome: 'Karate Câmara de Lobos', atletas: 19 },
      { nome: 'Academia KSA', atletas: 16 },
    ],
    resultadosList: [],
  },
  {
    id: 'C2025-007',
    nome: 'Copa da Madeira 2025',
    data: '28 Jun 2025',
    local: 'Pavilhão Machico',
    status: 'Em preparação',
    inscritos: 0,
    categorias: 10,
    arbitros: [],
    escaloes: ['Infantis — Kata', 'Juvenis — Kata', 'Juvenis — Kumite', 'Juniores — Kata', 'Seniores — Kata', 'Seniores — Kumite'],
    resultados: false,
    organizador: 'Karate Machico',
    email: 'karate.machico@gmail.com',
    telefone: '+351 291 000 003',
    inscricoesFim: '14 Jun 2025',
    taxaInscricao: '€8 / atleta',
    clubesInscritos: [],
    resultadosList: [],
  },
];

const statusMap: Record<string, string> = {
  'Concluído': 'badge-dim',
  'Inscrições abertas': 'badge-green',
  'Em preparação': 'badge-blue',
  'Em curso': 'badge-yellow',
};

function FichaCompeticao({ comp, onClose }: { comp: Comp; onClose: () => void }) {
  const [tab, setTab] = useState<'info' | 'inscricoes' | 'resultados'>('info');
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: '1.4rem' }}>🏆</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{comp.nome}</div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(246,244,241,0.45)', marginBottom: 8 }}>Nº {comp.id} · {comp.organizador}</div>
            <span className={`badge ${statusMap[comp.status]}`}>{comp.status}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(246,244,241,0.4)', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Data', val: comp.data },
            { label: 'Inscritos', val: comp.inscritos.toString() },
            { label: 'Categorias', val: comp.categorias.toString() },
            { label: 'Taxa', val: comp.taxaInscricao },
          ].map(k => (
            <div key={k.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.58rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{k.label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
          {(['info', 'inscricoes', 'resultados'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', fontSize: '0.72rem', color: tab === t ? '#f1c232' : 'rgba(246,244,241,0.45)', borderBottom: tab === t ? '2px solid #f1c232' : '2px solid transparent', marginBottom: -1, textTransform: 'capitalize' }}>
              {t === 'info' ? 'Informação' : t === 'inscricoes' ? 'Inscrições' : 'Resultados'}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Local', val: comp.local },
                { label: 'Fim de inscrições', val: comp.inscricoesFim },
                { label: 'Email', val: comp.email },
                { label: 'Telefone', val: comp.telefone },
              ].map(row => (
                <div key={row.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: '0.78rem' }}>{row.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Escalões e categorias</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {comp.escaloes.map(e => <span key={e} className="badge badge-dim" style={{ fontSize: '0.62rem' }}>{e}</span>)}
              </div>
            </div>

            {comp.arbitros.length > 0 && (
              <div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Árbitros designados</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {comp.arbitros.map((a, i) => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 12px' }}>
                      <div className="pf-avatar" style={{ width: 26, height: 26, fontSize: '0.58rem' }}>
                        {a.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div>{a}</div>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.4)' }}>{['Principal', 'Mesa', 'Campo'][i]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'inscricoes' && (
          <div>
            {comp.clubesInscritos.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(246,244,241,0.3)', padding: '32px 0', fontSize: '0.8rem' }}>
                Sem inscrições registadas ainda
              </div>
            ) : (
              <table className="mod-table" style={{ width: '100%' }}>
                <thead><tr>
                  <th>Clube</th>
                  <th style={{ textAlign: 'right' }}>Atletas inscritos</th>
                </tr></thead>
                <tbody>
                  {comp.clubesInscritos.map(c => (
                    <tr key={c.nome}>
                      <td>{c.nome}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{c.atletas}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ fontWeight: 700 }}>Total</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#f1c232' }}>{comp.clubesInscritos.reduce((s, c) => s + c.atletas, 0)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'resultados' && (
          <div>
            {comp.resultadosList.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(246,244,241,0.3)', padding: '32px 0', fontSize: '0.8rem' }}>
                {comp.status === 'Concluído' ? 'Resultados não disponíveis' : 'Competição ainda não concluída'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {comp.resultadosList.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: r.lugar === '1º' ? '#f1c232' : r.lugar === '2º' ? '#a0aec0' : '#cd7c35', minWidth: 28 }}>{r.lugar}</span>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{r.atleta}</div>
                        <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{r.clube} · {r.categoria}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 16, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Gerir inscrições</button>
          <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Gerar chaves</button>
          {comp.resultados
            ? <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Ver resultados</button>
            : <button className="btn" style={{ flex: 1, fontSize: '0.7rem' }}>Lançar resultados</button>
          }
          <button className="btn primary" style={{ flex: 1, fontSize: '0.7rem' }}>Diplomas PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function CompeticoesPage() {
  const [selected, setSelected] = useState<Comp | null>(null);

  return (
    <>
      {selected && <FichaCompeticao comp={selected} onClose={() => setSelected(null)} />}

      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M4 — Competições</div>
          <div className="mod-hd-sub">{COMPS.length} competições · 2025 · Kata e Kumite</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary">+ Nova competição</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat">
          <span className="pf-stat-icon">🏆</span>
          <div className="pf-stat-n">{COMPS.length}</div>
          <div className="pf-stat-l">Competições 2025</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🥋</span>
          <div className="pf-stat-n">146</div>
          <div className="pf-stat-l">Inscrições totais</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🏅</span>
          <div className="pf-stat-n">1</div>
          <div className="pf-stat-l">Concluídas</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📋</span>
          <div className="pf-stat-n">30</div>
          <div className="pf-stat-l">Categorias total</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {COMPS.map((c) => (
          <div key={c.id} className="pf-panel" style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>{c.nome}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.45)' }}>Comp. nº {c.id}</div>
              </div>
              <span className={`badge ${statusMap[c.status]}`}>{c.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Data', val: c.data },
                { label: 'Local', val: c.local },
                { label: 'Inscritos', val: c.inscritos },
                { label: 'Categorias', val: c.categorias },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Escalões e categorias</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {c.escaloes.map((e) => (
                  <span key={e} className="badge badge-dim" style={{ fontSize: '0.62rem' }}>{e}</span>
                ))}
              </div>
            </div>

            {c.arbitros.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Árbitros designados</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {c.arbitros.map((a, i) => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem' }}>
                      <div className="pf-avatar" style={{ width: 26, height: 26, fontSize: '0.58rem' }}>
                        {a.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div>{a}</div>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.4)' }}>{['Principal', 'Mesa', 'Campo'][i]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }} onClick={e => e.stopPropagation()}>
              <button className="btn" style={{ fontSize: '0.68rem' }} onClick={() => setSelected(c)}>Gerir inscrições</button>
              <button className="btn" style={{ fontSize: '0.68rem' }} onClick={() => setSelected(c)}>Gerar chaves</button>
              {c.resultados
                ? <button className="btn" style={{ fontSize: '0.68rem' }} onClick={() => setSelected(c)}>Ver resultados</button>
                : <button className="btn" style={{ fontSize: '0.68rem' }} onClick={() => setSelected(c)}>Lançar resultados</button>
              }
              <button className="btn" style={{ fontSize: '0.68rem' }} onClick={() => setSelected(c)}>Diplomas PDF</button>
              <button className="btn primary" style={{ fontSize: '0.68rem', marginLeft: 'auto' }} onClick={() => setSelected(c)}>Ficha</button>
            </div>
          </div>
        ))}
      </div>

      {/* Ciclo de vida */}
      <div className="pf-panel" style={{ marginTop: 20 }}>
        <div className="pf-panel-head"><span>Ciclo de vida da competição</span></div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 4, paddingBottom: 4 }}>
          {[
            { label: 'Criação', sub: 'Data, local, escalões', color: '#60a5fa' },
            { label: 'Inscrições', sub: 'Treinadores inscrevem', color: '#a78bfa' },
            { label: 'Validação', sub: 'Licenças, escalões', color: '#f1c232' },
            { label: 'Geração chaves', sub: 'Draw automático', color: '#fb923c' },
            { label: 'Dia compet.', sub: 'Chamadas, combates', color: '#f1c232' },
            { label: 'Resultados', sub: 'Lançamento real-time', color: '#4ade80' },
            { label: 'Rankings', sub: 'Pontos acumulados', color: '#4ade80' },
            { label: 'Diplomas PDF', sub: '1º/2º/3º automático', color: '#4ade80' },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 80 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '0 2px' }}>
                <div style={{ background: `${step.color}15`, border: `1px solid ${step.color}40`, borderRadius: 6, padding: '8px 4px' }}>
                  <div style={{ fontSize: '0.66rem', color: step.color, fontWeight: 600, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(246,244,241,0.35)' }}>{step.sub}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>›</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: '0.63rem', color: 'rgba(246,244,241,0.3)', textAlign: 'center' }}>
          Validação automática: licença ativa · quota paga · escalão correto · cédula treinador válida
        </div>
      </div>
    </>
  );
}
