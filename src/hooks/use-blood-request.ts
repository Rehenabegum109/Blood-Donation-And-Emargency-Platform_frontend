"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createBloodRequest,
  deleteBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  IGetBloodRequestsParams,
  updateBloodRequest,
} from "@/src/services/blood-request/blood-request.api";

import type {
  ICreateBloodRequestPayload,
  IUpdateBloodRequestPayload,
} from "@/src/types/blood-request.types";

export function useCreateBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateBloodRequestPayload) =>
      createBloodRequest(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });
    },
  });
}

export function useGetBloodRequests(
  params: IGetBloodRequestsParams = {}
) {
  return useQuery({
    queryKey: ["blood-requests", params],
    queryFn: () => getAllBloodRequests(params),
    retry: false,
    staleTime: 2 * 60 * 1000,
  });
}

export function useGetBloodRequest(id: string) {
  return useQuery({
    queryKey: ["blood-request", id],
    queryFn: () => getBloodRequestById(id),
    enabled: Boolean(id),
    retry: false,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateBloodRequestPayload;
    }) => updateBloodRequest(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blood-request", variables.id],
      });
    },
  });
}

export function useDeleteBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBloodRequest(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["blood-requests"],
      });

      queryClient.removeQueries({
        queryKey: ["blood-request", id],
      });
    },
  });
}