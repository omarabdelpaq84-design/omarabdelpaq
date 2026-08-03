# Omar AbdElpaq — Data Analyst Portfolio

## Folder structure
```
index.html
assets/
  css/style.css
  js/script.js
  img/
    omar-abdelpaq.jpg      ← your profile photo (square, 800×800+ recommended)
    favicon.png            ← small square icon, 512×512
    og-cover.jpg           ← 1200×630 image used for LinkedIn/social link previews
    projects/               ← project cover images, filenames below
    certs/                  ← certificate images, filenames below
  docs/
    Omar-AbdElpaq-CV.pdf   ← your resume, used by the "Download Resume/CV" buttons
```

## What you need to drop in
All images live directly inside **assets/img/** (no `projects/` or `certs/`
subfolders — flat, matching how you already had them):

`Omar.png` (profile photo), `EZZLOG.png`, `amazon.jpg`, `udemy.jpg`,
`transformer.jpg`, `banking.jpg`, `hospital.jpg`, `mobile.jpg`, `laptop.jpg`,
`hr.jpg`, `hospital2.jpg`, `gemma.png`, `car.jpg`, `TAB.jpg`, `powerbi.png`,
`attendance.png`, `netflix.png`, `DASH.png`, `sql.png`, `aws.png`,
`CIB Generative AI.png`, `Data Analytics Summer Tranning in NTI.png`,
`Deep Learning.jpg`, `Digital Egypt Pioneers.jpg`, `Huwawi AI Learning.jpg`,
`سفراء الذكاء الأصطناعي.jpg`

Still needed (not in your current folder): `favicon.png`, `og-cover.jpg` (both
in `assets/img/`) and a CV file at `assets/docs/Omar-AbdElpaq-CV.pdf`.

Two files in your `img` folder aren't used anywhere yet — `ICDEL.jpg` and
`Digitopia.jpg`. If those are certificates/logos you want on the site, tell me
what they are and I'll add cert cards for them.

If `Omar.png` is missing, the hero automatically falls back to a clean "OA"
monogram — the page never breaks on a missing photo.

## Before you publish
- Update `og:image`/`twitter:image` and `canonical` URL in `<head>` once you know
  your real domain (currently placeholder `https://omarabdelpaq.com/`).
- Replace the WhatsApp number in the Contact section if it changes.
- Add a `sitemap.xml` and `robots.txt` at the domain root once it's live (two
  lines each — ask if you want these generated).

## Two things I deliberately left out — read before you fill them in
- **Testimonials**: the brief asked for a testimonials section, but there's no
  real client quote in the source content, and freelance client data here is
  confidential. Inventing names/companies/quotes would be fake social proof on
  a page recruiters may fact-check — that's a credibility risk, not a credibility
  boost. I built a "Why work with me" trust section instead, which carries the
  same conversion job (why hire Omar) without fabricating anyone's words. If you
  get a real client quote later, it's easy to add a testimonials block back in.
- **Blog**: same issue — no real posts existed to pull from, and placeholder
  "articles" with fake dates/content would look worse than no blog section once
  a recruiter clicks in. The three **Case Studies** do the storytelling job the
  blog was meant to do, using your real projects.

## Performance & SEO already included
- Single external CSS/JS files (cacheable, no inline style bloat)
- `loading="lazy"` + explicit width/height on every project/cert image (prevents layout shift)
- Semantic landmarks (`nav`, `main`, `section` with `aria-labelledby`), skip link, visible focus states
- `prefers-reduced-motion` respected (cursor/particles/animations disable automatically)
- Person + sameAs JSON-LD structured data for Google/LinkedIn
- Descriptive `<title>`, meta description, Open Graph + Twitter Card tags
- Mobile nav (hamburger) below 960px, fully responsive down to small phones
