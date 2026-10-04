export type DonationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export type BloodRequestStatus =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

export type VerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export type UrgencyLevel =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export interface IDonationBloodRequest {
  id: string;

  bloodGroup: string;

  units: number;

  hospitalName: string;

  hospitalAddress?: string | null;

  requiredDate: string;

  urgency: UrgencyLevel;

  status: BloodRequestStatus;

  verificationStatus: VerificationStatus;

  patientName?: string | null;
}

export interface IDonation {
  id: string;

  donorId: string;

  bloodRequestId: string;

  status: DonationStatus;

  donationDate?: string | null;

  units: number;

  notes?: string | null;

  createdAt: string;

  updatedAt: string;

  bloodRequest: IDonationBloodRequest;
}

export interface IDonationMeta {
  page: number;

  limit: number;

  total: number;

  totalPage: number;
}

export interface IGetMyDonationsResponse {
  success: boolean;

  message: string;

  data: {
    data: IDonation[];

    meta: IDonationMeta;
  };
}

export interface ICreateDonationPayload {
  bloodRequestId: string;

  units?: number;

  notes?: string;
}

export interface ICreateDonationResponse {
  success: boolean;

  message: string;

  data: IDonation;
}