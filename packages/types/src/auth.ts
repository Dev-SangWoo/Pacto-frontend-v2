export type UserRole = "BLOGGER" | "ADVERTISER";

export type BloggerProfile = {
  accountHolder?: string;
  accountNumber?: string;
  bankName?: string;
  blogUrl?: string;
  contact?: string;
  name?: string;
  nickname?: string;
  /** S3 object key를 직접 노출하지 않는 조회용 Presigned URL입니다. */
  profileImageDownloadUrl?: string;
  profileImageUrl?: string;
};

export type AdvertiserProfile = {
  accountHolder?: string;
  accountNumber?: string;
  bankName?: string;
  brandName?: string;
  businessNumber?: string;
  companyName?: string;
  contact?: string;
  managerName?: string;
};

export type User = {
  advertiserProfile?: AdvertiserProfile;
  bloggerProfile?: BloggerProfile;
  id: number;
  email: string;
  role: UserRole;
};
