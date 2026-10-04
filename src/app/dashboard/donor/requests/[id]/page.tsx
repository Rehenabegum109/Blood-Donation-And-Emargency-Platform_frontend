"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { use } from "react";


import { useGetBloodRequest } from "@/src/hooks/use-blood-request";
import DonorRequestDetails from "@/src/components/dashboard/donor/request/DonorRequestDetails";

interface DonorRequestDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DonorRequestDetailsPage({
  params,
}: DonorRequestDetailsPageProps) {
  const { id } = use(params);

  const {
    data: response,
    isPending,
    isError,
  } = useGetBloodRequest(id);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4">
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

  if (isError || !response?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-7 w-7 text-red-600" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-zinc-900">
            Request not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We could not load this blood request. It may have been
            deleted or you may not have permission to view it.
          </p>

          <Link
            href="/dashboard/donor/requests"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blood Requests
          </Link>
        </div>
      </main>
    );
  }

  return <DonorRequestDetails request={response.data} />;
}