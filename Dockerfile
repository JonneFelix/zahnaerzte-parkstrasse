# ─── Zahnärzte Parkstrasse Dockerfile ─────────────────────────────────────────
# Multi-Stage Build: Bun → Next.js Standalone Output

FROM oven/bun:latest AS base
WORKDIR /app

# ─── Dependencies installieren ───────────────────────────────────────────────
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install

# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# ─── Production Runner ───────────────────────────────────────────────────────
FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Next.js Standalone Output kopieren
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
