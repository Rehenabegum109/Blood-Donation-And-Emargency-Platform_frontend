"use client";

import { Search, X } from "lucide-react";

import type {
  AccountStatus,
  AdminUserRole,
} from "@/src/types/admin.types";

interface UsersFiltersProps {
  searchTerm: string;
  role?: AdminUserRole;
  status?: AccountStatus;
  onSearchChange: (value: string) => void;
  onRoleChange: (value?: AdminUserRole) => void;
  onStatusChange: (value?: AccountStatus) => void;
  onClear: () => void;
}

export default function UsersFilters({
  searchTerm,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClear,
}: UsersFiltersProps) {
  const hasFilters =
    Boolean(searchTerm) ||
    Boolean(role) ||
    Boolean(status);

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_auto]">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by name or email..."
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Role */}
        <select
          value={role ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onRoleChange(
              value
                ? (value as AdminUserRole)
                : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="DONOR">Donor</option>
          <option value="RECIPIENT">Recipient</option>
        </select>

        {/* Status */}
        <select
          value={status ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onStatusChange(
              value
                ? (value as AccountStatus)
                : undefined
            );
          }}
          className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
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
    </div>
  );
}