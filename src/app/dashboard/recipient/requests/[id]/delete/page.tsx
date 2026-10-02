"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { use } from "react";

import DeleteRequestConfirmation from "@/src/components/dashboard/recipient/DeleteRequestConfirmation";
import { useGetBloodRequest } from "@/src/hooks/use-blood-request";

interface DeleteRequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DeleteRequestPage({
  params,
}: DeleteRequestPageProps) {
  const { id } = use(params);

  const {
    data: response,
    isPending,
    isError,
  } = useGetBloodRequest(id);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm font-medium text-zinc-600">
            Loading request...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !response?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-7 w-7 text-red-600" />
          </div>

          <h1 className="text-xl font-bold text-zinc-900">
            Request Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We could not find the blood request you are trying to
            delete.
          </p>

          <Link
            href="/dashboard/recipient/requests"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <DeleteRequestConfirmation request={response.data} />
  );
}