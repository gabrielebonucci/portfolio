// Content and accessibility checks for the portfolio.
// Usage: start the site (npm run build && npm start), then `npm run check`.
// BASE_URL defaults to http://localhost:3000. Exit code 1 if any check fails.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const CV_SIZE = 62422 // ai-job-search/cv/main_portfolio_generale.pdf
const SITE_DOMAIN = "https://www.gabrielebonucci.com"

const REQUIRED = {
  "/": ["GraphxStudio", "Barton AI", "Gestionale prenotazioni", "Web Hospitality", "Web Beauty", "Scarica il CV", "@unbugalgiorno", "Trankiliti FC"],
  "/projects": ["Barton AI", "Gestionale prenotazioni", "Web Hospitality", "Web Beauty", "Trankiliti FC", "Boolflix"],
  "/introduction": ["GraphxStudio", "AgriEuro", "Very Important Web", "Boolean", "ITS Umbria Academy", "Inglese"],
}
const FORBIDDEN = ["whatsapp", "francese", "spagnolo", "french", "spanish", "ai automation specialist", "full stack web developer &", "terminal://", "gb lab", "workbench", "cursor-glow", "scanlines", "15 minuti", "15 minutes", "booking.com"]
const RAW_KEY = /\b(nav|hero|projects|intro|footer|home|exp)\.[a-z0-9-]+(\.[a-z0-9-]+)+\b/
const PRIVATE_REPO = /github\.com\/gabrielebonucci\/(barton-ai-platform|gestionale-prenotazioni-agriturismo|gestione-prenotazioni)\b/
const REDIRECTS = ["/blog", "/blog/boolflix-tmdb-react-search", "/workbench"]

const results = []
const check = (name, ok, detail = "") => results.push({ name, ok, detail })

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
}

// WCAG 2.x relative luminance and contrast ratio
function luminance(hex) {
  const [r, g, b] = hex.replace("#", "").match(/../g).map((h) => {
    const c = parseInt(h, 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Static: IT and EN dictionaries must have the same keys
function i18nKeys(source, lang) {
  const start = source.indexOf(`  ${lang}: {`)
  if (start === -1) return null
  const end = source.indexOf("\n  },", start)
  return new Set([...source.slice(start, end).matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1]))
}
{
  const src = fs.readFileSync(path.join(root, "lib/i18n.tsx"), "utf8")
  const it = i18nKeys(src, "it")
  const en = i18nKeys(src, "en")
  const missing = it && en ? [...[...en].filter((k) => !it.has(k)).map((k) => `it:${k}`), ...[...it].filter((k) => !en.has(k)).map((k) => `en:${k}`)] : ["dictionary not found"]
  check("i18n keys paired", missing.length === 0, missing.slice(0, 10).join(", "))
}

// Static: colour contrast from globals.css
{
  const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8")
  const v = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]
  const pairs = [
    ["white on band-violet", "#ffffff", v("band-violet")],
    ["ink on band-orange", v("ink"), v("band-orange")],
    ["ink on band-lime", v("ink"), v("band-lime")],
    ["ink on band-pink", v("ink"), v("band-pink")],
    ["ink-muted on paper", v("ink-muted"), v("paper")],
  ]
  for (const [name, fg, bg] of pairs) {
    if (!fg || !bg) check(`contrast ${name}`, false, "colour variable missing in globals.css")
    else {
      const ratio = contrast(fg, bg)
      check(`contrast ${name}`, ratio >= 4.5, ratio.toFixed(2))
    }
  }
}

// Static: text on colour bands must keep full opacity (white at 80% on violet drops below 4.5:1)
{
  const bands = fs.readFileSync(path.join(root, "components/project-bands.tsx"), "utf8")
  const faded = bands.match(/\bopacity-\d+/g) ?? []
  check("band text has full opacity", faded.length === 0, faded.join(", "))
}

// Live: pages, redirects, CV
async function live() {
  for (const [route, needles] of Object.entries(REQUIRED)) {
    let html
    try {
      const res = await fetch(BASE_URL + route)
      html = await res.text()
      check(`${route} status 200`, res.status === 200, String(res.status))
    } catch (e) {
      check(`${route} reachable`, false, `${e.message} (is the server running on ${BASE_URL}?)`)
      continue
    }
    const text = visibleText(html)
    for (const n of needles) check(`${route} contains "${n}"`, text.includes(n))
    const lower = html.toLowerCase()
    for (const f of FORBIDDEN) check(`${route} has no "${f}"`, !lower.includes(f))
    const raw = text.match(RAW_KEY)
    check(`${route} no raw i18n keys`, !raw, raw?.[0] ?? "")
    const priv = html.match(PRIVATE_REPO)
    check(`${route} no links to private repos`, !priv, priv?.[0] ?? "")
  }

  for (const route of REDIRECTS) {
    try {
      const res = await fetch(BASE_URL + route, { redirect: "manual" })
      const loc = res.headers.get("location") ?? ""
      check(`${route} redirects to /`, [307, 308].includes(res.status) && /^(https?:\/\/[^/]+)?\/$/.test(loc), `${res.status} ${loc}`)
    } catch (e) {
      check(`${route} redirects to /`, false, e.message)
    }
  }

  try {
    const xml = await (await fetch(BASE_URL + "/sitemap.xml")).text()
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    const wrong = locs.filter((u) => !u.startsWith(SITE_DOMAIN))
    check("sitemap uses the custom domain", locs.length > 0 && wrong.length === 0, wrong[0] ?? "no <loc>")
  } catch (e) {
    check("sitemap uses the custom domain", false, e.message)
  }

  try {
    const res = await fetch(BASE_URL + "/cv.pdf")
    const size = (await res.arrayBuffer()).byteLength
    const local = fs.statSync(path.join(root, "public/cv.pdf")).size
    check("cv.pdf is the new CV", res.status === 200 && size === CV_SIZE && local === CV_SIZE, `served ${size}, local ${local}, expected ${CV_SIZE}`)
  } catch (e) {
    check("cv.pdf is the new CV", false, e.message)
  }
}

await live()
let failed = 0
for (const r of results) {
  if (!r.ok) failed++
  console.log(`${r.ok ? "PASS" : "FAIL"} ${r.name}${r.ok || !r.detail ? "" : `: ${r.detail}`}`)
}
console.log(`\n${results.length - failed}/${results.length} passed`)
process.exit(failed ? 1 : 0)
