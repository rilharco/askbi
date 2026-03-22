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
        <div className="hero-media mesh parallax" data-parallax="0.08">
          <img src="/assets/hero-ink.svg" alt="" className="hero-ink-img" />
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
                <span className="contact-list-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></span>
                <span>Rua do Dojo, 12 — Covilhã<br /><span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Beira Interior, Portugal</span></span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></span>
                <span>contacto@shotokan.pt</span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></span>
                <span>+351 900 000 000</span>
              </div>
              <div className="contact-list-item">
                <span className="contact-list-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
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
