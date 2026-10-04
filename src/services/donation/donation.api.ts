
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
export async function getReceivedDonations(
  page: number = 1,
  limit: number = 10
): Promise<IGetMyDonationsResponse> {
  const response = await apiClient.get("/donations/received", {
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

export async function cancelDonation(
  donationId: string
): Promise<any> {
  const response = await apiClient.patch(
    `/donations/${donationId}/cancel`
  );

  return response.data;
};

export async function approveDonation(
  donationId: string
) {
  const response = await apiClient.patch(
    `/donations/${donationId}/approve`
  );

  return response.data;
}

export async function rejectDonation(
  donationId: string
) {
  const response = await apiClient.patch(
    `/donations/${donationId}/reject`
  );

  return response.data;
}