"use client";

import { CreditCard, Loader2 } from "lucide-react";

import PaymentCard from "./PaymentCard";

import type { IPayment } from "@/src/types/payment.types";

interface PaymentHistoryProps {
  payments: IPayment[];
  isLoading: boolean;
  isError: boolean;
}

export default function PaymentHistory({
  payments,
  isLoading,
  isError,
}: PaymentHistoryProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading payments...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">
          Failed to load payment history.
        </p>

        <p className="mt-1 text-sm text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <CreditCard className="h-6 w-6 text-slate-400" />
        </div>

        <h3 className="mt-4 font-semibold text-slate-900">
          No payments yet
        </h3>

        <p className="mt-1 max-w-md text-sm text-slate-500">
          Your blood request payments will
          appear here once you make a payment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.id}
          payment={payment}
        />
      ))}
    </div>
  );
}