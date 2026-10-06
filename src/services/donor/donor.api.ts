import { apiClient } from "@/src/lib/api-client";

import {
  IGetMyDonorProfileResponse,
  IUpdateAvailabilityPayload,
  IUpdateAvailabilityResponse,
  IUpdateDonorLocationPayload,
  IUpdateDonorLocationResponse,
} from "@/src/types/donor.types";

export async function getMyDonorProfile(): Promise<IGetMyDonorProfileResponse> {
  const response = await apiClient.get("/donors/me");

  return response.data;
}

export async function updateDonorAvailability(
  payload: IUpdateAvailabilityPayload
): Promise<IUpdateAvailabilityResponse> {
  const response = await apiClient.patch(
    "/donors/availability",
    payload
  );

  return response.data;
}

export async function updateDonorLocation(
  payload: IUpdateDonorLocationPayload
): Promise<IUpdateDonorLocationResponse> {
  const response = await apiClient.patch(
    "/donors/location",
    payload
  );

  return response.data;
}


export const matchDonors = async (bloodRequestId: string) => {
  const response = await apiClient.get(
    `/donors/match/${bloodRequestId}`
  );

  return response.data;
};

export const findNearbyDonors = async (
  bloodRequestId: string,
  radius: number = 20
) => {
  const response = await apiClient.get(
    `/donors/nearby/${bloodRequestId}`,
    {
      params: {
        radius,
      },
    }
  );

  return response.data;
};