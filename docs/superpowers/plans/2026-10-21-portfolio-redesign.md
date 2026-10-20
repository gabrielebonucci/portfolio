# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current dark "terminal" portfolio into the approved light "one colour per project" site with up-to-date, honest content (GraphxStudio, Barton AI, Gestionale, Web Hospitality, new CV).

**Architecture:** Same Next.js app router project. Content lives in `lib/projects-data.ts` (structure) and `lib/i18n.tsx` (all visible copy, IT + EN). Home is composed of small section components; `/projects` and `/introduction` reuse them. Blog, workbench, theme switching and decorative effects are deleted. A Node script (`scripts/check-site.mjs`) checks the running build for required/forbidden content, redirects, the CV file and colour contrast; it is the test suite for this plan.

**Tech Stack:** Next.js 16.1, React 19, TypeScript, Tailwind CSS 4, `next/font/google`, lucide-react.

**Spec:** `docs/superpowers/specs/2026-10-21-portfolio-redesign-design.md`

## Global Constraints

- Work on branch `redesign-ott-2026`. No push, no Vercel deploy without Gabriele's explicit ok.
- No new npm dependencies (fonts come from `next/font/google`).
- Fonts: **Anton** (display, weight 400) and **Instrument Sans** (body, 400/500/600). Remove Geist, Geist Mono, Space Grotesk.
- Colours (exact): paper `#fbfaf7`, ink `#111014`, ink-soft `#3b3842`, ink-muted `#55525c`, border `#e4e1da`, band violet `#6b3cff` (white text), band orange `#ff6a1a` (ink text), band lime `#c6f432` (ink text).
- Light only: no dark mode, no palette switcher.
- Copy rules: say "sviluppato con Claude Code" / "sviluppo con Claude Code"; never "AI specialist", "esperto", "AI Automation Specialist", "Full Stack" as title, WhatsApp chatbot, French/Spanish. Skill levels must match `ai-job-search/.claude/skills/job-application-assistant/01-candidate-profile.md`.
- No Claude/Anthropic logo anywhere. Un Bug al Giorno appears only as a text link (footer + Chi sono).
- Banned visual chrome: cursor glow, scanlines, typing effect, ASCII art, floating badges, gradient text, uppercase monospace eyebrows above headings, `→` appended to links, fade-up on every section. At most one entrance animation (hero), disabled under `prefers-reduced-motion`.
- Responsive from 375px, no horizontal scroll, visible keyboard focus, text contrast ≥ 4.5:1.
- Site URL: `https://portfolio-xw9f-three.vercel.app`.
- Default language: Italian (`it`); EN toggle stays. *(Plan-level call: the audience is Italian recruiters and Umbrian clients.)*
- `npm run build` must pass at the end of every task. `npx tsc --noEmit` must pass at the end of Tasks 1, 2, 6, 7; in Tasks 3-5 it may fail only in files a later task rewrites or deletes (baseline: both pass today).

## Review Focus

1. **Mobile width (375px):** the 92px Anton headline and the three bands must wrap/stack with no horizontal scroll. Pinned by the 375px screenshot + `scrollWidth` check in Task 7.
2. **English toggle:** switching to EN must show translated copy everywhere, never a raw key like `projects.barton-ai.summary`. Pinned by `check-site.mjs` raw-key check (Task 1) plus a manual EN pass in Task 7.
3. **Old links:** `/blog`, `/blog/<slug>` and `/workbench` (shared on LinkedIn in the past) must land on `/`, not 404. Pinned in Task 1 checks, implemented in Task 6.
4. **Private repos:** Barton AI, Gestionale and Web Hospitality have no public code; their cards must not show a GitHub link that 404s. Pinned by `check-site.mjs` "no link to private repos" check.
5. **CV download:** `/cv.pdf` must be the new 2-page CV, not the June one. Pinned by byte-size equality in Task 1 checks.

---

### Task 1: Branch, check script, ignore file

**Files:**
- Create: `scripts/check-site.mjs`
- Modify: `package.json` (scripts), `.gitignore`

**Interfaces:**
- Produces: `npm run check` → runs `node scripts/check-site.mjs` against `BASE_URL` (default `http://localhost:3000`); exit 0 = all pass, exit 1 = prints each failing check.

- [ ] **Step 1: Create branch**

Run: `git switch -c redesign-ott-2026` → Expected: `Switched to a new branch 'redesign-ott-2026'`

- [ ] **Step 2: Write `scripts/check-site.mjs`** (plain Node 18+, `fetch`, no deps). Checks, each printed as `PASS`/`FAIL <name>: <detail>`:

```js
// required strings in rendered HTML (default language = it)
const REQUIRED = {
  "/": ["GraphxStudio", "Barton AI", "Gestionale prenotazioni", "Web Hospitality", "Scarica il CV", "@unbugalgiorno", "Trankiliti FC"],
  "/projects": ["Barton AI", "Gestionale prenotazioni", "Web Hospitality", "Trankiliti FC", "Boolflix"],
  "/introduction": ["GraphxStudio", "AgriEuro", "Very Important Web", "Boolean", "ITS Umbria Academy", "Inglese"],
}
// forbidden on every page above (case-insensitive)
const FORBIDDEN = ["whatsapp", "francese", "spagnolo", "french", "spanish", "ai automation specialist", "full stack web developer &", "terminal://", "gb lab", "workbench", "cursor-glow", "scanlines"]
// raw i18n keys leaking: regex /\b(nav|hero|projects|intro|footer|home|exp)\.[a-z0-9-]+(\.[a-z0-9-]+)+\b/ must not match visible text (strip <script> and tags first)
// private repos: HTML of "/" and "/projects" must not contain hrefs to
//   github.com/gabrielebonucci/(barton-ai-platform|gestionale-prenotazioni-agriturismo|gestione-prenotazioni)
// redirects (fetch with redirect: "manual"): "/blog", "/blog/boolflix-tmdb-react-search", "/workbench"
//   → status 307 or 308 and location header ending in "/"
// CV: GET /cv.pdf → 200, content-length === fs.statSync("public/cv.pdf").size === 60197
// contrast: parse globals.css for --paper, --ink, --ink-muted, --band-violet, --band-orange, --band-lime; WCAG ratio
//   white on violet ≥ 4.5, ink on orange ≥ 4.5, ink on lime ≥ 4.5, ink-muted on paper ≥ 4.5
```

60197 is the byte size of `ai-job-search/cv/main_portfolio_generale.pdf` (copied in Task 6).

- [ ] **Step 3: Add scripts and ignore**

`package.json` scripts: `"check": "node scripts/check-site.mjs"`, `"typecheck": "tsc --noEmit"`. `.gitignore`: append `.superpowers/` and `.playwright-mcp/`.

- [ ] **Step 4: Run against the current site to see it fail**

Run: `npm run build && (npm start &) && npm run check`
Expected: FAIL on GraphxStudio, Barton AI, whatsapp/workbench, redirects, CV size, contrast vars missing. Stop the server afterwards.

- [ ] **Step 5: Commit**

`git add scripts/check-site.mjs package.json .gitignore && git commit -m "chore: add site content check script"`

---

### Task 2: Visual foundation (tokens, fonts, layout shell, config)

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/(public)/layout.tsx`, `lib/site-config.ts`, `package.json` (name/description), `lib/i18n.tsx` (only `DEFAULT_LANGUAGE`)
- Delete: `components/cursor-glow.tsx`, `components/theme-provider.tsx`, `components/theme-toggle.tsx`, `components/theme-changer.tsx`, `lib/themes.ts`

**Interfaces:**
- Produces Tailwind utilities used by every later task: `bg-paper`, `text-ink`, `text-ink-soft`, `text-ink-muted`, `border-line`, `bg-band-violet`, `bg-band-orange`, `bg-band-lime`, `font-display` (Anton), `font-sans` (Instrument Sans). shadcn tokens (`--background`, `--foreground`, `--primary`, `--muted-foreground`, `--border`, `--ring`) map to paper/ink/ink/ink-muted/border/ink so `components/ui/*` keep working.
- Produces `siteConfig` fields: `url = "https://portfolio-xw9f-three.vercel.app"`, `title = "Gabriele Bonucci, Web Developer"`, `role = "Junior Web Developer"`, `instagram = "https://www.instagram.com/unbugalgiorno/"`, `description`/`bio` rewritten per spec Messaggio; remove `shortName` usages of "GB LAB" (set `shortName: "Gabriele Bonucci"`).

- [ ] **Step 1:** In `globals.css` replace `:root` and delete `.dark`, `--glow-*`, `.cursor-glow`, `.scanlines`, `.typing-cursor`, `.text-gradient`, `.glass`, `.hover-lift`, `.animate-pulse-glow`, `.animate-shimmer`, `.animate-float`, stagger classes. Add the colour variables from Global Constraints and register them in `@theme inline` (`--color-paper`, …, `--font-display: var(--font-anton)`, `--font-sans: var(--font-instrument)`). Keep one `@keyframes hero-in` (opacity + 12px translate, 500ms) wrapped so `@media (prefers-reduced-motion: reduce)` disables it. Add `:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px }`.
- [ ] **Step 2:** `app/layout.tsx`: load `Anton({ weight: "400", variable: "--font-anton" })` and `Instrument_Sans({ weight: ["400","500","600"], variable: "--font-instrument" })`; remove `ThemeProvider`; `<html lang="it">`; body `bg-paper text-ink font-sans antialiased`; keywords → `["Web Developer","React","JavaScript","WordPress","Claude Code","Gabriele Bonucci","Spoleto","Umbria"]`.
- [ ] **Step 3:** Remove `CursorGlow` and `scanlines` wrappers from `app/page.tsx` and `app/(public)/layout.tsx` (plain `<main>`). Remove `ThemeChanger`/`ThemeToggle` imports and JSX from `components/header.tsx` (header is redesigned in Task 4; here only make it compile). Delete the five files listed.
- [ ] **Step 4:** `lib/i18n.tsx`: `DEFAULT_LANGUAGE: Language = "it"`. `package.json`: `"name": "gabriele-bonucci-portfolio"`, `"description": "Portfolio di Gabriele Bonucci, web developer"`, drop the code-editor keywords.
- [ ] **Step 5: Verify** — Run: `npm run typecheck && npm run build` → Expected: both succeed; `grep -rn "next-themes\|ThemeChanger\|CursorGlow" app components lib` → no output.
- [ ] **Step 6: Commit** — `git commit -am "refactor: light paper theme, Anton + Instrument Sans, remove effects and theme switching"` (include deletions with `git add -A`).

---

### Task 3: Content model and copy

**Files:**
- Modify: `lib/projects-data.ts` (rewrite), `lib/i18n.tsx` (rewrite dictionaries)

**Interfaces:**
- Produces in `lib/projects-data.ts`:

```ts
export type ProjectKind = "agency" | "personal" | "study"
export type BandColor = "violet" | "orange" | "lime"
export interface Project {
  slug: string            // also the i18n key segment
  title: string
  kind: ProjectKind
  year: string
  stack: string[]
  band?: BandColor        // only main projects
  repoUrl?: string        // only public repos
  liveUrl?: string
  thumbnail?: string
}
export const mainProjects: Project[]   // exactly 3, in this order
export const otherProjects: Project[]  // exactly 2
```

Values:
| slug | title | kind | year | stack | band | repoUrl / thumbnail |
|---|---|---|---|---|---|---|
| `barton-ai` | Barton AI | personal | 2026 | React, Node.js, Express, SQLite, Ollama | violet | none |
| `gestionale-prenotazioni` | Gestionale prenotazioni | agency | 2026 | Laravel, Livewire, Stripe | orange | none |
| `web-hospitality` | Web Hospitality | agency | 2026 | WordPress, PHP, Stripe | lime | none |
| `trankiliti-fc` | Trankiliti FC | personal | 2025 | React, Firebase | – | thumbnail `/projects/trankiliti.png` |
| `boolflix` | Boolflix | study | 2025 | React, Vite, Axios, TMDB API | – | repo `https://github.com/gabrielebonucci/react-boolflix`, thumbnail `/projects/boolflix.png` |

- Produces i18n keys (both `it` and `en`; every key used in Tasks 4-5 must exist in both): `nav.projects`, `nav.about`, `nav.cv`, `nav.contact`, `hero.title`, `hero.body`, `hero.cta.contact`, `hero.cta.cv`, `projects.kind.agency|personal|study`, `projects.<slug>.summary` (one sentence, for bands/home), `projects.<slug>.description` (2-3 sentences, for `/projects`), `projects.heading`, `projects.others`, `projects.code`, `projects.live`, `projects.privateNote`, `home.experience.heading`, `home.experience.more`, `exp.graphx.role|period|desc`, `exp.agrieuro.*`, `exp.viw.*`, `intro.*` (bio, skills groups, education, languages, "Altro" with referee + Un Bug al Giorno), `footer.*`, `lang.tooltip`. Delete all `blog.*`, `wip.*`, `workbench.*`, `stack.*`, `hero.role.*`, `status.*` keys.

Fixed copy (IT / EN):
- `hero.title`: "Sviluppo web, costruito con l'AI." / "Web development, built with AI."
- `hero.body`: "Junior Web Developer da GraphxStudio, Umbertide. Costruisco siti e applicazioni web in React e JavaScript e sviluppo ogni giorno con Claude Code, controllando ogni riga prima che vada online." / "Junior Web Developer at GraphxStudio in Umbertide, Italy. I build websites and web apps with React and JavaScript, and I develop with Claude Code every day, reviewing every line before it ships."
- `hero.cta.contact`: "Scrivimi" / "Get in touch"; `hero.cta.cv`: "Scarica il CV" / "Download CV"
- `projects.kind.*`: "In agenzia" / "At the agency", "Progetto personale" / "Personal project", "Progetto di studio" / "Study project"
- `projects.privateNote`: "Codice privato" / "Private code"
- Summaries and descriptions: from spec "Progetti principali" and `01-candidate-profile.md`; the three main ones must contain "sviluppato con Claude Code" / "built with Claude Code" in `description`.
- Skills (`intro.skills.*`), grouped: "Front-end" (JavaScript, React, HTML, CSS, Vite), "WordPress e hosting" (temi e plugin, manutenzione, Plesk, cPanel, SEO), "Sviluppo con l'AI" (Claude Code, prompt, n8n, LLM locali con Ollama), "Back-end, livello base" (Node.js, Express, PHP, Laravel, MySQL, Firebase), "Strumenti" (Git, GitHub, Vercel, Stripe, Photoshop, Canva). Languages: "Italiano (madrelingua), Inglese (B2)".

- [ ] **Step 1:** Rewrite `lib/projects-data.ts` with the interface and table above.
- [ ] **Step 2:** Rewrite the `it` and `en` dictionaries in `lib/i18n.tsx` with the keys above (keep provider code unchanged apart from Task 2's default).
- [ ] **Step 3: Verify keys are paired** — add to `check-site.mjs` a static check: parse `lib/i18n.tsx`, collect keys of `it` and `en`, FAIL if the sets differ. Run `npm run check` (server not needed for this check; other checks may still fail) → Expected: `PASS i18n keys paired`.
- [ ] **Step 4:** `npm run typecheck` → fails only in components still using old keys/fields (`projects-grid.tsx`, `projects-page-content.tsx`, `hero-section.tsx`, `workbench*`); those are rewritten or deleted in Tasks 4-6. Do not patch them here.
- [ ] **Step 5: Commit** — `git commit -am "feat: new project data and IT/EN copy"`

---

### Task 4: Home page

**Files:**
- Create: `components/project-bands.tsx`, `components/other-projects.tsx`, `components/experience-strip.tsx`
- Modify (rewrite): `components/header.tsx`, `components/hero-section.tsx`, `components/footer.tsx`, `app/page.tsx`
- Delete: `components/projects-grid.tsx`, `components/tech-stack.tsx`, `components/workbench.tsx`

**Interfaces:**
- Consumes: Task 2 utilities, Task 3 `mainProjects`, `otherProjects`, `Project`, i18n keys.
- Produces: `ProjectBands({ projects, detailed = false }: { projects: Project[]; detailed?: boolean })` — 3-column grid on `lg`, stacked below; each band: kind label (`projects.kind.*`), title in `font-display` ~40px, `summary` (or `description` when `detailed`), stack joined with ", " at the bottom, `projects.privateNote` when no `repoUrl`. `OtherProjects({ projects }: { projects: Project[] })` — compact rows with optional thumbnail, kind, summary, stack, repo/live links. `ExperienceStrip()` — GraphxStudio prominent + two previous roles in one line each + link "Chi sono" to `/introduction`.

- [ ] **Step 1: Header** — name "Gabriele Bonucci" (link `/`), links: `nav.projects` → `/projects`, `nav.about` → `/introduction`, `nav.cv` → `/cv.pdf` (new tab), `LanguageToggle`, button `nav.contact` → `mailto:` (ink background, paper text). Mobile: keep existing toggle-menu behaviour, restyled. No gradients, no mono, no hover index animation.
- [ ] **Step 2: Hero** — grid `1fr / 230px` on `lg`, single column below. `<h1 class="font-display">` with `hero.title`, `clamp(3rem, 9vw, 5.75rem)`, line-height .88. Right column: `hero.body`, `hero.cta.contact` (solid ink) and `hero.cta.cv` (outline). Only element with the `hero-in` animation.
- [ ] **Step 3: Sections** — implement `ProjectBands`, `OtherProjects`, `ExperienceStrip` per Interfaces.
- [ ] **Step 4: Footer** — email, phone, LinkedIn, GitHub as plain text links; line "Video su Instagram: @unbugalgiorno" linking `siteConfig.instagram`; © year + name. No icons-only links without `aria-label`.
- [ ] **Step 5: `app/page.tsx`** — order: Header, Hero, `ProjectBands(mainProjects)`, `OtherProjects(otherProjects)`, `ExperienceStrip`, Footer. Keep JSON-LD scripts.
- [ ] **Step 6: Verify** — `npm run typecheck` (errors allowed only in files Task 5/6 rewrite or delete), `npm run build && npm start` then `npm run check` → Expected PASS for all `/` checks. Screenshot `/` at 1280×900 and 375×812 and compare with the approved mock (`.superpowers/brainstorm/*/content/direzioni-colore.html`, option 2).
- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: new home with colour project bands"`

---

### Task 5: Projects and Chi sono pages

**Files:**
- Modify (rewrite): `components/public/projects/projects-page-content.tsx`, `app/(public)/introduction/page.tsx`
- Modify: `app/(public)/projects/page.tsx` and `loading.tsx` only if they reference removed names

**Interfaces:**
- Consumes: `ProjectBands` (with `detailed`), `OtherProjects`, i18n keys from Task 3.

- [ ] **Step 1: `/projects`** — `<h1 class="font-display">` `projects.heading`, then `ProjectBands({ projects: mainProjects, detailed: true })`, then `projects.others` heading + `OtherProjects`. Remove search, tag filters and status filters (5 projects do not need them).
- [ ] **Step 2: `/introduction`** — sections in order: title + bio (`intro.*`), portrait `/developer-portrait.jpg` (alt from i18n), skills groups from Task 3 as plain lists (no badges grid with identical icon), experience timeline (GraphxStudio first, with its 4-5 bullets from `01-candidate-profile.md`) and education (Boolean, ITS Umbria Academy 95/100, ITCG Spagna), languages, "Altro": referee AIA-FIGC and one line on Un Bug al Giorno linking `siteConfig.instagram`. Remove focus-areas cards and the "Open to work" badge.
- [ ] **Step 3: Verify** — `npm run typecheck` (only blog/workbench files may still error), build, start, `npm run check` → PASS for `/projects` and `/introduction` required/forbidden checks.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: rewrite projects and about pages"`

---

### Task 6: Remove blog and workbench, redirects, SEO, CV

**Files:**
- Delete: `app/(public)/blog/` (whole folder), `app/(public)/workbench/`, `components/public/blog/`, `components/public/workbench/`, `lib/blog-data.tsx`
- Modify: `next.config.mjs`, `app/sitemap.ts`, `lib/structured-data.ts`, `public/robots.txt` (if it lists removed paths)
- Replace: `public/cv.pdf` ← `../../Workspace Claude Gab/ai-job-search/cv/main_portfolio_generale.pdf`

- [ ] **Step 1:** Delete the listed paths.
- [ ] **Step 2:** `next.config.mjs`: `async redirects()` returning `{ source: "/blog", destination: "/", permanent: true }`, `{ source: "/blog/:slug*", destination: "/", permanent: true }`, `{ source: "/workbench", destination: "/", permanent: true }`. Set `typescript.ignoreBuildErrors: false` (typecheck is green from here on).
- [ ] **Step 3:** `app/sitemap.ts`: only `/`, `/projects`, `/introduction`. `lib/structured-data.ts`: delete `generateBlogPostStructuredData` and the `SearchAction`; `Person.jobTitle = siteConfig.role`, `worksFor = { "@type": "Organization", name: "GraphxStudio" }`, `sameAs` adds `siteConfig.instagram`.
- [ ] **Step 4:** Copy the CV: `cp "../../Workspace Claude Gab/ai-job-search/cv/main_portfolio_generale.pdf" public/cv.pdf` (paths relative to `Desktop/Progetti/portfolio`). Expected size 60197 bytes.
- [ ] **Step 5: Verify** — `npm run typecheck` → 0 errors; `npm run build`; `npm start`; `npm run check` → **all PASS**.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "chore: drop blog and workbench, add redirects, update SEO and CV"`

---

### Task 7: Final visual and accessibility pass

**Files:** fixes only, wherever issues are found.

- [ ] **Step 1:** With `npm start` running, screenshot `/`, `/projects`, `/introduction` at 1280×900 and 375×812 (Playwright). On each page at 375px evaluate `document.documentElement.scrollWidth <= 375` → Expected `true`.
- [ ] **Step 2:** Switch to EN via the toggle on each page and screenshot once; Expected: no raw keys, no Italian left in UI chrome.
- [ ] **Step 3:** Tab through the home page: every link/button shows the focus outline; the mobile menu opens and closes with the keyboard.
- [ ] **Step 4:** Check against the spec's anti-goals list (glow, gradients, mono eyebrows, `→`, identical soft-shadow cards, fade-up on every section) and fix any that slipped in.
- [ ] **Step 5:** `npm run typecheck && npm run build && npm start` + `npm run check` → all PASS. Commit any fixes: `git commit -am "fix: visual and a11y pass"`.
- [ ] **Step 6:** Report to Gabriele with screenshots; ask before `git push` / Vercel deploy.
