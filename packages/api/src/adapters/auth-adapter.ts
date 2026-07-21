import type { AdvertiserProfile, BloggerProfile, User } from "@pacto/types";

export type LoginResponse = {
  accessToken: string;
};

export type MeResponse = {
  advertiserProfile?: AdvertiserProfile | null;
  bloggerProfile?: BloggerProfile | null;
  userId: number;
  email: string;
  role: User["role"];
};

export function adaptUser(response: MeResponse): User {
  return {
    advertiserProfile: response.advertiserProfile ?? undefined,
    bloggerProfile: response.bloggerProfile ?? undefined,
    id: response.userId,
    email: response.email,
    role: response.role,
  };
}
