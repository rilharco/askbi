'use client';
import { useState } from 'react';

const TRAINERS = [
  {
    initials: 'AS', name: 'António Silva', clube: 'Clube Karate Funchal', num: 'T-0087',
    grau: 'III', grauLabel: 'Sénior', dan: '3º Dan', atletas: 23,
    cedula: '30 Jun 2025', cedulaStatus: 'yellow',
    email: 'antonio.silva@karatefunchal.pt', tel: '+351 916 234 567',
    dataNasc: '14 Mar 1978', desde: 2008,
    formacoes: [
      { nome: 'Antidopagem WADA',  val: 'Dez 2025', ok: true  },
      { nome: 'Proteção menores',  val: 'Mar 2027', ok: true  },
      { nome: 'Primeiros socorros', val: 'Jun 2025', ok: false },
      { nome: 'Formação contínua', val: '12 créditos', ok: true },
    ],
    atletasList: ['Miguel Santos', 'Inês Rodrigues', 'João Silva', '+ 20 atletas'],
    competicoes: 8, presencaMedia: 94,
    alerts: ['Cédula expira 30 Jun 2025 — renovação pendente', 'Primeiros socorros expira em 78 dias'],
  },
  {
    initials: 'PJ', name: 'Paulo Jardim', clube: 'Karate Câmara de Lobos', num: 'T-0054',
    grau: 'II', grauLabel: 'Adjunto', dan: '2º Dan', atletas: 12,
    cedula: '15 Mar 2026', cedulaStatus: 'green',
    email: 'paulo.jardim@kcl.pt', tel: '+351 962 100 200',
    dataNasc: '22 Jul 1985', desde: 2014,
    formacoes: [
      { nome: 'Antidopagem WADA',  val: 'Jan 2026', ok: true },
      { nome: 'Proteção menores',  val: 'Out 2026', ok: true },
      { nome: 'Primeiros socorros', val: 'Fev 2026', ok: true },
      { nome: 'Formação contínua', val: '8 créditos', ok: true },
    ],
    atletasList: ['Ana Pereira', '+ 11 atletas'],
    competicoes: 5, presencaMedia: 91,
    alerts: [],
  },
  {
    initials: 'CF', name: 'Carla Freitas', clube: 'Shotokan Caniço', num: 'T-0112',
    grau: 'I', grauLabel: 'Auxiliar', dan: '1º Dan', atletas: 8,
    cedula: '30 Set 2025', cedulaStatus: 'yellow',
    email: 'carla.freitas@shotokan.pt', tel: '+351 933 400 500',
    dataNasc: '8 Nov 1992', desde: 2018,
    formacoes: [
      { nome: 'Antidopagem WADA',  val: 'Expirado', ok: false },
      { nome: 'Proteção menores',  val: 'Mai 2027',  ok: true  },
      { nome: 'Primeiros socorros', val: 'Nov 2025',  ok: true  },
      { nome: 'Formação contínua', val: '4 créditos', ok: true  },
    ],
    atletasList: ['Maria Costa', 'Sofia Abreu', '+ 6 atletas'],
    competicoes: 3, presencaMedia: 87,
    alerts: ['Antidopagem WADA — expirado, renovação obrigatória'],
  },
  {
    initials: 'RP', name: 'Rui Pereira', clube: 'Clube Karate Funchal', num: 'T-0031',
    grau: 'III', grauLabel: 'Sénior', dan: '4º Dan', atletas: 18,
    cedula: '31 Dez 2025', cedulaStatus: 'green',
    email: 'rui.pereira@karatefunchal.pt', tel: '+351 918 600 700',
    dataNasc: '3 Jan 1970', desde: 2005,
    formacoes: [
      { nome: 'Antidopagem WADA',  val: 'Nov 2025', ok: true },
      { nome: 'Proteção menores',  val: 'Ago 2026', ok: true },
      { nome: 'Primeiros socorros', val: 'Mar 2026', ok: true },
      { nome: 'Formação contínua', val: '20 créditos', ok: true },
    ],
    atletasList: ['Carlos Nóbrega', 'Pedro Fernandes', '+ 16 atletas'],
    competicoes: 12, presencaMedia: 96,
    alerts: [],
  },
  {
    initials: 'LM', name: 'Luísa Moniz', clube: 'AKSA', num: 'T-0143',
    grau: 'II', grauLabel: 'Adjunto', dan: '2º Dan', atletas: 9,
    cedula: '30 Jun 2026', cedulaStatus: 'green',
    email: 'luisa.moniz@aksa.pt', tel: '+351 911 800 900',
    dataNasc: '17 Set 1988', desde: 2019,
    formacoes: [
      { nome: 'Antidopagem WADA',  val: 'Ago 2025', ok: true },
      { nome: 'Proteção menores',  val: 'Jan 2027', ok: true },
      { nome: 'Primeiros socorros', val: 'Abr 2026', ok: true },
      { nome: 'Formação contínua', val: '6 créditos', ok: true },
    ],
    atletasList: ['Sofia Abreu', '+ 8 atletas'],
    competicoes: 2, presencaMedia: 82,
    alerts: [],
  },
];

type Trainer = typeof TRAINERS[0];

const grauColors: Record<string, string> = { 'I': '#60a5fa', 'II': '#a78bfa', 'III': '#f1c232', 'Sensei': '#f87171' };

function FichaTreinador({ t, onClose }: { t: Trainer; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 660, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="pf-avatar" style={{ width: 52, height: 52, fontSize: '1rem' }}>{t.initials}</div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.45)' }}>Nº {t.num} · {t.clube}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge" style={{ background: `${grauColors[t.grau]}22`, color: grauColors[t.grau], border: `1px solid ${grauColors[t.grau]}44`, fontSize: '0.62rem' }}>Grau {t.grau} · {t.grauLabel}</span>
            <span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>{t.dan}</span>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(246,244,241,0.6)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
          </div>
        </div>

        {/* Níveis progressão */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {[{ g: 'I', l: 'Auxiliar' }, { g: 'II', l: 'Adjunto' }, { g: 'III', l: 'Sénior' }, { g: 'Sensei', l: 'Mestre' }].map(lv => {
            const active = t.grau === lv.g;
            return (
              <div key={lv.g} style={{ flex: 1, background: active ? `${grauColors[lv.g]}22` : 'rgba(255,255,255,0.02)', border: `1px solid ${active ? grauColors[lv.g] + '55' : 'rgba(255,255,255,0.07)'}`, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: active ? grauColors[lv.g] : 'rgba(246,244,241,0.35)' }}>Grau {lv.g}</div>
                <div style={{ fontSize: '0.62rem', color: active ? 'rgba(246,244,241,0.6)' : 'rgba(246,244,241,0.25)' }}>{lv.l}</div>
              </div>
            );
          })}
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}>
          {[
            { label: 'Atletas',      val: t.atletas },
            { label: 'Cédula válida até', val: t.cedula },
            { label: 'Compet. arbitradas', val: t.competicoes },
            { label: 'Treinador desde', val: t.desde },
          ].map(k => (
            <div key={k.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Dados pessoais */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Dados pessoais</div>
          {[
            { label: 'Email',            val: t.email },
            { label: 'Telefone',         val: t.tel },
            { label: 'Data nascimento',  val: t.dataNasc },
            { label: 'Graduação',        val: t.dan },
            { label: 'Clube principal',  val: t.clube },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: 'rgba(246,244,241,0.4)' }}>{r.label}</span>
              <span>{r.val}</span>
            </div>
          ))}
        </div>

        {/* Formações obrigatórias */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Formações obrigatórias</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {t.formacoes.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.025)', borderRadius: 7 }}>
                <span style={{ fontSize: '0.74rem' }}>{f.nome}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{f.val}</span>
                  <span className={`badge ${f.ok ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.58rem' }}>{f.ok ? '✓ OK' : '✗ Expirado'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atletas */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Atletas sob tutela ({t.atletas})</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {t.atletasList.map((a, i) => (
              <span key={i} className="badge badge-dim" style={{ fontSize: '0.68rem' }}>{a}</span>
            ))}
          </div>
        </div>

        {/* Alertas */}
        {t.alerts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Alertas</div>
            <div className="alert-list">
              {t.alerts.map((a, i) => (
                <div key={i} className={`alert-item ${a.includes('expirado') ? 'alert-red' : 'alert-yellow'}`}>
                  <span className="alert-item-label">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn" style={{ flex: 1 }}>Formações</button>
          <button className="btn" style={{ flex: 1 }}>Ver atletas</button>
          <button className="btn primary" style={{ flex: 1 }}>Renovar cédula</button>
        </div>
      </div>
    </div>
  );
}

export default function TreinadoresPage() {
  const [selected, setSelected] = useState<Trainer | null>(null);
  const validos = TRAINERS.filter(t => t.alerts.length === 0).length;

  return (
    <>
      {selected && <FichaTreinador t={selected} onClose={() => setSelected(null)} />}

      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M3 — Treinadores e Sensei</div>
          <div className="mod-hd-sub">{TRAINERS.length} treinadores registados · {validos} com cédula e formações válidas</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary">+ Novo treinador</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat"><span className="pf-stat-icon">👤</span><div className="pf-stat-n">{TRAINERS.length}</div><div className="pf-stat-l">Total treinadores</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">✅</span><div className="pf-stat-n">{validos}</div><div className="pf-stat-l">Cédulas válidas</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">⚠</span><div className="pf-stat-n">{TRAINERS.length - validos}</div><div className="pf-stat-l">Com alertas</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">🥋</span><div className="pf-stat-n">{TRAINERS.reduce((s, t) => s + t.atletas, 0)}</div><div className="pf-stat-l">Atletas sob tutela</div></div>
      </div>

      {/* Níveis */}
      <div className="pf-panel" style={{ marginBottom: 20 }}>
        <div className="pf-panel-head"><span>Níveis de licença</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { grau: 'I',      sub: 'Auxiliar', desc: 'Treinos com supervisão de Grau II ou III', color: '#60a5fa' },
            { grau: 'II',     sub: 'Adjunto',  desc: 'Treinos autónomos; não supervisiona',      color: '#a78bfa' },
            { grau: 'III',    sub: 'Sénior',   desc: 'Plenas funções; supervisiona Graus I e II', color: '#f1c232' },
            { grau: 'Sensei', sub: 'Mestre',   desc: 'Dan elevado; papel honorífico',             color: '#f87171' },
          ].map(level => (
            <div key={level.grau} style={{ background: `${level.color}0d`, border: `1px solid ${level.color}33`, borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: level.color, marginBottom: 2 }}>Grau {level.grau}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.7)', marginBottom: 6 }}>{level.sub}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)', marginBottom: 8, lineHeight: 1.4 }}>{level.desc}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: level.color }}>{TRAINERS.filter(t => t.grau === level.grau).length}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-grid">
        {TRAINERS.map((t) => (
          <div key={t.num} className="mod-card" style={{ cursor: 'pointer' }} onClick={() => setSelected(t)}>
            <div className="mod-card-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="pf-avatar" style={{ width: 36, height: 36, fontSize: '0.68rem' }}>{t.initials}</div>
                <div>
                  <div className="mod-card-name">{t.name}</div>
                  <div className="mod-card-sub">Nº {t.num} · {t.clube}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span className="badge" style={{ background: `${grauColors[t.grau]}22`, color: grauColors[t.grau], border: `1px solid ${grauColors[t.grau]}44`, fontSize: '0.58rem' }}>Grau {t.grau} · {t.grauLabel}</span>
                <span style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.45)' }}>{t.dan}</span>
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Formações</div>
              {t.formacoes.map(f => (
                <div key={f.nome} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: 3 }}>
                  <span style={{ color: 'rgba(246,244,241,0.6)' }}>{f.nome}</span>
                  <span style={{ color: f.ok ? '#4ade80' : '#f87171', fontSize: '0.62rem' }}>{f.ok ? '✓' : '✗'} {f.val}</span>
                </div>
              ))}
            </div>

            <div className="mod-card-stats">
              <div className="mod-card-stat"><div className="mod-card-stat-n">{t.atletas}</div><div className="mod-card-stat-l">Atletas</div></div>
              <div className="mod-card-stat"><div className="mod-card-stat-n" style={{ fontSize: '0.72rem' }}>{t.cedula}</div><div className="mod-card-stat-l">Cédula validade</div></div>
            </div>

            {t.alerts.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {t.alerts.map((a, i) => (
                  <div key={i} className={`alert-item ${a.includes('expirado') ? 'alert-red' : 'alert-yellow'}`} style={{ fontSize: '0.64rem', padding: '6px 8px', marginBottom: 4 }}>
                    <span className="alert-item-label">{a}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button className="btn" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={e => { e.stopPropagation(); setSelected(t); }}>Formações</button>
              <button className="btn primary" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={e => { e.stopPropagation(); setSelected(t); }}>Ficha</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
