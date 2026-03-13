'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await apiFetch<{ accessToken: string; user: { onboardingComplete: boolean } }>(
        '/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) }
      );
      setToken(res.accessToken);
      router.push(res.user.onboardingComplete ? '/platform' : '/platform/onboarding');
    } catch {
      setError('Credenciais inválidas. Verifica o email e a password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-split">
      {/* Left — brand panel */}
      <div className="auth-brand-panel">
        <div className="auth-brand-grid" aria-hidden="true" />
        <div className="auth-brand-kanji" aria-hidden="true">内部</div>
        <div className="auth-brand-inner">
          <img src="/assets/logo.svg" className="auth-logo" alt="ASKBI" />
          <div className="auth-brand-name">Associação Shotokan</div>
          <div className="auth-brand-sub">Plataforma interna</div>
          <div className="auth-gold-sep" style={{ alignSelf: 'center', margin: '16px 0' }} />
          <div className="auth-features">
            <div className="auth-feature">
              <span>👥</span>
              <span>Gestão completa de membros</span>
            </div>
            <div className="auth-feature">
              <span>🥋</span>
              <span>Registo e histórico de graduações</span>
            </div>
            <div className="auth-feature">
              <span>📅</span>
              <span>Agendamento de exames</span>
            </div>
            <div className="auth-feature">
              <span>📊</span>
              <span>Dashboard de atividade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-eyebrow">Área reservada</div>
          <h1 className="auth-form-title">Entrar</h1>
          <p className="auth-form-desc">
            Acesso exclusivo para instrutores e staff da associação.
          </p>
          <div className="auth-gold-sep" />
          <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="instrutor@shotokan.pt"
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy ? <span className="auth-spinner" /> : 'Entrar na plataforma'}
            </button>
          </form>
          <div className="auth-links">
            <Link href="/platform/signup">Criar nova conta</Link>
            <span>·</span>
            <Link href="/">← Voltar ao site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
