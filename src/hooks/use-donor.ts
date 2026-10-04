"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyDonorProfile,
  updateDonorAvailability,
  updateDonorLocation,
} from "@/src/services/donor/donor.api";

import {
  IUpdateAvailabilityPayload,
  IUpdateDonorLocationPayload,
} from "@/src/types/donor.types";
import { approveDonation, cancelDonation, getReceivedDonations, rejectDonation } from "../services/donation/donation.api";

export function useGetMyDonorProfile() {
  return useQuery({
    queryKey: ["donor-profile"],
    queryFn: getMyDonorProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export function useGetReceivedDonations(
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ["donations", "received", page, limit],
    queryFn: () => getReceivedDonations(page, limit),
  });
}

export function useUpdateDonorAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateAvailabilityPayload) =>
      updateDonorAvailability(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donor-profile"],
      });
    },
  });
}

export function useUpdateDonorLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateDonorLocationPayload) =>
      updateDonorLocation(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donor-profile"],
      });
    },
  });
};


export function useCancelDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (donationId: string) =>
      cancelDonation(donationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });
    },
  });
};

export function useApproveDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (donationId: string) =>
      approveDonation(donationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });
    },
  });
}

export function useRejectDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (donationId: string) =>
      rejectDonation(donationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });
    },
  });
}