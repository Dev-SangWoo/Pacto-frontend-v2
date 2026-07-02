export type UserRole = "BLOGGER" | "ADVERTISER";

export type User = {
  id: number;
  email: string;
  role: UserRole;
};
