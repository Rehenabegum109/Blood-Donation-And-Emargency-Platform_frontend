"use client";

import { Search, X } from "lucide-react";

import type {
  BloodGroup,
  BloodRequestStatus,
  UrgencyLevel,
  VerificationStatus,
} from "@/src/types/blood-request.types";

interface RequestsFiltersProps {
  search: string;
  bloodGroup?: BloodGroup;
  urgency?: UrgencyLevel;
  status?: BloodRequestStatus;
  verificationStatus?: VerificationStatus;

  onSearchChange: (value: string) => void;
  onBloodGroupChange: (value?: BloodGroup) => void;
  onUrgencyChange: (value?: UrgencyLevel) => void;
  onStatusChange: (value?: BloodRequestStatus) => void;
  onVerificationChange: (value?: VerificationStatus) => void;
  onClear: () => void;
}

export default function RequestsFilters({
  search,
  bloodGroup,
  urgency,
  status,
  verificationStatus,
  onSearchChange,
  onBloodGroupChange,
  onUrgencyChange,
  onStatusChange,
  onVerificationChange,
  onClear,
}: RequestsFiltersProps) {
  const hasFilters =
    Boolean(search) ||
    Boolean(bloodGroup) ||
    Boolean(urgency) ||
    Boolean(status) ||
    Boolean(verificationStatus);

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)_auto]">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search hospital, patient or recipient..."
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Blood Group */}
        <select
          value={bloodGroup ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onBloodGroupChange(
              value ? (value as BloodGroup) : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Blood Groups</option>
          <option value="A_POSITIVE">A+</option>
          <option value="A_NEGATIVE">A-</option>
          <option value="B_POSITIVE">B+</option>
          <option value="B_NEGATIVE">B-</option>
          <option value="AB_POSITIVE">AB+</option>
          <option value="AB_NEGATIVE">AB-</option>
          <option value="O_POSITIVE">O+</option>
          <option value="O_NEGATIVE">O-</option>
        </select>

        {/* Urgency */}
        <select
          value={urgency ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onUrgencyChange(
              value ? (value as UrgencyLevel) : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Urgency</option>
          <option value="LOW">Low</option>
          <option value="NORMAL">Normal</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>

        {/* Status */}
        <select
          value={status ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onStatusChange(
              value
                ? (value as BloodRequestStatus)
                : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>

        {/* Verification */}
        <select
          value={verificationStatus ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onVerificationChange(
              value
                ? (value as VerificationStatus)
                : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Verification</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* Clear */}
        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>

      {search && (
        <p className="mt-3 text-xs text-zinc-400">
          Search is applied to the currently loaded requests.
        </p>
      )}
    </div>
  );
}