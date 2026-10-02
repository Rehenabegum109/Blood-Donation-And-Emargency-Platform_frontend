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

export function useGetMyDonorProfile() {
  return useQuery({
    queryKey: ["donor-profile"],
    queryFn: getMyDonorProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
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
}