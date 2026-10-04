"use client";

import {
  CalendarDays,
  CheckCircle2,
  Droplets,
  Hospital,
  Loader2,
  MapPin,
  UserRound,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { IDonation } from "@/src/types/donation.types";

interface DonationCardProps {
  donation: IDonation;
  onApprove: (donationId: string) => void;
  onReject: (donationId: string) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ACCEPTED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELLED: "bg-gray-50 text-gray-600 border-gray-200",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending Approval",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DonationCard({
  donation,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}: DonationCardProps) {
  const isPending = donation.status === "PENDING";
  const isLoading = isApproving || isRejecting;

  const statusClass =
    statusStyles[donation.status] ??
    "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <article className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100/40">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-red-50 bg-gradient-to-r from-red-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Droplets className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-500">
              Donation Request
            </p>

            <h3 className="text-lg font-bold text-zinc-900">
              {formatBloodGroup(donation.bloodRequest.bloodGroup)}
            </h3>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
        >
          {statusLabels[donation.status] ?? donation.status}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        {/* Main info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Droplets className="mt-0.5 h-4 w-4 text-red-500" />

            <div>
              <p className="text-xs text-zinc-500">
                Donation Units
              </p>

              <p className="font-semibold text-zinc-900">
                {donation.units} unit
                {donation.units > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 text-red-500" />

            <div>
              <p className="text-xs text-zinc-500">
                Required Date
              </p>

              <p className="font-semibold text-zinc-900">
                {formatDate(
                  donation.bloodRequest.requiredDate
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Hospital className="mt-0.5 h-4 w-4 text-red-500" />

            <div>
              <p className="text-xs text-zinc-500">
                Hospital
              </p>

              <p className="font-semibold text-zinc-900">
                {donation.bloodRequest.hospitalName}
              </p>
            </div>
          </div>

          {donation.bloodRequest.hospitalAddress && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-red-500" />

              <div>
                <p className="text-xs text-zinc-500">
                  Hospital Address
                </p>

                <p className="font-semibold text-zinc-900">
                  {donation.bloodRequest.hospitalAddress}
                </p>
              </div>
            </div>
          )}

          {donation.bloodRequest.patientName && (
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 h-4 w-4 text-red-500" />

              <div>
                <p className="text-xs text-zinc-500">
                  Patient
                </p>

                <p className="font-semibold text-zinc-900">
                  {donation.bloodRequest.patientName}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        {donation.notes && (
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="mb-1 text-xs font-medium text-zinc-500">
              Donor Note
            </p>

            <p className="text-sm text-zinc-700">
              {donation.notes}
            </p>
          </div>
        )}

        {/* Submitted */}
        <div className="border-t border-zinc-100 pt-4">
          <p className="text-xs text-zinc-500">
            Donation submitted
          </p>

          <p className="text-sm font-medium text-zinc-700">
            {formatDateTime(donation.createdAt)}
          </p>
        </div>

        {/* Actions */}
        {isPending && (
          <div className="flex flex-col gap-3 border-t border-red-50 pt-4 sm:flex-row">
            <Button
              type="button"
              isDisabled={isLoading}
              onClick={() => onApprove(donation.id)}
              className="flex-1 bg-green-600 text-white hover:bg-green-700"
            >
              {isApproving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve Donation
                </>
              )}
            </Button>

            <Button
              type="button"
              isDisabled={isLoading}
              onClick={() => onReject(donation.id)}
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
            >
              {isRejecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Donation
                </>
              )}
            </Button>
          </div>
        )}

        {/* Accepted message */}
        {donation.status === "ACCEPTED" && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Donation approved successfully.
          </div>
        )}

        {/* Rejected message */}
        {donation.status === "REJECTED" && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
            <XCircle className="h-5 w-5" />
            Donation request was rejected.
          </div>
        )}
      </div>
    </article>
  );
}