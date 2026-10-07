
"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface RejectRequestDialogProps {
  request: IBloodRequest | null;
  open: boolean;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rejectionReason: string) => void | Promise<void>;
}

export default function RejectRequestDialog({
  request,
  open,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: RejectRequestDialogProps) {
  const [reason, setReason] = useState("");

  if (!request || !open) {
    return null;
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason || isSubmitting) {
      return;
    }

    await onConfirm(trimmedReason);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-request-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2
                id="reject-request-title"
                className="font-bold text-slate-900"
              >
                Reject Request
              </h2>

              <p className="text-xs text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            {/* Request Information */}
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Patient</p>

              <p className="font-medium text-slate-800">
                {request.patientName || "Not provided"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {request.hospitalName || "Hospital not provided"}
              </p>
            </div>

            {/* Rejection Reason */}
            <div>
              <label
                htmlFor="rejectionReason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Rejection Reason
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                id="rejectionReason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain why this blood request is being rejected..."
                rows={5}
                disabled={isSubmitting}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
              />

              <p className="mt-1 text-xs text-slate-400">
                Please provide a clear reason for the rejection.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !reason.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {isSubmitting ? "Rejecting..." : "Reject Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}