# ─── Zahnärzte Parkstrasse Dockerfile ─────────────────────────────────────────
# Multi-Stage Build: Bun Build → Nginx Static Serving
# Cache-Bust: 2026-03-25-v2

FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

# ─── Production: Nginx mit statischen Dateien ────────────────────────────────
FROM nginx:alpine AS runner

# Nginx-Konfiguration
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    absolute_redirect off; \
    \
    # Root / → Redirect nach /de (ohne Trailing Slash, weil Next.js de.html generiert) \
    location = / { \
        return 302 /de; \
    } \
    \
    # Trailing Slash entfernen (z.B. /de/team/ → /de/team) \
    rewrite ^(.+)/$ $1 permanent; \
    \
    # URLs ohne Locale-Prefix nach /de/ umleiten \
    # Ausnahmen: statische Assets + 404.html \
    if ($uri !~ "^/(de|en|fr|es)(/|$)|^/(_next|images)/|^/404|\\.(txt|xml|ico|png|svg|js|css|woff2|html)$") { \
        rewrite ^/(.+)$ /de/$1 permanent; \
    } \
    \
    # Gebrandete 404-Seite (inline servieren, kein Redirect) \
    error_page 404 /404.html; \
    location = /404.html { \
        internal; \
    } \
    \
    # Statische Dateien: Exakter Pfad, dann .html, dann /index.html \
    location / { \
        try_files $uri $uri.html $uri/index.html =404; \
    } \
    \
    # Cache für Next.js Assets (immutable, 1 Jahr) \
    location /_next/ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Cache für Bilder (7 Tage) \
    location /images/ { \
        expires 7d; \
        add_header Cache-Control "public, must-revalidate"; \
        add_header CDN-Cache-Control "max-age=86400"; \
    } \
    \
    # robots.txt, llms.txt, sitemap.xml direkt ausliefern \
    location ~ \.(txt|xml)$ { \
        add_header Content-Type "text/plain; charset=utf-8"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Statischen Export kopieren
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
