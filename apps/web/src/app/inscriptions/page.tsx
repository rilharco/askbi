'use client';

import { useState } from 'react';

export default function InscriptionsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', email: '', phone: '', level: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API
    setSent(true);
  };

  return (
    <>
      <section className="hero section-bg bg-ember">
        <div className="hero-kanji" aria-hidden="true">入門</div>
        <div className="eyebrow reveal" data-delay="0">Inscrições</div>
        <h2 className="reveal" data-delay="80">Junta‑te à associação</h2>
        <p className="reveal" data-delay="160">
          Preenche a ficha e entra em contacto para marcar a tua aula experimental gratuita. Sem compromisso, para todas as idades.
        </p>
        <div className="cta-row">
          <a className="btn reveal" data-delay="240" href="/classes">Ver horários</a>
          <a className="btn reveal" data-delay="300" href="/contact">Falar connosco</a>
        </div>
        <div className="hero-media mesh parallax" data-parallax="0.08">
          <img src="/assets/hero-ink.svg" alt="" className="hero-ink-img" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Ficha de inscrição</div>
          <div className="subtle">Dados do praticante</div>
        </div>
        <div className="contact-grid">
          <div className="contact-form reveal">
            {sent ? (
              <div className="form-success">
                <strong>Pedido enviado!</strong>
                <p>Recebemos o teu pedido de inscrição. Entraremos em contacto brevemente para agendar a tua aula experimental. Bem‑vindo ao dojo!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Nome completo</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Nome completo"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="age">Idade</label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Idade"
                    min={4}
                    max={99}
                    required
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@exemplo.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+351 9xx xxx xxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="level">Nível</label>
                  <input
                    id="level"
                    type="text"
                    placeholder="Sem experiência / Iniciado / Com experiência prévia"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Observações</label>
                  <textarea
                    id="message"
                    placeholder="Objetivos, horários preferidos, questões de saúde relevantes..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button className="btn-login" type="submit">Enviar pedido de inscrição</button>
              </form>
            )}
          </div>
          <div className="contact-card reveal">
            <h3>Como funciona</h3>
            <div className="steps-list" style={{ marginTop: 14 }}>
              <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">Preenche o formulário com os teus dados e nível de experiência</div>
              </div>
              <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text">Recebe confirmação por email com todas as informações necessárias</div>
              </div>
              <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">Agenda a tua aula experimental gratuita — sem compromisso</div>
              </div>
              <div className="step-item">
                <div className="step-num">4</div>
                <div className="step-text">Inicia o teu percurso no Karate‑Do Shotokan</div>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(241,194,50,0.06)', border: '1px solid rgba(241,194,50,0.2)', borderRadius: 12 }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(246,244,241,0.65)', lineHeight: 1.6 }}>
                A primeira aula é sempre gratuita e sem compromisso. Podes trazer roupa confortável — o kimono não é necessário no início.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
