'use client';

const EVENTS = [
  {
    data: '22 Mar 2025', dia: 22, mes: 'Mar', tipo: 'Competição', nome: 'Torneio Inter-Clubes Madeira',
    local: 'Pavilhão Municipal Funchal', hora: '09:00', badge: 'badge-green', concluido: true,
  },
  {
    data: '28 Abr 2025', dia: 28, mes: 'Abr', tipo: 'Exame', nome: 'Exame de Kyus — Avançados',
    local: 'Dojo Associação', hora: '10:00', badge: 'badge-yellow', concluido: false,
  },
  {
    data: '3 Mai 2025', dia: 3, mes: 'Mai', tipo: 'Competição', nome: 'Campeonato Regional Madeira 2025',
    local: 'Pavilhão do Caniço', hora: '09:00', badge: 'badge-green', concluido: false,
  },
  {
    data: '10 Mai 2025', dia: 10, mes: 'Mai', tipo: 'Exame', nome: 'Exame de Kyus — Infantis',
    local: 'Dojo Associação', hora: '10:30', badge: 'badge-yellow', concluido: false,
  },
  {
    data: '14 Jun 2025', dia: 14, mes: 'Jun', tipo: 'Formação', nome: 'Formação Antidopagem WADA 2025',
    local: 'Sede Associação', hora: '14:00', badge: 'badge-blue', concluido: false,
  },
  {
    data: '15 Jun 2025', dia: 15, mes: 'Jun', tipo: 'Exame', nome: 'Exame de Dan — Shodan',
    local: 'Dojo Associação', hora: '10:00', badge: 'badge-yellow', concluido: false,
  },
  {
    data: '28 Jun 2025', dia: 28, mes: 'Jun', tipo: 'Competição', nome: 'Copa da Madeira 2025',
    local: 'Pavilhão Machico', hora: '09:00', badge: 'badge-green', concluido: false,
  },
];

const TREINOS = [
  { clube: 'Clube Karate Funchal', dias: 'Seg, Qua, Sex', hora: '18:30 — 20:00', local: 'Pavilhão Funchal', atletas: 47 },
  { clube: 'Karate Câmara de Lobos', dias: 'Ter, Qui', hora: '19:00 — 20:30', local: 'Pavilhão C. Lobos', atletas: 23 },
  { clube: 'Shotokan Caniço', dias: 'Seg, Qua', hora: '18:00 — 19:30', local: 'Dojo Caniço', atletas: 31 },
  { clube: 'AKSA', dias: 'Ter, Sex', hora: '17:30 — 19:00', local: 'Pavilhão S. António', atletas: 19 },
  { clube: 'Karate Machico', dias: 'Qua, Sex', hora: '18:00 — 19:30', local: 'Pavilhão Machico', atletas: 15 },
];

const tipoColor: Record<string, string> = {
  'Competição': '#4ade80',
  'Exame': '#f1c232',
  'Formação': '#60a5fa',
};

export default function CalendarioPage() {
  return (
    <>
      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M8 — Calendário e Treinos</div>
          <div className="mod-hd-sub">Agenda regional 2025 · Competições, exames e formações</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar</button>
          <button className="btn primary">+ Novo evento</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat">
          <span className="pf-stat-icon">📅</span>
          <div className="pf-stat-n">{EVENTS.filter(e => !e.concluido).length}</div>
          <div className="pf-stat-l">Próximos eventos</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🏆</span>
          <div className="pf-stat-n">{EVENTS.filter(e => e.tipo === 'Competição').length}</div>
          <div className="pf-stat-l">Competições</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🥋</span>
          <div className="pf-stat-n">{EVENTS.filter(e => e.tipo === 'Exame').length}</div>
          <div className="pf-stat-l">Exames</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📚</span>
          <div className="pf-stat-n">{EVENTS.filter(e => e.tipo === 'Formação').length}</div>
          <div className="pf-stat-l">Formações</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Event timeline */}
        <div className="pf-panel">
          <div className="pf-panel-head"><span>Agenda 2025</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EVENTS.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', opacity: ev.concluido ? 0.45 : 1 }}>
                <div style={{
                  minWidth: 44, textAlign: 'center',
                  background: ev.concluido ? 'rgba(255,255,255,0.04)' : `${tipoColor[ev.tipo]}15`,
                  border: `1px solid ${ev.concluido ? 'rgba(255,255,255,0.08)' : tipoColor[ev.tipo] + '44'}`,
                  borderRadius: 8, padding: '6px 4px',
                }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: ev.concluido ? 'rgba(246,244,241,0.5)' : tipoColor[ev.tipo] }}>{ev.dia}</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(246,244,241,0.4)', textTransform: 'uppercase' }}>{ev.mes}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span className={`badge ${ev.badge}`} style={{ fontSize: '0.58rem' }}>{ev.tipo}</span>
                    {ev.concluido && <span style={{ fontSize: '0.58rem', color: 'rgba(246,244,241,0.35)' }}>Concluído</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 500, marginBottom: 2 }}>{ev.nome}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>{ev.hora} · {ev.local}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training schedules */}
        <div>
          <div className="pf-panel" style={{ marginBottom: 16 }}>
            <div className="pf-panel-head">
              <span>Horários de treino</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>{TREINOS.length} clubes</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TREINOS.map((t) => (
                <div key={t.clube} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 500 }}>{t.clube}</div>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.4)' }}>{t.atletas} atletas</span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.55)', marginBottom: 2 }}>
                    📅 {t.dias} · ⏰ {t.hora}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)' }}>📍 {t.local}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Presenças */}
          <div className="pf-panel">
            <div className="pf-panel-head">
              <span>Presenças — visão global</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>Últimos 30 dias</span>
            </div>
            {[
              { clube: 'Clube Karate Funchal', pct: 94 },
              { clube: 'Shotokan Caniço', pct: 87 },
              { clube: 'Karate C. Lobos', pct: 91 },
              { clube: 'AKSA', pct: 82 },
              { clube: 'Karate Machico', pct: 68 },
            ].map((row) => (
              <div key={row.clube} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(246,244,241,0.65)' }}>{row.clube}</span>
                  <span style={{ color: row.pct >= 85 ? '#4ade80' : row.pct >= 70 ? '#f1c232' : '#f87171' }}>{row.pct}%</span>
                </div>
                <div className="pf-belt-bar">
                  <div className="pf-belt-fill" style={{
                    width: `${row.pct}%`,
                    background: row.pct >= 85 ? 'rgba(74,222,128,0.5)' : row.pct >= 70 ? 'rgba(241,194,50,0.5)' : 'rgba(248,113,113,0.5)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
