"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "it"

const STORAGE_KEY = "site-language"
const DEFAULT_LANGUAGE: Language = "it"

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

    // Workbench
    "workbench.eyebrow": "Work in Progress",
    "workbench.heading": "Workbench",
    "workbench.subtitle": "Active experiments and prototypes. Web apps, AI automations, and tools currently in development.",
    "workbench.live": "live",
    "workbench.runHint": "press enter to run",
    "wip.1.description": "Website prototype for The Lab Caffè — branding, layout, and interactive sections",
    "wip.2.description":
      "n8n workflow automation with AI agents for restaurant and bar reservation management via WhatsApp",
    "wip.3.description": "Netflix clone with TMDB API search — refining UI, error handling, and result filtering",
    "wip.4.description": "Football team website and admin panel with Firebase — squad, matches, standings, and stats",
    "workbench.pageSubtitle":
      "Active experiments and prototypes — web apps, AI automations, and client projects currently in development.",
    "workbench.stats": "Stats",
    "workbench.active": "Active",
    "workbench.avgProgress": "Avg Progress",
    "workbench.recentActivity": "Recent Activity",
    "act.0.message": "Update hero section and menu animations",
    "act.0.time": "2 days ago",
    "act.1.message": "Improve TMDB search result normalization",
    "act.1.time": "1 week ago",
    "act.2.message": "Add n8n workflow for reservation confirmations",
    "act.2.time": "3 days ago",

    // Tech stack (home)
    "stack.eyebrow": "Toolbox",
    "stack.heading": "Tech Stack",
    "stack.subtitle": "The core technologies I use to build web apps and automations end to end.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Database",
    "stack.automation": "AI & Automation",
    "stack.more": "Full skill set",

    // Introduction / About page
    "intro.hero.eyebrow": "About",
    "intro.hero.title.a": "Full Stack Web Developer",
    "intro.hero.title.b": "& AI Automation",
    "intro.hero.bio":
      "Full Stack Developer specializing in modern interfaces with React and AI automations. I build websites and web applications with React, JavaScript, Node.js/Express, and develop intelligent automations with n8n and AI agents — including WhatsApp chatbots for restaurant and bar reservation management. Trained through the Boolean Master in Full Stack Web Development and the ITS Umbria Academy Master in Automation and Digital Systems (95/100).",
    "intro.about.eyebrow": "About Me",
    "intro.about.heading": "Developer from Spoleto, Umbria (Italy)",
    "intro.about.p1":
      "I'm a Full Stack Developer with a strong focus on modern React interfaces and intelligent workflow automations. My path combines hands-on web development training at Boolean with a specialized master in automation and digital systems at ITS Umbria Academy, where I graduated with 95/100.",
    "intro.about.p2":
      "Beyond code, I bring experience from data management at AGRIEURO, social media design at Very Important Web, and over six years as a FIGC football referee — skills in precision, communication, and performing under pressure that translate directly into professional development work.",
    "intro.about.p3":
      "Currently exploring AI-powered automations with n8n, building WhatsApp chatbots for hospitality businesses, and shipping React applications from concept to deployment.",
    "intro.skills.eyebrow": "Technical Stack",
    "intro.skills.heading": "Skills & Tools",
    "intro.career.eyebrow": "Career",
    "intro.career.heading": "Experience",
    "intro.education.eyebrow": "Education",
    "intro.education.heading": "Formation",
    "intro.exp.0.role": "Data Entry Specialist",
    "intro.exp.0.period": "1 year 7 months",
    "intro.exp.0.desc": "Database management and product data entry for the outlet department in the company ERP system.",
    "intro.exp.1.role": "Junior Web Designer",
    "intro.exp.1.period": "6 months",
    "intro.exp.1.desc": "Created graphics and managed Instagram profiles for client companies.",
    "intro.exp.2.role": "Football Referee",
    "intro.exp.2.period": "Since 2018",
    "intro.exp.2.desc": "Leadership, quick decision-making, and pressure management on the field.",
    "intro.edu.0.title": "Master in Full Stack Web Development",
    "intro.edu.1.title": "Automation and Mechatronic Systems (95/100)",
    "intro.edu.2.title": "Technical and Professional Institute Diploma",
    "intro.focus.eyebrow": "Focus Areas",
    "intro.focus.heading": "What I Build",
    "intro.focus.0.title": "Full Stack Web Apps",
    "intro.focus.0.desc":
      "React frontends with Node.js/Express backends, MySQL databases, and deployment-ready architectures.",
    "intro.focus.1.title": "AI & Workflow Automation",
    "intro.focus.1.desc":
      "n8n workflows, AI agents, and WhatsApp chatbots for booking management in restaurants and bars.",
    "intro.focus.2.title": "Modern Interfaces",
    "intro.focus.2.desc":
      "Responsive, component-driven UIs with React, Vite, and API integrations for dynamic user experiences.",

    // Blog (UI chrome only — article content lives in blog-data)
    "blog.hero.eyebrow": "Digital Journal",
    "blog.hero.title.b": "Insights",
    "blog.hero.desc":
      "Articles on React, Firebase, AI automation, and full stack development — notes from the lab by",
    "blog.list.featured": "featured",
    "blog.list.readArticle": "read article",
    "blog.list.read": "Read",
    "blog.sidebar.search": "Search articles...",
    "blog.sidebar.categories": "Categories",
    "blog.sidebar.allPosts": "All Posts",
    "blog.sidebar.popularTags": "Popular Tags",
    "blog.sidebar.newsletter": "Newsletter",
    "blog.sidebar.newsletterDesc": "Get notified about new articles and experiments. No spam, unsubscribe anytime.",
    "blog.sidebar.emailPlaceholder": "your@email.com",
    "blog.sidebar.subscribe": "Subscribe",
    "blog.sidebar.rss": "Subscribe via RSS",
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

    // Workbench
    "workbench.eyebrow": "Lavori in corso",
    "workbench.heading": "Banco di lavoro",
    "workbench.subtitle": "Esperimenti e prototipi attivi. Web app, automazioni AI e strumenti attualmente in sviluppo.",
    "workbench.live": "live",
    "workbench.runHint": "premi invio per eseguire",
    "wip.1.description": "Prototipo del sito per The Lab Caffè — branding, layout e sezioni interattive",
    "wip.2.description":
      "Automazione di flussi con n8n e agenti AI per la gestione delle prenotazioni di ristoranti e bar tramite WhatsApp",
    "wip.3.description":
      "Clone di Netflix con ricerca tramite API TMDB — rifinitura di UI, gestione errori e filtraggio dei risultati",
    "wip.4.description":
      "Sito e pannello di gestione per una squadra di calcio con Firebase — rosa, partite, classifica e statistiche",
    "workbench.pageSubtitle":
      "Esperimenti e prototipi attivi — web app, automazioni AI e progetti per clienti attualmente in sviluppo.",
    "workbench.stats": "Statistiche",
    "workbench.active": "Attivi",
    "workbench.avgProgress": "Progresso medio",
    "workbench.recentActivity": "Attività recente",
    "act.0.message": "Aggiornata la sezione hero e le animazioni del menu",
    "act.0.time": "2 giorni fa",
    "act.1.message": "Migliorata la normalizzazione dei risultati di ricerca TMDB",
    "act.1.time": "1 settimana fa",
    "act.2.message": "Aggiunto flusso n8n per le conferme di prenotazione",
    "act.2.time": "3 giorni fa",

    // Tech stack (home)
    "stack.eyebrow": "Strumenti",
    "stack.heading": "Stack tecnologico",
    "stack.subtitle": "Le tecnologie principali con cui costruisco web app e automazioni end to end.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Database",
    "stack.automation": "AI & Automazione",
    "stack.more": "Competenze complete",

    // Introduction / About page
    "intro.hero.eyebrow": "Chi è",
    "intro.hero.title.a": "Sviluppatore Full Stack Web",
    "intro.hero.title.b": "& Automazione AI",
    "intro.hero.bio":
      "Sviluppatore Full Stack specializzato in interfacce moderne con React e automazioni basate su AI. Realizzo siti e applicazioni web con React, JavaScript, Node.js/Express e sviluppo automazioni intelligenti con n8n e agenti AI — inclusi chatbot WhatsApp per la gestione delle prenotazioni di ristoranti e bar. Formato attraverso il Master Boolean in Sviluppo Web Full Stack e il Master ITS Umbria Academy in Automazione e Sistemi Digitali (95/100).",
    "intro.about.eyebrow": "Chi sono",
    "intro.about.heading": "Sviluppatore da Spoleto, Umbria (Italia)",
    "intro.about.p1":
      "Sono uno Sviluppatore Full Stack con una forte attenzione alle interfacce React moderne e alle automazioni intelligenti dei flussi di lavoro. Il mio percorso unisce una formazione pratica nello sviluppo web presso Boolean a un master specializzato in automazione e sistemi digitali all'ITS Umbria Academy, dove mi sono diplomato con 95/100.",
    "intro.about.p2":
      "Oltre al codice, porto con me l'esperienza nella gestione dati in AGRIEURO, nella grafica social presso Very Important Web e in oltre sei anni come arbitro di calcio FIGC — competenze in precisione, comunicazione e gestione della pressione che si traducono direttamente nel lavoro di sviluppo professionale.",
    "intro.about.p3":
      "Attualmente esploro automazioni basate su AI con n8n, sviluppo chatbot WhatsApp per attività del settore hospitality e realizzo applicazioni React dal concept al deployment.",
    "intro.skills.eyebrow": "Stack tecnico",
    "intro.skills.heading": "Competenze e strumenti",
    "intro.career.eyebrow": "Carriera",
    "intro.career.heading": "Esperienza",
    "intro.education.eyebrow": "Istruzione",
    "intro.education.heading": "Formazione",
    "intro.exp.0.role": "Specialista Data Entry",
    "intro.exp.0.period": "1 anno e 7 mesi",
    "intro.exp.0.desc": "Gestione del database e inserimento dati prodotto per il reparto outlet nel sistema ERP aziendale.",
    "intro.exp.1.role": "Web Designer Junior",
    "intro.exp.1.period": "6 mesi",
    "intro.exp.1.desc": "Realizzazione di grafiche e gestione di profili Instagram per aziende clienti.",
    "intro.exp.2.role": "Arbitro di calcio",
    "intro.exp.2.period": "Dal 2018",
    "intro.exp.2.desc": "Leadership, capacità decisionale rapida e gestione della pressione in campo.",
    "intro.edu.0.title": "Master in Sviluppo Web Full Stack",
    "intro.edu.1.title": "Sistemi di Automazione e Meccatronica (95/100)",
    "intro.edu.2.title": "Diploma di Istituto Tecnico e Professionale",
    "intro.focus.eyebrow": "Aree di interesse",
    "intro.focus.heading": "Cosa costruisco",
    "intro.focus.0.title": "Web App Full Stack",
    "intro.focus.0.desc":
      "Frontend React con backend Node.js/Express, database MySQL e architetture pronte per il deployment.",
    "intro.focus.1.title": "AI e Automazione dei flussi",
    "intro.focus.1.desc":
      "Flussi n8n, agenti AI e chatbot WhatsApp per la gestione delle prenotazioni in ristoranti e bar.",
    "intro.focus.2.title": "Interfacce moderne",
    "intro.focus.2.desc":
      "UI responsive e basate su componenti con React, Vite e integrazioni API per esperienze utente dinamiche.",

    // Skill category / tag overrides (rendered via t(literal); proper nouns fall through)
    "Tools": "Strumenti",
    "Languages": "Lingue",
    "AI & Automation": "AI & Automazione",
    "AI Agents": "Agenti AI",
    "Workflow Automation": "Automazione di flussi",
    "WhatsApp Chatbot": "Chatbot WhatsApp",
    "Adobe (social & brand graphics)": "Adobe (grafiche social e brand)",
    "Italian (native)": "Italiano (madrelingua)",
    "English": "Inglese",
    "French": "Francese",
    "Spanish": "Spagnolo",

    // Blog (UI chrome only — article content lives in blog-data)
    "blog.hero.eyebrow": "Diario digitale",
    "blog.hero.title.b": "Approfondimenti",
    "blog.hero.desc":
      "Articoli su React, Firebase, automazione AI e sviluppo full stack — appunti dal laboratorio di",
    "blog.list.featured": "in evidenza",
    "blog.list.readArticle": "leggi l'articolo",
    "blog.list.read": "Leggi",
    "blog.sidebar.search": "Cerca articoli...",
    "blog.sidebar.categories": "Categorie",
    "blog.sidebar.allPosts": "Tutti gli articoli",
    "blog.sidebar.popularTags": "Tag popolari",
    "blog.sidebar.newsletter": "Newsletter",
    "blog.sidebar.newsletterDesc": "Ricevi aggiornamenti su nuovi articoli ed esperimenti. Niente spam, cancellati quando vuoi.",
    "blog.sidebar.emailPlaceholder": "tua@email.com",
    "blog.sidebar.subscribe": "Iscriviti",
    "blog.sidebar.rss": "Iscriviti via RSS",
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
