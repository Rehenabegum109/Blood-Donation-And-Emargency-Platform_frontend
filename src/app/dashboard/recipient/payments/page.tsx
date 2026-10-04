"use client";

import {
  CreditCard,
  RefreshCw,
} from "lucide-react";

import PaymentHistory from "@/src/components/dashboard/recipient/payment/PaymentHistory";
import { useGetMyPayments } from "@/src/hooks/use-payment";

export default function RecipientPaymentsPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetMyPayments({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const payments = data?.data ?? [];

  const paidPayments = payments.filter(
    (payment) => payment.status === "PAID"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "FAILED"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  My Payments
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View your blood request payment history and
                  transaction details.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                isFetching ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>
        </div>

        {/* Summary */}
        {!isLoading && !isError && (
          <div className="mb-6 grid gap-4 sm:grid-cols-4">

            {/* Total */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {data?.meta.total ?? 0}
              </p>
            </div>

            {/* Paid */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Paid Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {paidPayments}
              </p>
            </div>

            {/* Pending */}
            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {pendingPayments}
              </p>
            </div>

            {/* Failed */}
            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Failed Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {failedPayments}
              </p>
            </div>
          </div>
        )}

        {/* Payment list */}
        <PaymentHistory
          payments={payments}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}