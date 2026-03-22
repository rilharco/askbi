'use client';
import React, { useState } from 'react';

const CLUBS = [
  {
    initials: 'KF', name: 'Clube Karate Funchal', filiacao: '0042', regiao: 'Funchal',
    status: 'Afiliado', quota: 'Paga', atletas: 47, treinadores: 3, desde: 2008,
    presidente: 'João Rodrigues', email: 'geral@karatefunchal.pt', tel: '+351 291 123 456',
    nipc: '508 234 789', morada: 'R. Dr. Fernão de Ornelas, 12, Funchal',
    alerts: ['2 licenças de treinador expiram em 60 dias'],
    docs: [
      { tipo: 'Estatutos',  validade: 'Permanente', ok: true },
      { tipo: 'Ata AG',     validade: 'Jan 2025',   ok: true },
      { tipo: 'Seguro coletivo', validade: 'Dez 2025', ok: true },
      { tipo: 'Certidão permanente', validade: 'Permanente', ok: true },
    ],
    treinadoresList: ['António Silva (Grau III)', 'Rui Pereira (Grau III)', 'Carla Freitas (Grau I)'],
    competicoes: 3, examesAno: 2, presencaMedia: 94,
  },
  {
    initials: 'KCL', name: 'Karate Câmara de Lobos', filiacao: '0017', regiao: 'Câmara de Lobos',
    status: 'Afiliado', quota: 'Paga', atletas: 23, treinadores: 2, desde: 2014,
    presidente: 'Manuel Vieira', email: 'kcl@karate-madeira.pt', tel: '+351 291 934 210',
    nipc: '508 100 002', morada: 'Av. D. Manuel I, 45, Câmara de Lobos',
    alerts: [],
    docs: [
      { tipo: 'Estatutos',  validade: 'Permanente', ok: true },
      { tipo: 'Ata AG',     validade: 'Jan 2025',   ok: true },
      { tipo: 'Seguro coletivo', validade: 'Nov 2025', ok: true },
      { tipo: 'Certidão permanente', validade: 'Permanente', ok: true },
    ],
    treinadoresList: ['Paulo Jardim (Grau II)', 'Luísa Moniz (Grau II)'],
    competicoes: 2, examesAno: 1, presencaMedia: 91,
  },
  {
    initials: 'KM', name: 'Karate Machico', filiacao: '0031', regiao: 'Machico',
    status: 'Suspenso', quota: 'Em atraso', atletas: 15, treinadores: 1, desde: 2011,
    presidente: 'Nuno Baptista', email: 'karate.machico@gmail.com', tel: '+351 291 965 341',
    nipc: '508 100 003', morada: 'R. da Água, 8, Machico',
    alerts: ['Quota 2025 em atraso — vencido há 42 dias', 'Seguro coletivo pendente'],
    docs: [
      { tipo: 'Estatutos',  validade: 'Permanente', ok: true },
      { tipo: 'Ata AG',     validade: 'Jan 2025',   ok: true },
      { tipo: 'Seguro coletivo', validade: '—', ok: false },
      { tipo: 'Certidão permanente', validade: 'Permanente', ok: true },
    ],
    treinadoresList: ['Marco Baptista (Grau I)'],
    competicoes: 1, examesAno: 0, presencaMedia: 68,
  },
  {
    initials: 'SC', name: 'Shotokan Caniço', filiacao: '0055', regiao: 'Santa Cruz',
    status: 'Afiliado', quota: 'Pendente', atletas: 31, treinadores: 2, desde: 2016,
    presidente: 'Luísa Moniz', email: 'shotokan.canico@mail.pt', tel: '+351 291 552 789',
    nipc: '508 100 004', morada: 'Caminho do Caniço, 23, Santa Cruz',
    alerts: ['Seguro coletivo — renovação pendente'],
    docs: [
      { tipo: 'Estatutos',  validade: 'Permanente', ok: true },
      { tipo: 'Ata AG',     validade: 'Jan 2025',   ok: true },
      { tipo: 'Seguro coletivo', validade: '—', ok: false },
      { tipo: 'Certidão permanente', validade: 'Permanente', ok: true },
    ],
    treinadoresList: ['Carla Freitas (Grau I)', 'Rui Pereira (Grau III)'],
    competicoes: 2, examesAno: 2, presencaMedia: 87,
  },
  {
    initials: 'AKSA', name: 'Academia Karate Santo António', filiacao: '0063', regiao: 'Funchal',
    status: 'Afiliado', quota: 'Paga', atletas: 19, treinadores: 1, desde: 2019,
    presidente: 'Pedro Faria', email: 'aksa@karate.pt', tel: '+351 912 456 789',
    nipc: '508 100 005', morada: 'R. Santo António, 101, Funchal',
    alerts: [],
    docs: [
      { tipo: 'Estatutos',  validade: 'Permanente', ok: true },
      { tipo: 'Ata AG',     validade: 'Fev 2025',   ok: true },
      { tipo: 'Seguro coletivo', validade: 'Out 2025', ok: true },
      { tipo: 'Certidão permanente', validade: 'Permanente', ok: true },
    ],
    treinadoresList: ['Luísa Moniz (Grau II)'],
    competicoes: 1, examesAno: 1, presencaMedia: 82,
  },
];

type Club = typeof CLUBS[0];

const statusClass: Record<string, string> = { 'Afiliado': 'badge-green', 'Suspenso': 'badge-red', 'Extinto': 'badge-dim' };
const quotaClass:  Record<string, string> = { 'Paga': 'badge-green', 'Pendente': 'badge-yellow', 'Em atraso': 'badge-red', 'Isento': 'badge-dim' };

function FichaClube({ clube, onClose }: { clube: Club; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 660, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="mod-card-avatar" style={{ width: 52, height: 52, fontSize: '0.9rem' }}>{clube.initials}</div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 4 }}>{clube.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.45)' }}>Filiação nº{clube.filiacao} · {clube.regiao}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className={`badge ${statusClass[clube.status]}`}>{clube.status}</span>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(246,244,241,0.6)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}>
          {[
            { label: 'Atletas ativos', val: clube.atletas },
            { label: 'Treinadores',    val: clube.treinadores },
            { label: 'Quota anual',    val: clube.quota },
            { label: 'Afiliado desde', val: clube.desde },
          ].map(k => (
            <div key={k.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k.label}</div>
              {k.label === 'Quota anual'
                ? <span className={`badge ${quotaClass[k.val as string]}`} style={{ fontSize: '0.65rem' }}>{k.val}</span>
                : <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{k.val}</div>
              }
            </div>
          ))}
        </div>

        {/* Dados administrativos */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Dados administrativos</div>
          {[
            { label: 'Presidente', val: clube.presidente },
            { label: 'Morada',     val: clube.morada },
            { label: 'Email',      val: clube.email },
            { label: 'Telefone',   val: clube.tel },
            { label: 'NIPC',       val: clube.nipc },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: 'rgba(246,244,241,0.4)' }}>{r.label}</span>
              <span style={{ textAlign: 'right', maxWidth: '60%' }}>{r.val}</span>
            </div>
          ))}
        </div>

        {/* Treinadores */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Treinadores</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {clube.treinadoresList.map(t => (
              <span key={t} className="badge badge-dim" style={{ fontSize: '0.68rem' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Documentos */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Documentos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {clube.docs.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.025)', borderRadius: 7 }}>
                <span style={{ fontSize: '0.74rem' }}>{d.tipo}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{d.validade}</span>
                  <span className={`badge ${d.ok ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.58rem' }}>{d.ok ? 'OK' : 'Pendente'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        {clube.alerts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Alertas ativos</div>
            <div className="alert-list">
              {clube.alerts.map((a, i) => (
                <div key={i} className="alert-item alert-yellow">
                  <span className="alert-item-label">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Competições este ano', val: clube.competicoes },
            { label: 'Exames este ano',      val: clube.examesAno },
            { label: 'Presença média',       val: `${clube.presencaMedia}%` },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn" style={{ flex: 1 }}>Documentos</button>
          <button className="btn" style={{ flex: 1 }}>Ver atletas</button>
          <button className="btn primary" style={{ flex: 1 }}>Renovar filiação</button>
        </div>
      </div>
    </div>
  );
}

// ─── Formulário novo clube ────────────────────────────────────────

const emptyClube = {
  nome: '', nipc: '', morada: '', codigoPostal: '', localidade: '', email: '', telefone: '',
  presidente: '', secretario: '', tesoureiro: '', iban: '', site: '', filiadoDesde: new Date().getFullYear(),
};

function FormClube({ onSave, onClose }: { onSave: (data: typeof emptyClube) => void; onClose: () => void }) {
  const [form, setForm] = useState(emptyClube);
  const set = (k: keyof typeof emptyClube, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '8px 12px', color: '#f6f4f1', fontSize: '0.78rem', width: '100%', outline: 'none' };
  const labelStyle: React.CSSProperties = { fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 4, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim()) return alert('Nome obrigatório');
    onSave(form);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Novo clube</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(246,244,241,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Identificação</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Nome do clube *</label>
                  <input style={inputStyle} value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Nome completo" required />
                </div>
                <div>
                  <label style={labelStyle}>NIPC</label>
                  <input style={inputStyle} value={form.nipc} onChange={e => set('nipc', e.target.value)} placeholder="508 000 000" />
                </div>
                <div>
                  <label style={labelStyle}>Filiado desde</label>
                  <input type="number" style={inputStyle} value={form.filiadoDesde} onChange={e => set('filiadoDesde', parseInt(e.target.value))} placeholder="2024" />
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Sede e contacto</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Morada</label>
                  <input style={inputStyle} value={form.morada} onChange={e => set('morada', e.target.value)} placeholder="Rua, nº" />
                </div>
                <div>
                  <label style={labelStyle}>Código Postal</label>
                  <input style={inputStyle} value={form.codigoPostal} onChange={e => set('codigoPostal', e.target.value)} placeholder="0000-000" />
                </div>
                <div>
                  <label style={labelStyle}>Localidade</label>
                  <input style={inputStyle} value={form.localidade} onChange={e => set('localidade', e.target.value)} placeholder="Cidade" />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="geral@clube.pt" />
                </div>
                <div>
                  <label style={labelStyle}>Telefone</label>
                  <input style={inputStyle} value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="+351 291 000 000" />
                </div>
                <div>
                  <label style={labelStyle}>Site</label>
                  <input style={inputStyle} value={form.site} onChange={e => set('site', e.target.value)} placeholder="www.clube.pt" />
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Órgãos sociais</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>Presidente</label>
                  <input style={inputStyle} value={form.presidente} onChange={e => set('presidente', e.target.value)} placeholder="Nome" />
                </div>
                <div>
                  <label style={labelStyle}>Secretário</label>
                  <input style={inputStyle} value={form.secretario} onChange={e => set('secretario', e.target.value)} placeholder="Nome" />
                </div>
                <div>
                  <label style={labelStyle}>Tesoureiro</label>
                  <input style={inputStyle} value={form.tesoureiro} onChange={e => set('tesoureiro', e.target.value)} placeholder="Nome" />
                </div>
                <div>
                  <label style={labelStyle}>IBAN</label>
                  <input style={inputStyle} value={form.iban} onChange={e => set('iban', e.target.value)} placeholder="PT50 0000 0000 0000 0000 000 0" />
                </div>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button type="button" className="btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn primary">Guardar clube</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClubesPage() {
  const [clubs, setClubs] = useState(CLUBS);
  const [selected, setSelected] = useState<Club | null>(null);
  const [showForm, setShowForm] = useState(false);
  const total = clubs.length;
  const afiliados = clubs.filter(c => c.status === 'Afiliado').length;
  const emDia = clubs.filter(c => c.quota === 'Paga').length;
  const totalAtletas = clubs.reduce((s, c) => s + c.atletas, 0);

  function handleSaveClube(data: typeof emptyClube) {
    const initials = data.nome.split(' ').filter(w => /^[A-Za-záàãâéêíóõúçÁÀÃÂÉÊÍÓÕÚÇ]/.test(w)).map(w => w[0].toUpperCase()).slice(0, 3).join('');
    const newNum = String(clubs.length + 1).padStart(4, '0');
    setClubs(prev => [...prev, {
      initials, name: data.nome, filiacao: newNum, regiao: data.localidade || '—',
      status: 'Afiliado', quota: 'Pendente', atletas: 0, treinadores: 0, desde: data.filiadoDesde as number,
      presidente: data.presidente, email: data.email, tel: data.telefone,
      nipc: data.nipc, morada: data.morada,
      alerts: ['Documentação inicial pendente'],
      docs: [
        { tipo: 'Estatutos', validade: '—', ok: false },
        { tipo: 'Ata AG', validade: '—', ok: false },
        { tipo: 'Seguro coletivo', validade: '—', ok: false },
        { tipo: 'Certidão permanente', validade: '—', ok: false },
      ],
      treinadoresList: [], competicoes: 0, examesAno: 0, presencaMedia: 0,
    }]);
    setShowForm(false);
  }

  return (
    <>
      {selected && <FichaClube clube={selected} onClose={() => setSelected(null)} />}
      {showForm && <FormClube onSave={handleSaveClube} onClose={() => setShowForm(false)} />}

      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M1 — Gestão de Clubes</div>
          <div className="mod-hd-sub">{total} clubes registados · {afiliados} afiliados · {emDia} com quota paga</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary" onClick={() => setShowForm(true)}>+ Novo clube</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat"><span className="pf-stat-icon">🏛</span><div className="pf-stat-n">{total}</div><div className="pf-stat-l">Total clubes</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">✅</span><div className="pf-stat-n">{afiliados}</div><div className="pf-stat-l">Afiliados</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">💳</span><div className="pf-stat-n">{emDia}/{total}</div><div className="pf-stat-l">Quotas pagas</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">🥋</span><div className="pf-stat-n">{totalAtletas}</div><div className="pf-stat-l">Total atletas</div></div>
      </div>

      <div className="card-grid">
        {CLUBS.map((c) => (
          <div key={c.filiacao} className="mod-card" style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
            <div className="mod-card-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="mod-card-avatar">{c.initials}</div>
                <div>
                  <div className="mod-card-name">{c.name}</div>
                  <div className="mod-card-sub">Filiação nº{c.filiacao} · {c.regiao}</div>
                </div>
              </div>
              <span className={`badge ${statusClass[c.status]}`}>{c.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.72rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(246,244,241,0.45)' }}>Presidente</span>
                <span>{c.presidente}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(246,244,241,0.45)' }}>Quota anual</span>
                <span className={`badge ${quotaClass[c.quota]}`} style={{ fontSize: '0.58rem' }}>{c.quota}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(246,244,241,0.45)' }}>Afiliado desde</span>
                <span>{c.desde}</span>
              </div>
            </div>

            <div className="mod-card-stats">
              <div className="mod-card-stat"><div className="mod-card-stat-n">{c.atletas}</div><div className="mod-card-stat-l">Atletas</div></div>
              <div className="mod-card-stat"><div className="mod-card-stat-n">{c.treinadores}</div><div className="mod-card-stat-l">Treinadores</div></div>
            </div>

            {c.alerts.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {c.alerts.map((a, i) => (
                  <div key={i} className="alert-item alert-yellow" style={{ fontSize: '0.66rem', padding: '6px 10px', marginBottom: 4 }}>
                    <span>⚠</span><span className="alert-item-label">{a}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button className="btn" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={e => { e.stopPropagation(); setSelected(c); }}>Documentos</button>
              <button className="btn" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={e => { e.stopPropagation(); setSelected(c); }}>Ver atletas</button>
              <button className="btn primary" style={{ flex: 1, fontSize: '0.65rem', padding: '6px 0' }} onClick={e => { e.stopPropagation(); setSelected(c); }}>Ficha</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pf-panel" style={{ marginTop: 24 }}>
        <div className="pf-panel-head">
          <span>Ciclo de afiliação e renovação anual</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>Prazo: 31 Jan · Suspensão automática</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Candidatura', sub: 'Docs + pagamento', color: 'var(--gold)' },
            { label: 'Validação',   sub: 'Revisão pela direcção', color: '#60a5fa' },
            { label: 'Aprovado',    sub: 'Nº filiação gerado', color: '#4ade80' },
            { label: 'Ativo',       sub: 'Acesso completo', color: '#4ade80' },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 100 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${step.color}22`, border: `1px solid ${step.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: '0.7rem', color: step.color, fontWeight: 600 }}>{i + 1}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500 }}>{step.label}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{step.sub}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: '0.66rem', color: 'rgba(246,244,241,0.35)', textAlign: 'center' }}>
          Renovação anual: alerta 60 dias · prazo 31 Jan · suspensão automática se não renovado
        </div>
      </div>
    </>
  );
}
