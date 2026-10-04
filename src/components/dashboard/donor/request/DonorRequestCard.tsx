"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  UserRound,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface DonorRequestCardProps {
  request: IBloodRequest;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", " +")
    .replace("_NEGATIVE", " -");
}

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getUrgencyClass(urgency: string) {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";

    case "HIGH":
      return "bg-orange-100 text-orange-700";

    case "NORMAL":
      return "bg-blue-100 text-blue-700";

    case "LOW":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-700";

    case "FULFILLED":
      return "bg-emerald-100 text-emerald-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    case "EXPIRED":
      return "bg-zinc-100 text-zinc-600";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export default function DonorRequestCard({
  request,
}: DonorRequestCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md">
      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Droplets className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-zinc-900">
                {formatBloodGroup(request.bloodGroup)}
              </h2>

              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                {request.units}{" "}
                {request.units === 1 ? "unit" : "units"}
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">
              Request ID: {request.id.slice(0, 8)}...
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getUrgencyClass(
              request.urgency
            )}`}
          >
            {formatLabel(request.urgency)}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
              request.status
            )}`}
          >
            {formatLabel(request.status)}
          </span>
        </div>
      </div>

      {/* Information */}
      <div className="mt-5 grid gap-4 border-t border-zinc-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-3">
          <Hospital className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

          <div className="min-w-0">
            <p className="text-xs text-zinc-400">Hospital</p>

            <p className="mt-1 truncate text-sm font-medium text-zinc-800">
              {request.hospitalName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

          <div>
            <p className="text-xs text-zinc-400">Required Date</p>

            <p className="mt-1 text-sm font-medium text-zinc-800">
              {formatDate(request.requiredDate)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

          <div>
            <p className="text-xs text-zinc-400">Urgency</p>

            <p className="mt-1 text-sm font-medium text-zinc-800">
              {formatLabel(request.urgency)}
            </p>
          </div>
        </div>

        {request.hospitalAddress && (
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

            <div className="min-w-0">
              <p className="text-xs text-zinc-400">
                Hospital Address
              </p>

              <p className="mt-1 truncate text-sm font-medium text-zinc-800">
                {request.hospitalAddress}
              </p>
            </div>
          </div>
        )}

        {request.patientName && (
          <div className="flex items-start gap-3">
            <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

            <div>
              <p className="text-xs text-zinc-400">
                Patient
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-800">
                {request.patientName}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          Posted{" "}
          {formatDate(request.createdAt)}
        </p>

        <Link
          href={`/dashboard/donor/requests/${request.id}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}