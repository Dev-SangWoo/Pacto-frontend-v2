import { ApiError } from "@pacto/api";
import { redirect } from "next/navigation";

export function redirectOnAuthError(error: unknown): never {
  if (isAuthError(error)) {
    redirect("/logout?reason=session-expired");
  }

  throw error;
}

export function fallbackOnNonAuthError<T>(error: unknown, fallback: T): T {
  if (isAuthError(error)) {
    redirect("/logout?reason=session-expired");
  }

  return fallback;
}

function isAuthError(error: unknown) {
  return error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403);
}
