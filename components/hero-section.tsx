"use client"

import { useEffect, useState } from "react"
import { Download, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"

const coreStack = ["React", "Node.js", "Express", "MySQL", "n8n"]

export function HeroSection() {
  const { t } = useLanguage()
  const roles = [
    t("hero.role.0"),
    t("hero.role.1"),
    t("hero.role.2"),
    t("hero.role.3"),
    t("hero.role.4"),
  ]
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">
          {/* Left column - Text */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-4 animate-fade-in-up">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                {siteConfig.name}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-balance">
                {t("hero.title.a")}{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  {t("hero.title.b")}
                </span>
              </h1>
              <p className="font-mono text-sm sm:text-base text-muted-foreground">
                <span className="text-primary">{"> "}</span>
                <span className="typing-cursor">{displayText}</span>
              </p>
            </div>

            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up stagger-2">
              {t("hero.hook")} {t("hero.basedIn")}{" "}
              <span className="text-foreground font-medium">{siteConfig.location}</span>.
            </p>

            {/* Core stack badges */}
            <div className="flex flex-wrap items-center gap-2 animate-fade-in-up stagger-2">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("hero.stackLabel")}:
              </span>
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-4 sm:py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98]"
              >
                <Mail className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{t("hero.cta.contact")}</span>
                {/* Animated background */}
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-border px-7 py-4 sm:py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>{t("hero.cta.cv")}</span>
              </a>
            </div>

            <a
              href="#projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary animate-fade-in-up stagger-3"
            >
              {t("hero.cta.primary")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Right column - ASCII Art / Visual */}
          <div className="relative animate-scale-in stagger-4">
            <div className="relative rounded-xl border border-border bg-card/60 glass p-5 sm:p-8 hover-lift">
              {/* Terminal header dots */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary" />
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-background/50 rounded-md px-3 py-1 font-mono text-xs text-muted-foreground">
                terminal://gbonucci
              </div>

              <pre className="mt-6 overflow-hidden font-mono text-[10px] leading-relaxed text-primary/80 sm:text-xs md:text-sm">
                <span className="sm:hidden">{`┌───────────────────────┐
│  ██████╗ ██████╗      │
│ ██╔════╝██╔════╝      │
│ ██║     ██║           │
│ ██║     ██║           │
│ ╚██████╗╚██████╗      │
│  ╚═════╝ ╚═════╝      │
│                       │
│  > projects: 3        │
│  > status: building   │
└───────────────────────┘`}</span>
                <span className="hidden sm:block">{`┌─────────────────────────────────────┐
│                                     │
│  ██████╗ ██████╗                    │
│ ██╔════╝██╔════╝                    │
│ ██║     ██║                         │
│ ██║     ██║                         │
│ ╚██████╗╚██████╗                    │
│  ╚═════╝ ╚═════╝                    │
│         GB Lab                      │
│                                     │
│   > projects loaded: 3              │
│   > status: building                │
│   > location: Spoleto, IT           │
│                                     │
└─────────────────────────────────────┘`}</span>
              </pre>
            </div>

            <div className="absolute -right-2 sm:-right-6 -top-2 sm:-top-6 rounded-lg border border-primary/40 bg-primary/15 glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                v1.0.0
              </span>
            </div>
            <div
              className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 rounded-lg border border-border bg-card glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground animate-float"
              style={{ animationDelay: "1s" }}
            >
              Jul. 2026
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <span className="font-mono text-xs text-muted-foreground">{t("hero.scroll")}</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
