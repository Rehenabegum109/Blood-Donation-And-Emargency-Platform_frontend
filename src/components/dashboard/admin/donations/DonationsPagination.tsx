"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DonationsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function DonationsPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: DonationsPaginationProps) {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-slate-700">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700">
          {total}
        </span>{" "}
        donations
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-red-600 px-3 text-sm font-semibold text-white">
          {page}
        </div>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}