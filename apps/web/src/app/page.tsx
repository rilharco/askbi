export default function HomePage() {
  const members = [
    { initials: 'JS', name: 'João Silva', rank: 'Shodan', pct: 100, color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)' },
    { initials: 'ML', name: 'Maria Lopes', rank: '3º Kyu', pct: 75, color: '#7c4a1c', border: 'none' },
    { initials: 'PM', name: 'Pedro Martins', rank: '5º Kyu', pct: 50, color: '#2a9d4c', border: 'none' },
    { initials: 'AF', name: 'Ana Ferreira', rank: '7º Kyu', pct: 25, color: '#f08020', border: 'none' },
  ];

  const exams = [
    { name: 'Exame de Kyus — Avançados', date: '28 Abr 2025', status: 'Confirmado' },
    { name: 'Exame de Dan — Shodan', date: '15 Jun 2025', status: 'A confirmar' },
    { name: 'Exame infantil', date: '10 Mai 2025', status: 'Confirmado' },
  ];

  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <section className="hero section-bg bg-ember">
        <div className="hero-kanji" aria-hidden="true">空手道</div>
        <div className="section-watermark" aria-hidden="true">01</div>
        <div className="eyebrow reveal" data-delay="0">Associação Shotokan · Beira Interior</div>
        <h2 className="reveal" data-delay="80">
          Disciplina, respeito<br />e evolução
        </h2>
        <p className="reveal" data-delay="160">
          Treino tradicional de Karate‑Do com foco em técnica, saúde e crescimento pessoal. Para todas as idades e níveis de experiência.
        </p>
        <div className="cta-row">
          <a className="btn primary reveal" data-delay="240" href="/inscriptions">Inscrever agora</a>
          <a className="btn reveal" data-delay="300" href="/classes">Ver horários</a>
        </div>
        <div className="stats-row reveal" data-delay="420">
          <div className="stat-item">
            <div className="stat-number" data-count="15">15+</div>
            <div className="stat-label">Anos de tradição</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="127">127</div>
            <div className="stat-label">Praticantes ativos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="5">5</div>
            <div className="stat-label">Graus Dan</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="3">3</div>
            <div className="stat-label">Turmas semanais</div>
          </div>
        </div>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.18">
          <img src="/assets/hero-ink.svg" alt="" />
        </div>
        <img
          className="parallax reveal"
          data-delay="360"
          data-parallax="0.12"
          src="/assets/logo.svg"
          alt="Emblema Associação Shotokan"
          style={{ width: 160, opacity: 0.9 }}
        />
      </section>

      {/* ── Visão ──────────────────────────────── */}
      <section className="section-bg bg-smoke">
        <div className="section-watermark" aria-hidden="true">02</div>
        <div className="section-head reveal">
          <div className="section-title">Visão</div>
          <div className="subtle">Tradição e comunidade</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">⛩️</span>
            <h3>Tradição</h3>
            <p>Estilo Shotokan com base nos fundamentos clássicos do Karate‑Do e na filosofia do dojo. Raízes profundas, prática consistente.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🤝</span>
            <h3>Comunidade</h3>
            <p>Uma associação para partilha, respeito e crescimento coletivo. Um espaço onde todos se apoiam e evoluem juntos.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🥋</span>
            <h3>Progressão</h3>
            <p>Planos de treino por níveis, com acompanhamento próximo e exames regulares de graduação para cada praticante.</p>
          </div>
        </div>
      </section>

      {/* ── Experiência ────────────────────────── */}
      <section className="section-bg bg-gold-glow">
        <div className="section-watermark" aria-hidden="true">03</div>
        <div className="section-head reveal">
          <div className="section-title">Experiência</div>
          <div className="subtle">Formação consistente</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">🎯</span>
            <h3>Rigor técnico</h3>
            <p>Metodologia estruturada com progressão por níveis — Kihon, Kata e Kumite desenvolvidos com precisão e consistência.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🛡️</span>
            <h3>Ambiente seguro</h3>
            <p>Treinos supervisionados com atenção individual a cada praticante, desde os mais jovens aos mais avançados.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🏆</span>
            <h3>Resultados</h3>
            <p>Preparação física e mental para objetivos pessoais, competição ou simplesmente uma prática de vida saudável.</p>
          </div>
        </div>
      </section>

      {/* ── Dojo Kun ───────────────────────────── */}
      <section className="section-bg bg-ember">
        <div className="section-watermark" aria-hidden="true">04</div>
        <div className="section-head reveal">
          <div className="section-title">Dojo Kun</div>
          <div className="subtle">Os cinco princípios</div>
        </div>
        <div className="dojo-kun reveal">
          <div className="kun-item">
            <div className="kun-number">一</div>
            <div className="kun-text">
              <strong>Caráter</strong>
              <span>Buscar a perfeição do caráter</span>
            </div>
          </div>
          <div className="kun-item">
            <div className="kun-number">二</div>
            <div className="kun-text">
              <strong>Sinceridade</strong>
              <span>Ser fiel ao caminho da verdade</span>
            </div>
          </div>
          <div className="kun-item">
            <div className="kun-number">三</div>
            <div className="kun-text">
              <strong>Esforço</strong>
              <span>Cultivar o espírito do esforço máximo</span>
            </div>
          </div>
          <div className="kun-item">
            <div className="kun-number">四</div>
            <div className="kun-text">
              <strong>Respeito</strong>
              <span>Respeitar os outros acima de tudo</span>
            </div>
          </div>
          <div className="kun-item">
            <div className="kun-number">五</div>
            <div className="kun-text">
              <strong>Autocontrolo</strong>
              <span>Abster‑se de comportamentos violentos</span>
            </div>
          </div>
        </div>
        <div className="cta-row reveal" style={{ marginTop: 28 }}>
          <a className="btn primary" href="/inscriptions">Começar agora</a>
          <a className="btn" href="/association">Conhecer a associação</a>
        </div>
      </section>

      {/* ── Platform Preview ───────────────────── */}
      <section className="section-bg bg-smoke pp-section">
        <div className="section-watermark" aria-hidden="true">05</div>
        <div className="section-head reveal">
          <div className="section-title">Plataforma</div>
          <div className="subtle">Gestão interna</div>
        </div>
        <p className="reveal" style={{ maxWidth: 560, marginBottom: 8, color: 'rgba(246,244,241,0.65)', fontSize: '0.88rem', lineHeight: 1.7 }}>
          Uma plataforma exclusiva para instrutores — gestão de membros, acompanhamento de progressão, agendamento de exames e muito mais.
        </p>
        <div className="pp-coming-badge reveal" style={{ marginBottom: 20 }}>
          <div className="pp-coming-dot" />
          Em desenvolvimento
        </div>
        <div className="feature-grid reveal" style={{ marginBottom: 28 }}>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <div className="feature-title">Gestão de membros</div>
            <div className="feature-desc">Fichas completas com histórico de graduações, presença e evolução técnica.</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🥋</div>
            <div className="feature-title">Graduações</div>
            <div className="feature-desc">Registo de cintos, datas de exame e critérios de progressão por nível.</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📅</div>
            <div className="feature-title">Exames</div>
            <div className="feature-desc">Agendamento, inscrição de alunos e registo de resultados em cada exame.</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Dashboard</div>
            <div className="feature-desc">Visão geral da associação — estatísticas, alertas e atividade recente.</div>
          </div>
        </div>

        {/* Platform mockup */}
        <div className="platform-preview-wrap reveal">
          <div className="platform-preview-frame">
            {/* Top bar */}
            <div className="pp-topbar">
              <div className="pp-topbar-brand">
                <div className="pp-topbar-dot" />
                <div className="pp-topbar-title">Plataforma ASKBI</div>
              </div>
              <div className="pp-topbar-nav">
                <span className="pp-active">Dashboard</span>
                <span>Membros</span>
                <span>Exames</span>
                <span>Graduações</span>
              </div>
            </div>

            {/* Body */}
            <div className="pp-body">
              {/* Stats row */}
              <div className="pp-stats">
                <div className="pp-stat">
                  <div className="pp-stat-n">127</div>
                  <div className="pp-stat-l">Total Membros</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-n">3</div>
                  <div className="pp-stat-l">Exames próximos</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-n">24</div>
                  <div className="pp-stat-l">Graduados este ano</div>
                </div>
              </div>

              {/* Two-column layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {/* Members list */}
                <div>
                  <div className="pp-section-head">Membros recentes</div>
                  {members.map((m) => (
                    <div className="pp-member-item" key={m.name}>
                      <div className="pp-member-avatar">{m.initials}</div>
                      <div className="pp-member-info">
                        <div className="pp-member-name">{m.name}</div>
                        <div className="pp-member-belt-row">
                          <div className="pp-belt-track">
                            <div
                              className="pp-belt-fill"
                              style={{
                                width: `${m.pct}%`,
                                background: m.color,
                                border: m.border,
                              }}
                            />
                          </div>
                          <div className="pp-member-rank">{m.rank}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exams list */}
                <div>
                  <div className="pp-section-head">Próximos exames</div>
                  {exams.map((ex) => (
                    <div className="pp-exam-item" key={ex.name}>
                      <div>
                        <div className="pp-exam-name">{ex.name}</div>
                        <div className="pp-exam-date">{ex.date}</div>
                      </div>
                      <div className="pp-exam-badge">{ex.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-row reveal" style={{ marginTop: 28 }}>
          <a className="btn primary" href="/instructors">Acesso à plataforma</a>
          <a className="btn" href="/contact">Saber mais</a>
        </div>
      </section>
    </>
  );
}
