export type UserRole =
  | "BLOGGER"
  | "AGENCY_ADMIN"
  | "AGENCY_OPERATOR"
  | "ADVERTISER"
  | "PACTO_ADMIN";

export type User = {
  id: number;
  email: string;
  role: UserRole;
};
