"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { use } from "react";

import RequestDetails from "@/src/components/dashboard/recipient/RequestDetails";
import { useGetBloodRequest } from "@/src/hooks/use-blood-request";

interface RequestDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { id } = use(params);

  const {
    data: response,
    isPending,
    isError,
    error,
  } = useGetBloodRequest(id);

  // Loading
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm font-semibold text-zinc-700">
            Loading request details...
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Please wait a moment
          </p>
        </div>
      </main>
    );
  }

  // Error / Not found
  if (isError || !response?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-100/30">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Heart className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-zinc-900">
            Request Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We could not load this blood request. It may have been
            deleted or you may not have access to it.
          </p>

          {error && (
            <p className="mt-3 text-xs text-red-500">
              Failed to load request details.
            </p>
          )}

          <Link
            href="/dashboard/recipient/requests"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:block">
          <div className="sticky top-0 flex min-h-screen flex-col">
            {/* Logo */}
            <div className="border-b border-white/10 px-6 py-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Heart className="h-6 w-6 fill-white text-white" />
                </div>

                <div>
                  <h1 className="text-xl font-bold">BloodLink</h1>

                  <p className="text-xs text-red-100">
                    Recipient Dashboard
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-6">
              <Link
                href="/dashboard/recipient"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-50 transition hover:bg-white/10"
              >
                <Heart className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/recipient/requests"
                className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold"
              >
                <Heart className="h-5 w-5" />
                My Requests
              </Link>
            </nav>

            {/* Footer */}
            <div className="border-t border-white/10 p-5">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 overflow-hidden">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Mobile Header */}
            <div className="mb-6 md:hidden">
              <Link
                href="/dashboard/recipient"
                className="flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Heart className="h-5 w-5 fill-white" />
                </div>

                <span className="font-bold text-zinc-900">
                  BloodLink
                </span>
              </Link>
            </div>

            {/* Details */}
            <RequestDetails request={response.data} />
          </div>
        </main>
      </div>
    </div>
  );
}