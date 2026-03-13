'use client';

import { useEffect, useState } from 'react';

export default function IntroScreen() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('askbi-intro')) return;
      sessionStorage.setItem('askbi-intro', '1');
    } catch {
      return;
    }

    setVisible(true);

    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setVisible(false), 900);
    }, 2800);

    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-screen${leaving ? ' intro-leaving' : ''}`} aria-hidden="true">
      <div className="intro-bg-grid" />
      <div className="intro-content">
        <div className="intro-logo">
          <img src="/assets/logo.svg" alt="" />
        </div>
        <div className="intro-name">Associação Shotokan</div>
        <div className="intro-sub">Karate‑Do · Beira Interior</div>
        <div className="intro-kanji">空手道</div>
        <div className="intro-line" />
      </div>
      <div className="intro-corner intro-corner-tl">01</div>
      <div className="intro-corner intro-corner-br">2025</div>
    </div>
  );
}
