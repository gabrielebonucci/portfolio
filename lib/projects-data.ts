// Project list. Visible copy (summary, description) lives in lib/i18n.tsx
// under `projects.<slug>.summary` and `projects.<slug>.description`.

export type ProjectKind = "agency" | "personal" | "study"
export type BandColor = "violet" | "orange" | "lime"

export interface Project {
  slug: string
  title: string
  kind: ProjectKind
  year: string
  stack: string[]
  // Only the three main projects get a colour band
  band?: BandColor
  // Only public repositories: agency and Barton AI code is private
  repoUrl?: string
  liveUrl?: string
  // Screenshot in /public/projects/
  thumbnail?: string
}

export const mainProjects: Project[] = [
  {
    slug: "barton-ai",
    title: "Barton AI",
    kind: "personal",
    year: "2026",
    stack: ["React", "Node.js", "Express", "SQLite", "Ollama"],
    band: "violet",
  },
  {
    slug: "gestionale-prenotazioni",
    title: "Gestionale prenotazioni",
    kind: "agency",
    year: "2026",
    stack: ["Laravel", "Livewire", "Stripe"],
    band: "orange",
  },
  {
    slug: "web-hospitality",
    title: "Web Hospitality",
    kind: "agency",
    year: "2026",
    stack: ["WordPress", "PHP", "Stripe"],
    band: "lime",
  },
]

export const otherProjects: Project[] = [
  {
    slug: "trankiliti-fc",
    title: "Trankiliti FC",
    kind: "personal",
    year: "2025",
    stack: ["React", "Firebase"],
    thumbnail: "/projects/trankiliti.png",
  },
  {
    slug: "boolflix",
    title: "Boolflix",
    kind: "study",
    year: "2025",
    stack: ["React", "Vite", "Axios", "TMDB API"],
    repoUrl: "https://github.com/gabrielebonucci/react-boolflix",
    thumbnail: "/projects/boolflix.png",
  },
]
