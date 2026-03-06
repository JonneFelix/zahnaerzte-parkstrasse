# ─── Zahnärzte Parkstrasse Dockerfile ─────────────────────────────────────────
# Multi-Stage Build: Bun Build → Nginx Static Serving

FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

# ─── Production: Nginx mit statischen Dateien ────────────────────────────────
FROM nginx:alpine AS runner

# Nginx-Konfiguration für SPA-Routing
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri.html $uri/index.html /index.html; \
    } \
    location /_next/ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    location /images/ { \
        expires 30d; \
        add_header Cache-Control "public"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Statischen Export kopieren
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
