export default function AssociationPage() {
  return (
    <>
      <section className="hero section-bg bg-smoke">
        <div className="hero-kanji" aria-hidden="true">道場</div>
        <div className="eyebrow reveal" data-delay="0">A Associação</div>
        <h2 className="reveal" data-delay="80">A nossa associação</h2>
        <p className="reveal" data-delay="160">
          Uma estrutura dedicada ao Karate‑Do, formação técnica e valores humanos. Um espaço de treino, convívio e superação para toda a comunidade.
        </p>
        <div className="cta-row">
          <a className="btn primary reveal" data-delay="240" href="/inscriptions">Junta‑te a nós</a>
          <a className="btn reveal" data-delay="300" href="/classes">Aulas e horários</a>
        </div>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/dojo-grid.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-ember">
        <div className="section-head reveal">
          <div className="section-title">História</div>
          <div className="subtle">Raízes e missão</div>
        </div>
        <div className="timeline reveal">
          <div className="timeline-item">
            <div className="timeline-year">Fundação</div>
            <div className="timeline-text">A Associação Shotokan nasce com a missão de tornar o Karate‑Do acessível à comunidade da Beira Interior, mantendo a fidelidade às raízes japonesas do estilo Shotokan.</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">Crescimento</div>
            <div className="timeline-text">Com o aumento de praticantes e a formação de novos instrutores, o dojo consolida-se como referência regional, participando em competições nacionais e estágios internacionais.</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">Hoje</div>
            <div className="timeline-text">Mais de 100 praticantes ativos, múltiplos graus Dan formados, e uma comunidade forte que vai muito além do tatami. A associação continua a crescer com a mesma filosofia de sempre.</div>
          </div>
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">Valores</div>
          <div className="subtle">Dojo Kun</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">🧭</span>
            <h3>Caráter</h3>
            <p>Desenvolvimento pessoal com responsabilidade e perseverança. O Karate molda não apenas o corpo, mas quem somos dentro e fora do tatami.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🙏</span>
            <h3>Respeito</h3>
            <p>Relação equilibrada entre instrutores, colegas e comunidade. O respeito é o primeiro e último gesto de cada sessão — começa e termina com rei.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🧘</span>
            <h3>Autocontrolo</h3>
            <p>Treino de corpo e mente para decisões mais conscientes. A capacidade de se conter é tão importante como a técnica que se domina.</p>
          </div>
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">A nossa estrutura</div>
          <div className="subtle">Organização interna</div>
        </div>
        <div className="two-col">
          <div className="card reveal">
            <h3>Direção técnica</h3>
            <p>A associação é dirigida por instrutores com longa experiência no estilo Shotokan, formados em Portugal e no estrangeiro. A equipa técnica garante a qualidade e coerência do ensino em todos os níveis.</p>
            <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'rgba(246,244,241,0.6)' }}>Filiação às federações nacionais e internacionais de Karate.</p>
          </div>
          <div className="card reveal">
            <h3>Programas</h3>
            <p>Além do treino regular, a associação organiza estágios, workshops técnicos, demonstrações públicas e participação em competições regionais e nacionais.</p>
            <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'rgba(246,244,241,0.6)' }}>Programas para jovens, adultos e praticantes com necessidades especiais.</p>
          </div>
        </div>
        <div className="cta-row reveal" style={{ marginTop: 28 }}>
          <a className="btn primary" href="/contact">Contactar a associação</a>
          <a className="btn" href="/instructors">Conhecer a equipa</a>
        </div>
      </section>
    </>
  );
}
