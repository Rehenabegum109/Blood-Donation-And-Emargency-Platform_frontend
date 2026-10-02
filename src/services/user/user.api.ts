import { IGetMeResponse, IUpdateProfilePayload, IUpdateProfileResponse } from "@/src/types/user.types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(): Promise<IGetMeResponse> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get profile");
  }

  return data;
}

export async function updateMyProfile(
  payload: IUpdateProfilePayload
): Promise<IUpdateProfileResponse> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
}
