import type { User } from "@pacto/types";

import { adaptUser } from "../adapters/auth-adapter";
import type { LoginResponse, MeResponse } from "../adapters/auth-adapter";
import { apiRequest, unwrapCommonResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

export type LoginPayload = {
  email: string;
  password: string;
  role: User["role"];
};

export type SignupPayload = LoginPayload;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await apiRequest<CommonResponse<LoginResponse> | LoginResponse>(
    "/api/v1/auth/login",
    {
      body: payload,
      method: "POST",
    },
  );

  return unwrapCommonResponse<LoginResponse>(response);
}

export async function signup(payload: SignupPayload): Promise<LoginResponse> {
  const response = await apiRequest<
    CommonResponse<Partial<LoginResponse>> | Partial<LoginResponse>
  >("/api/v1/auth/signup", {
    body: payload,
    method: "POST",
  });

  const result = unwrapCommonResponse<Partial<LoginResponse>>(response);

  return { accessToken: result.accessToken ?? "" };
}

export async function getMe(token?: string): Promise<User> {
  const response = await apiRequest<CommonResponse<MeResponse> | MeResponse>("/api/v1/auth/me", {
    token,
  });

  return adaptUser(unwrapCommonResponse<MeResponse>(response));
}
