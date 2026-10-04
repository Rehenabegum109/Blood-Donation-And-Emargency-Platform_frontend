"use client";

import { Filter, RotateCcw } from "lucide-react";

import type {
  BloodGroup,
  BloodRequestStatus,
  UrgencyLevel,
} from "@/src/types/blood-request.types";

interface DonorRequestFiltersProps {
  bloodGroup: string;
  urgency: string;
  status: string;
  onBloodGroupChange: (value: string) => void;
  onUrgencyChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

const bloodGroups: BloodGroup[] = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

const urgencyLevels: UrgencyLevel[] = [
  "LOW",
  "NORMAL",
  "HIGH",
  "CRITICAL",
];

const statuses: BloodRequestStatus[] = [
  "PENDING",
  "FULFILLED",
  "CANCELLED",
  "EXPIRED",
];

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", " +")
    .replace("_NEGATIVE", " -");
}

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export default function DonorRequestFilters({
  bloodGroup,
  urgency,
  status,
  onBloodGroupChange,
  onUrgencyChange,
  onStatusChange,
  onReset,
}: DonorRequestFiltersProps) {
  const hasFilters =
    Boolean(bloodGroup) ||
    Boolean(urgency) ||
    Boolean(status);

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-red-600" />

          <h2 className="text-sm font-semibold text-zinc-900">
            Filter Requests
          </h2>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-red-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Blood Group */}
        <div>
          <label
            htmlFor="donor-blood-group"
            className="mb-2 block text-xs font-medium text-zinc-600"
          >
            Blood Group
          </label>

          <select
            id="donor-blood-group"
            value={bloodGroup}
            onChange={(event) =>
              onBloodGroupChange(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All Blood Groups</option>

            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {formatBloodGroup(group)}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label
            htmlFor="donor-urgency"
            className="mb-2 block text-xs font-medium text-zinc-600"
          >
            Urgency
          </label>

          <select
            id="donor-urgency"
            value={urgency}
            onChange={(event) =>
              onUrgencyChange(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All Urgency Levels</option>

            {urgencyLevels.map((level) => (
              <option key={level} value={level}>
                {formatLabel(level)}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="donor-status"
            className="mb-2 block text-xs font-medium text-zinc-600"
          >
            Status
          </label>

          <select
            id="donor-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All Statuses</option>

            {statuses.map((item) => (
              <option key={item} value={item}>
                {formatLabel(item)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}