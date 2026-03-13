export default function ClassesPage() {
  return (
    <>
      <section className="hero section-bg bg-gold-glow">
        <div className="hero-kanji" aria-hidden="true">稽古</div>
        <div className="eyebrow reveal" data-delay="0">Aulas</div>
        <h2 className="reveal" data-delay="80">Aulas e horários</h2>
        <p className="reveal" data-delay="160">
          Turmas por nível e idade, com progressão consistente e acompanhamento contínuo. Encontra o horário ideal para o teu percurso.
        </p>
        <div className="cta-row">
          <a className="btn primary reveal" data-delay="240" href="/inscriptions">Inscrever agora</a>
          <a className="btn reveal" data-delay="300" href="/contact">Falar connosco</a>
        </div>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/belt-curve.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Horário semanal</div>
          <div className="subtle">Turmas e níveis</div>
        </div>
        <div className="schedule-week reveal">
          <div className="schedule-day">
            <div className="schedule-day-label">Segunda</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Iniciados</div>
                <div className="schedule-class-time">19:00 – 20:00</div>
              </div>
            </div>
          </div>
          <div className="schedule-day">
            <div className="schedule-day-label">Terça</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Intermédios</div>
                <div className="schedule-class-time">20:00 – 21:15</div>
              </div>
            </div>
          </div>
          <div className="schedule-day">
            <div className="schedule-day-label">Quarta</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Iniciados</div>
                <div className="schedule-class-time">19:00 – 20:00</div>
              </div>
            </div>
          </div>
          <div className="schedule-day">
            <div className="schedule-day-label">Quinta</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Intermédios</div>
                <div className="schedule-class-time">20:00 – 21:15</div>
              </div>
            </div>
          </div>
          <div className="schedule-day">
            <div className="schedule-day-label">Sexta</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Avançados</div>
                <div className="schedule-class-time">19:30 – 21:00</div>
              </div>
            </div>
          </div>
          <div className="schedule-day">
            <div className="schedule-day-label">Sábado</div>
            <div className="schedule-day-content">
              <div className="schedule-class">
                <div className="schedule-class-name">Treino livre</div>
                <div className="schedule-class-time">10:00 – 11:30</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg bg-ember">
        <div className="section-head reveal">
          <div className="section-title">Turmas</div>
          <div className="subtle">Níveis e requisitos</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">🌱</span>
            <h3>Iniciados</h3>
            <p>Para quem começa do zero ou tem pouca experiência. Foco em postura, técnicas básicas e espírito de aprendizagem. Todas as idades bem-vindas.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🔥</span>
            <h3>Intermédios</h3>
            <p>Praticantes com cintos de cor (amarelo a castanho claro). Aprofundamento técnico de Kata e introdução ao Kumite com parceiro.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">⚡</span>
            <h3>Avançados</h3>
            <p>Brown e Black belts. Treino intensivo com Kata avançado, Kumite competitivo e preparação para exames de Dan.</p>
          </div>
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">O que inclui</div>
          <div className="subtle">Plano de treino completo</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">💪</span>
            <h3>Preparação física</h3>
            <p>Mobilidade, força e resistência adaptadas ao Karate. Aquecimento específico e treino funcional integrado em cada sessão.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🎯</span>
            <h3>Técnica</h3>
            <p>Kihon, Kata e Kumite com progressão contínua e feedback individual. Cada aluno evolui ao seu ritmo com acompanhamento próximo.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">📊</span>
            <h3>Avaliação</h3>
            <p>Feedback regular, metas por nível e exames de graduação com critérios claros. O teu progresso é acompanhado em cada etapa.</p>
          </div>
        </div>
        <div className="cta-row reveal" style={{ marginTop: 28 }}>
          <a className="btn primary" href="/inscriptions">Inscrever agora</a>
          <a className="btn" href="/contact">Aula experimental gratuita</a>
        </div>
      </section>
    </>
  );
}
