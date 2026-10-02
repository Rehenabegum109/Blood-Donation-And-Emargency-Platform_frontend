"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Droplets,
  Hospital,
  Loader2,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDeleteBloodRequest } from "@/src/hooks/use-blood-request";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface DeleteRequestConfirmationProps {
  request: IBloodRequest;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", " +")
    .replace("_NEGATIVE", " -");
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DeleteRequestConfirmation({
  request,
}: DeleteRequestConfirmationProps) {
  const router = useRouter();

  const deleteMutation = useDeleteBloodRequest();

  const [error, setError] = useState("");

  function handleCancel() {
    router.push(
      `/dashboard/recipient/requests/${request.id}`
    );
  }

  async function handleDelete() {
    setError("");

    try {
      await deleteMutation.mutateAsync(request.id);

      toast.success("Blood request deleted successfully.");

      router.push("/dashboard/recipient/requests");
    } catch (err) {
      console.error("Delete blood request error:", err);

      setError(
        "Failed to delete the blood request. Please try again."
      );

      toast.error("Failed to delete blood request.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/40">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center px-4 py-10 sm:px-6">
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
          {/* Header */}
          <div className="border-b border-red-100 bg-gradient-to-r from-red-50 to-white px-6 py-7 text-center sm:px-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h1 className="text-2xl font-bold text-zinc-900">
              Delete Blood Request?
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Are you sure you want to delete this blood request?
              This action cannot be undone.
            </p>
          </div>

          {/* Request Summary */}
          <div className="p-6 sm:p-8">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Droplets className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold text-zinc-900">
                    {formatBloodGroup(request.bloodGroup)}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {request.units}{" "}
                    {request.units === 1 ? "unit" : "units"} required
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Hospital */}
                <div className="flex items-start gap-3">
                  <Hospital className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Hospital
                    </p>

                    <p className="mt-1 text-sm font-medium text-zinc-800">
                      {request.hospitalName}
                    </p>
                  </div>
                </div>

                {/* Required Date */}
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Required Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-zinc-800">
                      {formatDate(request.requiredDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Important
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-700">
                    Deleting this request will remove it from your
                    blood request list. Please make sure you no
                    longer need this request before continuing.
                  </p>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={deleteMutation.isPending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Yes, Delete Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}