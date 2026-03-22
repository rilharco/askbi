'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { setToken } from '@/lib/auth';

const FEATURES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    text: 'Gestão completa de membros',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="2" y="9" width="20" height="6" rx="1"/><path d="M12 9v6m-4-6v6m8-6v6"/></svg>,
    text: 'Registo e histórico de graduações',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    text: 'Agendamento de exames',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    text: 'Dashboard de atividade',
  },
];

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
          <img src="/assets/logo-assoc.png" className="auth-logo" alt="ASKBI"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="auth-brand-name">Associação Shotokan</div>
          <div className="auth-brand-sub">Plataforma interna</div>
          <div className="auth-gold-sep" style={{ alignSelf: 'center', margin: '16px 0' }} />
          <div className="auth-features">
            {FEATURES.map((f, i) => (
              <div key={i} className="auth-feature">
                <span style={{ color: 'rgba(212,168,67,0.8)', flexShrink: 0 }}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy
                ? <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <span className="auth-spinner" />
                    A autenticar...
                  </span>
                : 'Entrar na plataforma'}
            </button>
          </form>
          <div className="auth-links">
            <Link href="/platform/signup">Criar nova conta</Link>
            <span>·</span>
            <Link href="/">Voltar ao site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
