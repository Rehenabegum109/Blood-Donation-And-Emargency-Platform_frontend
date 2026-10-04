export type AdminUserRole =
  | "ADMIN"
  | "DONOR"
  | "RECIPIENT";

export type AccountStatus =
  | "ACTIVE"
  | "BLOCKED"
  | "DELETED";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AccountStatus;
  phone?: string | null;
  location?: string | null;
  profileImage?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminUsersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IGetAllUsersResponse {
  success: boolean;
  message: string;
  data: {
    data: IAdminUser[];
    meta: IAdminUsersMeta;
  };
}

export interface IAdminUserActionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    status: AccountStatus;
    updatedAt: string;
  };
}

export interface IAdminDashboardStats {
  users: {
    total: number;
    donors: number;
    recipients: number;
  };

  bloodRequests: {
    total: number;
    pending: number;
    fulfilled: number;
  };

  donations: {
    total: number;
    accepted: number;
    rejected: number;
  };
}

export interface IAdminDashboardStatsResponse {
  success: boolean;
  message: string;
  data: IAdminDashboardStats;
}

export interface IAuditLogUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
}

export interface IAuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  details?: unknown;
  createdAt: string;
  user: IAuditLogUser;
}

export interface IAuditLogsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IGetAuditLogsResponse {
  success: boolean;
  message: string;
  data: {
    data: IAuditLog[];
    meta: IAuditLogsMeta;
  };
}

export interface IGetAdminUsersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: AdminUserRole;
  status?: AccountStatus;
}

export interface IGetAuditLogsParams {
  page?: number;
  limit?: number;
  action?: string;
  entity?: string;
  userId?: string;
}
export type AdminDonationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export type AdminBloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export type AdminUrgencyLevel =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export type AdminBloodRequestStatus =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

export type AdminVerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export interface IAdminDonationDonorUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface IAdminDonationDonor {
  id: string;
  bloodGroup: AdminBloodGroup;
  lastDonationDate?: string | null;
  isAvailable: boolean;
  user: IAdminDonationDonorUser;
}

export interface IAdminDonationRecipient {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface IAdminDonationBloodRequest {
  id: string;
  bloodGroup: AdminBloodGroup;
  units: number;
  hospitalName: string;
  hospitalAddress?: string | null;
  patientName?: string | null;
  contactNumber?: string | null;
  requiredDate: string;
  urgency: AdminUrgencyLevel;
  status: AdminBloodRequestStatus;
  verificationStatus: AdminVerificationStatus;
  recipient: IAdminDonationRecipient;
}

export interface IAdminDonation {
  id: string;
  donorId: string;
  bloodRequestId: string;
  status: AdminDonationStatus;
  donationDate?: string | null;
  units: number;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  donor: IAdminDonationDonor;
  bloodRequest: IAdminDonationBloodRequest;
}

export interface IAdminDonationsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IGetAdminDonationsResponse {
  success: boolean;
  message: string;
  data: {
    data: IAdminDonation[];
    meta: IAdminDonationsMeta;
  };
}

export interface IGetAdminDonationsParams {
  page?: number;
  limit?: number;
  status?: AdminDonationStatus;
  bloodGroup?: AdminBloodGroup;
}