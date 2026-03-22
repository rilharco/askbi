'use client';
import { useState } from 'react';

const BELTS = [
  { kyu: 9, name: 'Branco',   color: '#e8e8e8', border: '1px solid rgba(0,0,0,0.2)' },
  { kyu: 8, name: 'Amarelo',  color: '#f5c518' },
  { kyu: 7, name: 'Laranja',  color: '#f08020' },
  { kyu: 6, name: 'Verde',    color: '#2a9d4c' },
  { kyu: 5, name: 'Azul claro', color: '#4a90d9' },
  { kyu: 4, name: 'Azul',     color: '#1a5fa8' },
  { kyu: 3, name: 'Castanho', color: '#7c4a1c' },
  { kyu: 2, name: 'Castanho', color: '#5a3010' },
  { kyu: 1, name: 'Castanho', color: '#3d200a' },
  { kyu: 0, name: 'Preto',    color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)' },
];

const CLUBES_LIST = ['Clube Karate Funchal', 'Karate Câmara de Lobos', 'Karate Machico', 'Shotokan Caniço', 'Academia Karate Santo António'];

const INITIAL_ATHLETES = [
  {
    id: '1', initials: 'MS', name: 'Miguel Santos', clube: 'Clube Karate Funchal', num: '2024-0341',
    kyu: 4, escalao: 'Juvenis A', inicio: 'Mar 2021', proximo: 'Mai 2025', docs: 'OK',
    email: 'miguel.santos@email.pt', dataNasc: '12/03/2010', tel: '+351 912 345 678',
    nif: '123456789', numCC: '12345678 9 ZZ0', morada: 'Rua da Sé, 12', codigoPostal: '9000-001',
    localidade: 'Funchal', encarregadoNome: 'Carlos Santos', encarregadoTel: '+351 912 000 001', encarregadoEmail: 'carlos.santos@email.pt',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Mar 2021', resultado: 'Aprovado' },
      { kyu: 8, nome: 'Amarelo', data: 'Nov 2021', resultado: 'Aprovado' },
      { kyu: 7, nome: 'Laranja', data: 'Jun 2022', resultado: 'Aprovado' },
      { kyu: 6, nome: 'Verde',   data: 'Jan 2023', resultado: 'Aprovado' },
      { kyu: 4, nome: 'Azul',    data: 'Out 2024', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Autorização parental', validade: 'Dez 2025', ok: true },
      { tipo: 'Certidão médica',      validade: 'Jun 2025', ok: true },
      { tipo: 'Seguro desportivo',    validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '2', initials: 'AP', name: 'Ana Pereira', clube: 'Karate Câmara de Lobos', num: '2022-0187',
    kyu: 2, escalao: 'Seniores', inicio: 'Set 2019', proximo: 'Jun 2025', docs: 'OK',
    email: 'ana.pereira@email.pt', dataNasc: '05/07/1998', tel: '+351 962 111 222',
    nif: '234567890', numCC: '23456789 1 ZZ1', morada: 'Av. das Descobertas, 45', codigoPostal: '9300-001',
    localidade: 'Câmara de Lobos', encarregadoNome: '', encarregadoTel: '', encarregadoEmail: '',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Set 2019', resultado: 'Aprovado' },
      { kyu: 8, nome: 'Amarelo', data: 'Mar 2020', resultado: 'Aprovado' },
      { kyu: 7, nome: 'Laranja', data: 'Out 2020', resultado: 'Aprovado' },
      { kyu: 6, nome: 'Verde',   data: 'Abr 2021', resultado: 'Aprovado' },
      { kyu: 5, nome: 'Azul claro', data: 'Nov 2021', resultado: 'Aprovado' },
      { kyu: 4, nome: 'Azul',    data: 'Mai 2022', resultado: 'Aprovado' },
      { kyu: 3, nome: 'Castanho', data: 'Jan 2023', resultado: 'Aprovado' },
      { kyu: 2, nome: 'Castanho', data: 'Set 2023', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Certidão médica',   validade: 'Mar 2026', ok: true },
      { tipo: 'Seguro desportivo', validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '3', initials: 'JS', name: 'João Silva', clube: 'Clube Karate Funchal', num: '2018-0043',
    kyu: 0, escalao: 'Seniores', inicio: 'Jan 2018', proximo: '—', docs: 'OK',
    email: 'joao.silva@email.pt', dataNasc: '18/08/1992', tel: '+351 918 000 111',
    nif: '345678901', numCC: '34567890 2 ZZ2', morada: 'Caminho Velho, 8', codigoPostal: '9000-050',
    localidade: 'Funchal', encarregadoNome: '', encarregadoTel: '', encarregadoEmail: '',
    dan: 1,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Jan 2018', resultado: 'Aprovado' },
      { kyu: 0, nome: 'Preto — Shodan', data: 'Jun 2022', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Certidão médica',   validade: 'Ago 2025', ok: true },
      { tipo: 'Seguro desportivo', validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '4', initials: 'MC', name: 'Maria Costa', clube: 'Shotokan Caniço', num: '2024-0512',
    kyu: 7, escalao: 'Infantis B', inicio: 'Out 2023', proximo: 'Abr 2025', docs: 'Pendente',
    email: '', dataNasc: '03/01/2014', tel: '',
    nif: '', numCC: '', morada: 'Rua do Mar, 3', codigoPostal: '9125-001',
    localidade: 'Santa Cruz', encarregadoNome: 'Paulo Costa', encarregadoTel: '+351 912 000 004', encarregadoEmail: 'paulo.costa@email.pt',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Out 2023', resultado: 'Aprovado' },
      { kyu: 8, nome: 'Amarelo', data: 'Mar 2024', resultado: 'Aprovado' },
      { kyu: 7, nome: 'Laranja', data: 'Out 2024', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Autorização parental', validade: '—',       ok: false },
      { tipo: 'Certidão médica',      validade: 'Dez 2025', ok: true },
      { tipo: 'Seguro desportivo',    validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '5', initials: 'PF', name: 'Pedro Fernandes', clube: 'Karate Machico', num: '2023-0298',
    kyu: 6, escalao: 'Juvenis B', inicio: 'Fev 2022', proximo: 'Mai 2025', docs: 'OK',
    email: 'pedro.fernandes@email.pt', dataNasc: '22/09/2009', tel: '+351 933 222 444',
    nif: '456789012', numCC: '45678901 3 ZZ3', morada: 'Rua dos Bombeiros, 15', codigoPostal: '9200-001',
    localidade: 'Machico', encarregadoNome: 'Luís Fernandes', encarregadoTel: '+351 912 000 005', encarregadoEmail: '',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Fev 2022', resultado: 'Aprovado' },
      { kyu: 6, nome: 'Verde',   data: 'Out 2023', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Autorização parental', validade: 'Nov 2025', ok: true },
      { tipo: 'Certidão médica',      validade: 'Fev 2026', ok: true },
      { tipo: 'Seguro desportivo',    validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '6', initials: 'IR', name: 'Inês Rodrigues', clube: 'Clube Karate Funchal', num: '2021-0156',
    kyu: 3, escalao: 'Juvenis A', inicio: 'Mai 2020', proximo: 'Jun 2025', docs: 'OK',
    email: 'ines.rodrigues@email.pt', dataNasc: '14/06/2008', tel: '+351 966 555 777',
    nif: '567890123', numCC: '56789012 4 ZZ4', morada: 'Tv. das Mercês, 7', codigoPostal: '9000-020',
    localidade: 'Funchal', encarregadoNome: 'Marta Rodrigues', encarregadoTel: '+351 912 000 006', encarregadoEmail: 'marta.r@email.pt',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Mai 2020', resultado: 'Aprovado' },
      { kyu: 5, nome: 'Azul claro', data: 'Mai 2022', resultado: 'Reprovado' },
      { kyu: 5, nome: 'Azul claro', data: 'Nov 2022', resultado: 'Aprovado' },
      { kyu: 3, nome: 'Castanho', data: 'Jan 2024', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Autorização parental', validade: 'Jun 2025', ok: true },
      { tipo: 'Certidão médica',      validade: 'Mai 2026', ok: true },
      { tipo: 'Seguro desportivo',    validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '7', initials: 'CN', name: 'Carlos Nóbrega', clube: 'Shotokan Caniço', num: '2015-0021',
    kyu: 0, escalao: 'Seniores', inicio: 'Mar 2015', proximo: '—', docs: 'OK',
    email: 'carlos.nobrega@email.pt', dataNasc: '30/10/1985', tel: '+351 910 888 999',
    nif: '678901234', numCC: '67890123 5 ZZ5', morada: 'Rua Principal, 22', codigoPostal: '9125-010',
    localidade: 'Caniço', encarregadoNome: '', encarregadoTel: '', encarregadoEmail: '',
    dan: 2,
    historial: [
      { kyu: 0, nome: 'Preto — Shodan', data: 'Jun 2018', resultado: 'Aprovado' },
      { kyu: -1, nome: 'Preto — Nidan', data: 'Jun 2021', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Certidão médica',   validade: 'Out 2025', ok: true },
      { tipo: 'Seguro desportivo', validade: 'Jan 2026', ok: true },
    ],
  },
  {
    id: '8', initials: 'SA', name: 'Sofia Abreu', clube: 'Academia Karate Santo António', num: '2024-0589',
    kyu: 8, escalao: 'Infantis A', inicio: 'Nov 2023', proximo: 'Abr 2025', docs: 'Pendente',
    email: '', dataNasc: '07/04/2015', tel: '',
    nif: '', numCC: '', morada: 'Rua de Santo António, 1', codigoPostal: '9000-100',
    localidade: 'Funchal', encarregadoNome: 'Teresa Abreu', encarregadoTel: '+351 912 000 008', encarregadoEmail: 'teresa.abreu@email.pt',
    dan: 0,
    historial: [
      { kyu: 9, nome: 'Branco',  data: 'Nov 2023', resultado: 'Aprovado' },
      { kyu: 8, nome: 'Amarelo', data: 'Mai 2024', resultado: 'Aprovado' },
    ],
    docsList: [
      { tipo: 'Autorização parental', validade: '—',       ok: false },
      { tipo: 'Certidão médica',      validade: '—',       ok: false },
      { tipo: 'Seguro desportivo',    validade: 'Jan 2026', ok: true },
    ],
  },
];

type Athlete = typeof INITIAL_ATHLETES[0];

// ─── Belt helpers ─────────────────────────────────────────────────

function getBelt(kyu: number, dan: number) {
  if (dan > 0) return { name: `${dan}º Dan`, color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)' };
  if (kyu === 0) return { name: 'Shodan', color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)' };
  return BELTS.find(b => b.kyu === kyu) || BELTS[0];
}

function BeltBadge({ kyu, dan }: { kyu: number; dan: number }) {
  const b = getBelt(kyu, dan);
  const label = dan > 0 ? `${dan}º Dan` : kyu === 0 ? 'Shodan' : `${kyu}º kyu · ${b.name}`;
  return (
    <span className="badge" style={{ background: `${b.color}33`, color: b.color === '#e8e8e8' ? '#ccc' : b.color, border: `1px solid ${b.color}66`, fontSize: '0.6rem' }}>
      {label}
    </span>
  );
}

function BeltTimeline({ kyu, dan }: { kyu: number; dan: number }) {
  const colors = ['#e8e8e8', '#f5c518', '#f08020', '#2a9d4c', '#4a90d9', '#5a3010', '#1a1a1a'];
  const done = dan > 0 ? 7 : kyu === 0 ? 7 : Math.max(0, 10 - kyu);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 140 }}>
      {colors.map((c, i) => (
        <div key={i} style={{ flex: 1, height: 3, background: i < done ? c : 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
      ))}
    </div>
  );
}

// ─── Ficha Modal (perfil completo) ───────────────────────────────

function FichaModal({ atleta, onClose, onEdit }: { atleta: Athlete; onClose: () => void; onEdit: () => void }) {
  const [tab, setTab] = useState<'pessoal' | 'desportivo' | 'documentos'>('pessoal');
  const belt = getBelt(atleta.kyu, atleta.dan);
  const beltLabel = atleta.dan > 0 ? `${atleta.dan}º Dan` : atleta.kyu === 0 ? 'Shodan' : `${atleta.kyu}º kyu · ${belt.name}`;
  const menor = atleta.dataNasc ? (new Date().getFullYear() - parseInt(atleta.dataNasc.split('/')[2])) < 18 : false;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '92vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="pf-avatar" style={{ width: 56, height: 56, fontSize: '1rem' }}>{atleta.initials}</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 3 }}>{atleta.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.45)', marginBottom: 8 }}>{atleta.clube} · Nº {atleta.num}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge" style={{ background: `${belt.color}33`, color: belt.color === '#e8e8e8' ? '#ccc' : belt.color, border: `1px solid ${belt.color}66`, fontSize: '0.6rem' }}>{beltLabel}</span>
                <span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>{atleta.escalao}</span>
                {menor && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>Menor</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(246,244,241,0.6)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {([
            { key: 'pessoal', label: 'Dados Pessoais' },
            { key: 'desportivo', label: 'Historial Desportivo' },
            { key: 'documentos', label: 'Documentos' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', fontSize: '0.72rem', color: tab === t.key ? '#f1c232' : 'rgba(246,244,241,0.45)', borderBottom: tab === t.key ? '2px solid #f1c232' : '2px solid transparent', marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'pessoal' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Identificação</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Data de nascimento', val: atleta.dataNasc || '—' },
                  { label: 'Nº Cartão Cidadão', val: atleta.numCC || '—' },
                  { label: 'NIF', val: atleta.nif || '—' },
                  { label: 'Nº Filiação', val: atleta.num },
                ].map(r => (
                  <div key={r.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: '0.78rem' }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Contacto</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Email', val: atleta.email || '—' },
                  { label: 'Telefone', val: atleta.tel || '—' },
                  { label: 'Morada', val: atleta.morada || '—' },
                  { label: 'Localidade', val: `${atleta.codigoPostal ? atleta.codigoPostal + ' · ' : ''}${atleta.localidade || '—'}` },
                ].map(r => (
                  <div key={r.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: '0.78rem' }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {menor && atleta.encarregadoNome && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Encarregado de Educação</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Nome', val: atleta.encarregadoNome },
                    { label: 'Telefone', val: atleta.encarregadoTel || '—' },
                    { label: 'Email', val: atleta.encarregadoEmail || '—' },
                  ].map(r => (
                    <div key={r.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{r.label}</div>
                      <div style={{ fontSize: '0.78rem' }}>{r.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Dados de filiação</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Clube', val: atleta.clube },
                  { label: 'Início', val: atleta.inicio },
                  { label: 'Escalão', val: atleta.escalao },
                  { label: 'Próx. exame', val: atleta.proximo },
                ].map(r => (
                  <div key={r.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 12px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: '0.78rem' }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'desportivo' && (
          <>
            {/* Belt progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Progressão de cinturão</div>
              <div style={{ display: 'flex', marginBottom: 16, gap: 2 }}>
                {BELTS.filter(b => b.kyu >= 0).reverse().map((b) => {
                  const reached = atleta.dan > 0 || atleta.kyu <= b.kyu;
                  return (
                    <div key={b.kyu} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ height: 6, background: reached ? b.color : 'rgba(255,255,255,0.08)', borderRadius: 3, marginBottom: 4, border: (b as any).border || 'none' }} />
                      <div style={{ fontSize: '0.52rem', color: reached ? 'rgba(246,244,241,0.55)' : 'rgba(246,244,241,0.2)' }}>{b.name[0]}</div>
                    </div>
                  );
                })}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 6, background: atleta.dan > 0 ? '#1a1a1a' : 'rgba(255,255,255,0.08)', border: atleta.dan > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none', borderRadius: 3, marginBottom: 4 }} />
                  <div style={{ fontSize: '0.52rem', color: atleta.dan > 0 ? 'rgba(246,244,241,0.55)' : 'rgba(246,244,241,0.2)' }}>Dan</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {atleta.historial.map((h, i) => {
                  const b = h.kyu >= 0 ? (BELTS.find(b => b.kyu === h.kyu) || BELTS[0]) : { color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)' };
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', background: 'rgba(255,255,255,0.025)', borderRadius: 7 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: b.color, border: (b as any).border || 'none', flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: '0.74rem' }}>{h.nome}</span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{h.data}</span>
                      <span className={`badge ${h.resultado === 'Aprovado' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.58rem' }}>{h.resultado}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === 'documentos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {atleta.docsList.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.025)', borderRadius: 8, border: `1px solid ${d.ok ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.15)'}` }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 500 }}>{d.tipo}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)', marginTop: 2 }}>Validade: {d.validade}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge ${d.ok ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.6rem' }}>{d.ok ? 'OK' : 'Pendente'}</span>
                  <button className="btn" style={{ fontSize: '0.6rem', padding: '4px 8px' }}>Carregar</button>
                </div>
              </div>
            ))}
            <button className="btn" style={{ fontSize: '0.7rem', marginTop: 8, alignSelf: 'flex-start' }}>+ Adicionar documento</button>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 16, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn" style={{ flex: 1 }} onClick={onEdit}>Editar dados</button>
          <button className="btn" style={{ flex: 1 }}>Propor exame</button>
          <button className="btn primary" style={{ flex: 1 }}>Imprimir ficha</button>
        </div>
      </div>
    </div>
  );
}

// ─── Formulário Novo / Editar Atleta ─────────────────────────────

const emptyForm = {
  nome: '', dataNasc: '', numCC: '', nif: '', email: '', tel: '',
  morada: '', codigoPostal: '', localidade: '', clube: CLUBES_LIST[0],
  escalao: 'Infantis A', kyu: 9, dan: 0,
  encarregadoNome: '', encarregadoTel: '', encarregadoEmail: '',
};

function FormAtleta({ initial, onSave, onClose, title }: {
  initial?: typeof emptyForm;
  onSave: (data: typeof emptyForm) => void;
  onClose: () => void;
  title: string;
}) {
  const [form, setForm] = useState(initial || emptyForm);
  const [section, setSection] = useState<'pessoal' | 'contacto' | 'desportivo' | 'encarregado'>('pessoal');

  const set = (k: keyof typeof emptyForm, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const anoNasc = form.dataNasc ? parseInt(form.dataNasc.split('/')[2] || form.dataNasc.split('-')[0]) : 0;
  const menor = anoNasc ? (new Date().getFullYear() - anoNasc) < 18 : false;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim()) return alert('Nome obrigatório');
    if (!form.dataNasc.trim()) return alert('Data de nascimento obrigatória');
    if (!form.clube) return alert('Clube obrigatório');
    onSave(form);
  }

  const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '8px 12px', color: '#f6f4f1', fontSize: '0.78rem', width: '100%', outline: 'none' };
  const labelStyle: React.CSSProperties = { fontSize: '0.6rem', color: 'rgba(246,244,241,0.35)', marginBottom: 4, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 680, maxHeight: '92vh', overflowY: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(246,244,241,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {([
            { key: 'pessoal', label: 'Identificação' },
            { key: 'contacto', label: 'Contacto' },
            { key: 'desportivo', label: 'Desportivo' },
            ...(menor ? [{ key: 'encarregado', label: 'Encarregado' }] : []),
          ] as const).map(t => (
            <button key={t.key} type="button" onClick={() => setSection(t.key as any)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', fontSize: '0.7rem', color: section === t.key ? '#f1c232' : 'rgba(246,244,241,0.45)', borderBottom: section === t.key ? '2px solid #f1c232' : '2px solid transparent', marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {section === 'pessoal' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Nome completo *</label>
                  <input style={inputStyle} value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Nome completo do atleta" required />
                </div>
                <div>
                  <label style={labelStyle}>Data de nascimento *</label>
                  <input style={inputStyle} value={form.dataNasc} onChange={e => set('dataNasc', e.target.value)} placeholder="DD/MM/AAAA" required />
                </div>
                <div>
                  <label style={labelStyle}>Nº Cartão de Cidadão</label>
                  <input style={inputStyle} value={form.numCC} onChange={e => set('numCC', e.target.value)} placeholder="00000000 0 XX0" />
                </div>
                <div>
                  <label style={labelStyle}>NIF</label>
                  <input style={inputStyle} value={form.nif} onChange={e => set('nif', e.target.value)} placeholder="123456789" />
                </div>
              </div>
            </div>
          )}

          {section === 'contacto' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="atleta@email.pt" />
              </div>
              <div>
                <label style={labelStyle}>Telefone</label>
                <input style={inputStyle} value={form.tel} onChange={e => set('tel', e.target.value)} placeholder="+351 912 345 678" />
              </div>
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
            </div>
          )}

          {section === 'desportivo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Clube *</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.clube} onChange={e => set('clube', e.target.value)}>
                  {CLUBES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Escalão</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.escalao} onChange={e => set('escalao', e.target.value)}>
                  {['Infantis A', 'Infantis B', 'Juvenis A', 'Juvenis B', 'Juniores', 'Seniores'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Grau atual (kyu)</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.kyu} onChange={e => set('kyu', parseInt(e.target.value))}>
                  {BELTS.map(b => <option key={b.kyu} value={b.kyu}>{b.kyu === 0 ? 'Cinto Preto (Shodan)' : `${b.kyu}º kyu — ${b.name}`}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Dan (0 = nenhum)</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.dan} onChange={e => set('dan', parseInt(e.target.value))}>
                  {[0,1,2,3,4,5].map(d => <option key={d} value={d}>{d === 0 ? 'Nenhum' : `${d}º Dan`}</option>)}
                </select>
              </div>
            </div>
          )}

          {section === 'encarregado' && menor && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <div className="alert-item alert-blue" style={{ padding: '8px 12px', marginBottom: 12, fontSize: '0.7rem' }}>
                  <span className="alert-item-label">Atleta menor de idade — encarregado de educação obrigatório</span>
                </div>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Nome do encarregado *</label>
                <input style={inputStyle} value={form.encarregadoNome} onChange={e => set('encarregadoNome', e.target.value)} placeholder="Nome completo" />
              </div>
              <div>
                <label style={labelStyle}>Telefone</label>
                <input style={inputStyle} value={form.encarregadoTel} onChange={e => set('encarregadoTel', e.target.value)} placeholder="+351 912 345 678" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle} value={form.encarregadoEmail} onChange={e => set('encarregadoEmail', e.target.value)} placeholder="encarregado@email.pt" />
              </div>
            </div>
          )}

          {/* Navigation + Save */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {section !== 'pessoal' && (
                <button type="button" className="btn" onClick={() => {
                  const order = ['pessoal', 'contacto', 'desportivo', ...(menor ? ['encarregado'] : [])];
                  const i = order.indexOf(section);
                  setSection(order[i - 1] as any);
                }}>← Anterior</button>
              )}
              {section !== (menor ? 'encarregado' : 'desportivo') && (
                <button type="button" className="btn" onClick={() => {
                  const order = ['pessoal', 'contacto', 'desportivo', ...(menor ? ['encarregado'] : [])];
                  const i = order.indexOf(section);
                  setSection(order[i + 1] as any);
                }}>Próximo →</button>
              )}
            </div>
            <button type="submit" className="btn primary" style={{ minWidth: 120 }}>Guardar atleta</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────

export default function AtletasPage() {
  const [athletes, setAthletes] = useState(INITIAL_ATHLETES);
  const [selected, setSelected] = useState<Athlete | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editAtleta, setEditAtleta] = useState<Athlete | null>(null);
  const [search, setSearch] = useState('');
  const [filterEscalao, setFilterEscalao] = useState('');

  const filtered = athletes.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.clube.toLowerCase().includes(search.toLowerCase()) || a.num.includes(search);
    const matchEscalao = !filterEscalao || a.escalao === filterEscalao;
    return matchSearch && matchEscalao;
  });

  function handleSave(data: typeof emptyForm) {
    if (editAtleta) {
      setAthletes(prev => prev.map(a => a.id === editAtleta.id ? { ...a, ...data, name: data.nome, tel: data.tel } : a));
    } else {
      const newId = Date.now().toString();
      const initials = data.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const year = new Date().getFullYear();
      const num = `${year}-${String(athletes.length + 1).padStart(4, '0')}`;
      setAthletes(prev => [...prev, {
        id: newId, initials, name: data.nome, clube: data.clube, num,
        kyu: data.kyu, dan: data.dan, escalao: data.escalao,
        inicio: new Date().toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' }),
        proximo: '—', docs: 'Pendente',
        email: data.email, dataNasc: data.dataNasc, tel: data.tel,
        nif: data.nif, numCC: data.numCC,
        morada: data.morada, codigoPostal: data.codigoPostal, localidade: data.localidade,
        encarregadoNome: data.encarregadoNome, encarregadoTel: data.encarregadoTel, encarregadoEmail: data.encarregadoEmail,
        historial: [], docsList: [
          { tipo: 'Seguro desportivo', validade: '—', ok: false },
          { tipo: 'Certidão médica', validade: '—', ok: false },
        ],
      }]);
    }
    setShowForm(false);
    setEditAtleta(null);
  }

  return (
    <>
      {selected && !showForm && (
        <FichaModal
          atleta={selected}
          onClose={() => setSelected(null)}
          onEdit={() => { setEditAtleta(selected); setShowForm(true); setSelected(null); }}
        />
      )}
      {showForm && (
        <FormAtleta
          title={editAtleta ? `Editar — ${editAtleta.name}` : 'Novo atleta'}
          initial={editAtleta ? {
            nome: editAtleta.name, dataNasc: editAtleta.dataNasc, numCC: editAtleta.numCC,
            nif: editAtleta.nif, email: editAtleta.email, tel: editAtleta.tel,
            morada: editAtleta.morada, codigoPostal: editAtleta.codigoPostal, localidade: editAtleta.localidade,
            clube: editAtleta.clube, escalao: editAtleta.escalao, kyu: editAtleta.kyu, dan: editAtleta.dan,
            encarregadoNome: editAtleta.encarregadoNome, encarregadoTel: editAtleta.encarregadoTel, encarregadoEmail: editAtleta.encarregadoEmail,
          } : undefined}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditAtleta(null); }}
        />
      )}

      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M2 — Atletas e Graduações</div>
          <div className="mod-hd-sub">{athletes.length} atletas registados · {athletes.filter(a => a.docs === 'OK').length} com documentação completa</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary" onClick={() => { setEditAtleta(null); setShowForm(true); }}>+ Novo atleta</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat"><span className="pf-stat-icon">🥋</span><div className="pf-stat-n">{athletes.length}</div><div className="pf-stat-l">Total atletas</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">✅</span><div className="pf-stat-n">{athletes.filter(a => a.docs === 'OK').length}</div><div className="pf-stat-l">Docs completos</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">🏅</span><div className="pf-stat-n">{athletes.filter(a => a.dan > 0 || a.kyu === 0).length}</div><div className="pf-stat-l">Cinto preto</div></div>
        <div className="pf-stat"><span className="pf-stat-icon">⚠</span><div className="pf-stat-n">{athletes.filter(a => a.docs === 'Pendente').length}</div><div className="pf-stat-l">Docs pendentes</div></div>
      </div>

      <div className="mod-search">
        <span style={{ color: 'rgba(246,244,241,0.35)' }}>🔍</span>
        <input placeholder="Pesquisar atleta, clube, nº filiação..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ background: 'none', border: 'none', color: 'rgba(246,244,241,0.5)', fontSize: '0.72rem', outline: 'none' }} value={filterEscalao} onChange={e => setFilterEscalao(e.target.value)}>
          <option value="">Todos os escalões</option>
          {['Infantis A', 'Infantis B', 'Juvenis A', 'Juvenis B', 'Juniores', 'Seniores'].map(e => <option key={e}>{e}</option>)}
        </select>
      </div>

      <div className="pf-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="mod-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Atleta</th><th>Clube</th><th>Escalão</th>
              <th>Graduação</th><th>Progressão</th>
              <th>Próx. exame</th><th>Docs</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(a)}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="pf-avatar" style={{ width: 30, height: 30, fontSize: '0.62rem' }}>{a.initials}</div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 500 }}>{a.name}</div>
                      <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>Nº {a.num}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: '0.72rem', color: 'rgba(246,244,241,0.6)' }}>{a.clube}</td>
                <td style={{ fontSize: '0.72rem' }}>{a.escalao}</td>
                <td><BeltBadge kyu={a.kyu} dan={a.dan} /></td>
                <td><BeltTimeline kyu={a.kyu} dan={a.dan} /></td>
                <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.55)' }}>{a.proximo}</td>
                <td><span className={`badge ${a.docs === 'OK' ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: '0.58rem' }}>{a.docs}</span></td>
                <td>
                  <button className="btn" style={{ fontSize: '0.62rem', padding: '4px 10px' }} onClick={e => { e.stopPropagation(); setSelected(a); }}>Ficha</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: 'rgba(246,244,241,0.3)', padding: '24px', fontSize: '0.8rem' }}>Nenhum atleta encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pf-panel" style={{ marginTop: 20 }}>
        <div className="pf-panel-head">
          <span>Fluxo de exame de graduação</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>3 propostas pendentes</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Treinador propõe', color: '#f1c232' },
            { label: 'Assoc. agenda', color: '#60a5fa' },
            { label: 'Realização', color: '#a78bfa' },
            { label: 'Aprovado', color: '#4ade80' },
            { label: 'Reprovado', color: '#f87171' },
          ].map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 80 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '0 4px' }}>
                <div style={{ background: `${step.color}22`, border: `1px solid ${step.color}55`, borderRadius: 6, padding: '8px 6px' }}>
                  <div style={{ fontSize: '0.7rem', color: step.color, fontWeight: 500 }}>{step.label}</div>
                </div>
              </div>
              {i < 2 && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
