"use client";

import {
  AlertCircle,
  Droplets,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

import RequestCard from "./RequestCard";

interface RequestsListProps {
  requests: IBloodRequest[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function RequestsList({
  requests,
  isLoading = false,
  isError = false,
}: RequestsListProps) {
  if (isLoading) {
    return (
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-zinc-900">
            My Blood Requests
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Requests you have submitted.
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm text-zinc-500">
            Loading your requests...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-zinc-900">
            My Blood Requests
          </h2>
        </div>

        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

          <p className="mt-3 font-semibold text-zinc-800">
            Could not load requests
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Please refresh the page and try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            My Blood Requests
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Requests you have submitted.
          </p>
        </div>

        <div className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
          {requests.length} Request
          {requests.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Empty */}
      {requests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-red-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Droplets className="h-8 w-8 text-red-500" />
          </div>

          <h3 className="mt-5 text-lg font-bold text-zinc-900">
            No blood requests yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            You have not created any blood request.
            Create a request above to get help from
            available donors.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
            />
          ))}
        </div>
      )}
    </section>
  );
}