// import { apiClient } from "@/src/lib/api-client";

// import type {
//   IGetAllPaymentsParams,
//   IGetAllPaymentsResponse,
//   IGetMyPaymentsParams,
//   IGetMyPaymentsResponse,
//   IGetSinglePaymentResponse,
//   IInitiatePaymentPayload,
//   IInitiatePaymentResponse,
//   IExecutePaymentResponse,
// } from "@/src/types/payment.types";

// export async function initiatePayment(
//   payload: IInitiatePaymentPayload
// ): Promise<IInitiatePaymentResponse> {
//   const response = await apiClient.post(
//     "/payments/initiate",
//     payload
//   );

//   return response.data;
// }

// export async function executeBkashPayment(
//   paymentID: string
// ): Promise<IExecutePaymentResponse> {
//   const response = await apiClient.post(
//     `/payments/execute/${paymentID}`
//   );

//   return response.data;
// }

// export async function getMyPayments(
//   params?: IGetMyPaymentsParams
// ): Promise<IGetMyPaymentsResponse> {
//   const response = await apiClient.get(
//     "/payments/my",
//     {
//       params,
//     }
//   );

//   return response.data;
// }

// export async function getAllPayments(
//   params?: IGetAllPaymentsParams
// ): Promise<IGetAllPaymentsResponse> {
//   const response = await apiClient.get(
//     "/payments/all",
//     {
//       params,
//     }
//   );

//   return response.data;
// }

// export async function getSinglePayment(
//   id: string
// ): Promise<IGetSinglePaymentResponse> {
//   const response = await apiClient.get(
//     `/payments/${id}`
//   );

//   return response.data;
// }


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
  IStripeCheckoutPayload,
  IStripeCheckoutResponse,
  IStripeSessionResponse,
  ICancelStripePaymentResponse,
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

/* =========================================================
   Stripe
========================================================= */

export async function createStripeCheckoutSession(
  payload: IStripeCheckoutPayload
): Promise<IStripeCheckoutResponse> {
  const response = await apiClient.post(
    "/payments/stripe/create-checkout-session",
    payload
  );

  return response.data;
}

export async function getStripeCheckoutSession(
  sessionId: string
): Promise<IStripeSessionResponse> {
  const response = await apiClient.get(
    "/payments/stripe/session",
    {
      params: {
        session_id: sessionId,
      },
    }
  );

  return response.data;
}

export async function cancelStripePayment(
  paymentId: string
): Promise<ICancelStripePaymentResponse> {
  const response = await apiClient.patch(
    `/payments/stripe/cancel/${paymentId}`
  );

  return response.data;
}

/* =========================================================
   Payment History
========================================================= */

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