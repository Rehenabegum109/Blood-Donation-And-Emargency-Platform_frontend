
import { apiClient } from "@/src/lib/api-client";
import {
  IForgotPasswordPayload,
  IGoogleLoginPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from "@/src/types/auth.types";


export async function registerUser(payload: IRegisterPayload) {
  const response = await apiClient.post("/auth/register", payload);

  return response.data;
}

export async function verifyEmail(payload: IVerifyEmailPayload) {
  const response = await apiClient.post("/auth/verify-email", payload);

  return response.data;
}

export async function loginUser(payload: ILoginPayload) {
  const response = await apiClient.post("/auth/login", payload);

  return response.data;
}

export async function forgotPassword(
  payload: IForgotPasswordPayload
) {
  const response = await apiClient.post(
    "/auth/forgot-password",
    payload
  );

  return response.data;
}

export async function resetPassword(
  payload: IResetPasswordPayload
) {
  const response = await apiClient.post(
    "/auth/reset-password",
    payload
  );

  return response.data;
}

export async function googleLogin(
  payload: IGoogleLoginPayload
) {
  const response = await apiClient.post(
    "/auth/google",
    payload
  );

  return response.data;
}

export async function logoutUser() {
  const response = await apiClient.post("/auth/logout");

  return response.data;
}
