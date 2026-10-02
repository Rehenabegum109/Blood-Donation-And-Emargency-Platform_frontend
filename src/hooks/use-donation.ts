
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createDonation,
  getMyDonations,
} from "@/src/services/donation/donation.api";

import type {
  ICreateDonationPayload,
} from "@/src/types/donation.types";

export function useGetMyDonations(
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ["my-donations", page, limit],

    queryFn: () => getMyDonations(page, limit),

    retry: false,

    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateDonationPayload) =>
      createDonation(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-donations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });
    },
  });
}