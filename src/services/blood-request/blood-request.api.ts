// import { apiClient } from "@/src/lib/api-client";

// import {
//   ICreateBloodRequestPayload,
//   ICreateBloodRequestResponse,
//   IGetAllBloodRequestsResponse,
//   IGetBloodRequestResponse,
// } from "@/src/types/blood-request.types";

// export interface IGetBloodRequestsParams {
//   page?: number;
//   limit?: number;
//   status?: string;
//   bloodGroup?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }

// export async function getAllBloodRequests(
//   params: IGetBloodRequestsParams = {}
// ): Promise<IGetAllBloodRequestsResponse> {
//   const response = await apiClient.get("/blood-requests", {
//     params,
//   });

//   return response.data;
// }

// export async function getBloodRequestById(
//   id: string
// ): Promise<IGetBloodRequestResponse> {
//   const response = await apiClient.get(`/blood-requests/${id}`);

//   return response.data;
// }

// export async function createBloodRequest(
//   payload: ICreateBloodRequestPayload
// ): Promise<ICreateBloodRequestResponse> {
//   const response = await apiClient.post("/blood-requests", payload);
//   return response.data;
// }

import { apiClient } from "@/src/lib/api-client";

import type {
  ICreateBloodRequestPayload,
  ICreateBloodRequestResponse,
  IGetAllBloodRequestsResponse,
  IGetBloodRequestResponse,
  IUpdateBloodRequestPayload,
  IUpdateBloodRequestResponse,
} from "@/src/types/blood-request.types";

export interface IGetBloodRequestsParams {
  page?: number;
  limit?: number;
  status?: string;
  bloodGroup?: string;
  urgency?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getAllBloodRequests(
  params: IGetBloodRequestsParams = {}
): Promise<IGetAllBloodRequestsResponse> {
  const response = await apiClient.get("/blood-requests", {
    params,
  });

  return response.data;
}

export async function getBloodRequestById(
  id: string
): Promise<IGetBloodRequestResponse> {
  const response = await apiClient.get(`/blood-requests/${id}`);

  return response.data;
}

export async function createBloodRequest(
  payload: ICreateBloodRequestPayload
): Promise<ICreateBloodRequestResponse> {
  const response = await apiClient.post("/blood-requests", payload);

  return response.data;
}

export async function updateBloodRequest(
  id: string,
  payload: IUpdateBloodRequestPayload
): Promise<IUpdateBloodRequestResponse> {
  const response = await apiClient.patch(
    `/blood-requests/${id}`,
    payload
  );

  return response.data;
}

export async function deleteBloodRequest(id: string) {
  const response = await apiClient.delete(`/blood-requests/${id}`);

  return response.data;
}