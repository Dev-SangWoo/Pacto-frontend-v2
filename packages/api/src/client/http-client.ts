import { ApiError } from "./api-error";
import { getServerAccessToken } from "./auth-token";
import { getApiEnv } from "./env";

const DEFAULT_API_BASE_URL = "";

type HttpMethod = "DELETE" | "GET" | "POST" | "PATCH";

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

type ApiRequestOptions = {
  body?: FormData | unknown;
  method?: HttpMethod;
  next?: NextFetchRequestConfig;
  onResponse?: (response: Response) => void;
  query?: Record<string, number | string | undefined>;
  token?: string;
};

export type CommonResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
  timestamp?: string;
};

export function getApiBaseUrl(): string {
  return (
    getApiEnv("PACTO_API_BASE_URL") ??
    getApiEnv("NEXT_PUBLIC_PACTO_API_BASE_URL") ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, method = "GET", next, onResponse, query, token = getServerAccessToken() } = options;
  const baseUrl = getApiBaseUrl();

  if (!baseUrl && !path.startsWith("http")) {
    throw new Error(
      "API Base URL이 설정되지 않았습니다. 환경 변수(PACTO_API_BASE_URL)를 확인해주세요.",
    );
  }

  const url = new URL(`${baseUrl}${path}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value != null) {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = new Headers();

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (body != null && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  if (token != null && token.length > 0) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  console.log(`[apiRequest] ${method} ${url.toString()} (Has Token: ${!!token})`);

  const response = await fetch(url, {
    body: body == null ? undefined : isFormData ? body : JSON.stringify(body),
    cache: "no-store",
    headers,
    method,
    next: {
      revalidate: 0,
      ...next,
    },
  } as RequestInit & { next?: NextFetchRequestConfig });

  onResponse?.(response);

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    console.error(`[apiRequest] Error ${response.status}:`, payload);
    throw toApiError(response.status, payload);
  }

  return payload as T;
}

export function getResponseCookie(response: Response, name: string): string | undefined {
  const setCookie = response.headers.get("set-cookie");

  if (setCookie == null) {
    return undefined;
  }

  const match = setCookie.match(new RegExp(`(?:^|,\\s*)${escapeRegExp(name)}=([^;]*)`));
  return match?.[1];
}

export function unwrapCommonResponse<T>(response: CommonResponse<T> | T): T {
  if (isRecord(response) && "data" in response) {
    return response.data as T;
  }

  return response as T;
}

export function unwrapListResponse<T>(response: unknown): T[] {
  const unwrapped = unwrapCommonResponse(response);

  if (Array.isArray(unwrapped)) {
    return unwrapped as T[];
  }

  if (isRecord(unwrapped) && Array.isArray(unwrapped.content)) {
    return unwrapped.content as T[];
  }

  return [];
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function toApiError(statusCode: number, payload: unknown): ApiError {
  if (isRecord(payload)) {
    const message =
      typeof payload.message === "string"
        ? payload.message
        : `API 요청에 실패했어요. (${statusCode})`;
    const code = typeof payload.code === "string" ? payload.code : undefined;

    return new ApiError(message, statusCode, code, payload);
  }

  return new ApiError(`API 요청에 실패했어요. (${statusCode})`, statusCode, undefined, payload);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
