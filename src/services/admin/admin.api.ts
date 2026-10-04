import { apiClient } from "@/src/lib/api-client";

import type {
  IAdminUserActionResponse,
  IAdminDashboardStatsResponse,
  IGetAdminUsersParams,
  IGetAllUsersResponse,
  IGetAuditLogsParams,
  IGetAuditLogsResponse,
  IGetAdminDonationsResponse,
  IGetAdminDonationsParams,
} from "@/src/types/admin.types";

export async function getAllAdminUsers(
  params: IGetAdminUsersParams = {}
): Promise<IGetAllUsersResponse> {
  const response = await apiClient.get("/admin/users", {
    params,
  });

  return response.data;
}

export async function blockAdminUser(
  id: string
): Promise<IAdminUserActionResponse> {
  const response = await apiClient.patch(
    `/admin/users/${id}/block`
  );

  return response.data;
}

export async function unblockAdminUser(
  id: string
): Promise<IAdminUserActionResponse> {
  const response = await apiClient.patch(
    `/admin/users/${id}/unblock`
  );

  return response.data;
}

export async function getAdminDashboardStats(): Promise<IAdminDashboardStatsResponse> {
  const response = await apiClient.get(
    "/admin/dashboard-stats"
  );

  return response.data;
}

export async function getAdminAuditLogs(
  params: IGetAuditLogsParams = {}
): Promise<IGetAuditLogsResponse> {
  const response = await apiClient.get("/admin/audit-logs", {
    params,
  });

  return response.data;
}

export async function getAdminDonations(
  params: IGetAdminDonationsParams = {}
): Promise<IGetAdminDonationsResponse> {
  const response = await apiClient.get(
    "/admin/donations",
    {
      params,
    }
  );

  return response.data;
}