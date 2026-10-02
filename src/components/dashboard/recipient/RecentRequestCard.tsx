import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Hospital,
  MapPin,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface RecentRequestCardProps {
  request: IBloodRequest;
}

const urgencyStyles: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-600",
  NORMAL: "bg-blue-50 text-blue-600",
  HIGH: "bg-orange-50 text-orange-600",
  CRITICAL: "bg-red-50 text-red-600",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700",
  FULFILLED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-zinc-100 text-zinc-600",
  EXPIRED: "bg-red-50 text-red-600",
};

function formatBloodGroup(value: string) {
  return value.replace("_", " ");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentRequestCard({
  request,
}: RecentRequestCardProps) {
  return (
    <div className="group rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600">
            {formatBloodGroup(request.bloodGroup)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-zinc-900">
                {request.patientName || "Blood Request"}
              </h3>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  urgencyStyles[request.urgency] ||
                  "bg-zinc-100 text-zinc-600"
                }`}
              >
                {request.urgency}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  statusStyles[request.status] ||
                  "bg-zinc-100 text-zinc-600"
                }`}
              >
                {request.status}
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-1.5 text-xs text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-4">
              <span className="flex items-center gap-1.5">
                <Hospital className="h-3.5 w-3.5 text-red-500" />
                {request.hospitalName}
              </span>

              {request.hospitalAddress && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  {request.hospitalAddress}
                </span>
              )}

              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-red-500" />
                {formatDate(request.requiredDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <Link
          href={`/dashboard/recipient/requests/${request.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
        >
          View
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}