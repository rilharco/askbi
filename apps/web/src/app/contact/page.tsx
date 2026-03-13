'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API
    setSent(true);
  };

  return (
    <>
      <section className="hero section-bg bg-gold-glow">
        <div className="hero-kanji" aria-hidden="true">連絡</div>
        <div className="eyebrow reveal" data-delay="0">Associação Shotokan</div>
        <h2 className="reveal" data-delay="80">Contactos</h2>
        <p className="reveal" data-delay="160">
          Fala connosco para inscrições, horários ou qualquer informação sobre o dojo. Respondemos com brevidade.
        </p>
        <div className="hero-media mesh parallax" data-parallax="0.08"></div>
        <div className="hero-visual parallax" data-parallax="0.16">
          <img src="/assets/dojo-grid.svg" alt="" />
        </div>
      </section>

      <section className="section-bg bg-smoke">
        <div className="section-head reveal">
          <div className="section-title">Contacto</div>
          <div className="subtle">Resposta rápida e acompanhamento</div>
        </div>
        <div className="contact-grid">
          <div className="contact-form reveal">
            {sent ? (
              <div className="form-success">
                <strong>Mensagem enviada!</strong>
                <p>Recebemos a tua mensagem e entraremos em contacto brevemente. Obrigado pelo interesse.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Nome</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="O teu nome"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  <label htmlFor="subject">Assunto</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Informações, inscrições, horários..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    placeholder="Escreve a tua mensagem..."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button className="btn-login" type="submit">Enviar mensagem</button>
              </form>
            )}
          </div>
          <div className="contact-card reveal">
            <h3>Informações</h3>
            <div style={{ marginTop: 12 }}>
              <div className="contact-list-item">
                <span className="contact-list-icon">📍</span>
                <span>Rua do Dojo, 12 — Covilhã<br /><span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Beira Interior, Portugal</span></span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon">✉️</span>
                <span>contacto@shotokan.pt</span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon">📞</span>
                <span>+351 900 000 000</span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon">🕐</span>
                <span>Segunda a Sexta<br /><span style={{ fontSize: '0.7rem', opacity: 0.6 }}>18:00 – 22:00</span></span>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="section-title" style={{ fontSize: '0.75rem', marginBottom: 10 }}>Localização</div>
              <div className="card" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', minHeight: 120, display: 'grid', placeItems: 'center' }}>
                <p className="subtle" style={{ textAlign: 'center', fontSize: '0.72rem' }}>
                  Mapa interativo<br />
                  <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>a adicionar brevemente</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
