/**
 * Deployment Script für Zahnärzte Parkstrasse.
 *
 * Ablauf:
 *   1. Findet oder erstellt Projekt in Dokploy
 *   2. Findet oder erstellt Compose-Service
 *   3. Setzt docker-compose.yml als Raw Compose
 *   4. Konfiguriert Domain (Cloudflare Tunnel, kein SSL)
 *   5. Löst Deployment aus
 *   6. Pollt Status und zeigt Ergebnis
 *
 * Aufruf: bun run deployment/deploy.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import {
  initDokploy,
  listProjects,
  createProject,
  createCompose,
  updateCompose,
  getCompose,
  deployCompose,
  listDeploymentsByCompose,
  listDomainsByCompose,
  createDomain,
  updateDomain,
} from "./lib/dokploy";

// ─── Konfiguration ──────────────────────────────────────────────────────────

const DOKPLOY_URL = "https://server.jonne-schwegmann.com";
const DOKPLOY_KEY = "iPcuDCnYhSSrOMVlhHGomGcmUNnPOvRkMprSEkOgwlUKEcQyubNvyvhsCyxSCmbF";
const PROJECT_NAME = "Mama Praxis";
const COMPOSE_NAME = "Webseite";
const DOMAIN_HOST = "praxis.jonne-schwegmann.com";
const SERVICE_NAME = "web";
const SERVICE_PORT = 3000;

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function log(msg: string) { console.log(`\n→ ${msg}`); }
function success(msg: string) { console.log(`  ✓ ${msg}`); }
function warn(msg: string) { console.warn(`  ⚠ ${msg}`); }
function fail(msg: string): never { console.error(`\n✗ ${msg}`); process.exit(1); }
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ─── Start ──────────────────────────────────────────────────────────────────

initDokploy(DOKPLOY_URL, DOKPLOY_KEY);

// ─── Schritt 1: Projekt finden oder erstellen ───────────────────────────────

log(`Suche Projekt "${PROJECT_NAME}" in Dokploy...`);

const projects = await listProjects();
let project = projects.find((p) => p.name === PROJECT_NAME);

if (!project) {
  log(`Projekt "${PROJECT_NAME}" nicht gefunden — wird erstellt...`);
  const result = await createProject(PROJECT_NAME, "Zahnärzte Parkstrasse Othmarschen — Webseite");
  // Projekt neu laden um Environments zu bekommen
  const refreshed = await listProjects();
  project = refreshed.find((p) => p.projectId === result.projectId);
  if (!project) fail("Projekt erstellt, aber kann es nicht laden.");
  success(`Projekt erstellt (ID: ${project.projectId})`);
} else {
  success(`Projekt gefunden (ID: ${project.projectId})`);
}

// Production Environment
const environment = project.environments.find((e) => e.name === "production");
if (!environment) fail("Keine 'production' Environment gefunden.");

// ─── Schritt 2: Compose finden oder erstellen ───────────────────────────────

log(`Suche Compose "${COMPOSE_NAME}"...`);

let compose = environment.compose.find((c) => c.name === COMPOSE_NAME);
let composeId: string;

if (compose) {
  composeId = compose.composeId;
  success(`Compose existiert bereits (ID: ${composeId})`);
} else {
  log(`Compose "${COMPOSE_NAME}" existiert nicht — wird erstellt...`);
  const result = await createCompose({
    name: COMPOSE_NAME,
    environmentId: environment.environmentId,
    composeType: "docker-compose",
    description: "Zahnärzte Parkstrasse Webseite (Next.js)",
  });
  composeId = result.composeId;
  success(`Compose erstellt (ID: ${composeId})`);
}

// ─── Schritt 3: Docker-Compose als Raw setzen ───────────────────────────────

log("Docker-Compose Konfiguration setzen...");

const composeFilePath = resolve(import.meta.dir, "..", "docker-compose.yml");
const composeFileContent = readFileSync(composeFilePath, "utf-8");

await updateCompose({
  composeId,
  sourceType: "raw",
  composeFile: composeFileContent,
});

success("Compose-File als Raw gesetzt (kein GitHub nötig)");

// ─── Schritt 4: Domain konfigurieren ────────────────────────────────────────

log(`Domain konfigurieren: ${DOMAIN_HOST}...`);

const existingDomains = await listDomainsByCompose(composeId);
const existingDomain = existingDomains.find((d) => d.serviceName === SERVICE_NAME);

if (existingDomain) {
  if (existingDomain.host !== DOMAIN_HOST || existingDomain.port !== SERVICE_PORT) {
    await updateDomain({
      domainId: existingDomain.domainId,
      host: DOMAIN_HOST,
      port: SERVICE_PORT,
      https: false,
      certificateType: "none",
    });
    success(`Domain aktualisiert: ${DOMAIN_HOST}:${SERVICE_PORT}`);
  } else {
    success("Domain bereits korrekt konfiguriert");
  }
} else {
  await createDomain({
    host: DOMAIN_HOST,
    port: SERVICE_PORT,
    composeId,
    serviceName: SERVICE_NAME,
  });
  success(`Domain erstellt: ${DOMAIN_HOST}:${SERVICE_PORT} (Cloudflare Tunnel, kein SSL)`);
}

// ─── Schritt 5: Deployment auslösen ─────────────────────────────────────────

log("Deployment wird ausgelöst...");

await deployCompose(composeId);
success("Deployment gestartet");

// ─── Schritt 6: Status abwarten ─────────────────────────────────────────────

log("Warte auf Deployment-Status...");

const maxWaitMs = 10 * 60 * 1000; // 10 Minuten (Build kann dauern)
const pollIntervalMs = 5000;
const startTime = Date.now();
let lastStatus = "";
let deploymentSucceeded = false;

await sleep(3000);

while (Date.now() - startTime < maxWaitMs) {
  try {
    const state = await getCompose(composeId);
    const status = (state as Record<string, unknown>).composeStatus as string;

    if (status !== lastStatus) {
      console.log(`  Status: ${status}`);
      lastStatus = status;
    }

    if (status === "done") {
      deploymentSucceeded = true;
      break;
    }

    if (status === "error") break;
  } catch {
    // Polling-Fehler ignorieren
  }

  await sleep(pollIntervalMs);
}

// ─── Ergebnis ────────────────────────────────────────────────────────────────

console.log("\n" + "═".repeat(60));

if (deploymentSucceeded) {
  console.log("  DEPLOYMENT ERFOLGREICH");
  console.log(`  URL: https://${DOMAIN_HOST}`);
} else if (lastStatus === "error") {
  console.log("  DEPLOYMENT FEHLGESCHLAGEN");
  const deployments = await listDeploymentsByCompose(composeId);
  if (deployments.length > 0) {
    console.log("\n  Letzte Deployments:");
    for (const d of deployments.slice(0, 3)) {
      console.log(`    [${d.status}] ${d.title || "Kein Titel"} — ${d.createdAt}`);
    }
  }
} else {
  console.log("  DEPLOYMENT-STATUS UNBEKANNT (Timeout)");
}

console.log(`  Dokploy Dashboard: ${DOKPLOY_URL}`);
console.log("═".repeat(60));

// Health-Check
if (deploymentSucceeded) {
  log(`Health-Check: https://${DOMAIN_HOST} ...`);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(`https://${DOMAIN_HOST}`, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        success(`HTTP ${res.status} — Webseite ist erreichbar!`);
        break;
      }
      warn(`Versuch ${attempt}/5: HTTP ${res.status}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      warn(`Versuch ${attempt}/5: ${msg}`);
    }
    if (attempt < 5) await sleep(3000);
  }
}

if (!deploymentSucceeded) process.exit(1);
