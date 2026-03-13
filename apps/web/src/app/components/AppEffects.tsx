'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el: HTMLElement) {
  const raw = el.textContent || '';
  const suffix = raw.replace(/[\d.]/g, '');
  const target = parseFloat(raw.replace(/[^\d.]/g, '')) || 0;
  const duration = 1600;
  const start = performance.now();

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);
    const current = Math.round(ease * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function AppEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('js');

    // ── Scroll progress bar ──────────────────────────
    const progressBar = document.getElementById('scroll-progress');

    // ── Reveal observer ──────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute('data-delay');
            if (delay) el.style.setProperty('--delay', `${delay}ms`);
            el.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    // ── Counter observer ─────────────────────────────
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
    document.querySelectorAll('.stat-number[data-count]').forEach((el) =>
      counterObserver.observe(el)
    );

    // ── Mouse glow on interactive cards ─────────────
    const handleMouseMove = (e: MouseEvent) => {
      const targets = document.querySelectorAll<HTMLElement>(
        '.card, .news-item, .belt-item, .kun-item, .schedule-day, .event-item, .platform-preview-frame'
      );
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Magnetic buttons ─────────────────────────────
    const buttons = document.querySelectorAll<HTMLElement>('.btn.primary');
    const magnetHandlers: Array<{ el: HTMLElement; enter: (e: MouseEvent) => void; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((btn) => {
      const enter = () => {};
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.22;
        const dy = (e.clientY - cy) * 0.22;
        btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
      };
      const leave = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('mouseenter', enter);
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      magnetHandlers.push({ el: btn, enter, move, leave });
    });

    // ── Parallax + scroll progress ───────────────────
    const parallaxItems = document.querySelectorAll<HTMLElement>('[data-parallax]');
    let latestY = 0;
    let ticking = false;

    const updateFrame = () => {
      parallaxItems.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.15');
        el.style.setProperty('--parallax-y', `${latestY * speed}px`);
      });

      if (progressBar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? latestY / max : 0;
        progressBar.style.transform = `scaleX(${pct})`;
      }

      const header = document.querySelector('header');
      if (header) header.classList.toggle('scrolled', latestY > 10);

      ticking = false;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateFrame);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Belt stagger entrance ─────────────────────────
    document.querySelectorAll<HTMLElement>('.belt-item').forEach((el, i) => {
      el.style.setProperty('--belt-delay', `${i * 60}ms`);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
      counterObserver.disconnect();
      magnetHandlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [pathname]);

  return null;
}
