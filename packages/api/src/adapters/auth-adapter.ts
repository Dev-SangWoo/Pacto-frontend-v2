import type { User } from "@pacto/types";

export type LoginResponse = {
  accessToken: string;
};

export type MeResponse = {
  userId: number;
  email: string;
  role: User["role"];
};

export function adaptUser(response: MeResponse): User {
  return {
    id: response.userId,
    email: response.email,
    role: response.role,
  };
}
