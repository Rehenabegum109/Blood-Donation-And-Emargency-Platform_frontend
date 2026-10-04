"use client";

import {
  CalendarDays,
  Eye,
  Hospital,
  MapPin,
  User,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

import RequestStatusBadge from "./RequestStatusBadge";

interface RequestsTableProps {
  requests: IBloodRequest[];
  onView: (request: IBloodRequest) => void;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

export default function RequestsTable({
  requests,
  onView,
}: RequestsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Desktop */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Request
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Recipient
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Hospital
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Required
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="transition hover:bg-red-50/30"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600">
                      {formatBloodGroup(
                        request.bloodGroup
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-zinc-900">
                        {request.units} unit
                        {request.units === 1
                          ? ""
                          : "s"}
                      </p>

                      <div className="mt-1">
                        <RequestStatusBadge
                          type="urgency"
                          value={request.urgency}
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="font-semibold text-zinc-800">
                    {request.recipient.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-400">
                    {request.patientName ||
                      "Patient name unavailable"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="max-w-[220px] truncate font-semibold text-zinc-800">
                    {request.hospitalName}
                  </p>

                  <p className="mt-1 max-w-[220px] truncate text-xs text-zinc-400">
                    {request.hospitalAddress ||
                      "Address not provided"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700">
                    <CalendarDays className="h-4 w-4 text-zinc-400" />
                    {formatDate(request.requiredDate)}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <div className="space-y-2">
                    <RequestStatusBadge
                      type="status"
                      value={request.status}
                    />

                    <div>
                      <RequestStatusBadge
                        type="verification"
                        value={request.verificationStatus}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onView(request)}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet */}
      <div className="divide-y divide-zinc-100 lg:hidden">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600">
                  {formatBloodGroup(
                    request.bloodGroup
                  )}
                </div>

                <div>
                  <p className="font-bold text-zinc-900">
                    {request.units} unit
                    {request.units === 1 ? "" : "s"}
                  </p>

                  <div className="mt-1">
                    <RequestStatusBadge
                      type="urgency"
                      value={request.urgency}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onView(request)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Eye className="h-4 w-4" />
                View
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                <div>
                  <p className="text-xs text-zinc-400">
                    Recipient
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {request.recipient.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hospital className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                <div>
                  <p className="text-xs text-zinc-400">
                    Hospital
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {request.hospitalName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                <div>
                  <p className="text-xs text-zinc-400">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {request.hospitalAddress ||
                      "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                <div>
                  <p className="text-xs text-zinc-400">
                    Required Date
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {formatDate(request.requiredDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <RequestStatusBadge
                type="status"
                value={request.status}
              />

              <RequestStatusBadge
                type="verification"
                value={request.verificationStatus}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}