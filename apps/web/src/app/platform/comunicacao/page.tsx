'use client';
import { useState } from 'react';

const NOTICIAS = [
  {
    id: 1, tipo: 'Notícia',
    titulo: 'Campeonato Regional 2025 — Inscrições abertas',
    corpo: 'As inscrições para o Campeonato Regional da Madeira 2025 estão abertas. O evento realiza-se a 3 de Maio no Pavilhão do Caniço. Prazo de inscrição: 20 de Abril.',
    data: '15 Mar 2025', imagem: true, badge: 'badge-green',
  },
  {
    id: 2, tipo: 'Notícia',
    titulo: 'Novos regulamentos de arbitragem 2025',
    corpo: 'A Federação Portuguesa de Karate publicou os novos regulamentos de arbitragem para 2025. Todos os árbitros devem tomar conhecimento até 30 de Abril.',
    data: '10 Mar 2025', imagem: false, badge: 'badge-blue',
  },
  {
    id: 3, tipo: 'Circular',
    titulo: 'Quotas 2025 — Prazo de pagamento',
    corpo: 'Lembramos que o prazo para pagamento das quotas anuais de 2025 é 31 de Janeiro. Clubes com quota em atraso serão suspensos automaticamente.',
    data: '5 Jan 2025', imagem: false, badge: 'badge-yellow', leitura: '4/5 clubes',
  },
  {
    id: 4, tipo: 'Aviso urgente',
    titulo: 'Alteração de local — Exame de Março',
    corpo: 'Por razões logísticas, o exame de graduação de Março passa a realizar-se no Pavilhão Municipal do Funchal. Data mantém-se: 28 de Março às 10h.',
    data: '20 Mar 2025', imagem: false, badge: 'badge-red',
  },
];

const REGULAMENTOS = [
  { nome: 'Regulamento de Competições 2025', versao: 'v2.1', data: 'Jan 2025', tipo: 'PDF' },
  { nome: 'Regulamento de Exames e Graduações', versao: 'v1.8', data: 'Out 2024', tipo: 'PDF' },
  { nome: 'Regulamento de Arbitragem', versao: 'v3.0', data: 'Mar 2025', tipo: 'PDF' },
  { nome: 'Estatutos da Associação', versao: 'v1.2', data: 'Jun 2023', tipo: 'PDF' },
];

const tipoClass: Record<string, string> = {
  'Notícia': 'badge-blue',
  'Circular': 'badge-yellow',
  'Aviso urgente': 'badge-red',
  'Regulamento': 'badge-dim',
};

export default function ComunicacaoPage() {
  const [tab, setTab] = useState<'noticias' | 'regulamentos'>('noticias');

  return (
    <>
      <div className="mod-hd">
        <div className="mod-hd-text">
          <div className="mod-hd-title">M6 — Comunicação</div>
          <div className="mod-hd-sub">Notícias, circulares, avisos e regulamentos da associação</div>
        </div>
        <div className="mod-hd-actions">
          <button className="btn primary">+ Nova publicação</button>
        </div>
      </div>

      <div className="pf-stats" style={{ marginBottom: 24 }}>
        <div className="pf-stat">
          <span className="pf-stat-icon">📰</span>
          <div className="pf-stat-n">2</div>
          <div className="pf-stat-l">Notícias este mês</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📋</span>
          <div className="pf-stat-n">1</div>
          <div className="pf-stat-l">Circulares pendentes</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">🔔</span>
          <div className="pf-stat-n">1</div>
          <div className="pf-stat-l">Avisos urgentes</div>
        </div>
        <div className="pf-stat">
          <span className="pf-stat-icon">📄</span>
          <div className="pf-stat-n">{REGULAMENTOS.length}</div>
          <div className="pf-stat-l">Regulamentos</div>
        </div>
      </div>

      <div className="mod-tabs">
        <div className={`mod-tab ${tab === 'noticias' ? 'active' : ''}`} onClick={() => setTab('noticias')}>
          Notícias e Circulares
        </div>
        <div className={`mod-tab ${tab === 'regulamentos' ? 'active' : ''}`} onClick={() => setTab('regulamentos')}>
          Regulamentos
        </div>
      </div>

      {tab === 'noticias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {NOTICIAS.map((n) => (
            <div key={n.id} className="pf-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${tipoClass[n.tipo]}`} style={{ fontSize: '0.6rem' }}>{n.tipo}</span>
                  {n.tipo === 'Aviso urgente' && <span style={{ fontSize: '0.65rem', color: '#f87171' }}>🔔 Notificação enviada</span>}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.35)' }}>{n.data}</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 6 }}>{n.titulo}</div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(246,244,241,0.55)', lineHeight: 1.6, marginBottom: 12 }}>{n.corpo}</div>
              {n.leitura && (
                <div style={{ fontSize: '0.65rem', color: 'rgba(246,244,241,0.4)', marginBottom: 8 }}>
                  📖 Leitura confirmada: {n.leitura} clubes
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button className="btn" style={{ fontSize: '0.65rem' }}>Editar</button>
                <button className="btn" style={{ fontSize: '0.65rem' }}>Enviar notificação</button>
                {n.tipo === 'Circular' && <button className="btn" style={{ fontSize: '0.65rem' }}>Ver confirmações</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'regulamentos' && (
        <div className="pf-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="mod-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Versão</th>
                <th>Atualizado em</th>
                <th>Tipo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {REGULAMENTOS.map((r) => (
                <tr key={r.nome}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1rem' }}>📄</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>{r.nome}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>{r.versao}</span></td>
                  <td style={{ fontSize: '0.7rem', color: 'rgba(246,244,241,0.5)' }}>{r.data}</td>
                  <td><span className="badge badge-dim" style={{ fontSize: '0.6rem' }}>{r.tipo}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn" style={{ fontSize: '0.62rem', padding: '4px 10px' }}>Download</button>
                      <button className="btn" style={{ fontSize: '0.62rem', padding: '4px 10px' }}>Atualizar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
