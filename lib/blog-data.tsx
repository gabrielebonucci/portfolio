import { siteConfig } from "./site-config"

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

// TODO: Sostituire /developer-portrait.png con una foto professionale reale di Gabriele Bonucci
const author = {
  name: siteConfig.name,
  avatar: "/developer-portrait.png",
  role: siteConfig.role,
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "boolflix-tmdb-react-search",
    title: "Building Boolflix: TMDB Search with React",
    excerpt:
      "How I built a Netflix-style search app combining movie and TV series results from the TMDB API using React, Vite, and Axios.",
    content: `
## Project Overview

Boolflix is a Netflix-inspired web application that lets users search for movies and TV series in real time. Built with React and Vite, it connects to The Movie Database (TMDB) API to fetch and display results.

## Dual API Strategy

The search triggers two parallel Axios requests — one for movies and one for TV series. Results are merged into a single array, normalized with shared fields (title, poster, rating, overview), and rendered in a responsive card grid.

## Key Components

- **Header**: Search input and trigger button
- **MovieCard**: Individual result with poster, rating stars, and language flag
- **ResultsGrid**: Layout container for search results

## Takeaways

Working with external APIs taught me to handle loading states, normalize heterogeneous data shapes (movies use \`title\`, series use \`name\`), and structure components for reusability across different content types.
    `,
    date: "Dec 15, 2025",
    readTime: "5 min read",
    category: "frontend",
    tags: ["react", "vite", "axios", "tmdb"],
    author,
    featured: true,
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 2,
    slug: "firebase-football-team-management",
    title: "Real-Time Squad Management with Firebase",
    excerpt:
      "Building Trankiliti FC — a football team website and admin panel with Firestore, authentication, and live standings updates.",
    content: `
## The Challenge

Amateur football teams need more than a static website. Trankiliti FC combines a public-facing site with a management panel for rosters, matches, standings, news, and player statistics.

## Firebase Architecture

React handles the frontend while Firebase provides:
- **Firestore** for real-time data sync on rosters and match results
- **Authentication** for multi-user admin access
- **Automatic standings** calculated from match outcomes

## Features Implemented

- Player roster with goals and assists tracking
- Match scheduling and result entry
- Live-updated league standings
- News section for team announcements

## Lessons Learned

Firebase's real-time listeners simplify collaborative data management, but structuring Firestore collections early prevents refactoring pain as features grow.
    `,
    date: "Nov 20, 2025",
    readTime: "6 min read",
    category: "fullstack",
    tags: ["react", "firebase", "firestore"],
    author,
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    slug: "n8n-whatsapp-booking-automation",
    title: "WhatsApp Booking Bots with n8n and AI Agents",
    excerpt:
      "Designing workflow automations for restaurants and bars — handling reservations through WhatsApp using n8n and AI agents.",
    content: `
## Why Automate Bookings?

Restaurants and bars often manage reservations manually via phone or messaging apps. An automated WhatsApp flow reduces no-shows, frees staff time, and provides 24/7 availability.

## Workflow Design with n8n

Using n8n, I build multi-step workflows that:
1. Receive incoming WhatsApp messages
2. Parse intent with AI agents (date, time, party size)
3. Check availability against a booking database
4. Confirm or suggest alternatives
5. Send confirmation messages automatically

## AI Agent Integration

AI agents handle natural language understanding — customers don't need to follow rigid command formats. The agent extracts structured booking data from conversational messages.

## Next Steps

Expanding to multi-location support, calendar integrations, and automated reminder messages before reservations.
    `,
    date: "Jun 10, 2026",
    readTime: "7 min read",
    category: "automation",
    tags: ["n8n", "ai", "whatsapp", "automation"],
    author,
    featured: false,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    slug: "dc-comics-component-architecture",
    title: "Component Architecture in a DC Comics Clone",
    excerpt:
      "Replicating the DC Comics homepage with reusable React components and a modular layout structure.",
    content: `
## Project Goal

Recreate the DC Comics homepage look and feel using React and Vite, focusing on component reusability and clean separation of concerns.

## Component Structure

The app is split into four main sections:
- **Header**: Navigation and branding
- **Main**: Hero jumbotron with dynamic content
- **ServicesBanner**: Service cards with icons and links
- **Footer**: Social links and site navigation

## Dynamic Rendering

Each section receives data as props, making it straightforward to swap content or extend the layout without rewriting markup. Assets are organized under \`src/assets\` for maintainability.

## Takeaway

Studying an existing design system and breaking it into React components is excellent practice for understanding layout patterns, responsive design, and prop-driven architecture.
    `,
    date: "Oct 5, 2025",
    readTime: "4 min read",
    category: "frontend",
    tags: ["react", "vite", "components"],
    author,
    featured: false,
    color: "from-orange-500/20 to-amber-500/20",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
