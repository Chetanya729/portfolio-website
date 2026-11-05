# Chetanya Bansal — Portfolio

A single-page portfolio for a Java backend developer, built with **React 19, TypeScript, Vite, Tailwind CSS v4 and Framer Motion**.

## Why this stack

- **Vite + React + TypeScript** — a single-page site with no server rendering needs, so Vite gives the fastest dev loop and a small static build that deploys anywhere. Next.js would add a server runtime this site doesn't use.
- **Tailwind CSS v4** — design tokens (colours, fonts, shadows) live in one `@theme` block in `src/index.css`.
- **Framer Motion** — entrance, scroll and layout animations. `MotionConfig reducedMotion="user"` plus a CSS media query turn motion off for visitors who prefer reduced motion.
- **Lucide React** — UI icons. GitHub / LinkedIn marks are local SVGs (`src/components/ui/BrandIcons.tsx`) because Lucide no longer ships brand icons.

## Run locally

Requires Node 20+.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173.

```bash
npm run build
```

`build` type-checks with `tsc` and writes the static site to `dist/`. Preview it with `npm run preview`.

## Updating content

Everything you will want to edit is in `src/data/`:

| File | What it holds |
|---|---|
| `profile.ts` | Name, role, email, LinkedIn / GitHub URLs, resume path, hero highlights, nav items |
| `skills.ts` | Skill groups (primary items are highlighted) and the marquee list |
| `projects.ts` | Featured projects, their diagrams, the repos hidden from “More on GitHub”, and an offline snapshot |
| `experience.ts` | Experience timeline, education, certifications, achievements |

**Resume:** replace `public/Chetanya_Bansal_Resume.pdf` (keep the file name, or change `resumeUrl` / `resumeFileName` in `profile.ts`).

**Placeholder to fill in:** the *E-Commerce Backend API* has no public repository. When it is public, add `repo: '<repository-name>'` to that entry in `projects.ts` (there is a `TODO` comment) and the card shows a Code button with live GitHub data.

**Live demo links:** add `liveUrl: 'https://…'` to any project and a “Live demo” button appears in its detail view.

## GitHub integration

`src/lib/github.ts` fetches public repos from the GitHub REST API in the browser:

- Featured cards get live **last-updated time and stars**, matched by the `repo` name in `projects.ts`.
- “More on GitHub” lists other repos, skipping featured ones, forks, archived or empty repos, repos with no description and anything in `hiddenRepos`.
- Results are cached in `sessionStorage` for 30 minutes to stay well under the unauthenticated limit (60 requests/hour per IP).
- If the request fails or is rate-limited, the site falls back to the `fallbackRepos` snapshot and says so.

## Deploy

The build uses relative asset paths (`base: './'`), so `dist/` works on any static host, at a domain root or a sub-path.

**Vercel** — import the repository; it detects Vite. Build command `npm run build`, output directory `dist`.

**Netlify** — build command `npm run build`, publish directory `dist`.

**GitHub Pages** — push `dist/` to a `gh-pages` branch, or use the official “Deploy static content to Pages” GitHub Action with `path: dist`.

**Custom domain** — `index.html` sets the canonical URL and Open Graph URL to `https://chetanya.co.in/`. Change both if you deploy elsewhere.

## Project structure

```
src/
├── App.tsx                     Page composition + MotionConfig
├── index.css                   Tailwind import, design tokens, base styles
├── data/                       All editable content
├── hooks/                      useActiveSection (nav highlight), useGitHubRepos
├── lib/github.ts               GitHub API client, caching, relative time
└── components/
    ├── layout/                 Navbar (scroll progress, mobile menu), Footer
    ├── hero/HeroVisual.tsx     Animated request-lifecycle illustration
    ├── projects/               ProjectCard, ProjectModal, ProjectVisual, MoreRepos
    ├── sections/               Hero, About, Skills, Projects, Experience, Education, Contact
    └── ui/                     Button, Reveal, SectionHeading, BrandIcons
```

## Accessibility notes

- Semantic landmarks, a skip link, labelled sections, `aria-current` on the active nav item.
- The project dialog traps focus, closes on Escape or backdrop click, and returns focus to the card that opened it.
- Accent colours used for text (`teal-ink`, `clay-ink`) are darker shades chosen for AA contrast on the ivory background.
- All animations respect `prefers-reduced-motion`.
