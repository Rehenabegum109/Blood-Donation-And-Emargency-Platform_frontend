"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RequestsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function RequestsPagination({
  page,
  totalPages,
  onPageChange,
}: RequestsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="outline"
        isDisabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="border-red-100 hover:bg-red-50"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </Button>

      <div className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
        {page} / {totalPages}
      </div>

      <Button
        type="button"
        variant="outline"
        isDisabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border-red-100 hover:bg-red-50"
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}