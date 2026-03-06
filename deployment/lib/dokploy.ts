/**
 * Dokploy API Client — dünner Wrapper für die REST-Endpunkte.
 * Kopiert aus LinkedIn-Calling, angepasst für raw Compose Deployment.
 */

interface DokployConfig {
  baseUrl: string;
  apiKey: string;
}

let config: DokployConfig | null = null;

export function initDokploy(baseUrl: string, apiKey: string) {
  config = { baseUrl: baseUrl.replace(/\/$/, ""), apiKey };
}

async function api<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown; params?: Record<string, string> } = {}
): Promise<T> {
  if (!config) throw new Error("Dokploy Client nicht initialisiert — initDokploy() aufrufen");

  const url = new URL(`/api/${path}`, config.baseUrl);
  if (options.params) {
    for (const [k, v] of Object.entries(options.params)) url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    method: options.body ? "POST" : options.method || "GET",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-api-key": config.apiKey,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = (data as { message?: string }).message || res.statusText;
    throw new Error(`Dokploy API Fehler (${res.status}): ${msg}`);
  }
  return data as T;
}

// ─── Projekte ───────────────────────────────────────────────────────────────

interface Environment {
  environmentId: string;
  name: string;
  compose: ComposeService[];
  applications: { applicationId: string; name: string }[];
}

interface Project {
  projectId: string;
  name: string;
  environments: Environment[];
}

export async function listProjects(): Promise<Project[]> {
  return api<Project[]>("project.all");
}

export async function createProject(name: string, description?: string): Promise<{ projectId: string }> {
  return api("project.create", { body: { name, description } });
}

// ─── Compose ────────────────────────────────────────────────────────────────

export interface ComposeService {
  composeId: string;
  name: string;
  appName: string;
  env: string;
  sourceType: string;
  composeStatus: string;
  composeFile: string;
}

export async function createCompose(input: {
  name: string;
  environmentId: string;
  description?: string;
  composeType?: string;
}): Promise<{ composeId: string }> {
  return api("compose.create", { body: input });
}

export async function updateCompose(input: { composeId: string; [key: string]: unknown }): Promise<void> {
  await api("compose.update", { body: input });
}

export async function getCompose(composeId: string): Promise<ComposeService & Record<string, unknown>> {
  return api("compose.one", { params: { composeId } });
}

export async function deployCompose(composeId: string): Promise<void> {
  await api("compose.deploy", { body: { composeId } });
}

// ─── Deployments ────────────────────────────────────────────────────────────

interface Deployment {
  deploymentId: string;
  status: string;
  title: string;
  createdAt: string;
}

export async function listDeploymentsByCompose(composeId: string): Promise<Deployment[]> {
  return api("deployment.allByCompose", { params: { composeId } });
}

// ─── Domains ────────────────────────────────────────────────────────────────

interface Domain {
  domainId: string;
  host: string;
  port: number;
  serviceName: string;
}

export async function listDomainsByCompose(composeId: string): Promise<Domain[]> {
  return api("domain.byComposeId", { params: { composeId } });
}

export async function createDomain(input: {
  host: string;
  port: number;
  composeId: string;
  serviceName: string;
}): Promise<{ domainId: string }> {
  return api("domain.create", {
    body: {
      https: false,
      certificateType: "none",
      domainType: "compose",
      path: "/",
      stripPath: false,
      ...input,
    },
  });
}

export async function updateDomain(input: { domainId: string; [key: string]: unknown }): Promise<void> {
  await api("domain.update", { body: input });
}
