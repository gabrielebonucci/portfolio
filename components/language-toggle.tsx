"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

// Shows the language you can switch to (IT while reading English, EN while reading Italian)
export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage, t } = useLanguage()
  const next = language === "en" ? "it" : "en"

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("lang.tooltip")}
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-md px-2 text-sm font-semibold uppercase text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink",
        className,
      )}
    >
      {next}
    </button>
  )
}
