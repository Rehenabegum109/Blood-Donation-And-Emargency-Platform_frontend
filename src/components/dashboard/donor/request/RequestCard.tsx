"use client";

import Link from "next/link";

import {
  CalendarDays,
  CheckCircle2,
  Droplets,
  Hospital,
  MapPin,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  IBloodRequest,
  UrgencyLevel,
} from "@/src/types/blood-request.types";

import RequestInfoItem from "./RequestInfoItem";

interface RequestCardProps {
  request: IBloodRequest;
  onDonate: (request: IBloodRequest) => void;
  isDonating?: boolean;
}

const urgencyStyles: Record<UrgencyLevel, string> = {
  LOW: "bg-slate-100 text-slate-700",
  NORMAL: "bg-blue-50 text-blue-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const urgencyLabels: Record<UrgencyLevel, string> = {
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
  CRITICAL: "Critical",
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

export default function RequestCard({
  request,
  onDonate,
  isDonating = false,
}: RequestCardProps) {
  const isPending = request.status === "PENDING";

  const isVerified =
    request.verificationStatus === "VERIFIED";

  const canDonate = isPending && isVerified;

  return (
    <article className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-100/50">
      {/* Header */}
      <div className="border-b border-red-50 bg-gradient-to-r from-red-50 via-white to-rose-50 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Blood Group */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-lg font-bold text-white shadow-lg shadow-red-200">
              {formatBloodGroup(request.bloodGroup)}
            </div>

            <div>
              <h2 className="font-bold text-zinc-900">
                {request.patientName || "Blood Needed"}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                <Hospital className="h-3.5 w-3.5" />
                {request.hospitalName}
              </p>
            </div>
          </div>

          {/* Urgency */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              urgencyStyles[request.urgency]
            }`}
          >
            {urgencyLabels[request.urgency]}
          </span>
        </div>

        {/* Verification */}
        <div className="mt-4">
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified by Admin
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Verification Pending
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-5">
        {/* Request Information */}
        <div className="grid gap-5 sm:grid-cols-2">
          <RequestInfoItem
            icon={Droplets}
            label="Blood Required"
            value={`${formatBloodGroup(request.bloodGroup)} • ${
              request.units
            } unit${request.units > 1 ? "s" : ""}`}
          />

          <RequestInfoItem
            icon={CalendarDays}
            label="Required Date"
            value={formatDate(request.requiredDate)}
          />

          <RequestInfoItem
            icon={Hospital}
            label="Hospital"
            value={request.hospitalName}
          />

          <RequestInfoItem
            icon={MapPin}
            label="Hospital Address"
            value={
              request.hospitalAddress ||
              "Address not provided"
            }
          />

          <RequestInfoItem
            icon={UserRound}
            label="Requested By"
            value={request.recipient.name}
          />

          <RequestInfoItem
            icon={MapPin}
            label="Recipient Location"
            value={
              request.recipient.location ||
              "Location not provided"
            }
          />
        </div>

        {/* Notes */}
        {request.notes && (
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Additional Notes
            </p>

            <p className="text-sm leading-6 text-zinc-600">
              {request.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Status */}
          <div>
            <span className="text-xs font-medium text-zinc-400">
              Request status
            </span>

            <p className="mt-1 text-sm font-semibold text-zinc-700">
              {request.status}
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {/* View Details */}
            <Link
              href={`/dashboard/donor/requests/${request.id}`}
              className="inline-flex w-full items-center justify-center rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 sm:w-auto"
            >
              View Details
            </Link>

            {/* Accept Request */}
            {canDonate ? (
              <Button
                type="button"
                isDisabled={isDonating}
                onClick={() => onDonate(request)}
                className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
              >
                <Droplets className="mr-2 h-4 w-4" />

                {isDonating
                  ? "Accepting..."
                  : "Accept Request"}
              </Button>
            ) : (
              <Button
                type="button"
                isDisabled
                className="w-full cursor-not-allowed bg-zinc-100 text-zinc-400 sm:w-auto"
              >
                {!isVerified
                  ? "Waiting for Verification"
                  : "Request Unavailable"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}