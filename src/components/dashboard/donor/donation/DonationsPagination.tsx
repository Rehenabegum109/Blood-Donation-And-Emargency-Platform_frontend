"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DonationsPaginationProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function DonationsPagination({
  page,
  totalPage,
  onPageChange,
}: DonationsPaginationProps) {
  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <div className="flex h-10 items-center gap-1 rounded-lg border border-zinc-200 bg-white px-4 text-sm">
        <span className="font-semibold text-red-600">
          {page}
        </span>

        <span className="text-zinc-400">
          / {totalPage}
        </span>
      </div>

      <button
        type="button"
        disabled={page >= totalPage}
        onClick={() =>
          onPageChange(Math.min(page + 1, totalPage))
        }
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}