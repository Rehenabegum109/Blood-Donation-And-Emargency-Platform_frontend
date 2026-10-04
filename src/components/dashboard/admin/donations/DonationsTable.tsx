"use client";

import {
  Eye,
  Mail,
  Phone,
} from "lucide-react";

import type { IAdminDonation } from "@/src/types/admin.types";

import DonationStatusBadge from "./DonationStatusBadge";

interface DonationsTableProps {
  donations: IAdminDonation[];
  isLoading: boolean;
  onView: (donation: IAdminDonation) => void;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function DonationsTable({
  donations,
  isLoading,
  onView,
}: DonationsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-4 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!donations.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <span className="text-2xl">🩸</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          No donations found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          There are no donations matching the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Donor
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Blood
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Recipient
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Hospital
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Units
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {donations.map((donation) => (
              <tr
                key={donation.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {donation.donor.user.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Mail className="h-3.5 w-3.5" />

                      <span>
                        {donation.donor.user.email}
                      </span>
                    </div>

                    {donation.donor.user.phone && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <Phone className="h-3.5 w-3.5" />

                        <span>
                          {donation.donor.user.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-lg bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
                    {formatBloodGroup(
                      donation.donor.bloodGroup
                    )}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-slate-800">
                    {donation.bloodRequest.recipient.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {donation.bloodRequest.recipient.email}
                  </p>
                </td>

                <td className="max-w-[180px] px-5 py-4">
                  <p className="truncate font-medium text-slate-800">
                    {donation.bloodRequest.hospitalName}
                  </p>

                  {donation.bloodRequest.patientName && (
                    <p className="mt-1 truncate text-xs text-slate-500">
                      Patient:{" "}
                      {donation.bloodRequest.patientName}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span className="font-semibold text-slate-800">
                    {donation.units}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <DonationStatusBadge
                    status={donation.status}
                  />
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(
                    donation.donationDate ??
                      donation.createdAt
                  )}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onView(donation)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
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
    </div>
  );
}