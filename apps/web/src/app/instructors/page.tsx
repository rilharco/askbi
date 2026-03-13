'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InstructorsPage() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => router.push('/platform/login'), 280);
  };

  return (
    <div className="page-instructors">
      <section className="hero section-bg bg-ember">
        <div className="eyebrow reveal" data-delay="0">Equipa Técnica</div>
        <h2 className="reveal" data-delay="80">Instrutores e acesso</h2>
        <p className="reveal" data-delay="160">
          Equipa técnica com foco em rigor, progressão e acompanhamento contínuo.
        </p>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/hero-ink.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Equipa</div>
          <div className="subtle">Direção técnica e acompanhamento</div>
        </div>
        <div className="profile-grid">
          <div className="profile-card reveal">
            <div className="badge">Sensei</div>
            <h3>Instrutor Principal</h3>
            <p>Especialização em Kata e Kumite. +15 anos de experiência em competição e formação.</p>
          </div>
          <div className="profile-card reveal">
            <div className="badge">Treino</div>
            <h3>Assistente Técnico</h3>
            <p>Planeamento de sessões, preparação física e apoio a praticantes iniciados.</p>
          </div>
          <div className="profile-card reveal">
            <div className="badge">Formação</div>
            <h3>Coordenação</h3>
            <p>Gestão de graduações, eventos e ligação à comunidade local.</p>
          </div>
        </div>
      </section>

      <section className="section-bg bg-gold-glow">
        <div className="section-head reveal">
          <div className="section-title">Área Reservada</div>
          <div className="subtle">Acesso para instrutores e alunos</div>
        </div>
        <div className="login-stage reveal">
          <div
            className={`logo-shell ${opening ? 'is-opening' : ''}`}
            id="js-belt"
            onDoubleClick={handleOpen}
          >
            <img src="/assets/logo.svg" alt="Associação Shotokan Karate-Do" />
          </div>
          <div className="login-card" id="js-card">
            <h3>Login</h3>
            <p>Área de instrutores e alunos.</p>
            <p>Faz dois cliques no logotipo para abrir o login.</p>
            <button className="btn-login" type="button" onClick={handleOpen}>
              Abrir login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
