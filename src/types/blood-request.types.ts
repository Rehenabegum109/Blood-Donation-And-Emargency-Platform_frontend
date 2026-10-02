export type BloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export type UrgencyLevel =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export type BloodRequestStatus =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

export type VerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";



export interface IBloodRequestRecipient {
  id: string;
  name: string;
  phone?: string | null;
  location?: string | null;
}


export interface IBloodRequest {
  id: string;
  recipientId: string;

  bloodGroup: BloodGroup;
  units: number;

  hospitalName: string;
  hospitalAddress?: string | null;
  hospitalLatitude?: number | null;
  hospitalLongitude?: number | null;

  patientName?: string | null;
  contactNumber?: string | null;

  requiredDate: string;

  urgency: UrgencyLevel;

  status: BloodRequestStatus;

  verificationStatus: VerificationStatus;

  verifiedAt?: string | null;
  verifiedBy?: string | null;

  rejectionReason?: string | null;

  notes?: string | null;

  createdAt: string;
  updatedAt: string;

  deletedAt?: string | null;

  recipient: IBloodRequestRecipient;
}


export interface IBloodRequestMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


export interface IGetAllBloodRequestsResponse {
  success: boolean;
  message: string;
  data: IBloodRequest[];
  meta: IBloodRequestMeta;
}

export interface IGetBloodRequestResponse {
  success: boolean;
  message: string;
  data: IBloodRequest;
}


export interface ICreateBloodRequestPayload {
  bloodGroup: BloodGroup;

  units?: number;

  hospitalName: string;

  hospitalAddress?: string;

  hospitalLatitude?: number;

  hospitalLongitude?: number;

  patientName?: string;

  contactNumber?: string;

  requiredDate: Date;

  urgency?: UrgencyLevel;

  notes?: string;
}

export interface ICreateBloodRequestResponse {
  success: boolean;
  message: string;
  data: IBloodRequest;
}



export interface IUpdateBloodRequestPayload {
  bloodGroup?: BloodGroup;

  units?: number;

  hospitalName?: string;

  hospitalAddress?: string;

  hospitalLatitude?: number;

  hospitalLongitude?: number;

  patientName?: string;

  contactNumber?: string;

  requiredDate?: Date;

  urgency?: UrgencyLevel;

  notes?: string;
}

export interface IUpdateBloodRequestResponse {
  success: boolean;
  message: string;
  data: IBloodRequest;
}