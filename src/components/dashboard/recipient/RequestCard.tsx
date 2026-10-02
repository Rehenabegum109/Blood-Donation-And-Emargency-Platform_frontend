"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Droplets,
  Edit3,
  Hospital,
  MapPin,
  Trash2,
  UserRound,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface RequestCardProps {
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
    month: "short",
    day: "numeric",
  });
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getUrgencyClass(urgency: string) {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-700 ring-red-200";

    case "HIGH":
      return "bg-orange-100 text-orange-700 ring-orange-200";

    case "LOW":
      return "bg-blue-100 text-blue-700 ring-blue-200";

    default:
      return "bg-yellow-100 text-yellow-700 ring-yellow-200";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "FULFILLED":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";

    case "CANCELLED":
      return "bg-zinc-100 text-zinc-600 ring-zinc-200";

    case "EXPIRED":
      return "bg-slate-100 text-slate-600 ring-slate-200";

    default:
      return "bg-red-100 text-red-700 ring-red-200";
  }
}

function getVerificationClass(status: string) {
  switch (status) {
    case "VERIFIED":
      return "bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-yellow-50 text-yellow-700";
  }
}

export default function RequestCard({
  request,
}: RequestCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-100/40">
      {/* Header */}
      <div className="border-b border-zinc-100 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Blood Group */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Droplets className="h-7 w-7 fill-red-600" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Blood Group
              </p>

              <h2 className="mt-1 text-2xl font-black text-red-600">
                {formatBloodGroup(request.bloodGroup)}
              </h2>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${getUrgencyClass(
                request.urgency
              )}`}
            >
              {formatStatus(request.urgency)}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${getStatusClass(
                request.status
              )}`}
            >
              {formatStatus(request.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Request Information */}
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        {/* Units */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-red-600">
            <Droplets className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-400">
              Required Units
            </p>

            <p className="mt-1 text-sm font-bold text-zinc-800">
              {request.units}{" "}
              {request.units === 1 ? "Unit" : "Units"}
            </p>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-red-600">
            <Hospital className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-400">
              Hospital
            </p>

            <p className="mt-1 truncate text-sm font-bold text-zinc-800">
              {request.hospitalName}
            </p>
          </div>
        </div>

        {/* Required Date */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-red-600">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-400">
              Required Date
            </p>

            <p className="mt-1 text-sm font-bold text-zinc-800">
              {formatDate(request.requiredDate)}
            </p>
          </div>
        </div>

        {/* Patient */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-red-600">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-400">
              Patient
            </p>

            <p className="mt-1 truncate text-sm font-bold text-zinc-800">
              {request.patientName || "Not provided"}
            </p>
          </div>
        </div>

        {/* Hospital Address */}
        {request.hospitalAddress && (
          <div className="flex items-start gap-3 sm:col-span-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-red-600">
              <MapPin className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-zinc-400">
                Hospital Address
              </p>

              <p className="mt-1 text-sm font-semibold leading-6 text-zinc-700">
                {request.hospitalAddress}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Verification */}
      <div className="mx-5 mb-5 flex flex-col gap-3 rounded-2xl bg-zinc-50 p-4 sm:mx-6 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-zinc-400" />

          <span className="text-xs font-medium text-zinc-500">
            Verification
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getVerificationClass(
              request.verificationStatus
            )}`}
          >
            {formatStatus(request.verificationStatus)}
          </span>
        </div>

        <p className="text-xs text-zinc-400">
          Created {formatDate(request.createdAt)}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col gap-3 border-t border-zinc-100 bg-zinc-50/70 p-5 sm:p-6">
        {/* Request ID */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">
              Request ID
            </p>

            <p className="mt-1 max-w-45 truncate font-mono text-xs font-semibold text-zinc-600">
              {request.id}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {/* View Details */}
          <Link
            href={`/dashboard/recipient/requests/${request.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Edit */}
          <Link
            href={`/dashboard/recipient/requests/${request.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Link>

          {/* Delete */}
          <Link
            href={`/dashboard/recipient/requests/${request.id}/delete`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Link>
        </div>
      </div>
    </article>
  );
}