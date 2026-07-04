"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "it"

const STORAGE_KEY = "site-language"
const DEFAULT_LANGUAGE: Language = "en"

/**
 * Translation dictionary.
 * Keys are dot-namespaced (e.g. "hero.title") and looked up per active language.
 * To translate more of the site, just add keys here and consume them with `t("your.key")`.
 */
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header / nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.workbench": "Workbench",
    "nav.blog": "Blog",
    "status.building": "Open to work",
    "lang.tooltip": "Language",

    // Hero
    "hero.role.0": "building interfaces",
    "hero.role.1": "automating workflows",
    "hero.role.2": "integrating AI agents",
    "hero.role.3": "crafting with React",
    "hero.role.4": "forging full stack apps",
    "hero.title.a": "Junior Full Stack Web Developer",
    "hero.title.b": "& AI Automation Specialist",
    "hero.hook": "I build modern React interfaces and AI-powered automations that solve real business problems.",
    "hero.basedIn": "Based in",
    "hero.stackLabel": "core stack",
    "hero.cta.contact": "Contact me",
    "hero.cta.cv": "Download CV",
    "hero.cta.primary": "view projects",
    "hero.scroll": "scroll",

    // Footer
    "footer.eyebrow": "Connect",
    "footer.heading.a": "Let's build something ",
    "footer.heading.b": "together",
    "footer.description":
      "Open to collaborations, freelance projects, and conversations about web development, AI automation, and building products that solve real problems.",
    "footer.cta": "send a signal",
    "footer.elsewhere": "Find me elsewhere",
    "footer.rights": "All experiments reserved",

    // Projects grid
    "projects.eyebrow": "Artifacts",
    "projects.heading": "Featured Projects",
    "projects.filter.all": "all",
    "projects.filter.shipped": "shipped",
    "projects.filter.in-progress": "in-progress",
    "projects.filter.archived": "archived",
    "projects.status.shipped": "shipped",
    "projects.status.in-progress": "in-progress",
    "projects.status.archived": "archived",
    "projects.badge.featured": "Featured",
    "projects.link.source": "source",
    "projects.link.live": "live",
    "projects.role.solo": "Solo project",
    "projects.role.team": "Team project",
    "projects.liveDemo": "Live Demo",
    "projects.pageSubtitle":
      "Selected web applications built during my Full Stack training and personal development — React, Firebase, and API integrations in production-ready layouts.",
    "projects.searchPlaceholder": "Search projects...",
    "projects.empty": "No projects found matching your criteria.",
    "projects.0.description":
      "Solves fragmented movie/series discovery by unifying TMDB film and TV results into one real-time search grid. Solo build in React, Vite and Axios — parallel API calls normalized into a single responsive UI with posters, ratings and original titles.",
    "projects.1.description":
      "Replaces spreadsheets for an amateur football team with a management platform: live squad roster, match scheduling, automatic standings and player stats. Solo full-stack build in React and Firebase/Firestore, with authentication and real-time data sync.",
    "projects.2.description":
      "A pixel-faithful DC Comics homepage rebuilt to practice scalable UI architecture. Solo front-end project in React/Vite structured around reusable components (Header, Main, ServicesBanner, Footer) with data-driven, dynamic section rendering.",

    // Workbench
    "workbench.eyebrow": "Work in Progress",
    "workbench.heading": "Workbench",
    "workbench.subtitle": "Active experiments and prototypes. Web apps, AI automations, and tools currently in development.",
    "workbench.live": "live",
    "workbench.runHint": "press enter to run",
    "wip.1.description": "Website prototype for The Lab Caffè — branding, layout, and interactive sections",
    "wip.2.description":
      "n8n workflow automation with AI agents for restaurant and bar reservation management via WhatsApp",

    // Tech stack (home)
    "stack.eyebrow": "Toolbox",
    "stack.heading": "Tech Stack",
    "stack.subtitle": "The core technologies I use to build web apps and automations end to end.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Database",
    "stack.automation": "AI & Automation",
    "stack.more": "Full skill set",
  },
  it: {
    // Header / nav
    "nav.home": "Home",
    "nav.about": "Chi sono",
    "nav.projects": "Progetti",
    "nav.workbench": "Banco di lavoro",
    "nav.blog": "Blog",
    "status.building": "Disponibile",
    "lang.tooltip": "Lingua",

    // Hero
    "hero.role.0": "creo interfacce",
    "hero.role.1": "automatizzo flussi di lavoro",
    "hero.role.2": "integro agenti AI",
    "hero.role.3": "sviluppo con React",
    "hero.role.4": "forgio app full stack",
    "hero.title.a": "Junior Full Stack Web Developer",
    "hero.title.b": "& AI Automation Specialist",
    "hero.hook": "Costruisco interfacce React moderne e automazioni basate su AI che risolvono problemi reali di business.",
    "hero.basedIn": "Con base a",
    "hero.stackLabel": "stack principale",
    "hero.cta.contact": "Contattami",
    "hero.cta.cv": "Scarica CV",
    "hero.cta.primary": "vedi i progetti",
    "hero.scroll": "scorri",

    // Footer
    "footer.eyebrow": "Contatti",
    "footer.heading.a": "Costruiamo qualcosa ",
    "footer.heading.b": "insieme",
    "footer.description":
      "Disponibile per collaborazioni, progetti freelance e conversazioni su sviluppo web, automazione con AI e creazione di prodotti che risolvono problemi reali.",
    "footer.cta": "invia un segnale",
    "footer.elsewhere": "Trovami altrove",
    "footer.rights": "Tutti gli esperimenti riservati",

    // Projects grid
    "projects.eyebrow": "Artefatti",
    "projects.heading": "Progetti in evidenza",
    "projects.filter.all": "tutti",
    "projects.filter.shipped": "rilasciati",
    "projects.filter.in-progress": "in corso",
    "projects.filter.archived": "archiviati",
    "projects.status.shipped": "rilasciato",
    "projects.status.in-progress": "in corso",
    "projects.status.archived": "archiviato",
    "projects.badge.featured": "In evidenza",
    "projects.link.source": "codice",
    "projects.link.live": "live",
    "projects.role.solo": "Progetto personale",
    "projects.role.team": "Progetto di team",
    "projects.liveDemo": "Demo live",
    "projects.pageSubtitle":
      "Applicazioni web selezionate, realizzate durante il mio percorso Full Stack e in progetti personali — React, Firebase e integrazioni API in layout pronti per la produzione.",
    "projects.searchPlaceholder": "Cerca progetti...",
    "projects.empty": "Nessun progetto trovato con questi criteri.",
    "projects.0.description":
      "Risolve la ricerca frammentata di film e serie unificando i risultati TMDB in un'unica griglia con ricerca in tempo reale. Sviluppo individuale in React, Vite e Axios — chiamate API parallele normalizzate in un'interfaccia responsive con locandine, valutazioni e titoli originali.",
    "projects.1.description":
      "Sostituisce i fogli di calcolo di una squadra di calcio amatoriale con una piattaforma gestionale: rosa in tempo reale, calendario partite, classifica automatica e statistiche giocatori. Sviluppo full-stack individuale in React e Firebase/Firestore, con autenticazione e sincronizzazione dati in tempo reale.",
    "projects.2.description":
      "Homepage di DC Comics ricostruita fedelmente per esercitare un'architettura UI scalabile. Progetto front-end individuale in React/Vite strutturato su componenti riutilizzabili (Header, Main, ServicesBanner, Footer) con rendering dinamico guidato dai dati.",

    // Workbench
    "workbench.eyebrow": "Lavori in corso",
    "workbench.heading": "Banco di lavoro",
    "workbench.subtitle": "Esperimenti e prototipi attivi. Web app, automazioni AI e strumenti attualmente in sviluppo.",
    "workbench.live": "live",
    "workbench.runHint": "premi invio per eseguire",
    "wip.1.description": "Prototipo del sito per The Lab Caffè — branding, layout e sezioni interattive",
    "wip.2.description":
      "Automazione di flussi con n8n e agenti AI per la gestione delle prenotazioni di ristoranti e bar tramite WhatsApp",

    // Tech stack (home)
    "stack.eyebrow": "Strumenti",
    "stack.heading": "Stack tecnologico",
    "stack.subtitle": "Le tecnologie principali con cui costruisco web app e automazioni end to end.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Database",
    "stack.automation": "AI & Automazione",
    "stack.more": "Competenze complete",
  },
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  // Read persisted language after mount (avoids hydration mismatch)
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    if (saved === "en" || saved === "it") {
      setLanguageState(saved)
    }
  }, [])

  // Keep <html lang> and localStorage in sync with the active language
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "it" : "en")
  }, [language, setLanguage])

  const t = useCallback(
    (key: string) => translations[language][key] ?? translations.en[key] ?? key,
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
