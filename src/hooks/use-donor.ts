
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
  matchDonors,
  findNearbyDonors,
} from "@/src/services/donor/donor.api";

import {
  IUpdateAvailabilityPayload,
  IUpdateDonorLocationPayload,
} from "@/src/types/donor.types";

import {
  approveDonation,
  cancelDonation,
  getReceivedDonations,
  rejectDonation,
} from "@/src/services/donation/donation.api";

// ============================================
// GET MY DONOR PROFILE
// ============================================

export function useGetMyDonorProfile() {
  return useQuery({
    queryKey: ["donor-profile"],
    queryFn: getMyDonorProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================
// GET RECEIVED DONATIONS
// ============================================

export function useGetReceivedDonations(
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ["donations", "received", page, limit],
    queryFn: () => getReceivedDonations(page, limit),
  });
}

// ============================================
// UPDATE DONOR AVAILABILITY
// ============================================

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

// ============================================
// UPDATE DONOR LOCATION
// ============================================

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

// ============================================
// MATCH COMPATIBLE DONORS
// ============================================

export function useMatchDonors(
  bloodRequestId?: string
) {
  return useQuery({
    queryKey: ["matched-donors", bloodRequestId],

    queryFn: () => matchDonors(bloodRequestId!),

    enabled: !!bloodRequestId,

    retry: false,

    staleTime: 60 * 1000,
  });
}

// ============================================
// FIND NEARBY DONORS
// ============================================

export function useFindNearbyDonors(
  bloodRequestId?: string,
  radius: number = 20
) {
  return useQuery({
    queryKey: [
      "nearby-donors",
      bloodRequestId,
      radius,
    ],

    queryFn: () =>
      findNearbyDonors(
        bloodRequestId!,
        radius
      ),

    enabled: !!bloodRequestId,

    retry: false,

    staleTime: 60 * 1000,
  });
}

// ============================================
// CANCEL DONATION
// ============================================

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
}

// ============================================
// APPROVE DONATION
// ============================================

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

// ============================================
// REJECT DONATION
// ============================================

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
