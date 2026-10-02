export interface IDonorUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  profileImage?: string | null;
}

export interface IDonorProfile {
  id: string;
  userId: string;

  bloodGroup: string;

  dateOfBirth?: string | null;

  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;

  lastDonationDate?: string | null;

  isAvailable: boolean;

  createdAt: string;
  updatedAt: string;

  user: IDonorUser;
}

export interface IGetMyDonorProfileResponse {
  success: boolean;
  message: string;
  data: IDonorProfile;
}

export interface IUpdateAvailabilityPayload {
  isAvailable: boolean;
}

export interface IUpdateAvailabilityResponse {
  success: boolean;
  message: string;
  data: IDonorProfile;
}

export interface IUpdateDonorLocationPayload {
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateDonorLocationResponse {
  success: boolean;
  message: string;
  data: IDonorProfile;
}