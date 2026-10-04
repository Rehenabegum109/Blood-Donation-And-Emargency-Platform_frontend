"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  User,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import type {
  DonationStatus,
  IDonation,
} from "@/src/types/donation.types";
import { useCancelDonation } from "@/src/hooks/use-donor";


interface DonationCardProps {
  donation: IDonation;
}

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(date?: string | null) {
  if (!date) return "Not scheduled";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusClass(status: DonationStatus) {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "ACCEPTED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "CANCELLED":
      return "border-zinc-200 bg-zinc-100 text-zinc-600";

    default:
      return "border-zinc-200 bg-zinc-100 text-zinc-600";
  }
}

function formatStatus(status: DonationStatus) {
  switch (status) {
    case "PENDING":
      return "Pending";

    case "ACCEPTED":
      return "Accepted";

    case "COMPLETED":
      return "Completed";

    case "REJECTED":
      return "Rejected";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}

function getVerificationClass(status?: string | null) {
  switch (status) {
    case "VERIFIED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "PENDING":
    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

function formatVerificationStatus(status?: string | null) {
  if (!status) return "Pending";

  return (
    status.charAt(0) +
    status.slice(1).toLowerCase()
  );
}

function getRequestStatusClass(status?: string) {
  switch (status) {
    case "FULFILLED":
      return "border-green-200 bg-green-50 text-green-700";

    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700";

    case "EXPIRED":
      return "border-zinc-200 bg-zinc-100 text-zinc-600";

    case "PENDING":
    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
}

function formatRequestStatus(status?: string) {
  if (!status) return "Pending";

  return (
    status.charAt(0) +
    status.slice(1).toLowerCase()
  );
}

export default function DonationCard({
  donation,
}: DonationCardProps) {
  const request = donation.bloodRequest;

  const cancelDonationMutation = useCancelDonation();

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this donation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelDonationMutation.mutateAsync(
        donation.id
      );

      toast.success(
        "Donation cancelled successfully"
      );
    } catch (error) {
      console.error(
        "Cancel donation error:",
        error
      );

      toast.error(
        "Unable to cancel donation"
      );
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="border-b border-red-50 bg-gradient-to-r from-red-50 via-white to-rose-50 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Blood Group */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-lg font-bold text-white shadow-lg shadow-red-200">
              {formatBloodGroup(
                request.bloodGroup
              )}
            </div>

            <div>
              <h2 className="font-bold text-zinc-900">
                {request.patientName ||
                  "Blood Donation"}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                <Hospital className="h-3.5 w-3.5" />

                {request.hospitalName}
              </p>
            </div>
          </div>

          {/* Donation Status */}
          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
              donation.status
            )}`}
          >
            Donation:{" "}
            {formatStatus(donation.status)}
          </span>
        </div>

        {/* Status Row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Verification Status */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getVerificationClass(
              request.verificationStatus
            )}`}
          >
            {request.verificationStatus ===
            "VERIFIED" ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Clock3 className="h-3.5 w-3.5" />
            )}

            Verification:{" "}
            {formatVerificationStatus(
              request.verificationStatus
            )}
          </span>

          {/* Request Status */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getRequestStatusClass(
              request.status
            )}`}
          >
            Request:{" "}
            {formatRequestStatus(
              request.status
            )}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-5">
        {/* Information Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Donation Units */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Droplets className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Donation Units
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {donation.units}{" "}
                {donation.units === 1
                  ? "unit"
                  : "units"}
              </p>
            </div>
          </div>

          {/* Required Date */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Required Date
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {formatDate(
                  request.requiredDate
                )}
              </p>
            </div>
          </div>

          {/* Hospital */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <Hospital className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Hospital
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {request.hospitalName}
              </p>
            </div>
          </div>

          {/* Hospital Address */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <MapPin className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Hospital Address
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {request.hospitalAddress ||
                  "Address not provided"}
              </p>
            </div>
          </div>

          {/* Patient */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <User className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Patient
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {request.patientName ||
                  "Not provided"}
              </p>
            </div>
          </div>

          {/* Donation Date */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Donation Date
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-800">
                {formatDate(
                  donation.donationDate
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {donation.notes && (
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Donation Notes
            </p>

            <p className="text-sm leading-6 text-zinc-600">
              {donation.notes}
            </p>
          </div>
        )}

        {/* Submitted Time */}
        <div className="flex items-center gap-2 border-t border-zinc-100 pt-4 text-xs text-zinc-400">
          <Clock3 className="h-3.5 w-3.5" />

          <span>
            Submitted{" "}
            {formatDateTime(
              donation.createdAt
            )}
          </span>
        </div>

        {/* Cancel Button */}
        {donation.status === "ACCEPTED" && (
          <div className="border-t border-zinc-100 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={
                cancelDonationMutation.isPending
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <XCircle className="h-4 w-4" />

              {cancelDonationMutation.isPending
                ? "Cancelling..."
                : "Cancel Donation"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}