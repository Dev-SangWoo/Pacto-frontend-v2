export function getApiEnv(key: string): string | undefined {
  const runtime = globalThis as unknown as {
    process?: {
      env?: Record<string, string | undefined>;
    };
  };

  return runtime.process?.env?.[key];
}

export function isMockFallbackDisabled(): boolean {
  return getApiEnv("PACTO_API_MOCK_FALLBACK") === "false";
}
