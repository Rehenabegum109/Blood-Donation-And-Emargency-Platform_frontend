import type { AdminDonationStatus } from "@/src/types/admin.types";

interface DonationStatusBadgeProps {
  status: AdminDonationStatus;
}

const statusConfig: Record<
  AdminDonationStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },

  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },

  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 ring-1 ring-red-200",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  },
};

export default function DonationStatusBadge({
  status,
}: DonationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}