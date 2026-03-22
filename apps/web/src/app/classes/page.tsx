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
        <div className="hero-media mesh parallax" data-parallax="0.08">
          <img src="/assets/hero-ink.svg" alt="" className="hero-ink-img" />
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
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M12 22V12M12 12C12 7 7 2 2 2c0 5 5 10 10 10zM12 12c0-5 5-10 10-10-5 0-10 5-10 10"/></svg></span>
            <h3>Iniciados</h3>
            <p>Para quem começa do zero ou tem pouca experiência. Foco em postura, técnicas básicas e espírito de aprendizagem. Todas as idades bem-vindas.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
            <h3>Intermédios</h3>
            <p>Praticantes com cintos de cor (amarelo a castanho claro). Aprofundamento técnico de Kata e introdução ao Kumite com parceiro.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
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
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M6.5 6.5h11M6.5 17.5h11M5 9v6M19 9v6M2 10.5v3M22 10.5v3"/></svg></span>
            <h3>Preparação física</h3>
            <p>Mobilidade, força e resistência adaptadas ao Karate. Aquecimento específico e treino funcional integrado em cada sessão.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></span>
            <h3>Técnica</h3>
            <p>Kihon, Kata e Kumite com progressão contínua e feedback individual. Cada aluno evolui ao seu ritmo com acompanhamento próximo.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></span>
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
