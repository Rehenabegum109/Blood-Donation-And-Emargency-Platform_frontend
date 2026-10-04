"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  blockAdminUser,
  getAdminAuditLogs,
  getAdminDashboardStats,
  getAdminDonations,
  getAllAdminUsers,
  unblockAdminUser,
} from "@/src/services/admin/admin.api";

import type {
  IGetAdminDonationsParams,
  IGetAdminUsersParams,
  IGetAuditLogsParams,
} from "@/src/types/admin.types";

export function useGetAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getAdminDashboardStats,
    retry: false,
    staleTime: 60 * 1000,
  });
}

export function useGetAdminUsers(
  params: IGetAdminUsersParams = {}
) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAllAdminUsers(params),
    retry: false,
    staleTime: 60 * 1000,
  });
}

export function useBlockAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blockAdminUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard-stats"],
      });
    },
  });
}

export function useUnblockAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unblockAdminUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard-stats"],
      });
    },
  });
}

export function useGetAdminAuditLogs(
  params: IGetAuditLogsParams = {}
) {
  return useQuery({
    queryKey: ["admin-audit-logs", params],
    queryFn: () => getAdminAuditLogs(params),
    retry: false,
    staleTime: 60 * 1000,
  });
};


export function useGetAdminDonations(
  params: IGetAdminDonationsParams = {}
) {
  return useQuery({
    queryKey: ["admin-donations", params],
    queryFn: () => getAdminDonations(params),
    retry: false,
    staleTime: 60 * 1000,
  });
}