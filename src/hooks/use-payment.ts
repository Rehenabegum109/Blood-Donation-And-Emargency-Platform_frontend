"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  executeBkashPayment,
  getAllPayments,
  getMyPayments,
  getSinglePayment,
  initiatePayment,
} from "@/src/services/payment/payment.api";

import type {
  IGetAllPaymentsParams,
  IGetMyPaymentsParams,
  IInitiatePaymentPayload,
} from "@/src/types/payment.types";

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

export function useGetMyPayments(
  params?: IGetMyPaymentsParams
) {
  return useQuery({
    queryKey: ["payments", "my", params],
    queryFn: () => getMyPayments(params),
  });
}

export function useGetAllPayments(
  params?: IGetAllPaymentsParams
) {
  return useQuery({
    queryKey: ["payments", "all", params],
    queryFn: () => getAllPayments(params),
  });
}

export function useGetSinglePayment(
  id: string
) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getSinglePayment(id),
    enabled: Boolean(id),
  });
}