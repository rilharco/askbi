export default function GalleryPage() {
  return (
    <>
      <section className="hero section-bg bg-smoke">
        <div className="hero-kanji" aria-hidden="true">記録</div>
        <div className="eyebrow reveal" data-delay="0">Momentos</div>
        <h2 className="reveal" data-delay="80">Galeria</h2>
        <p className="reveal" data-delay="160">
          Treinos, exames, estágios e competições. Momentos que constroem a história da nossa associação.
        </p>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/hero-ink.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-ember">
        <div className="section-head reveal">
          <div className="section-title">Coleções</div>
          <div className="subtle">Arquivo de momentos</div>
        </div>
        <div className="gallery-grid reveal">
          <div className="media-card">
            <img src="/assets/kata-lines.svg" alt="Treinos" style={{ objectFit: 'contain', padding: 24, opacity: 0.4 }} />
            <div className="tag">Treinos</div>
          </div>
          <div className="media-card">
            <img src="/assets/belt-curve.svg" alt="Exames" style={{ objectFit: 'contain', padding: 24, opacity: 0.4 }} />
            <div className="tag">Exames</div>
          </div>
          <div className="media-card">
            <img src="/assets/brush-stroke.svg" alt="Competições" style={{ objectFit: 'contain', padding: 24, opacity: 0.4 }} />
            <div className="tag">Competições</div>
          </div>
          <div className="media-card">
            <img src="/assets/dojo-grid.svg" alt="Estágios" style={{ objectFit: 'contain', padding: 24, opacity: 0.4 }} />
            <div className="tag">Estágios</div>
          </div>
          <div className="media-card">
            <img src="/assets/hero-ink.svg" alt="Workshops" style={{ objectFit: 'contain', padding: 24, opacity: 0.4 }} />
            <div className="tag">Workshops</div>
          </div>
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">Destaques</div>
          <div className="subtle">Eventos recentes</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon">🏅</span>
            <h3>Workshop técnico</h3>
            <p>Formação técnica com instrutores convidados de nível nacional. Sessões de Kata avançado e Bunkai.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">⛺</span>
            <h3>Estágio anual</h3>
            <p>Treinos intensivos, convívio e partilha entre praticantes de todos os níveis. Uma experiência única fora do dojo.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon">🥇</span>
            <h3>Competição regional</h3>
            <p>Participação em competições regionais com excelentes resultados nos escalões de Kata individual e Kumite.</p>
          </div>
        </div>
        <p className="subtle reveal" style={{ marginTop: 20, textAlign: 'center' }}>
          Em breve: galeria fotográfica completa com arquivo de eventos e graduações.
        </p>
      </section>
    </>
  );
}
