/* =========================================================
   Omar AbdElpaq — Data Analyst Portfolio — script.js
   ========================================================= */

/* Shared reduced-motion flag — checked by every JS-driven
   animation below (scroll reveal, counters). Pure-CSS motion
   (hover states, the hero load-in keyframes, the mobile menu
   slide, the carousel transform) is already collapsed to near-
   zero duration globally by the prefers-reduced-motion rule in
   style.css, so it does not need to be repeated here. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile menu ---------- */
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    menuIcon.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.className = 'bx bx-menu';
        menuIcon.setAttribute('aria-expanded', 'false');
    });
});

/* ---------- Scroll spy (IntersectionObserver, not scroll polling) ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');
const navLinkByHash = new Map();
navLinks.forEach(link => navLinkByHash.set(link.getAttribute('href'), link));

if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const link = navLinkByHash.get(`#${entry.target.id}`);
            if (!link) return;
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(sec => spyObserver.observe(sec));
}

/* ---------- Sticky header background/shadow on scroll ---------- */
const header = document.querySelector('.header');
let headerTicking = false;
function updateHeaderState() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    headerTicking = false;
}
window.addEventListener('scroll', () => {
    if (headerTicking) return;
    headerTicking = true;
    requestAnimationFrame(updateHeaderState);
}, { passive: true });
updateHeaderState();

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
let lastFocused = null;

function openCaseStudy(id) {
    const p = PROJECTS[id];
    if (!p) return;
    csImage.src = p.image;
    csImage.alt = `${p.title} dashboard screenshot`;
    csSub.textContent = p.sub;
    csTitle.textContent = p.title;
    csProblem.textContent = p.problem;
    csApproach.textContent = p.approach;
    csWorkflow.textContent = p.workflow;
    csTools.innerHTML = p.tools.map(t => `<span>${t}</span>`).join('');
    csInsights.innerHTML = p.insights.map(i => `<li>${i}</li>`).join('');
    csImplications.textContent = p.implications;
    csGithub.href = p.github;

    lastFocused = document.activeElement;
    csModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    csModal.querySelector('.cs-close').focus();
}

function closeCaseStudy() {
    csModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-case-study]').forEach(btn => {
    btn.addEventListener('click', () => openCaseStudy(btn.getAttribute('data-case-study')));
});
csModal.querySelector('.cs-close').addEventListener('click', closeCaseStudy);
csModal.addEventListener('click', e => { if (e.target === csModal) closeCaseStudy(); });

/* =========================================================
   CERTIFICATE IMAGE MODAL
   ========================================================= */
const imgModal = document.getElementById('img-modal');
const imgModalContent = document.getElementById('img-modal-content');
const imgModalCaption = document.getElementById('img-modal-caption');
let lastFocusedCert = null;

document.querySelectorAll('[data-cert-img]').forEach(card => {
    card.addEventListener('click', () => {
        imgModalContent.src = card.getAttribute('data-cert-img');
        imgModalContent.alt = card.getAttribute('data-cert-title');
        imgModalCaption.textContent = card.getAttribute('data-cert-title');
        lastFocusedCert = document.activeElement;
        imgModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        imgModal.querySelector('.cs-close').focus();
    });
});
function closeImgModal() {
    imgModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedCert) lastFocusedCert.focus();
}
imgModal.querySelector('.cs-close').addEventListener('click', closeImgModal);
imgModal.addEventListener('click', e => { if (e.target === imgModal) closeImgModal(); });

/* ---------- Shared ESC handling for both modals ---------- */
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (csModal.classList.contains('open')) closeCaseStudy();
    if (imgModal.classList.contains('open')) closeImgModal();
});

/* =========================================================
   RECOMMENDATIONS CAROUSEL (no autoplay)
   ========================================================= */
const track = document.querySelector('.rec-track');
const slides = document.querySelectorAll('.rec-slide');
const dotsWrap = document.querySelector('.rec-dots');
const prevBtn = document.querySelector('.rec-prev');
const nextBtn = document.querySelector('.rec-next');
let recIndex = 0;

slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === 0);
    const dot = document.createElement('button');
    dot.className = 'rec-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to recommendation ${i + 1}`);
    dot.addEventListener('click', () => goToRec(i));
    dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.rec-dot');

function goToRec(i) {
    recIndex = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${recIndex * 100}%)`;
    slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === recIndex));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === recIndex));
}
prevBtn.addEventListener('click', () => goToRec(recIndex - 1));
nextBtn.addEventListener('click', () => goToRec(recIndex + 1));

/* keyboard support when carousel is focused */
document.querySelector('.rec-carousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToRec(recIndex - 1);
    if (e.key === 'ArrowRight') goToRec(recIndex + 1);
});

/* touch/swipe support */
let touchStartX = null;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) goToRec(delta < 0 ? recIndex + 1 : recIndex - 1);
    touchStartX = null;
}, { passive: true });

/* =========================================================
   CONTACT FORM (formsubmit.co) — progressive AJAX submit
   ========================================================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm.querySelector('input[type="submit"]');
const submitLabel = submitBtn.value;

contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    formStatus.textContent = 'Sending…';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.value = 'Sending…';
    submitBtn.classList.remove('is-success');
    submitBtn.classList.add('is-loading');
    try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });
        if (res.ok) {
            formStatus.textContent = 'Message sent — thank you! I\'ll reply soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
            submitBtn.classList.remove('is-loading');
            submitBtn.classList.add('is-success');
            submitBtn.value = 'Sent ✓';
        } else {
            throw new Error('Request failed');
        }
    } catch (err) {
        formStatus.textContent = 'Something went wrong — please email me directly instead.';
        formStatus.className = 'form-status error';
        submitBtn.classList.remove('is-loading');
        submitBtn.value = submitLabel;
    } finally {
        submitBtn.disabled = false;
        setTimeout(() => {
            submitBtn.classList.remove('is-success');
            submitBtn.value = submitLabel;
        }, 2500);
    }
});

/* =========================================================
   SCROLL REVEAL — fade + slide in on first viewport entry,
   staggered for grouped items. Fully skipped (elements stay at
   normal opacity/position) when the user prefers reduced motion
   or the browser lacks IntersectionObserver — no dependency.
   ========================================================= */
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    /**
     * Marks matching elements for scroll-reveal.
     * @param {string} selector      elements to reveal
     * @param {number} staggerMs     delay step between items in the same group
     * @param {string} [groupSelector] if given, the stagger index resets per group
     */
    function revealOnScroll(selector, staggerMs = 0, groupSelector = null) {
        const groups = groupSelector ? document.querySelectorAll(groupSelector) : [document];
        groups.forEach(group => {
            const els = group.querySelectorAll(selector);
            els.forEach((el, i) => {
                el.classList.add('reveal');
                if (staggerMs) el.style.setProperty('--reveal-delay', `${(i % 10) * staggerMs}ms`);
                revealObserver.observe(el);
            });
        });
    }

    // About
    revealOnScroll('.about-text, .fact-list', 100);
    // Experience
    revealOnScroll('.exp-card', 90);
    // Skills groups
    revealOnScroll('.skill-group, .soft-skills', 80);
    revealOnScroll('.chip', 70, '.skill-group, .soft-skills');
    // Featured project cards
    revealOnScroll('.proj-card', 90);
    // Secondary project cards, grouped per grid so each grid restarts its stagger
    revealOnScroll('.mini-card', 60, '.more-projects-grid');
    // Services
    revealOnScroll('.service-card', 80);
    // Recommendations (carousel as a whole — only one card is visible at a time)
    revealOnScroll('.rec-carousel', 0);
    // Training & certifications
    revealOnScroll('.highlight-card', 100);
    revealOnScroll('.cert-card', 70, '.cert-grid');

    // Cards use the stronger scale-in variant while keeping the same observer/stagger system.
    document.querySelectorAll('.exp-card, .skill-group, .soft-skills, .proj-card, .mini-card, .service-card, .highlight-card, .cert-card').forEach(el => {
        el.classList.add('reveal-scale');
    });
}

/* =========================================================
   ANIMATED STAT COUNTERS — counts up from 0 to the real value
   already present in the markup once it scrolls into view.
   No stats are invented; elements whose text isn't a plain
   number (e.g. "BI", "ETL") are left untouched.
   ========================================================= */
function animateCounterEl(el, duration = 1200) {
    const original = el.textContent.trim();
    const match = original.match(/^(\D*)([\d,]*\.?\d+)(\D*)$/);
    if (!match) return; // not a countable number — leave as-is
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    if (Number.isNaN(target)) return;
    const decimals = (numStr.split('.')[1] || '').length;
    const useGrouping = numStr.includes(',');

    let start = null;
    function tick(ts) {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const current = target * eased;
        const formatted = current.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping
        });
        el.textContent = `${prefix}${formatted}${suffix}`;
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = original; // snap to the exact original text
        }
    }
    requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
    const counterEls = document.querySelectorAll('.highlight-stat .val, .proj-insight strong');
    if (prefersReducedMotion) {
        // Respect reduced motion: show the real value immediately, no tween.
    } else {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounterEl(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.6 });
        counterEls.forEach(el => counterObserver.observe(el));
    }
}
