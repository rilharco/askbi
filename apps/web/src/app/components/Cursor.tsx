'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ mouse: { x: 0, y: 0 }, ring: { x: 0, y: 0 } });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      posRef.current.mouse.x = e.clientX;
      posRef.current.mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = target?.closest('a, button, .btn, .card, .news-item, .kun-item, [role="button"], .platform-card, .pf-nav-item');
      ringRef.current?.classList.toggle('cursor-ring--hover', !!interactive);
    };

    const tick = () => {
      const p = posRef.current;
      p.ring.x += (p.mouse.x - p.ring.x) * 0.1;
      p.ring.y += (p.mouse.y - p.ring.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.ring.x}px, ${p.ring.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
