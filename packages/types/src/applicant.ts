export type ApplicantStatus = "pending" | "approved" | "rejected";

export type Applicant = {
  id: number;
  name: string;
  blogUrl: string;
  status: ApplicantStatus;
  fitScore: "높음" | "보통" | "낮음";
  appliedAt: string;
};
