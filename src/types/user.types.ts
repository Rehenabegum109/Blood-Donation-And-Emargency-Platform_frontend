
export interface IDonorProfile {
  id: string;
  bloodGroup: string;
  dateOfBirth: string | null;
  address: string | null;
  lastDonationDate: string | null;
  isAvailable: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DONOR" | "RECIPIENT";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  phone: string | null;
  location: string | null;
  profileImage: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  donor: IDonorProfile | null;
}

export interface IGetMeResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export interface IUpdateProfilePayload {
  name?: string;
  phone?: string;
  location?: string;
  profileImage?: string;
}

export interface IUpdateProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}
