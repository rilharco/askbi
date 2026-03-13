export default function NewsPage() {
  const articles = [
    {
      date: 'Março 2025',
      tag: 'Graduação',
      title: 'Exame de graduação — Resultado',
      excerpt: 'Mais de 20 praticantes foram avaliados no último exame de graduação, com excelentes resultados em todos os níveis. Parabéns a todos os novos graduados!',
    },
    {
      date: 'Fevereiro 2025',
      tag: 'Workshop',
      title: 'Workshop de Kata Avançado',
      excerpt: 'Sessão especial com instrutor convidado de nível nacional. Foco em Kata Heian e aplicações práticas (Bunkai) para praticantes intermédios e avançados.',
    },
    {
      date: 'Janeiro 2025',
      tag: 'Competição',
      title: 'Resultados regionais — Kata e Kumite',
      excerpt: 'A nossa equipa conquistou 3 medalhas no campeonato regional de Karate. Um resultado que reflete o trabalho e dedicação de alunos e instrutores.',
    },
  ];

  const events = [
    { day: '14', month: 'Abr', title: 'Workshop técnico', desc: 'Kata Heian + Bunkai · Inscrições abertas' },
    { day: '28', month: 'Abr', title: 'Exame de graduação', desc: 'Kyus 9–4 · Inscrições até 20 de Abril' },
    { day: '17', month: 'Mai', title: 'Estágio regional', desc: 'Dois dias · Aberto a todos os níveis' },
    { day: '31', month: 'Mai', title: 'Demonstração pública', desc: 'Evento aberto à comunidade' },
  ];

  return (
    <>
      <section className="hero section-bg bg-ember">
        <div className="hero-kanji" aria-hidden="true">新聞</div>
        <div className="eyebrow reveal" data-delay="0">Atualizações</div>
        <h2 className="reveal" data-delay="80">Notícias e eventos</h2>
        <p className="reveal" data-delay="160">
          Atualizações do dojo, resultados de competições, graduações e próximos eventos. Mantém‑te a par de tudo.
        </p>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/brush-stroke.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Últimas notícias</div>
          <div className="subtle">Do dojo</div>
        </div>
        <div className="news-grid">
          {articles.map((a) => (
            <div className="news-item reveal" key={a.title}>
              <div className="news-tag">{a.tag}</div>
              <div className="news-date">{a.date}</div>
              <div className="news-title">{a.title}</div>
              <div className="news-excerpt">{a.excerpt}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">Próximos eventos</div>
          <div className="subtle">Calendário 2025</div>
        </div>
        <div className="event-list reveal">
          {events.map((ev) => (
            <div className="event-item" key={ev.title}>
              <div className="event-date-box">
                <div className="event-day">{ev.day}</div>
                <div className="event-month">{ev.month}</div>
              </div>
              <div className="event-content">
                <div className="event-title">{ev.title}</div>
                <div className="event-desc">{ev.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cta-row reveal" style={{ marginTop: 24 }}>
          <a className="btn primary" href="/contact">Inscrição em eventos</a>
          <a className="btn" href="/contact">Mais informações</a>
        </div>
      </section>
    </>
  );
}
