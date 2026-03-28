const NPM_REGISTRY_LATEST_URL = "https://registry.npmjs.org/ossperks/latest";

export const getLatestCLIVersion = async (): Promise<string | null> => {
  try {
    const res = await fetch(NPM_REGISTRY_LATEST_URL, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
};
