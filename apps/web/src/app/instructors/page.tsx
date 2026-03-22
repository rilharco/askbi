'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { KARATE_FRAMES } from './frames';

// ─── Karate Logo Login Widget ─────────────────────────────────────

type FightState = 'idle' | 'fighting' | 'victory';

function KarateLoginWidget() {
  const router = useRouter();
  const [state, setState] = useState<FightState>('idle');
  const [showLogin, setShowLogin] = useState(false);
  const [flash, setFlash] = useState(false);
  const [impactFlash, setImpactFlash] = useState(false);
  const [imgSrc, setImgSrc] = useState(KARATE_FRAMES[0]);
  const [victoryAnim, setVictoryAnim] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currentFrame = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleClick() {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
    if (state === 'idle') startFight();
    else if (state === 'fighting') stopFight();
  }

  function startFight() {
    setState('fighting');
    currentFrame.current = 0;
    intervalRef.current = setInterval(() => {
      currentFrame.current++;
      if (currentFrame.current >= KARATE_FRAMES.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setState('victory');
        setVictoryAnim(true);
        timerRef.current = setTimeout(() => setShowLogin(true), 1800);
        return;
      }
      setImgSrc(KARATE_FRAMES[currentFrame.current]);
      if (currentFrame.current % 3 === 0) {
        setImpactFlash(true);
        setTimeout(() => setImpactFlash(false), 150);
      }
    }, 450);
  }

  function stopFight() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    intervalRef.current = null;
    currentFrame.current = 0;
    setImgSrc(KARATE_FRAMES[0]);
    setState('idle');
    setVictoryAnim(false);
    setShowLogin(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/login`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }
      );
      if (!res.ok) throw new Error('Credenciais inválidas');
      const { access_token } = await res.json();
      localStorage.setItem('askbi_token', access_token);
      router.push('/platform');
    } catch (err) {
      if (err instanceof TypeError) {
        // Network error — API offline, activate demo mode
        localStorage.setItem('askbi_token', 'demo-offline');
        router.push('/platform');
      } else {
        setError((err as Error).message || 'Erro ao entrar');
        setLoading(false);
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <style>{`
        @keyframes pulse {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(1.38); opacity: 0; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-6px) rotate(-1.5deg); }
          20% { transform: translateX(6px) rotate(1.5deg); }
          30% { transform: translateX(-8px) rotate(-2deg); }
          40% { transform: translateX(8px) rotate(2deg); }
          50% { transform: translateX(-6px) rotate(-1.5deg); }
          60% { transform: translateX(6px) rotate(1.5deg); }
          70% { transform: translateX(-4px) rotate(-1deg); }
          80% { transform: translateX(4px) rotate(1deg); }
          90% { transform: translateX(-2px) rotate(-0.5deg); }
        }
        @keyframes victoryPulse {
          0%,100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.06); filter: brightness(1.2) drop-shadow(0 0 20px rgba(241,194,50,0.8)); }
        }
        @keyframes blink {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }
        @keyframes frameFlash {
          0%   { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes boxIn {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes victoryGlow {
          0%   { box-shadow: 0 0 0 4px #cc0000, 0 0 30px rgba(204,0,0,0.3); }
          50%  { box-shadow: 0 0 0 4px #ff4400, 0 0 80px rgba(255,68,0,0.8); }
          100% { box-shadow: 0 0 0 4px #cc0000, 0 0 30px rgba(204,0,0,0.3); }
        }
      `}</style>

      {/* Logo container */}
      <div
        onClick={handleClick}
        style={{ position: 'relative', width: 300, height: 300, cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Pulse rings — only when idle */}
        {state === 'idle' && (
          <>
            {[0, 0.7, 1.4].map((delay, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 300, height: 300, borderRadius: '50%',
                border: '3px solid rgba(204,0,0,0.55)',
                animation: `pulse 2s ease-out ${delay}s infinite`,
                pointerEvents: 'none',
              }} />
            ))}
          </>
        )}

        {/* Frame image — cycles through KARATE_FRAMES */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
          animation: victoryAnim ? 'victoryGlow 0.6s ease-in-out 3' : 'none',
          boxShadow: state === 'idle'
            ? '0 0 0 4px #cc0000, 0 0 30px rgba(204,0,0,0.3)'
            : state === 'fighting'
            ? '0 0 0 4px #ff6600, 0 0 50px rgba(255,100,0,0.6)'
            : '0 0 0 4px #ff4400, 0 0 80px rgba(255,68,0,0.8)',
          transition: 'box-shadow 0.3s ease',
        }}>
          <img
            src={imgSrc}
            alt="Associação Shotokan Karatedo"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Click flash */}
        {flash && (
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', pointerEvents: 'none' }} />
        )}

        {/* Impact flash */}
        {impactFlash && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,80,0,0.65) 0%, transparent 70%)',
            animation: 'frameFlash 0.15s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Status text */}
      <div style={{
        color: state === 'idle' ? '#aaa' : state === 'fighting' ? '#cc0000' : '#f1c232',
        fontSize: 13,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: 'Georgia, serif',
        animation: state === 'fighting' ? 'blink 0.8s ease-in-out infinite alternate' : 'none',
        transition: 'color 0.3s',
      }}>
        {state === 'idle' ? 'Clica para começar' : state === 'fighting' ? '— Em combate —' : '— Vitória! —'}
      </div>
      <div style={{ color: '#555', fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
        {state === 'idle' ? '▶ iniciar combate' : state === 'fighting' ? '— a validar —' : ''}
      </div>

      {/* Login Overlay */}
      {showLogin && (
        <div
          onClick={stopFight}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200, animation: 'overlayIn 0.4s ease forwards',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1e1e1e', border: '1px solid #cc0000',
              borderRadius: 12, padding: '40px 48px', width: 360,
              boxShadow: '0 0 60px rgba(204,0,0,0.45)',
              animation: 'boxIn 0.5s ease 0.2s both',
            }}
          >
            {/* Logo */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '3px solid #cc0000', boxShadow: '0 0 20px rgba(204,0,0,0.5)' }}>
              <img src={KARATE_FRAMES[0]} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ color: '#fff', fontSize: 15, textAlign: 'center', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Georgia, serif' }}>
              Shotokan Karatedo
            </div>
            <div style={{ color: '#cc0000', fontSize: 11, textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28, fontFamily: 'Georgia, serif' }}>
              Beira Interior
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: 6, padding: '12px 14px', color: '#fff', fontSize: 14, marginBottom: 14, outline: 'none', fontFamily: 'Georgia, serif', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#cc0000'}
                onBlur={e => e.target.style.borderColor = '#333'}
              />
              <input
                type="password"
                placeholder="Palavra-passe"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: 6, padding: '12px 14px', color: '#fff', fontSize: 14, marginBottom: 14, outline: 'none', fontFamily: 'Georgia, serif', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#cc0000'}
                onBlur={e => e.target.style.borderColor = '#333'}
              />
              {error && <div style={{ color: '#f87171', fontSize: 12, marginBottom: 10, textAlign: 'center' }}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', background: loading ? '#991111' : '#cc0000', color: '#fff', border: 'none', borderRadius: 6, padding: 13, fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', fontFamily: 'Georgia, serif', marginTop: 4, transition: 'background 0.2s, box-shadow 0.2s' }}
              >
                {loading ? 'A entrar...' : 'Entrar'}
              </button>
            </form>

            <button
              onClick={stopFight}
              style={{ width: '100%', background: 'transparent', color: '#666', border: '1px solid #333', borderRadius: 6, padding: '10px', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Georgia, serif', marginTop: 12 }}
            >
              ← voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Página de Instrutores ────────────────────────────────────────

export default function InstructorsPage() {
  return (
    <div className="page-instructors">
      <section className="hero section-bg bg-ember">
        <div className="eyebrow reveal" data-delay="0">Equipa Técnica</div>
        <h2 className="reveal" data-delay="80">Instrutores e acesso</h2>
        <p className="reveal" data-delay="160">
          Equipa técnica com foco em rigor, progressão e acompanhamento contínuo.
        </p>
        <div className="hero-media mesh parallax" data-parallax="0.08">
          <img src="/assets/hero-ink.svg" alt="" className="hero-ink-img" />
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

      {/* Área de acesso — premium split layout */}
      <section style={{
        background: 'linear-gradient(135deg, #080808 0%, #120606 50%, #080808 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 5%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '60%',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(204,0,0,0.07) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(241,194,50,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          alignItems: 'center',
        }}>
          {/* Left: Platform description */}
          <div className="reveal">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(204,0,0,0.1)',
              border: '1px solid rgba(204,0,0,0.25)',
              borderRadius: 4,
              padding: '5px 14px',
              marginBottom: 24,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#cc0000' }} />
              <span style={{ color: '#cc0000', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
                Área Reservada
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 16,
              color: '#f6f4f1',
            }}>
              Plataforma de<br />
              <span style={{ color: '#f1c232' }}>Gestão ASKBI</span>
            </h2>

            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #f1c232, transparent)', marginBottom: 20 }} />

            <p style={{
              color: 'rgba(246,244,241,0.55)',
              lineHeight: 1.8,
              fontSize: '0.88rem',
              marginBottom: 36,
              maxWidth: 420,
            }}>
              Sistema integrado de gestão para a Associação Shotokan Karatedo da Beira Interior. Acesso exclusivo para instrutores, árbitros e staff.
            </p>

            {/* Feature grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-6h6v6"/></svg>, label: 'Clubes & Atletas', desc: 'Gestão completa de filiações' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="2" y="9" width="20" height="6" rx="1"/><path d="M12 9v6m-4-6v6m8-6v6"/></svg>, label: 'Graduações', desc: 'Histórico e exames de dan/kyu' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M8 21h8m-4-4v4M5 3H3v6c0 3.314 4.03 6 9 6s9-2.686 9-6V3h-2M5 3h14"/></svg>, label: 'Competições', desc: 'Inscrições e resultados' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 3v18m-9-6l9-3 9 3M3 9l9 3 9-3"/></svg>, label: 'Arbitragem', desc: 'Escalas e licenças' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>, label: 'Financeiro', desc: 'Quotas e cobranças' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, label: 'Calendário', desc: 'Eventos e treinos' },
              ].map(f => (
                <div key={f.label} style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8,
                  transition: 'border-color 0.2s',
                }}>
                  <span style={{ color: 'rgba(212,168,67,0.8)', flexShrink: 0, display: 'flex' }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#f6f4f1', marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(246,244,241,0.35)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
              <span style={{ fontSize: '0.68rem', color: 'rgba(246,244,241,0.4)', letterSpacing: '0.1em' }}>
                Sistema disponível · 9 módulos activos
              </span>
            </div>
          </div>

          {/* Right: Animated logo widget */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24,
              padding: '48px 40px',
              textAlign: 'center',
              width: '100%',
              maxWidth: 400,
            }}>
              <div style={{ color: 'rgba(246,244,241,0.3)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 32, fontFamily: 'Georgia, serif' }}>
                Clica no emblema para entrar
              </div>
              <KarateLoginWidget />
            </div>
          </div>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 768px) {
            .login-split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
