# Redesign portfolio: "Web developer che costruisce con l'AI"

Data: 2026-10-21. Stato: in attesa di approvazione di Gabriele.

## Perché

Il sito attuale (luglio 2026) è fermo a prima dell'assunzione in GraphxStudio: non cita il lavoro attuale e mostra solo Boolflix e Trankiliti FC. In più si presenta come "Full Stack & AI Automation Specialist" con chatbot WhatsApp e lingue che Gabriele non parla. A Gabriele il look sembra "troppo AI slop": luce che segue il mouse, scanlines, ASCII art, testo che si digita, gradienti.

Lo leggono due pubblici:
- **Recruiter:** vuole capire in fretta ruolo attuale, lavori veri e strumenti, poi scaricare il CV o scrivere.
- **Cliente:** vuole vedere lavori concreti e contattarlo senza passaggi in più.

## Messaggio

Gabriele è un **web developer** (non "solo AI") che usa l'AI ogni giorno come metodo di lavoro. Le parole devono reggere a un colloquio tecnico:
- sì: "sviluppo con Claude Code", "sviluppato con Claude Code", "uso l'AI ogni giorno";
- no: "AI specialist", "esperto", padronanza di PHP/Laravel/Node, Docker, Python, TypeScript avanzato, IoT. I livelli di riferimento sono in `ai-job-search/.claude/skills/job-application-assistant/01-candidate-profile.md`;
- WordPress resta come contesto del lavoro (manutenzione di circa 30 siti, il plugin), non come etichetta principale;
- la serie video **Un Bug al Giorno** (@unbugalgiorno) compare solo come link secondario (footer e pagina Chi sono). Non va in primo piano. Niente logo Claude/Anthropic: la serie è fan-made e non affiliata.

## Obiettivi
1. Contenuti aggiornati e onesti: GraphxStudio, tre progetti nuovi, CV nuovo.
2. Direzione visiva "2 · Un colore per progetto", scelta da Gabriele sulle bozze.
3. Meno pagine e meno effetti: si capisce tutto in 30 secondi.

## Non obiettivi
- Nessun CMS né blog.
- Nessuna nuova funzionalità (form di contatto, area riservata).
- Nessuno screenshot nuovo dei progetti in agenzia (i repo sono privati e i clienti reali): le fasce di colore bastano.

## Anti-obiettivi (sarebbe un fallimento anche se funzionasse)
- Torna l'estetica da template: glow, gradienti decorativi, eyebrow MAIUSCOLE in monospace sopra ogni titolo, frecce "→" su ogni link, card identiche con ombra soft, animazioni fade-up su ogni sezione.
- Il sito dichiara competenze che Gabriele non ha.
- Un recruiter non trova in 5 secondi "dove lavora" e "scarica CV".

## Direzione visiva (decisa)

Riferimento: bozza `.superpowers/brainstorm/*/content/direzioni-colore.html`, opzione 2.

- **Sfondo chiaro carta** `#fbfaf7`, testo inchiostro `#111014`, testo secondario `#55525c` / `#3b3842`.
- **Titolo hero condensato gigante** in **Anton** (circa 92px desktop, deve scalare fino a circa 48px su mobile), allineato a sinistra. Corpo in **Instrument Sans**. Niente monospace come decorazione.
- **Hero:** titolo a sinistra, colonna stretta a destra con 2-3 righe su chi è e dove lavora, più i pulsanti "Scrivimi" (pieno inchiostro) e "Scarica il CV".
- **Progetti principali come fasce di colore pieno** affiancate (3 colonne su desktop, impilate su mobile), ciascuna con: etichetta "In agenzia" / "Progetto personale", nome in Anton, una frase, lo stack in fondo.
  - Barton AI: viola `#6b3cff`, testo bianco
  - Gestionale prenotazioni: arancio `#ff6a1a`, testo inchiostro
  - Web Hospitality: lime `#c6f432`, testo inchiostro
- **Footer:** email, LinkedIn, GitHub, "Video su Instagram: @unbugalgiorno".
- Un solo momento di movimento al massimo (per esempio l'ingresso dell'hero) e rispetto di `prefers-reduced-motion`. Hover sobri.

## Struttura del sito

| Rotta | Contenuto |
|---|---|
| `/` | Hero, fasce dei 3 progetti principali, "Altri progetti" (Trankiliti FC, Boolflix) in forma compatta, breve blocco esperienza (GraphxStudio in evidenza) con link a Chi sono, footer contatti |
| `/introduction` (Chi sono) | Bio aggiornata, foto, competenze riorganizzate per livello reale, timeline esperienza (GraphxStudio in cima) e formazione, riga su Un Bug al Giorno |
| `/projects` | Elenco completo dei progetti nello stesso stile (fasce o righe colorate) |
| `/blog`, `/workbench` | **Rimosse**, con redirect permanente a `/` in `next.config.mjs` |

## Contenuti

**Esperienza** (fonte: `01-candidate-profile.md`):
- GraphxStudio, Junior Web & Software Developer, Umbertide, da ago 2026
- AgriEuro, Data Entry Specialist, ott 2023 - mar 2025
- Very Important Web, Junior Web Designer (stage), gen - giu 2023
- Arbitro AIA-FIGC dal 2018 (in "Altro", non come lavoro)

**Progetti principali:**
- **Barton AI** (personale): assistente HR con modello AI in locale (Ollama), RAG sui regolamenti con citazione della fonte, tool calling, ruoli e audit log. React, Node/Express, SQLite. Sviluppato con Claude Code. Repo privato, quindi nessun link al codice.
- **Gestionale prenotazioni** (in agenzia): multi-struttura, sync iCal con Booking ogni 15 min, caparra Stripe Connect, 190 test. Laravel + Livewire, sviluppato con Claude Code, prototipo interno.
- **Web Hospitality** (in agenzia): plugin WordPress per agriturismi e B&B: caparra Stripe, tariffe stagionali, iCal, Alloggiati Web. Sviluppato con Claude Code.

**Altri progetti:** Trankiliti FC (React, Firebase, screenshot esistente), Boolflix (React, TMDB, link GitHub).

**Lingue:** italiano madrelingua, inglese B2. Togliere francese e spagnolo.

**Testi:** in italiano e inglese tramite `lib/i18n.tsx` (il toggle IT/EN resta). Italiano naturale, niente toni da pubblicità.

**CV:** sostituire `public/cv.pdf` con `ai-job-search/cv/main_portfolio_generale.pdf`. È già pronto, dimostrato a Gabriele il 2026-10-21 e derivato dal master corretto.

## Pulizia tecnica
- Rimuovere: `CursorGlow`, classe `scanlines`, effetto typing, ASCII art, badge fluttuanti, `ThemeChanger` (palette multiple) e `ThemeToggle`. Il sito diventa solo chiaro.
- Togliere dati obsoleti: `wipItems`, chiavi i18n di blog/workbench/wip, `lib/blog-data.tsx` e i componenti blog/workbench.
- `siteConfig.url`: il default `gabrielebonucci.vercel.app` risponde 404. Usare `https://portfolio-xw9f-three.vercel.app` (risponde 200). Aggiornare title, description, ruolo e bio.
- `package.json`: name e description parlano di un "code editor". Correggerli.
- Aggiornare sitemap, structured data e i metadata OG coerentemente.
- Aggiungere `.superpowers/` a `.gitignore`.

## Vincoli
- Stack esistente: Next.js 16, React 19, TypeScript, Tailwind 4, `next/font/google`. Non si aggiungono dipendenze, a parte i due font.
- Responsive da 375px in su, nessuno scroll orizzontale, focus visibile da tastiera, contrasto almeno 4.5:1. Da verificare il bianco su viola e l'inchiostro su arancio e su lime.
- `npm run build` deve passare.
- Lavoro su un branch. Commit, push e deploy su Vercel solo dopo l'ok di Gabriele.

## Scelte mie (da controllare)
1. Blog e Workbench rimossi con redirect. Gabriele ha detto "blog togli forse"; Workbench lo tolgo perché i contenuti (THELABCAFFE, bot WhatsApp) sono superati.
2. Il sito diventa solo chiaro: niente dark mode e niente selettore di palette.
3. Il toggle IT/EN resta (utile per recruiter non italiani).
4. THELABCAFFE non compare: era un prototipo per un cliente.
5. Trankiliti FC e Boolflix restano, ma come "altri progetti" sotto i tre principali.
6. DC Comics non torna (era già stato tolto).
7. Menu: Progetti, Chi sono, Scarica CV, IT/EN, più "Scrivimi" come pulsante. Su mobile il menu resta a scomparsa come adesso.
8. La foto è quella attuale (`public/developer-portrait.jpg`) e va solo nella pagina Chi sono, non nell'hero.

## Lasciato a chi costruisce
- Layout esatto di `/projects` e della pagina Chi sono, purché seguano lo stesso sistema (carta, Anton, fasce colore).
- Microcopy inglese.
- Breakpoint e scala tipografica precisi.
