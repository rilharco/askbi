'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await apiFetch<{ accessToken: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setToken(res.accessToken);
      router.push('/platform/onboarding');
    } catch {
      setError('Erro ao criar conta. Tenta novamente.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-split">
      {/* Left — brand panel */}
      <div className="auth-brand-panel">
        <div className="auth-brand-grid" aria-hidden="true" />
        <div className="auth-brand-kanji" aria-hidden="true">入門</div>
        <div className="auth-brand-inner">
          <img src="/assets/logo-assoc.png" className="auth-logo" alt="ASKBI" />
          <div className="auth-brand-name">Associação Shotokan</div>
          <div className="auth-brand-sub">Nova conta</div>
          <div className="auth-gold-sep" style={{ alignSelf: 'center', margin: '16px 0' }} />
          <p style={{ fontSize: '0.78rem', color: 'rgba(246,244,241,0.5)', lineHeight: 1.7, maxWidth: 280, textAlign: 'center' }}>
            Cria a tua conta de instrutor para aceder à plataforma de gestão da associação.
          </p>
          <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(241,194,50,0.06)', border: '1px solid rgba(241,194,50,0.15)', borderRadius: 12, fontSize: '0.72rem', color: 'rgba(246,244,241,0.5)', lineHeight: 1.6 }}>
            O acesso é exclusivo para membros autorizados pela direção da associação.
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-eyebrow">Nova conta</div>
          <h1 className="auth-form-title">Registo</h1>
          <p className="auth-form-desc">
            Preenche os dados para criar a tua conta de instrutor.
          </p>
          <div className="auth-gold-sep" />
          <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="O teu nome"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="tu@shotokan.pt"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy ? <span className="auth-spinner" /> : 'Criar conta'}
            </button>
          </form>
          <div className="auth-links">
            <Link href="/platform/login">Já tens conta? Entrar</Link>
            <span>·</span>
            <Link href="/">← Site público</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
