/* ============================================================
   OMAR ABDELPAQ — PORTFOLIO SCRIPT
   ============================================================ */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fineCursor = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ── CUSTOM CURSOR ─────────────────────────────── */
  if (fineCursor && !reduceMotion) {
    document.body.classList.add('has-fine-cursor');
    const cur = document.getElementById('cur');
    const cur2 = document.getElementById('cur2');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
      document.documentElement.style.setProperty('--r', mx + 'px');
      document.documentElement.style.setProperty('--g', my + 'px');
    });

    (function tick() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      cur2.style.left = rx + 'px';
      cur2.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll('a,button').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-big'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-big'));
    });
  }

  /* ── FLOATING PARTICLES ───────────────────────────── */
  if (!reduceMotion) {
    const pg = document.getElementById('particles');
    if (pg) {
      const count = window.innerWidth < 700 ? 14 : 28;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random() * 100}%;--d:${6 + Math.random() * 10}s;--delay:${Math.random() * 10}s;--drift:${(Math.random() - 0.5) * 100}px`;
        pg.appendChild(p);
      }
    }
  }

  /* ── NAV SCROLL + MOBILE TOGGLE ───────────────────── */
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const toTop = document.getElementById('toTop');
    if (toTop) toTop.classList.toggle('show', window.scrollY > 800);
  }, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── BACK TO TOP ───────────────────────────────────── */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ── SKILL PROFICIENCY BARS ────────────────────────── */
  const skillIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        skillIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.sk-cell').forEach((el) => skillIo.observe(el));

  /* ── PROJECT FILTER ────────────────────────────────── */
  const filters = document.getElementById('filters');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.pf');
      if (!btn) return;
      filters.querySelectorAll('.pf').forEach((b) => {
        b.classList.remove('on');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('on');
      btn.setAttribute('aria-pressed', 'true');
      const f = btn.dataset.f;
      const cards = document.querySelectorAll('.proj-card');
      let visibleCount = 0;
      cards.forEach((c) => {
        const show = f === 'all' || c.dataset.t.includes(f);
        c.style.display = show ? 'flex' : 'none';
        if (show) visibleCount++;
      });
      const empty = document.getElementById('projEmpty');
      if (empty) empty.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }

  /* ── FAQ ACCORDION ─────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* ── HERO GLOW ON SCROLL ───────────────────────────── */
  const heroGlow = document.getElementById('heroGlow');
  if (heroGlow) {
    window.addEventListener('scroll', () => {
      heroGlow.style.opacity = Math.max(0, 1 - window.scrollY / 400);
    }, { passive: true });
  }

  /* ── CURRENT YEAR ──────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
