import { apiClient } from "@/src/lib/api-client";

import type {
  IGetAllPaymentsParams,
  IGetAllPaymentsResponse,
  IGetMyPaymentsParams,
  IGetMyPaymentsResponse,
  IGetSinglePaymentResponse,
  IInitiatePaymentPayload,
  IInitiatePaymentResponse,
  IExecutePaymentResponse,
} from "@/src/types/payment.types";

export async function initiatePayment(
  payload: IInitiatePaymentPayload
): Promise<IInitiatePaymentResponse> {
  const response = await apiClient.post(
    "/payments/initiate",
    payload
  );

  return response.data;
}

export async function executeBkashPayment(
  paymentID: string
): Promise<IExecutePaymentResponse> {
  const response = await apiClient.post(
    `/payments/execute/${paymentID}`
  );

  return response.data;
}

export async function getMyPayments(
  params?: IGetMyPaymentsParams
): Promise<IGetMyPaymentsResponse> {
  const response = await apiClient.get(
    "/payments/my",
    {
      params,
    }
  );

  return response.data;
}

export async function getAllPayments(
  params?: IGetAllPaymentsParams
): Promise<IGetAllPaymentsResponse> {
  const response = await apiClient.get(
    "/payments/all",
    {
      params,
    }
  );

  return response.data;
}

export async function getSinglePayment(
  id: string
): Promise<IGetSinglePaymentResponse> {
  const response = await apiClient.get(
    `/payments/${id}`
  );

  return response.data;
}