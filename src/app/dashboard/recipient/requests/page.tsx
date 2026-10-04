"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FilePlus2,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { useGetMe } from "@/src/hooks/useGetMe";
import { useGetBloodRequests } from "@/src/hooks/use-blood-request";

import CreateRequestForm from "@/src/components/dashboard/recipient/CreateRequestForm";
import RequestsList from "@/src/components/dashboard/recipient/RequestsList";

export default function RecipientRequestsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: userResponse } = useGetMe();

  const {
    data: requestResponse,
    isPending: isRequestsLoading,
    isError: isRequestsError,
  } = useGetBloodRequests({
    page: 1,
    limit: 100,
  });

  const user = userResponse?.data;

  // Only show requests created by the logged-in recipient
  const myRequests =
    requestResponse?.data?.filter(
      (request) => request.recipientId === user?.id
    ) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <main className="relative min-h-screen overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Mobile Header */}
          <div className="mb-6 flex items-center justify-between md:hidden">
            <Link
              href="/dashboard/recipient"
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                <FilePlus2 className="h-5 w-5" />
              </div>

              <span className="font-bold text-zinc-900">
                BloodLink
              </span>
            </Link>

            <Link
              href="/dashboard/recipient/profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"
            >
              <UserRound className="h-5 w-5" />
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                href="/dashboard/recipient"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                My Blood Requests
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                Create and manage your blood requests from one
                place.
              </p>
            </div>

            {!showCreateForm && (
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
              >
                <FilePlus2 className="h-4 w-4" />
                Create Blood Request
              </button>
            )}
          </div>

          {/* Create Request Form */}
          {showCreateForm && (
            <div className="mb-10">
              <CreateRequestForm
                onSuccess={() => {
                  setShowCreateForm(false);
                }}
                onCancel={() => {
                  setShowCreateForm(false);
                }}
              />
            </div>
          )}

          {/* Request List */}
          {!showCreateForm && (
            <RequestsList
              requests={myRequests}
              isLoading={isRequestsLoading}
              isError={isRequestsError}
            />
          )}
        </div>
      </main>
    </div>
  );
}