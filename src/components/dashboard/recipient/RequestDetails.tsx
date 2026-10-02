"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  Phone,
  UserRound,
  XCircle,
} from "lucide-react";

import type {
  IBloodRequest,
} from "@/src/types/blood-request.types";

interface RequestDetailsProps {
  request: IBloodRequest;
}

function formatBloodGroup(group: string) {
  return group
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getUrgencyClass(urgency: string) {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-700 border-red-200";

    case "HIGH":
      return "bg-orange-100 text-orange-700 border-orange-200";

    case "NORMAL":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "LOW":
      return "bg-green-100 text-green-700 border-green-200";

    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-700 border-amber-200";

    case "FULFILLED":
      return "bg-green-100 text-green-700 border-green-200";

    case "CANCELLED":
      return "bg-zinc-100 text-zinc-600 border-zinc-200";

    case "EXPIRED":
      return "bg-red-100 text-red-700 border-red-200";

    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

function getVerificationClass(status: string) {
  switch (status) {
    case "VERIFIED":
      return "bg-green-100 text-green-700 border-green-200";

    case "REJECTED":
      return "bg-red-100 text-red-700 border-red-200";

    case "PENDING":
      return "bg-amber-100 text-amber-700 border-amber-200";

    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {icon}
        {label}
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-zinc-800">
        {value}
      </p>
    </div>
  );
}

export default function RequestDetails({
  request,
}: RequestDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/recipient/requests"
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Requests
      </Link>

      {/* Main Card */}
      <section className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-100/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-500 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Droplets className="h-8 w-8" />
              </div>

              <div>
                <p className="text-sm font-medium text-red-100">
                  Blood Request
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                  {formatBloodGroup(request.bloodGroup)}
                </h1>

                <p className="mt-1 text-sm text-red-100">
                  {request.units}{" "}
                  {request.units === 1 ? "unit" : "units"} of blood
                  required
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getUrgencyClass(
                  request.urgency
                )}`}
              >
                {formatLabel(request.urgency)} Urgency
              </span>

              <span
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                  request.status
                )}`}
              >
                {formatLabel(request.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* Request Overview */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-red-600" />

              <h2 className="text-lg font-bold text-zinc-900">
                Request Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={<Droplets className="h-3.5 w-3.5" />}
                label="Blood Group"
                value={formatBloodGroup(request.bloodGroup)}
              />

              <InfoItem
                icon={<Droplets className="h-3.5 w-3.5" />}
                label="Blood Units"
                value={`${request.units} ${
                  request.units === 1 ? "Unit" : "Units"
                }`}
              />

              <InfoItem
                icon={<Clock3 className="h-3.5 w-3.5" />}
                label="Urgency"
                value={formatLabel(request.urgency)}
              />

              <InfoItem
                icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                label="Request Status"
                value={formatLabel(request.status)}
              />

              <InfoItem
                icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                label="Verification"
                value={formatLabel(request.verificationStatus)}
              />

              <InfoItem
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Required Date"
                value={formatDate(request.requiredDate)}
              />
            </div>
          </div>

          {/* Hospital Information */}
          <div className="border-t border-zinc-100 pt-8">
            <div className="mb-4 flex items-center gap-2">
              <Hospital className="h-5 w-5 text-red-600" />

              <h2 className="text-lg font-bold text-zinc-900">
                Hospital Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<Hospital className="h-3.5 w-3.5" />}
                label="Hospital Name"
                value={request.hospitalName}
              />

              <InfoItem
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="Hospital Address"
                value={
                  request.hospitalAddress || "Not provided"
                }
              />

              <InfoItem
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="Latitude"
                value={
                  request.hospitalLatitude !== null &&
                  request.hospitalLatitude !== undefined
                    ? String(request.hospitalLatitude)
                    : "Not provided"
                }
              />

              <InfoItem
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="Longitude"
                value={
                  request.hospitalLongitude !== null &&
                  request.hospitalLongitude !== undefined
                    ? String(request.hospitalLongitude)
                    : "Not provided"
                }
              />
            </div>
          </div>

          {/* Patient Information */}
          <div className="border-t border-zinc-100 pt-8">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-5 w-5 text-red-600" />

              <h2 className="text-lg font-bold text-zinc-900">
                Patient Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<UserRound className="h-3.5 w-3.5" />}
                label="Patient Name"
                value={
                  request.patientName || "Not provided"
                }
              />

              <InfoItem
                icon={<Phone className="h-3.5 w-3.5" />}
                label="Contact Number"
                value={
                  request.contactNumber || "Not provided"
                }
              />
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-zinc-100 pt-8">
            <div className="mb-4 flex items-center gap-2">
              <FileTextIcon />

              <h2 className="text-lg font-bold text-zinc-900">
                Additional Notes
              </h2>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-600">
                {request.notes || "No additional notes provided."}
              </p>
            </div>
          </div>

          {/* Rejection Reason */}
          {request.rejectionReason && (
            <div className="border-t border-zinc-100 pt-8">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />

                  <h3 className="font-bold text-red-700">
                    Rejection Reason
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-red-600">
                  {request.rejectionReason}
                </p>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="border-t border-zinc-100 pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Created At"
                value={formatDateTime(request.createdAt)}
              />

              <InfoItem
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Last Updated"
                value={formatDateTime(request.updatedAt)}
              />
            </div>
          </div>

          {/* Verification Status */}
          <div className="border-t border-zinc-100 pt-8">
            <div
              className={`rounded-2xl border p-5 ${getVerificationClass(
                request.verificationStatus
              )}`}
            >
              <div className="flex items-start gap-3">
                {request.verificationStatus === "VERIFIED" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                ) : request.verificationStatus === "REJECTED" ? (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                ) : (
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
                )}

                <div>
                  <h3 className="font-bold">
                    Verification:{" "}
                    {formatLabel(
                      request.verificationStatus
                    )}
                  </h3>

                  <p className="mt-1 text-sm opacity-80">
                    {request.verificationStatus === "VERIFIED"
                      ? "This blood request has been verified by an administrator."
                      : request.verificationStatus === "REJECTED"
                        ? "This blood request was rejected by an administrator."
                        : "This blood request is waiting for administrator verification."}
                  </p>

                  {request.verifiedAt && (
                    <p className="mt-2 text-xs opacity-70">
                      Verified on{" "}
                      {formatDateTime(request.verifiedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-600"
      aria-hidden="true"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}