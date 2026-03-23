/**
 * Deploy-Script für Umami Analytics auf Dokploy.
 *
 * Erstellt ein Compose-Projekt mit Umami + PostgreSQL
 * auf praxis-analytics.jonne-schwegmann.com
 *
 * Aufruf: bun run deployment/deploy-umami.ts
 */

const DOKPLOY_URL = "https://server.jonne-schwegmann.com";
const API_KEY = "iPcuDCnYhSSrOMVlhHGomGcmUNnPOvRkMprSEkOgwlUKEcQyubNvyvhsCyxSCmbF";
const PROJECT_NAME = "Mama Praxis";
const COMPOSE_NAME = "Analytics";
const DOMAIN_HOST = "praxis-analytics.jonne-schwegmann.com";
const SERVICE_NAME = "umami";
const SERVICE_PORT = 3000;

// Zufälliges Passwort generieren
const DB_PASSWORD = crypto.randomUUID().replace(/-/g, "").slice(0, 24);

const COMPOSE_FILE = `services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      DATABASE_URL: postgresql://umami:\${DB_PASSWORD}@db:5432/umami
      APP_SECRET: \${APP_SECRET}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    expose:
      - "3000"
    networks:
      - dokploy-network
      - internal

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - umami-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped
    networks:
      - internal

volumes:
  umami-db:

networks:
  dokploy-network:
    external: true
  internal:
    driver: bridge
`;

// ─── API Helfer ──────────────────────────────────────────────────────────────

async function api(method: string, path: string, body?: unknown) {
  const url = `${DOKPLOY_URL}/api/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-api-key": API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

function log(msg: string) { console.log(`\n→ ${msg}`); }
function ok(msg: string) { console.log(`  ✓ ${msg}`); }
function fail(msg: string): never { console.error(`\n✗ ${msg}`); process.exit(1); }
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// ─── Start ───────────────────────────────────────────────────────────────────

log("Suche Projekt...");
const projects = await api("GET", "project.all") as Array<{
  projectId: string;
  name: string;
  environments: Array<{
    environmentId: string;
    name: string;
    compose: Array<{ composeId: string; name: string }>;
  }>;
}>;

const project = projects.find(p => p.name === PROJECT_NAME);
if (!project) fail(`Projekt "${PROJECT_NAME}" nicht gefunden.`);
ok(`Projekt: ${project.name} (${project.projectId})`);

const env = project.environments.find(e => e.name === "production");
if (!env) fail("Keine production Environment gefunden.");

// ─── Compose finden oder erstellen ───────────────────────────────────────────

log(`Suche Compose "${COMPOSE_NAME}"...`);
let compose = env.compose.find(c => c.name === COMPOSE_NAME);
let composeId: string;

if (compose) {
  composeId = compose.composeId;
  ok(`Existiert bereits (${composeId})`);
} else {
  log("Erstelle Compose...");
  const result = await api("POST", "compose.create", {
    name: COMPOSE_NAME,
    environmentId: env.environmentId,
    composeType: "docker-compose",
    description: "Umami Analytics (Cookie-frei, DSGVO-konform)",
  }) as { composeId: string };
  composeId = result.composeId;
  ok(`Erstellt (${composeId})`);
}

// ─── Compose-File + Env setzen ───────────────────────────────────────────────

log("Setze Compose-Konfiguration...");

const appSecret = crypto.randomUUID();

// Compose-File mit Environment-Variablen (substituiert)
const resolvedCompose = COMPOSE_FILE
  .replace(/\$\{DB_PASSWORD\}/g, DB_PASSWORD)
  .replace(/\$\{APP_SECRET\}/g, appSecret);

await api("POST", "compose.update", {
  composeId,
  sourceType: "raw",
  composeFile: resolvedCompose,
});

ok("Compose-File gesetzt");

// ─── Domain konfigurieren ────────────────────────────────────────────────────

log(`Domain: ${DOMAIN_HOST}...`);

const domains = await api("GET", `domain.byComposeId?composeId=${composeId}`) as Array<{
  domainId: string;
  host: string;
  serviceName: string;
  port: number;
}>;

const existingDomain = domains.find(d => d.serviceName === SERVICE_NAME);

if (existingDomain) {
  if (existingDomain.host !== DOMAIN_HOST || existingDomain.port !== SERVICE_PORT) {
    await api("POST", "domain.update", {
      domainId: existingDomain.domainId,
      host: DOMAIN_HOST,
      port: SERVICE_PORT,
      https: false,
      certificateType: "none",
    });
    ok("Domain aktualisiert");
  } else {
    ok("Domain bereits korrekt");
  }
} else {
  await api("POST", "domain.create", {
    host: DOMAIN_HOST,
    port: SERVICE_PORT,
    composeId,
    serviceName: SERVICE_NAME,
    https: false,
    certificateType: "none",
  });
  ok(`Domain erstellt: ${DOMAIN_HOST}`);
}

// ─── Deploy ──────────────────────────────────────────────────────────────────

log("Starte Deployment...");
await api("POST", "compose.deploy", { composeId });
ok("Deployment gestartet");

// ─── Warten ──────────────────────────────────────────────────────────────────

log("Warte auf Deployment...");
await sleep(5000);

const maxWait = 5 * 60 * 1000;
const start = Date.now();
let success = false;

while (Date.now() - start < maxWait) {
  try {
    const state = await api("GET", `compose.one?composeId=${composeId}`) as { composeStatus?: string };
    const status = state.composeStatus || "unknown";

    if (status === "done") { success = true; break; }
    if (status === "error") break;

    process.stdout.write(".");
  } catch { /* ignorieren */ }
  await sleep(5000);
}

console.log();

// ─── Ergebnis ────────────────────────────────────────────────────────────────

if (success) {
  console.log("\n" + "═".repeat(60));
  console.log("  UMAMI ANALYTICS DEPLOYED");
  console.log(`  URL: https://${DOMAIN_HOST}`);
  console.log();
  console.log("  Standard-Login:");
  console.log("    Benutzer: admin");
  console.log("    Passwort: umami");
  console.log();
  console.log("  WICHTIG: Passwort sofort nach dem ersten Login ändern!");
  console.log("═".repeat(60));
} else {
  console.log("\n✗ Deployment fehlgeschlagen oder Timeout");
  process.exit(1);
}
