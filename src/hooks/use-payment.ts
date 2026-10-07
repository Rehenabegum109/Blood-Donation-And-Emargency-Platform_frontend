// "use client";

// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";

// import {
//   executeBkashPayment,
//   getAllPayments,
//   getMyPayments,
//   getSinglePayment,
//   initiatePayment,
// } from "@/src/services/payment/payment.api";

// import type {
//   IGetAllPaymentsParams,
//   IGetMyPaymentsParams,
//   IInitiatePaymentPayload,
// } from "@/src/types/payment.types";

// export function useInitiatePayment() {
//   return useMutation({
//     mutationFn: (
//       payload: IInitiatePaymentPayload
//     ) => initiatePayment(payload),
//   });
// }

// export function useExecuteBkashPayment() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (paymentID: string) =>
//       executeBkashPayment(paymentID),

//     onSuccess: (_, paymentID) => {
//       queryClient.invalidateQueries({
//         queryKey: ["payments"],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["payment", paymentID],
//       });
//     },
//   });
// }

// export function useGetMyPayments(
//   params?: IGetMyPaymentsParams
// ) {
//   return useQuery({
//     queryKey: ["payments", "my", params],
//     queryFn: () => getMyPayments(params),
//   });
// }

// export const useGetAllPayments = (
//   params?: IGetAllPaymentsParams
// ) => {
//   return useQuery({
//     queryKey: [
//       "admin-payments",
//       params,
//     ],

//     queryFn: () =>
//       getAllPayments(params),
//   });
// };
// export function useGetSinglePayment(
//   id: string
// ) {
//   return useQuery({
//     queryKey: ["payment", id],
//     queryFn: () => getSinglePayment(id),
//     enabled: Boolean(id),
//   });
// }


"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  cancelStripePayment,
  createStripeCheckoutSession,
  executeBkashPayment,
  getAllPayments,
  getMyPayments,
  getSinglePayment,
  getStripeCheckoutSession,
  initiatePayment,
} from "@/src/services/payment/payment.api";

import type {
  IGetAllPaymentsParams,
  IGetMyPaymentsParams,
  IInitiatePaymentPayload,
  IStripeCheckoutPayload,
} from "@/src/types/payment.types";

/* =========================================================
   bKash
========================================================= */

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (
      payload: IInitiatePaymentPayload
    ) => initiatePayment(payload),
  });
}

export function useExecuteBkashPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentID: string) =>
      executeBkashPayment(paymentID),

    onSuccess: (_, paymentID) => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["payment", paymentID],
      });
    },
  });
}

/* =========================================================
   Stripe
========================================================= */

export function useCreateStripeCheckoutSession() {
  return useMutation({
    mutationFn: (
      payload: IStripeCheckoutPayload
    ) => createStripeCheckoutSession(payload),
  });
}

export function useGetStripeCheckoutSession(
  sessionId: string
) {
  return useQuery({
    queryKey: ["stripe-session", sessionId],

    queryFn: () =>
      getStripeCheckoutSession(sessionId),

    enabled: Boolean(sessionId),
  });
}

export function useCancelStripePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) =>
      cancelStripePayment(paymentId),

    onSuccess: (_, paymentId) => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["payment", paymentId],
      });
    },
  });
}

/* =========================================================
   Payment History
========================================================= */

export function useGetMyPayments(
  params?: IGetMyPaymentsParams
) {
  return useQuery({
    queryKey: ["payments", "my", params],

    queryFn: () =>
      getMyPayments(params),
  });
}

export const useGetAllPayments = (
  params?: IGetAllPaymentsParams
) => {
  return useQuery({
    queryKey: [
      "admin-payments",
      params,
    ],

    queryFn: () =>
      getAllPayments(params),
  });
};

export function useGetSinglePayment(
  id: string
) {
  return useQuery({
    queryKey: ["payment", id],

    queryFn: () =>
      getSinglePayment(id),

    enabled: Boolean(id),
  });
}
