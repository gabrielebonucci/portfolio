export const featuredProjects: Array<{
  id: number
  title: string
  description: string
  tags: string[]
  status: string
  year: string
  stars: number
  forks: number
  url: string
  homepage?: string
  featured: boolean
  highlight?: boolean
  // "solo" | "team" — drives the role tag on the card
  role: "solo" | "team"
  // Optional screenshot shown at the top of the card. Drop images in /public/projects/
  thumbnail?: string
}> = [
  {
    id: 0,
    title: "Boolflix",
    description:
      "Netflix-style web app with real-time movie and TV series search via the TMDB API. Combines film and series results, displays posters, ratings, overviews, and original titles in a card grid layout.",
    tags: ["React", "Vite", "Axios", "TMDB API"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/gabrielebonucci/react-boolflix",
    featured: true,
    highlight: true,
    role: "solo",
  },
  {
    id: 1,
    title: "Trankiliti FC",
    description:
      "Website and management panel for an amateur football team built with React and Firebase. Real-time squad roster, match scheduling, automatic standings, news, and player statistics (goals and assists).",
    tags: ["React", "Firebase", "Firestore", "Authentication"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/gabrielebonucci",
    featured: true,
    role: "solo",
  },
  {
    id: 2,
    title: "DC Comics",
    description:
      "Replica of the DC Comics homepage with reusable React components (Header, Main, ServicesBanner, Footer) and dynamic rendering of hero, services, and footer sections.",
    tags: ["React", "Vite", "Components"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/gabrielebonucci/react-dc-comics",
    featured: true,
    role: "solo",
  },
]
