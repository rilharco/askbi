const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay');
      if (delay) {
        entry.target.style.setProperty('--delay', `${delay}ms`);
      }
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const navToggle = document.querySelector('.nav-toggle');
const navRoot = document.querySelector('header');
if (navToggle && navRoot) {
  navToggle.addEventListener('click', () => {
    navRoot.classList.toggle('nav-open');
  });
}

const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

const parallaxItems = document.querySelectorAll('[data-parallax]');
let latestY = 0;
let ticking = false;

function updateParallax() {
  parallaxItems.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.15');
    const y = latestY * speed;
    el.style.setProperty('--parallax-y', `${y}px`);
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  latestY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

const belt = document.getElementById('js-belt');
const card = document.getElementById('js-card');

if (belt && card) {
  const ROOT = document.documentElement;
  const MAX_PULL = 140;
  let dragging = false;
  let curPull = 0;
  let startX = 0;
  let startPull = 0;
  let opened = false;
  let animTimer = null;

  function setPull(pull) {
    curPull = Math.max(0, Math.min(MAX_PULL, pull));
    const tight = curPull / MAX_PULL;
    ROOT.style.setProperty('--tight', tight.toFixed(3));
    ROOT.style.setProperty('--logo-x', `${-curPull}px`);
    const reveal = Math.max(0, Math.min(1, (tight - 0.4) / 0.6));
    ROOT.style.setProperty('--reveal', reveal.toFixed(3));
    card.classList.toggle('is-active', reveal > 0.05);
  }

  function onDown(e) {
    dragging = true;
    belt.classList.add('is-dragging');
    startX = e.clientX;
    startPull = curPull;
    belt.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const pull = Math.max(0, Math.min(MAX_PULL, startPull - dx));
    setPull(pull);
  }

  function onUp(e) {
    if (!dragging) return;
    dragging = false;
    belt.classList.remove('is-dragging');
    belt.releasePointerCapture(e.pointerId);
    opened = false;
    smoothTo(0);
  }

  function smoothTo(target) {
    belt.classList.add('is-animating');
    setPull(target);
    if (animTimer) clearTimeout(animTimer);
    animTimer = setTimeout(() => {
      belt.classList.remove('is-animating');
    }, 650);
  }

  belt.addEventListener('pointerdown', onDown);
  belt.addEventListener('pointermove', onMove);
  belt.addEventListener('pointerup', onUp);
  belt.addEventListener('pointerleave', onUp);
  belt.addEventListener('dblclick', () => {
    opened = !opened;
    smoothTo(opened ? MAX_PULL : 0);
  });

  setPull(0);
}
