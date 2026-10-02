
import { apiClient } from "@/src/lib/api-client";

import {
  ICreateDonationPayload,
  ICreateDonationResponse,
  IGetMyDonationsResponse,
} from "@/src/types/donation.types";

export async function getMyDonations(
  page: number = 1,
  limit: number = 10
): Promise<IGetMyDonationsResponse> {
  const response = await apiClient.get("/donations/my", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
}

export async function createDonation(
  payload: ICreateDonationPayload
): Promise<ICreateDonationResponse> {
  const response = await apiClient.post("/donations", payload);

  return response.data;
}
