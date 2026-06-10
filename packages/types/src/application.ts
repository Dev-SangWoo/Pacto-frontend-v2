export type ApplicationStatusResponse = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

export type ApplicationResponse = {
  applicationId: number;
  campaignId: number;
  bloggerId: number;
  bloggerEmail?: string; // Optional for list responses
  status: ApplicationStatusResponse;
  createdAt: string;
  updatedAt: string;
};
