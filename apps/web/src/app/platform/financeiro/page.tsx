'use client';

const QUOTAS = [
  { clube: 'Clube Karate Funchal', filiacao: '0042', valor: 250, estado: 'Pago', data: '12 Jan 2025', ref: 'REF-2025-001' },
  { clube: 'Karate Câmara de Lobos', filiacao: '0017', valor: 250, estado: 'Pago', data: '8 Jan 2025', ref: 'REF-2025-002' },
  { clube: 'Karate Machico', filiacao: '0031', valor: 250, estado: 'Em atraso', data: '—', ref: '—' },
  { clube: 'Shotokan Caniço', filiacao: '0055', valor: 250, estado: 'Pendente', data: '—', ref: '—' },
  { clube: 'AKSA', filiacao: '0063', valor: 250, estado: 'Pago', data: '15 Jan 2025', ref: 'REF-2025-005' },
];

const TAXAS = [
  { desc: 'Exame Kyus — Avançados', clube: 'KF', atletas: 8, valor: 160, estado: 'Pago', data: '10 Mar 2025' },
  { desc: 'Exame Infantil Abr', clube: 'SC', atletas: 5, valor: 75, estado: 'Pendente', data: '—' },
  { desc: 'Camp. Regional — Inscrições', clube: 'KF', atletas: 12, valor: 240, estado: 'Pendente', data: '—' },
  { desc: 'Camp. Regional — Inscrições', clube: 'KCL', atletas: 7, valor: 140, estado: 'Pago', data: '18 Mar 2025' },
  { desc: 'Torneio Inter-Clubes', clube: 'KM', atletas: 4, valor: 80, estado: 'Pago', data: '1 Mar 2025' },
];

const estadoClass: Record<string, string> = {
  'Pago': 'badge-green',
  'Pendente': 'badge-yellow',
  'Em atraso': 'badge-red',
  'Isento': 'badge-dim',
};

export default function FinanceiroPage() {
  const totalQuotas = QUOTAS.reduce((s, q) => s + q.valor, 0);
  const pagoQuotas = QUOTAS.filter(q => q.estado === 'Pago').reduce((s, q) => s + q.valor, 0);
  const totalTaxas = TAXAS.filter(t => t.estado === 'Pago').reduce((s, t) => s + t.valor, 0);

  return (
    <>
      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M5 — Financeiro</div>
          <div className="mod-hd-sub">Quotas, taxas de exame e competição · Ano 2025</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn">Exportar Excel</button>
          <button className="btn primary">+ Registar pagamento</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat">
          <span className="pf-stat-icon">💳</span>
          <div className="pf-stat-n">€{pagoQuotas}</div>
          <div className="pf-stat-l">Quotas cobradas</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">⚠</span>
          <div className="pf-stat-n">€{totalQuotas - pagoQuotas}</div>
          <div className="pf-stat-l">Quotas pendentes</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🏆</span>
          <div className="pf-stat-n">€{totalTaxas}</div>
          <div className="pf-stat-l">Taxas cobradas</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📊</span>
          <div className="pf-stat-n">€{pagoQuotas + totalTaxas}</div>
          <div className="pf-stat-l">Total receita 2025</div>
        </div>
      </div>

      {/* Receita visual */}
      <div className="pf-panel" style={{ marginBottom: 20 }}>
        <div className="pf-panel-head"><span>Receita 2025 — visão geral</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Quotas de clubes', cobrado: pagoQuotas, esperado: totalQuotas },
            { label: 'Taxas de competição', cobrado: 220, esperado: 700 },
            { label: 'Taxas de exame', cobrado: 160, esperado: 320 },
          ].map((row) => (
            <div key={row.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 5 }}>
                <span style={{ color: 'rgba(246,244,241,0.65)' }}>{row.label}</span>
                <span>
                  <span style={{ color: 'var(--gold)', fontWeight: 600 }}>€{row.cobrado}</span>
                  <span style={{ color: 'rgba(246,244,241,0.35)', fontSize: '0.65rem' }}> / €{row.esperado}</span>
                </span>
              </div>
              <div className="pf-belt-bar">
                <div className="pf-belt-fill" style={{ width: `${Math.round(row.cobrado / row.esperado * 100)}%`, background: 'rgba(241,194,50,0.55)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotas table */}
      <div className="pf-panel" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
        <div className="pf-panel-head" style={{ padding: '14px 18px' }}>
          <span>Quotas anuais 2025</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>€250 / clube</span>
        </div>
        <table className="mod-table">
          <thead>
            <tr>
              <th>Clube</th>
              <th>Filiação</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Data pagamento</th>
              <th>Referência</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {QUOTAS.map((q) => (
              <tr key={q.filiacao}>
                <td style={{ fontWeight: 500, fontSize: '0.78rem' }}>{q.clube}</td>
                <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.5)' }}>Nº{q.filiacao}</td>
                <td style={{ fontSize: '0.78rem' }}>€{q.valor}</td>
                <td><span className={`badge ${estadoClass[q.estado]}`} style={{ fontSize: '0.6rem' }}>{q.estado}</span></td>
                <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.55)' }}>{q.data}</td>
                <td style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.4)', fontFamily: 'monospace' }}>{q.ref}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {q.estado !== 'Pago' && <button className="btn primary" style={{ fontSize: '0.6rem', padding: '3px 8px' }}>Registar</button>}
                    <button className="btn" style={{ fontSize: '0.6rem', padding: '3px 8px' }}>Recibo</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Taxas table */}
      <div className="pf-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="pf-panel-head" style={{ padding: '14px 18px' }}>
          <span>Taxas de exame e competição</span>
        </div>
        <table className="mod-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Clube</th>
              <th>Atletas</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TAXAS.map((t, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, fontSize: '0.78rem' }}>{t.desc}</td>
                <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.5)' }}>{t.clube}</td>
                <td style={{ fontSize: '0.78rem' }}>{t.atletas}</td>
                <td style={{ fontSize: '0.78rem' }}>€{t.valor}</td>
                <td><span className={`badge ${estadoClass[t.estado]}`} style={{ fontSize: '0.6rem' }}>{t.estado}</span></td>
                <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.55)' }}>{t.data}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {t.estado !== 'Pago' && <button className="btn primary" style={{ fontSize: '0.6rem', padding: '3px 8px' }}>Pagar</button>}
                    <button className="btn" style={{ fontSize: '0.6rem', padding: '3px 8px' }}>Fatura</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
