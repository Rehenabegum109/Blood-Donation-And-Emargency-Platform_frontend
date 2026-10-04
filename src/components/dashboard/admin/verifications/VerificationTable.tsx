"use client";

import {
  Eye,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

import VerificationStatusBadge from "./VerificationStatusBadge";

interface VerificationTableProps {
  requests: IBloodRequest[];
  isLoading: boolean;
  isVerifying: boolean;
  verifyingId?: string;
  onView: (request: IBloodRequest) => void;
  onVerify: (id: string) => void;
  onReject: (request: IBloodRequest) => void;
}

export default function VerificationTable({
  requests,
  isLoading,
  isVerifying,
  verifyingId,
  onView,
  onVerify,
  onReject,
}: VerificationTableProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <Loader2 className="h-7 w-7 animate-spin text-red-500" />
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center">
        <CheckCircle2 className="mb-3 h-12 w-12 text-green-500" />

        <h3 className="text-lg font-semibold text-slate-800">
          No pending requests
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          There are no blood requests waiting for verification.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Patient
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Blood
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Hospital
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Urgency
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Required Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Verification
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => {
              const isCurrentVerifying =
                isVerifying &&
                verifyingId === request.id;

              return (
                <tr
                  key={request.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        {request.patientName ||
                          "N/A"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {request.recipient?.name ||
                          "Unknown"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-600">
                      {request.bloodGroup.replace(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  <td className="max-w-[200px] px-5 py-4">
                    <p className="truncate font-medium text-slate-700">
                      {request.hospitalName}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {request.hospitalAddress ||
                        "Address unavailable"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-semibold ${
                        request.urgency ===
                        "CRITICAL"
                          ? "text-red-600"
                          : request.urgency ===
                              "HIGH"
                            ? "text-orange-600"
                            : "text-slate-600"
                      }`}
                    >
                      {request.urgency}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {new Date(
                      request.requiredDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <VerificationStatusBadge
                      status={
                        request.verificationStatus
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onView(request)
                        }
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>

                      <button
                        type="button"
                        disabled={
                          isCurrentVerifying
                        }
                        onClick={() =>
                          onVerify(request.id)
                        }
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isCurrentVerifying ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}

                        Verify
                      </button>

                      <button
                        type="button"
                        disabled={
                          isCurrentVerifying
                        }
                        onClick={() =>
                          onReject(request)
                        }
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}