"use client"

import Link from "next/link"
import { Code2, Server, Bot, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const groups = [
  { key: "stack.frontend", icon: Code2, items: ["React", "JavaScript", "HTML5", "CSS3", "Vite"] },
  { key: "stack.backend", icon: Server, items: ["Node.js", "Express", "MySQL", "Firebase"] },
  { key: "stack.automation", icon: Bot, items: ["n8n", "AI Agents", "WhatsApp Bots", "Workflow Automation"] },
]

export function TechStack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="px-4 sm:px-6 py-16 sm:py-24 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              {t("stack.eyebrow")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("stack.heading")}</h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("stack.subtitle")}
            </p>
          </div>
          <Link
            href="/introduction"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            {t("stack.more")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.key}
              className="group rounded-xl border border-border/60 bg-card/40 glass p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/70"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <group.icon className="h-5 w-5" />
                </div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t(group.key)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors group-hover:border-primary/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
