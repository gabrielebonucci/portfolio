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
    // Header
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.cv": "CV",
    "nav.contact": "Get in touch",
    "nav.menu": "Menu",
    "lang.tooltip": "Switch language",

    // Home hero
    "hero.title": "Web development, built with AI.",
    "hero.body":
      "Junior Web Developer at GraphxStudio in Umbertide, Italy. I build websites and web apps with React and JavaScript, and I develop with Claude Code every day, reviewing every line before it ships.",
    "hero.cta.contact": "Get in touch",
    "hero.cta.cv": "Download CV",

    // Projects
    "projects.main": "Main projects",
    "projects.heading": "Projects",
    "projects.intro":
      "Three projects built at the agency and one of my own, plus earlier work. The code of the agency projects is private.",
    "projects.others": "Other projects",
    "projects.code": "Code",
    "projects.live": "Live site",
    "projects.privateNote": "Private code",
    "projects.kind.agency": "At the agency",
    "projects.kind.personal": "Personal project",
    "projects.kind.study": "Study project",
    "projects.barton-ai.summary":
      "HR assistant running a local AI model: it answers questions on leave and permits, citing the company rules.",
    "projects.barton-ai.description":
      "A case study prepared for a job interview with a multi-utility company. Employees and HR handle leave, permits and remote work through a chat. The model runs locally with Ollama, so no employee data leaves the company. It never calculates on its own: it acts only through functions that apply the rules, with roles, approvals and an audit log. Built with Claude Code.",
    "projects.gestionale-prenotazioni.summary":
      "One app to manage the bookings of several farm stays.",
    "projects.gestionale-prenotazioni.description":
      "Internal prototype for GraphxStudio: booking calendar, room blocks and double-booking checks, a public booking page for guests and a Stripe deposit. Three roles (agency, staff, guest) and 190 automated tests. Built with Claude Code.",
    "projects.web-hospitality.summary":
      "WordPress plugin for farm stays and B&Bs, with online booking and deposit.",
    "projects.web-hospitality.description":
      "Built at the agency for farm stay and B&B websites: booking form with Stripe deposit, room calendar, seasons and rates, offers, guest area and check-in with submission to the Italian police portal (Alloggiati Web). Works with any theme through shortcodes. Built with Claude Code.",
    "projects.web-beauty.summary":
      "Online booking for hair salons, beauty centres and similar businesses.",
    "projects.web-beauty.description":
      "A tool built at the agency that lets customers book an appointment online at a hair salon, a beauty centre or a similar business.",
    "projects.trankiliti-fc.summary": "Website and phone-first admin for my 7-a-side football team.",
    "projects.trankiliti-fc.description":
      "The site of my team in the Seven League in Spoleto: results, next match, standings, squad and news. The admin runs on a phone, even during the match to log goals live, and standings and stats calculate themselves. Built with Claude Code.",
    "projects.boolflix.summary": "Movie and TV search with the TMDB API.",
    "projects.boolflix.description":
      "A Boolean bootcamp project: real-time search across movies and series, with posters, ratings and original language. Built from reusable components.",

    // Home experience strip
    "home.experience.heading": "Where I work",
    "home.experience.now": "Now",
    "home.experience.before": "Before",
    "home.experience.more": "More about me",

    // Experience
    "exp.graphx.role": "Junior Web & Software Developer",
    "exp.graphx.period": "Aug 2026 - present",
    "exp.graphx.desc": "Websites, plugins and booking tools for the agency's clients.",
    "exp.graphx.b1": "I build websites and web tools for clients, from design to launch.",
    "exp.graphx.b2":
      "WordPress booking plugin for farm stays and B&Bs, an appointment booking tool for salons (Web Beauty) and a booking management prototype in Laravel, built with Claude Code.",
    "exp.graphx.b3":
      "Maintenance and security of about 30 WordPress sites; hosting, domains, DNS and SSL on Plesk and cPanel.",
    "exp.graphx.b4":
      "On-page SEO with Google Search Console, email marketing with Mailchimp, automations with WP-CLI and AI tools.",
    "exp.agrieuro.role": "Data Entry Specialist",
    "exp.agrieuro.period": "Oct 2023 - Mar 2025",
    "exp.agrieuro.desc": "Product data and outlet catalogue for an e-commerce of farm machinery.",
    "exp.viw.role": "Junior Web Designer (internship)",
    "exp.viw.period": "Jan - Jun 2023",
    "exp.viw.desc": "Graphics and interfaces for client companies, following Material Design.",

    // About page
    "intro.title": "About me",
    "intro.photoAlt": "Portrait of Gabriele Bonucci",
    "intro.bio.p1":
      "I'm a junior web developer from Spoleto, Italy. Since August 2026 I've worked at GraphxStudio, an agency in Umbertide: I build websites and web tools for clients and look after about 30 WordPress sites.",
    "intro.bio.p2":
      "I work with Claude Code every day. It helps me plan and write code faster, but the decisions and the checks stay mine: I read what it produces, write tests and verify before anything goes live. That's how I built a booking plugin and a Laravel booking manager at the agency.",
    "intro.bio.p3":
      "I come from mechatronics (ITS Umbria Academy) and web design, and I trained as a developer with Boolean's full-time bootcamp. On weekends I referee football matches, which teaches you to decide quickly and calmly.",
    "intro.skills.heading": "What I use",
    "intro.skills.frontend.title": "Front-end",
    "intro.skills.frontend.items": "JavaScript, React, HTML, CSS, Vite, responsive design",
    "intro.skills.wp.title": "WordPress and hosting",
    "intro.skills.wp.items": "Themes and plugins, maintenance and security, Plesk, cPanel, DNS, SEO",
    "intro.skills.ai.title": "Developing with AI",
    "intro.skills.ai.items": "Claude Code, prompting, n8n, local models with Ollama",
    "intro.skills.backend.title": "Back-end, basic level",
    "intro.skills.backend.items": "Node.js, Express, PHP, Laravel, MySQL, Firebase",
    "intro.skills.tools.title": "Tools",
    "intro.skills.tools.items": "Git, GitHub, Vercel, Stripe, Photoshop, Canva",
    "intro.experience.heading": "Experience",
    "intro.education.heading": "Education",
    "edu.boolean.title": "Web Development bootcamp (Full Stack)",
    "edu.boolean.period": "Jul 2025 - Jun 2026",
    "edu.boolean.desc":
      "600 hours full-time: HTML, CSS, JavaScript, React, Node.js, Express, MySQL. AI Coding Upskilling certificate (Aug 2026).",
    "edu.its.title": "Higher Technical Diploma in Automation and Mechatronic Systems",
    "edu.its.period": "Nov 2021 - Nov 2023",
    "edu.its.desc": "1,800 hours, 800 of them as an internship. Grade 95/100.",
    "edu.itcg.title": "Technical high school diploma",
    "edu.itcg.period": "2015 - 2020",
    "intro.languages.heading": "Languages",
    "intro.languages.value": "Italian (native), English (B2)",
    "intro.other.heading": "Outside work",
    "intro.other.referee": "Football referee and assistant referee for AIA-FIGC since 2018.",
    "intro.other.series":
      "Un Bug al Giorno: short animated 3D videos on Instagram and TikTok (in Italian) about the mistakes and good habits of developing with Claude Code.",

    // Footer
    "footer.heading": "Let's talk.",
    "footer.body": "Looking for a developer for your team or a website for your business? Write to me.",
    "footer.videos": "Videos on Instagram:",
    "footer.rights": "All rights reserved.",
  },
  it: {
    // Header
    "nav.projects": "Progetti",
    "nav.about": "Chi sono",
    "nav.cv": "CV",
    "nav.contact": "Scrivimi",
    "nav.menu": "Menu",
    "lang.tooltip": "Cambia lingua",

    // Home hero
    "hero.title": "Sviluppo web, costruito con l'AI.",
    "hero.body":
      "Junior Web Developer da GraphxStudio, Umbertide. Costruisco siti e applicazioni web in React e JavaScript e sviluppo ogni giorno con Claude Code, controllando ogni riga prima che vada online.",
    "hero.cta.contact": "Scrivimi",
    "hero.cta.cv": "Scarica il CV",

    // Projects
    "projects.main": "Progetti principali",
    "projects.heading": "Progetti",
    "projects.intro":
      "Tre progetti fatti in agenzia e uno mio, più i lavori precedenti. Il codice dei progetti in agenzia è privato.",
    "projects.others": "Altri progetti",
    "projects.code": "Codice",
    "projects.live": "Sito online",
    "projects.privateNote": "Codice privato",
    "projects.kind.agency": "In agenzia",
    "projects.kind.personal": "Progetto personale",
    "projects.kind.study": "Progetto di studio",
    "projects.barton-ai.summary":
      "Assistente HR con un modello AI in locale: risponde su ferie e permessi citando il regolamento.",
    "projects.barton-ai.description":
      "Caso di studio preparato per un colloquio con un'azienda multi-utility. Dipendenti e HR gestiscono ferie, permessi e smart working in chat. Il modello gira in locale con Ollama, quindi nessun dato dei dipendenti esce dall'azienda. Non calcola niente da solo: agisce solo tramite funzioni che applicano le regole, con ruoli, approvazioni e registro delle azioni. Sviluppato con Claude Code.",
    "projects.gestionale-prenotazioni.summary":
      "Una sola app per gestire le prenotazioni di più agriturismi.",
    "projects.gestionale-prenotazioni.description":
      "Prototipo interno per GraphxStudio: calendario prenotazioni, blocchi camera e controllo delle doppie prenotazioni, pagina di prenotazione per l'ospite e caparra con Stripe. Tre ruoli (agenzia, staff, ospite) e 190 test automatici. Sviluppato con Claude Code.",
    "projects.web-hospitality.summary":
      "Plugin WordPress per agriturismi e B&B, con prenotazione e caparra online.",
    "projects.web-hospitality.description":
      "Sviluppato in agenzia per i siti di agriturismi e B&B: modulo di prenotazione con caparra Stripe, calendario camere, stagioni e tariffe, offerte, area ospite e check-in con invio ad Alloggiati Web. Funziona con qualsiasi tema tramite shortcode. Sviluppato con Claude Code.",
    "projects.web-beauty.summary":
      "Prenotazione online degli appuntamenti per parrucchieri, centri estetici e saloni.",
    "projects.web-beauty.description":
      "Tool sviluppato in agenzia per prenotare online un appuntamento in un salone di parrucchieri, un centro estetico o un'attività simile.",
    "projects.trankiliti-fc.summary": "Sito e gestionale da telefono per la mia squadra di calcio a 7.",
    "projects.trankiliti-fc.description":
      "Il sito della mia squadra nella Seven League di Spoleto: risultati, prossima partita, classifica, rosa e news. Il gestionale si usa dal telefono, anche durante la partita per segnare i gol in diretta, e classifica e statistiche si calcolano da sole. Sviluppato con Claude Code.",
    "projects.boolflix.summary": "Ricerca di film e serie TV con l'API di TMDB.",
    "projects.boolflix.description":
      "Progetto del Master Boolean: ricerca in tempo reale di film e serie, con locandine, voti e lingua originale. Costruito con componenti riutilizzabili.",

    // Home experience strip
    "home.experience.heading": "Dove lavoro",
    "home.experience.now": "Oggi",
    "home.experience.before": "Prima",
    "home.experience.more": "Di più su di me",

    // Experience
    "exp.graphx.role": "Junior Web & Software Developer",
    "exp.graphx.period": "ago 2026 - oggi",
    "exp.graphx.desc": "Siti, plugin e gestionali per i clienti dell'agenzia.",
    "exp.graphx.b1": "Sviluppo siti e strumenti web per i clienti, dalla progettazione alla messa online.",
    "exp.graphx.b2":
      "Plugin WordPress di prenotazioni per agriturismi e B&B, tool di prenotazione appuntamenti per saloni (Web Beauty) e prototipo di gestionale prenotazioni in Laravel, sviluppati con Claude Code.",
    "exp.graphx.b3":
      "Manutenzione e sicurezza di circa 30 siti WordPress; hosting, domini, DNS e SSL su Plesk e cPanel.",
    "exp.graphx.b4":
      "SEO on-page con Google Search Console, email marketing con Mailchimp, automazioni con WP-CLI e strumenti di IA.",
    "exp.agrieuro.role": "Data Entry Specialist",
    "exp.agrieuro.period": "ott 2023 - mar 2025",
    "exp.agrieuro.desc": "Dati di prodotto e catalogo outlet di un e-commerce di macchine agricole.",
    "exp.viw.role": "Junior Web Designer (stage)",
    "exp.viw.period": "gen - giu 2023",
    "exp.viw.desc": "Grafiche e interfacce per aziende clienti, secondo il Material Design.",

    // About page
    "intro.title": "Chi sono",
    "intro.photoAlt": "Ritratto di Gabriele Bonucci",
    "intro.bio.p1":
      "Sono un junior web developer di Spoleto. Da agosto 2026 lavoro da GraphxStudio, un'agenzia di Umbertide: sviluppo siti e strumenti web per i clienti e seguo la manutenzione di circa 30 siti WordPress.",
    "intro.bio.p2":
      "Lavoro ogni giorno con Claude Code. Mi aiuta a progettare e scrivere codice più in fretta, ma le decisioni e i controlli restano miei: leggo quello che produce, scrivo i test e verifico prima di mettere online. Così in agenzia ho costruito un plugin di prenotazioni e un gestionale in Laravel.",
    "intro.bio.p3":
      "Vengo dalla meccatronica (ITS Umbria Academy) e dal web design, e mi sono formato come sviluppatore con il Master full-time di Boolean. Nel weekend arbitro partite di calcio: si impara a decidere in fretta e con calma.",
    "intro.skills.heading": "Cosa uso",
    "intro.skills.frontend.title": "Front-end",
    "intro.skills.frontend.items": "JavaScript, React, HTML, CSS, Vite, responsive design",
    "intro.skills.wp.title": "WordPress e hosting",
    "intro.skills.wp.items": "Temi e plugin, manutenzione e sicurezza, Plesk, cPanel, DNS, SEO",
    "intro.skills.ai.title": "Sviluppo con l'AI",
    "intro.skills.ai.items": "Claude Code, prompt, n8n, modelli in locale con Ollama",
    "intro.skills.backend.title": "Back-end, livello base",
    "intro.skills.backend.items": "Node.js, Express, PHP, Laravel, MySQL, Firebase",
    "intro.skills.tools.title": "Strumenti",
    "intro.skills.tools.items": "Git, GitHub, Vercel, Stripe, Photoshop, Canva",
    "intro.experience.heading": "Esperienza",
    "intro.education.heading": "Formazione",
    "edu.boolean.title": "Master in Web Development (Full Stack)",
    "edu.boolean.period": "lug 2025 - giu 2026",
    "edu.boolean.desc":
      "600 ore full-time: HTML, CSS, JavaScript, React, Node.js, Express, MySQL. Certificazione AI Coding Upskilling (ago 2026).",
    "edu.its.title": "Diploma Tecnico Superiore in Automazione e Sistemi Meccatronici",
    "edu.its.period": "nov 2021 - nov 2023",
    "edu.its.desc": "1800 ore, di cui 800 di tirocinio in azienda. Voto 95/100.",
    "edu.itcg.title": "Diploma di Istituto Tecnico",
    "edu.itcg.period": "2015 - 2020",
    "intro.languages.heading": "Lingue",
    "intro.languages.value": "Italiano (madrelingua), Inglese (B2)",
    "intro.other.heading": "Fuori dal lavoro",
    "intro.other.referee": "Arbitro e assistente arbitrale AIA-FIGC dal 2018.",
    "intro.other.series":
      "Un Bug al Giorno: brevi video animati in 3D su Instagram e TikTok, in cui racconto errori e buone abitudini dello sviluppo con Claude Code.",

    // Footer
    "footer.heading": "Parliamone.",
    "footer.body": "Cerchi uno sviluppatore per il tuo team o un sito per la tua attività? Scrivimi.",
    "footer.videos": "Video su Instagram:",
    "footer.rights": "Tutti i diritti riservati.",
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
