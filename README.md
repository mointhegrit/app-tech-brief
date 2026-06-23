# app-tech-brief

Frontend for the **🌐 Free-Tier Tech Intelligence Brief + AI Agent (Webhook App)** n8n
workflow (`W9wkaZRUdEAaxIgY`). Enter a focus topic, get an AI-written daily brief
synthesized from Hacker News, DEV.to and GitHub.

Design: a dark phosphor-amber "intelligence terminal" — IBM Plex Mono/Sans, command-prompt
input, streaming log while the brief is generated.

## Contract
- **Webhook URL:** `https://fawn-set-lacewing.ngrok-free.app/webhook/tech-brief`
  (set in `NEXT_PUBLIC_N8N_WEBHOOK_URL`)
- **Input JSON:** `{ "topic"?: string }` — optional; defaults to `"general tech"`.
- **Output JSON:** `{ "brief": string /* markdown */, "topic": string, "generatedAt": string /* ISO */ }`

The contract lives in [lib/n8n.ts](lib/n8n.ts) — `getBrief()`.

## Run locally
```bash
cp .env.example .env.local   # webhook URL is already filled in
npm install
npm run dev                  # http://localhost:3000
```

> The n8n workflow must be **active** for the production webhook to respond. If it's
> inactive you'll get a friendly "workflow may be inactive" error in the UI.

## Deploy
- **GitHub repo:** https://github.com/mointhegrit/app-tech-brief
- **Vercel URL:** <url>

Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` as an env var in Vercel. Push to `main` → Vercel auto-syncs.
