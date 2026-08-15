/* =========================================================
   OMAR ABDELPAQ — PORTFOLIO SCRIPT
   ========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile nav ---------- */
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
menuIcon?.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-menu', !isOpen);
  menuIcon.classList.toggle('bx-x', isOpen);
  menuIcon.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.add('bx-menu');
    menuIcon.classList.remove('bx-x');
    menuIcon.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Header state + scroll progress + active nav link ---------- */
const header = document.getElementById('header');
const progressFill = document.getElementById('progress-fill');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');
let ticking = false;

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);

  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const height = doc.scrollHeight - doc.clientHeight;
  progressFill.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : '0%';

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (scrollTop >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
const revealTargets = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 40 % 200);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}

/* ---------- Skill meter fill on view ---------- */
const meterRows = document.querySelectorAll('.meter-row');
if ('IntersectionObserver' in window) {
  const meterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        meterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  meterRows.forEach(el => meterObserver.observe(el));
}

/* ---------- Count-up numbers ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isDecimal = String(target).includes('.');
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
  }
  requestAnimationFrame(tick);
}
const countEls = document.querySelectorAll('.count-up');
if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  countEls.forEach(el => countObserver.observe(el));
} else {
  countEls.forEach(el => { el.textContent = el.dataset.target + (el.dataset.suffix || ''); });
}

/* =========================================================
   FEATURED PROJECT CASE STUDIES (data-driven modal)
   ========================================================= */
const PROJECTS = {
  'ezz-production': {
    title: 'EZZ Steel — Production Analytics',
    sub: 'Operational Analytics & Performance Insights',
    image: 'img/ezz-steel-production-analytics.jpg',
    problem: 'Plant leadership needed one consolidated view of planned vs. actual production to see where output was falling short across plants, furnaces, and shifts.',
    approach: 'Consolidated production logs and built a Power BI data model with Power Query transformations and DAX measures comparing planned vs. actual output by plant, furnace, and shift.',
    workflow: 'Production logs → Power Query cleaning & shaping → Power BI data model → DAX measures → interactive dashboard',
    tools: ['Power BI', 'Power Query', 'DAX'],
    insights: [
      '95.8% of planned production was achieved — a 5,741-unit gap versus plan',
      'Suez accounted for 60% of total production',
      'EAF-2 was the top-producing furnace at 36,424 units',
      'Night Shift recorded the highest production volume of the three shifts'
    ],
    implications: 'Leadership can see exactly where the production gap concentrates — by plant, furnace, and shift — instead of only a company-wide total, making it possible to target the specific area behind the shortfall.',
    github: 'https://github.com/omarabdelpaq84-design/ezz-steel-production-analytics'
  },
  'netflix-etl': {
    title: 'Netflix — ETL & Analytics',
    sub: 'Data Pipeline, SQL Analysis & BI',
    image: 'img/netflix-etl-analytics.jpg',
    problem: 'Raw Netflix catalog data needed cleaning and structuring before it could reliably answer questions about content mix and ratings trends.',
    approach: 'Built an ETL pipeline that cleans and transforms the raw catalog with Python/Pandas, loads it into PostgreSQL, and analyzes it with SQL before visualizing results in Power BI.',
    workflow: 'Raw data → Python / Pandas cleaning → PostgreSQL → SQL analysis → Power BI',
    tools: ['Python', 'Pandas', 'PostgreSQL', 'SQL', 'Power BI'],
    insights: [
      'Catalog includes roughly 6,000 movies and 3,000 TV shows',
      'Content additions peaked around 2019',
      'TV-MA is the dominant content rating'
    ],
    implications: 'Gives a content team a clear, reproducible read on catalog composition and rating mix — useful context for content strategy discussions.',
    github: 'https://github.com/omarabdelpaq84-design/netflix-etl-analytics'
  },
  'ezz-financial': {
    title: 'EZZ Steel — Financial Analysis',
    sub: 'Financial Performance & Profitability Insights',
    image: 'img/ezz-steel-financial-analysis-powerbi.jpg',
    problem: 'Understanding revenue growth and profitability trends over time required consolidating financial data into a single, explorable model.',
    approach: 'Built a Power BI financial model with Power Query transformations and DAX measures to track revenue growth and margin trends year over year.',
    workflow: 'Financial data → Power Query → Power BI data model → DAX measures → dashboard',
    tools: ['Power BI', 'Power Query', 'DAX'],
    insights: [
      'Revenue grew from roughly 39K to 141K',
      'Year-over-year revenue growth of 72.2%',
      '2023 gross margin of 16.76%',
      '2023 net margin of 6.76%'
    ],
    implications: 'Highlights the gap between gross and net margin — a starting point for examining where costs below gross profit are affecting profitability.',
    github: 'https://github.com/omarabdelpaq84-design/ezz-steel-financial-analysis-powerbi'
  },
  'transformer-retail': {
    title: 'Transformer Company — Retail Analytics',
    sub: 'Sales, Profitability & Regional Performance',
    image: 'img/retail-sales-profitability.jpg',
    problem: 'Retail leadership needed visibility into which regions, states, and product categories were driving sales and profit.',
    approach: 'Built an Excel-based analytical dashboard summarizing sales, profit, and regional performance from the underlying order data.',
    workflow: 'Order-level data → cleaning & aggregation → Excel dashboard',
    tools: ['Excel'],
    insights: [
      'Total Sales: approximately $2.30M',
      'Total Profit: approximately $286K',
      'Overall profit margin: approximately 12.46%',
      'West region contributed 32% of sales',
      'Sales and profit trend improved through the analyzed period'
    ],
    implications: 'Gives leadership a regional and category breakdown to prioritize where sales and margin gains are concentrated.',
    github: 'https://github.com/omarabdelpaq84-design/transformer-retail-sales-performance'
  },
  'hr-workforce': {
    title: 'HR Workforce & Performance Analytics',
    sub: 'Workforce, Performance & HR Operations',
    image: 'img/hr-workforce-analytics.jpg',
    problem: 'HR needed a single view of headcount, turnover, and performance ratings across the workforce to support workforce planning conversations.',
    approach: 'Built an Excel PivotTable-based dashboard summarizing headcount, turnover, and performance-rating distribution. The underlying dataset is public/synthetic HR data used for portfolio demonstration.',
    workflow: 'HR records → Excel PivotTables & PivotCharts → dashboard',
    tools: ['Excel'],
    insights: [
      '311 employees, 207 active and 104 terminated',
      'Approximately 33% turnover',
      '78.1% of employees rated "Fully Meets", 11.9% rated "Exceeds"',
      '58% female workforce'
    ],
    implications: 'Surfaces turnover and performance distribution in one place, useful as a starting point for workforce-planning discussions.',
    github: 'https://github.com/omarabdelpaq84-design/hr-workforce-analytics-dashboard'
  },
  'patient-noshow': {
    title: 'Patient No-Show Analysis',
    sub: 'Healthcare Operations Analytics',
    image: 'img/patient-appointment-attendance.jpg',
    problem: 'A clinic network wanted to understand attendance patterns and which factors correlate with missed appointments.',
    approach: 'Built an Excel dashboard analyzing appointment attendance by SMS reminder status, age group, day type, and neighbourhood.',
    workflow: 'Appointment records → cleaning & aggregation → Excel PivotTables & PivotCharts → dashboard',
    tools: ['Excel'],
    insights: [
      '108,978 appointments analyzed — 79.74% attendance, 20.26% no-show',
      'Patients who received SMS reminders showed a substantially lower observed no-show rate (≈16.7% vs. ≈27.7% for those who did not)',
      'No-show rate was lowest for the "Old" age group (≈15.2%) and higher for "Adult" (≈21.0%) and "Child" (≈22.5%) groups'
    ],
    implications: 'This is descriptive analysis, not a causal claim — the SMS association is an observed pattern worth testing further, not proof that reminders cause fewer no-shows.',
    github: 'https://github.com/omarabdelpaq84-design/patient-appointment-attendance-analysis'
  }
};

const csModal = document.getElementById('cs-modal');
const csImage = document.getElementById('cs-image');
const csSub = document.getElementById('cs-sub');
const csTitle = document.getElementById('cs-title');
const csProblem = document.getElementById('cs-problem');
const csApproach = document.getElementById('cs-approach');
const csWorkflow = document.getElementById('cs-workflow');
const csTools = document.getElementById('cs-tools');
const csInsights = document.getElementById('cs-insights');
const csImplications = document.getElementById('cs-implications');
const csGithub = document.getElementById('cs-github');

let lastFocusedEl = null;

function openCaseStudy(key) {
  const data = PROJECTS[key];
  if (!data) return;
  csImage.src = data.image;
  csImage.alt = data.title;
  csSub.textContent = data.sub;
  csTitle.textContent = data.title;
  csProblem.textContent = data.problem;
  csApproach.textContent = data.approach;
  csWorkflow.textContent = data.workflow;
  csTools.innerHTML = data.tools.map(t => `<span>${t}</span>`).join('');
  csInsights.innerHTML = data.insights.map(i => `<li>${i}</li>`).join('');
  csImplications.textContent = data.implications;
  csGithub.href = data.github;

  lastFocusedEl = document.activeElement;
  csModal.classList.add('open');
  document.body.classList.add('modal-open');
  csModal.querySelector('.cs-close').focus();
}
function closeCaseStudy() {
  csModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  lastFocusedEl?.focus();
}
document.querySelectorAll('[data-case-study]').forEach(btn => {
  btn.addEventListener('click', () => openCaseStudy(btn.dataset.caseStudy));
});
csModal.querySelector('.cs-close').addEventListener('click', closeCaseStudy);
csModal.addEventListener('click', (e) => { if (e.target === csModal) closeCaseStudy(); });

/* ---------- Certificate image modal ---------- */
const imgModal = document.getElementById('img-modal');
const imgModalContent = document.getElementById('img-modal-content');
const imgModalCaption = document.getElementById('img-modal-caption');

function openCertModal(src, title) {
  imgModalContent.src = src;
  imgModalContent.alt = title;
  imgModalCaption.textContent = title;
  lastFocusedEl = document.activeElement;
  imgModal.classList.add('open');
  document.body.classList.add('modal-open');
  imgModal.querySelector('.cs-close').focus();
}
function closeCertModal() {
  imgModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  lastFocusedEl?.focus();
}
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => openCertModal(card.dataset.certImg, card.dataset.certTitle));
});
imgModal.querySelector('.cs-close').addEventListener('click', closeCertModal);
imgModal.addEventListener('click', (e) => { if (e.target === imgModal) closeCertModal(); });

/* Shared escape handler */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (csModal.classList.contains('open')) closeCaseStudy();
    if (imgModal.classList.contains('open')) closeCertModal();
  }
});

/* =========================================================
   RECOMMENDATIONS CAROUSEL
   ========================================================= */
const recTrack = document.querySelector('.rec-track');
const recSlides = document.querySelectorAll('.rec-slide');
const recDotsWrap = document.querySelector('.rec-dots');
const recPrev = document.querySelector('.rec-prev');
const recNext = document.querySelector('.rec-next');
let recIndex = 0;

if (recTrack && recSlides.length) {
  recSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToRec(i));
    recDotsWrap.appendChild(dot);
  });
  const dots = recDotsWrap.querySelectorAll('span');

  function goToRec(i) {
    recIndex = (i + recSlides.length) % recSlides.length;
    recTrack.style.transform = `translateX(-${recIndex * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === recIndex));
  }
  recPrev.addEventListener('click', () => goToRec(recIndex - 1));
  recNext.addEventListener('click', () => goToRec(recIndex + 1));

  const carousel = document.querySelector('.rec-carousel');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToRec(recIndex - 1);
    if (e.key === 'ArrowRight') goToRec(recIndex + 1);
  });

  let autoplay = setInterval(() => goToRec(recIndex + 1), 6000);
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => { autoplay = setInterval(() => goToRec(recIndex + 1), 6000); });
}

/* =========================================================
   CONTACT FORM (AJAX submit, keeps user on page)
   ========================================================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('input[type="submit"]');
    const originalVal = submitBtn.value;
    submitBtn.value = 'Sending…';
    submitBtn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        formStatus.textContent = "Message sent — I'll get back to you soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please email me directly.';
      }
    } catch {
      formStatus.textContent = 'Network error. Please email me directly.';
    } finally {
      submitBtn.value = originalVal;
      submitBtn.disabled = false;
    }
  });
}

/* =========================================================
   HERO: typed accent-word cycle
   ========================================================= */
const accentWord = document.getElementById('accent-word');
if (accentWord && !reduceMotion) {
  const words = [
  'strategy',
  'analytics',
  'insight',
  'metrics',
  'patterns',
  'results',
  'growth',
  'clarity',
  'impact',
  'trends'
];
  let wi = 0;
  setInterval(() => {
    wi = (wi + 1) % words.length;
    accentWord.style.opacity = 0;
    setTimeout(() => {
      accentWord.textContent = words[wi];
      accentWord.style.opacity = 1;
    }, 300);
  }, 3200);
  accentWord.style.transition = 'opacity .3s ease';
}

/* =========================================================
   PREMIUM V3 — micro-interactions & cinematic motion
   ========================================================= */
(function premiumInteractions(){
  const canAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canAnimate) return;

  /* 1) Gentle pointer glow — desktop only */
  if (window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'pointer-glow';
    glow.setAttribute('aria-hidden','true');
    document.body.appendChild(glow);

    let raf = 0;
    let x = -200, y = -200;
    document.addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          glow.style.transform = `translate3d(${x}px,${y}px,0)`;
          raf = 0;
        });
      }
    }, {passive:true});
  }

  /* 2) Premium tilt for major visual cards */
  if (window.matchMedia('(pointer:fine)').matches) {
    const tiltTargets = document.querySelectorAll('.console-panel, .proj-card, .service-card, .skill-group, .training-block, #contact-form');
    tiltTargets.forEach((card) => {
      let rect;
      const reset = () => {
        card.style.transform = '';
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      };
      card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
      card.addEventListener('pointermove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 3.2;
        const ry = (px - 0.5) * 3.2;
        card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
      card.addEventListener('pointerleave', reset);
    });
  }

  /* 3) Magnetic primary buttons — subtle, never distracting */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn-primary, .social-icons a, .rec-arrow').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .08;
        const y = (e.clientY - r.top - r.height / 2) * .08;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* 4) Stagger chips/cards as they enter the viewport */
  if ('IntersectionObserver' in window) {
    const groups = document.querySelectorAll('.chip-row, .proj-tools, .social-icons');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.chip, .proj-tools span, a').forEach((item, i) => {
          item.style.setProperty('--delay', `${Math.min(i * 45, 300)}ms`);
          item.classList.add('premium-pop');
        });
        observer.unobserve(entry.target);
      });
    }, {threshold:.25});
    groups.forEach(g => observer.observe(g));
  }

  /* 5) Touch swipe for recommendations */
  const carousel = document.querySelector('.rec-carousel');
  if (carousel && recTrack && recSlides.length > 1) {
    let startX = 0, startY = 0, tracking = false;
    carousel.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      startX = t.clientX; startY = t.clientY; tracking = true;
    }, {passive:true});
    carousel.addEventListener('touchend', (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) recNext?.click();
        else recPrev?.click();
      }
    }, {passive:true});
  }

  /* 6) Add a soft scroll depth variable for CSS */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      ticking = false;
    });
  }, {passive:true});
})();
