"use client";

import type {
  AdminBloodGroup,
  AdminDonationStatus,
} from "@/src/types/admin.types";

interface DonationsFiltersProps {
  status: AdminDonationStatus | "";
  bloodGroup: AdminBloodGroup | "";
  onStatusChange: (
    value: AdminDonationStatus | ""
  ) => void;
  onBloodGroupChange: (
    value: AdminBloodGroup | ""
  ) => void;
  onReset: () => void;
}

const bloodGroups: AdminBloodGroup[] = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

const statuses: AdminDonationStatus[] = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "COMPLETED",
  "CANCELLED",
];

function formatBloodGroup(value: string) {
  return value.replace("_POSITIVE", "+").replace(
    "_NEGATIVE",
    "-"
  );
}

export default function DonationsFilters({
  status,
  bloodGroup,
  onStatusChange,
  onBloodGroupChange,
  onReset,
}: DonationsFiltersProps) {
  const hasFilter = Boolean(status || bloodGroup);

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="donation-status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Donation Status
          </label>

          <select
            id="donation-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as
                  | AdminDonationStatus
                  | ""
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All statuses</option>

            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="donation-blood-group"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Blood Group
          </label>

          <select
            id="donation-blood-group"
            value={bloodGroup}
            onChange={(event) =>
              onBloodGroupChange(
                event.target.value as
                  | AdminBloodGroup
                  | ""
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All blood groups</option>

            {bloodGroups.map((item) => (
              <option key={item} value={item}>
                {formatBloodGroup(item)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasFilter}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}