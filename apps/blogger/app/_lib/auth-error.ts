import { ApiError } from "@pacto/api";
import { redirect } from "next/navigation";

export function redirectOnAuthError(error: unknown): never {
  if (isUnauthorizedError(error)) {
    redirect("/logout?reason=session-expired");
  }

  if (isForbiddenError(error)) {
    redirect("/forbidden");
  }

  throw error;
}

export function fallbackOnNonAuthError<T>(error: unknown, fallback: T): T {
  if (isUnauthorizedError(error)) {
    redirect("/logout?reason=session-expired");
  }

  if (isForbiddenError(error)) {
    redirect("/forbidden");
  }

  return fallback;
}

function isUnauthorizedError(error: unknown) {
  return error instanceof ApiError && error.statusCode === 401;
}

function isForbiddenError(error: unknown) {
  return error instanceof ApiError && error.statusCode === 403;
}
