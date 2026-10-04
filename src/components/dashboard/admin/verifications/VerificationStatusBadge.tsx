"use client";

import type { VerificationStatus } from "@/src/types/blood-request.types";

interface VerificationStatusBadgeProps {
  status: VerificationStatus;
}

export default function VerificationStatusBadge({
  status,
}: VerificationStatusBadgeProps) {
  const styles: Record<
    VerificationStatus,
    string
  > = {
    PENDING:
      "bg-amber-100 text-amber-700 border-amber-200",

    VERIFIED:
      "bg-green-100 text-green-700 border-green-200",

    REJECTED:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}