export default function KaratePage() {
  const belts = [
    { name: 'Branco', kyu: '9º Kyu', color: '#e8e8e8' },
    { name: 'Amarelo', kyu: '8º Kyu', color: '#f5d020' },
    { name: 'Laranja', kyu: '7º Kyu', color: '#f08020' },
    { name: 'Vermelho', kyu: '6º Kyu', color: '#b51920' },
    { name: 'Verde', kyu: '5º Kyu', color: '#2a9d4c' },
    { name: 'Azul', kyu: '4º Kyu', color: '#1a6bc0' },
    { name: 'Castanho', kyu: '1–3º Kyu', color: '#7c4a1c' },
    { name: 'Preto', kyu: '1º Dan+', color: '#1a1a1a', border: 'rgba(255,255,255,0.18)' },
  ];

  return (
    <>
      <section className="hero section-bg bg-ember">
        <div className="hero-kanji" aria-hidden="true">武道</div>
        <div className="eyebrow reveal" data-delay="0">Karate‑Do</div>
        <h2 className="reveal" data-delay="80">Karate‑Do Shotokan</h2>
        <p className="reveal" data-delay="160">
          Técnica, disciplina e crescimento pessoal. Treino equilibrado entre os três pilares fundamentais: Kihon, Kata e Kumite.
        </p>
        <div className="cta-row">
          <a className="btn primary reveal" data-delay="240" href="/inscriptions">Começar a treinar</a>
          <a className="btn reveal" data-delay="300" href="/classes">Ver aulas</a>
        </div>
        <div className="hero-media mesh parallax" data-parallax="0.08">
          <img src="/assets/hero-ink.svg" alt="" className="hero-ink-img" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Fundamentos</div>
          <div className="subtle">Os três pilares</div>
        </div>
        <div className="grid-3">
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a1 1 0 011-1h6a1 1 0 011 1v3M3 12h18"/></svg></span>
            <h3>Kihon</h3>
            <p>Base técnica fundamental: posturas, deslocamentos, golpes e defesas praticados em repetição até atingir a perfeição do movimento.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M2 12c2-4 3.5-6 6-6s4 4 6 4 3.5-6 6-6"/><path d="M2 18c2-4 3.5-6 6-6s4 4 6 4 3.5-6 6-6"/></svg></span>
            <h3>Kata</h3>
            <p>Sequências formais de técnicas para desenvolvimento de precisão, ritmo e controlo. Cada kata conta uma história de combate imaginário.</p>
          </div>
          <div className="card reveal">
            <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M14.5 17.5l2 2.5a2.121 2.121 0 003-3l-2.5-2M18 14l-3.5 3.5M3 14l3 3M14 3l3 3"/></svg></span>
            <h3>Kumite</h3>
            <p>Combate controlado com foco em estratégia, distância e respeito. Aplicação prática das técnicas aprendidas em Kihon e Kata.</p>
          </div>
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">Graduações</div>
          <div className="subtle">Progressão por cintos</div>
        </div>
        <div className="belt-progression reveal">
          {belts.map((belt) => (
            <div className="belt-item" key={belt.name}>
              <div
                className="belt-color"
                style={{
                  background: belt.color,
                  border: `1px solid ${belt.border || 'rgba(255,255,255,0.1)'}`,
                }}
              />
              <div className="belt-info">
                <div className="belt-name">{belt.name}</div>
                <div className="belt-kyu">{belt.kyu}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid-3" style={{ marginTop: 18 }}>
          <div className="card reveal">
            <h3>Kyus</h3>
            <p>Do 9º ao 1º kyu — aprendizagem progressiva dos fundamentos. Cada grau exige critérios específicos de técnica e conhecimento.</p>
          </div>
          <div className="card reveal">
            <h3>Dans</h3>
            <p>Do Shodan em diante — aperfeiçoamento avançado, pedagógico e filosófico. Uma responsabilidade para com o dojo e a tradição.</p>
          </div>
          <div className="card reveal">
            <h3>Exames</h3>
            <p>Critérios claros de avaliação, com feedback detalhado por parte dos instrutores para progressão segura e consistente.</p>
          </div>
        </div>
      </section>

      <section className="section-bg bg-ember">
        <div className="section-head reveal">
          <div className="section-title">Shotokan</div>
          <div className="subtle">A nossa linhagem</div>
        </div>
        <div className="two-col">
          <div className="card reveal">
            <h3>História</h3>
            <p>O Shotokan foi fundado por <strong>Gichin Funakoshi</strong>, considerado o pai do Karate moderno. O nome deriva de "Shoto" (ondas de pinheiro), pseudónimo poético de Funakoshi, e "Kan" (sala ou escola).</p>
            <p style={{ marginTop: 10, fontSize: '0.8rem', color: 'rgba(246,244,241,0.65)' }}>Praticado em todo o mundo, é conhecido pela ênfase em técnica profunda, posições baixas e golpes poderosos.</p>
          </div>
          <div className="card reveal">
            <h3>Filosofia</h3>
            <p>O Karate não é apenas combate — é um caminho (<em>do</em>) de desenvolvimento pessoal. A prática molda o caráter, fortalece a mente e cria pessoas mais conscientes e equilibradas.</p>
            <p style={{ marginTop: 10, fontSize: '0.8rem', color: 'rgba(246,244,241,0.65)' }}>"Karate wa rei ni hajimari rei ni owaru" — O Karate começa e termina com respeito.</p>
          </div>
        </div>
      </section>
    </>
  );
}
