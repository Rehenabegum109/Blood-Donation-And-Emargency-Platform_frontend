"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  Ban,
} from "lucide-react";

import type { PaymentStatus } from "@/src/types/payment.types";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const config = {
    PENDING: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 ring-amber-200",
      icon: Clock3,
    },
    PAID: {
      label: "Paid",
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-200",
      icon: CheckCircle2,
    },
    FAILED: {
      label: "Failed",
      className:
        "bg-red-50 text-red-700 ring-red-200",
      icon: XCircle,
    },
    CANCELLED: {
      label: "Cancelled",
      className:
        "bg-slate-100 text-slate-600 ring-slate-200",
      icon: Ban,
    },
    REFUNDED: {
      label: "Refunded",
      className:
        "bg-blue-50 text-blue-700 ring-blue-200",
      icon: RotateCcw,
    },
  } satisfies Record<
    PaymentStatus,
    {
      label: string;
      className: string;
      icon: typeof Clock3;
    }
  >;

  const current = config[status];
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${current.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {current.label}
    </span>
  );
}