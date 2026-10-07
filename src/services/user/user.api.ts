
import { apiClient } from "@/src/lib/api-client";
import {
  IGetMeResponse,
  IUpdateProfilePayload,
  IUpdateProfileResponse,
} from "@/src/types/user.types";



export async function getMe(): Promise<IGetMeResponse> {
  const response = await apiClient.get("/users/me");

  return response.data;
}

export async function updateMyProfile(
  payload: IUpdateProfilePayload
): Promise<IUpdateProfileResponse> {
  const response = await apiClient.patch("/users/me", payload);

  return response.data;
}