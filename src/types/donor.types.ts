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


export interface IMatchedDonorUser {
  id: string;
  name: string;
  phone?: string | null;
  location?: string | null;
  profileImage?: string | null;
}

export interface IMatchedDonor {
  id: string;
  bloodGroup: string;
  dateOfBirth?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  lastDonationDate?: string | null;
  isAvailable: boolean;
  user: IMatchedDonorUser;
}

export interface IMatchBloodRequest {
  id: string;
  bloodGroup: string;
  units: number;
  hospitalName: string;
  hospitalAddress?: string | null;
  requiredDate?: string | null;
  urgency: string;
  status: string;
  verificationStatus: string;
}

export interface IMatchDonorsData {
  bloodRequest: IMatchBloodRequest;
  compatibleBloodGroups: string[];
  totalMatchedDonors: number;
  donors: IMatchedDonor[];
}

export interface IMatchDonorsResponse {
  success: boolean;
  message: string;
  data: IMatchDonorsData;
}

export interface INearbyDonor extends IMatchedDonor {
  distanceKm: number;
}

export interface INearbyBloodRequest {
  id: string;
  bloodGroup: string;
  units: number;
  hospitalName: string;
  hospitalLatitude: number;
  hospitalLongitude: number;
  urgency: string;
  status: string;
  verificationStatus: string;
}

export interface INearbyDonorsData {
  bloodRequest: INearbyBloodRequest;
  radiusKm: number;
  totalNearbyDonors: number;
  donors: INearbyDonor[];
}

export interface INearbyDonorsResponse {
  success: boolean;
  message: string;
  data: INearbyDonorsData;
}
