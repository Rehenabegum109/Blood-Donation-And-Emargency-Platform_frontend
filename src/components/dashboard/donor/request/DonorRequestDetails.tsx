"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  Phone,
  User,
  FileText,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface DonorRequestDetailsProps {
  request: IBloodRequest;
}

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
    default:
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
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
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
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
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
  }
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-zinc-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DonorRequestDetails({
  request,
}: DonorRequestDetailsProps) {
  const canDonate =
    request.status === "PENDING" &&
    request.verificationStatus === "VERIFIED";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/40">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/dashboard/donor/requests"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blood Requests
        </Link>

        {/* Header */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 bg-gradient-to-r from-red-50 via-white to-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <Droplets className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Blood Request
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                    {formatBloodGroup(request.bloodGroup)}
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    Request ID: {request.id}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getUrgencyClass(
                    request.urgency
                  )}`}
                >
                  {formatLabel(request.urgency)}
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                    request.status
                  )}`}
                >
                  {formatLabel(request.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Request Summary */}
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            <InfoItem
              icon={<Droplets className="h-5 w-5" />}
              label="Blood Group"
              value={formatBloodGroup(request.bloodGroup)}
            />

            <InfoItem
              icon={<Droplets className="h-5 w-5" />}
              label="Required Units"
              value={`${request.units} ${
                request.units === 1 ? "unit" : "units"
              }`}
            />

            <InfoItem
              icon={<CalendarDays className="h-5 w-5" />}
              label="Required Date"
              value={formatDate(request.requiredDate)}
            />

            <InfoItem
              icon={<AlertCircle className="h-5 w-5" />}
              label="Urgency"
              value={formatLabel(request.urgency)}
            />
          </div>
        </div>

        {/* Verification */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-zinc-900">
                  Verification Status
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  This request has been reviewed by the platform.
                </p>
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${getVerificationClass(
                request.verificationStatus
              )}`}
            >
              {formatLabel(request.verificationStatus)}
            </span>
          </div>

          {request.verifiedAt && (
            <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
              <Clock3 className="h-4 w-4" />
              Verified on {formatDateTime(request.verifiedAt)}
            </div>
          )}

          {request.rejectionReason && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {request.rejectionReason}
              </p>
            </div>
          )}
        </div>

        {/* Hospital Information */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Hospital className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-900">
                Hospital Information
              </h2>

              <p className="text-sm text-zinc-500">
                Location where the blood is required
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <InfoItem
              icon={<Hospital className="h-5 w-5" />}
              label="Hospital Name"
              value={request.hospitalName}
            />

            {request.hospitalAddress && (
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Hospital Address"
                value={request.hospitalAddress}
              />
            )}
          </div>

          {(request.hospitalLatitude !== null &&
            request.hospitalLatitude !== undefined) ||
          (request.hospitalLongitude !== null &&
            request.hospitalLongitude !== undefined) ? (
            <div className="mt-4 rounded-xl bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Coordinates
              </p>

              <p className="mt-1 text-sm text-zinc-700">
                Latitude: {request.hospitalLatitude ?? "N/A"}{" "}
                <span className="mx-1 text-zinc-300">•</span>
                Longitude: {request.hospitalLongitude ?? "N/A"}
              </p>
            </div>
          ) : null}
        </div>

        {/* Patient Information */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-900">
                Patient Information
              </h2>

              <p className="text-sm text-zinc-500">
                Information provided with the request
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {request.patientName && (
              <InfoItem
                icon={<User className="h-5 w-5" />}
                label="Patient Name"
                value={request.patientName}
              />
            )}

            {request.contactNumber && (
              <InfoItem
                icon={<Phone className="h-5 w-5" />}
                label="Contact Number"
                value={request.contactNumber}
              />
            )}

            {request.recipient?.name && (
              <InfoItem
                icon={<User className="h-5 w-5" />}
                label="Requested By"
                value={request.recipient.name}
              />
            )}

            {request.recipient?.phone && (
              <InfoItem
                icon={<Phone className="h-5 w-5" />}
                label="Recipient Phone"
                value={request.recipient.phone}
              />
            )}
          </div>

          {request.recipient?.location && (
            <div className="mt-4">
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Recipient Location"
                value={request.recipient.location}
              />
            </div>
          )}
        </div>

        {/* Additional Notes */}
        {request.notes && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-zinc-900">
                  Additional Notes
                </h2>

                <p className="text-sm text-zinc-500">
                  Additional information from the recipient
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-700">
                {request.notes}
              </p>
            </div>
          </div>
        )}

        {/* Request Timeline */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-zinc-900">
            Request Timeline
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-red-600" />

              <div>
                <p className="text-sm font-semibold text-zinc-800">
                  Request Created
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {formatDateTime(request.createdAt)}
                </p>
              </div>
            </div>

            {request.updatedAt !== request.createdAt && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-3 w-3 rounded-full bg-zinc-300" />

                <div>
                  <p className="text-sm font-semibold text-zinc-800">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {formatDateTime(request.updatedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Donation Action */}
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-red-900">
                Want to help this patient?
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-red-700">
                If you are available to donate blood for this request,
                you can continue with the donation process.
              </p>
            </div>

            {canDonate ? (
              <button
                type="button"
                disabled
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white opacity-60"
              >
                <Droplets className="h-4 w-4" />
                Donate Blood
              </button>
            ) : (
              <div className="rounded-xl border border-red-200 bg-white px-4 py-3 text-center text-sm font-medium text-red-700">
                Donation unavailable
              </div>
            )}
          </div>

          {request.verificationStatus !== "VERIFIED" && (
            <p className="mt-4 text-xs text-red-600">
              Donation will be available after this request is verified.
            </p>
          )}

          {request.status !== "PENDING" && (
            <p className="mt-4 text-xs text-red-600">
              This request is no longer accepting donations.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}