"use client";

import { AlertCircle, Droplets } from "lucide-react";



import type { IBloodRequest } from "@/src/types/blood-request.types";
import RequestCard from "./RequestCard";
import DonorRequestCard from "./DonorRequestCard";

interface DonorRequestsListProps {
  requests: IBloodRequest[];
  isLoading: boolean;
  isError: boolean;
}

export default function DonorRequestsList({
  requests,
  isLoading,
  isError,
}: DonorRequestsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-zinc-200" />

              <div className="flex-1">
                <div className="h-5 w-32 rounded bg-zinc-200" />

                <div className="mt-3 h-3 w-24 rounded bg-zinc-100" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="h-10 rounded bg-zinc-100" />
              <div className="h-10 rounded bg-zinc-100" />
              <div className="h-10 rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

        <h3 className="mt-4 text-lg font-semibold text-red-800">
          Failed to load blood requests
        </h3>

        <p className="mt-2 text-sm text-red-600">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <Droplets className="h-7 w-7 text-red-500" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
          No blood requests found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          There are no blood requests matching your current
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <DonorRequestCard
          key={request.id}
          request={request}
        />
      ))}
    </div>
  );
}