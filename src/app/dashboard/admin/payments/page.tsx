"use client";

import { useState } from "react";
import {
  CreditCard,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { IGetAllPaymentsParams, PaymentStatus } from "@/src/types/payment.types";
import { useGetAllPayments } from "@/src/hooks/use-payment";




const statusOptions: PaymentStatus[] = [
  "PENDING",
  "PAID",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
];

const statusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-600",
  REFUNDED: "bg-purple-100 text-purple-700",
};

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [status, setStatus] = useState<PaymentStatus | "">("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const params: IGetAllPaymentsParams = {
    page,
    limit,
    method: "BKASH",
    ...(recipientEmail
      ? { recipientEmail }
      : {}),
    ...(status ? { status } : {}),
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetAllPayments(params);

  const payments = data?.data ?? [];
  const meta = data?.meta;

  const handleSearch = () => {
    setPage(1);
    setRecipientEmail(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    setRecipientEmail("");
    setStatus("");
    setPage(1);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md">
            <CreditCard className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payments
            </h1>

            <p className="text-sm text-gray-500">
              Manage and monitor all payments
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Recipient Email
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search recipient email..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              />
            </div>
          </div>

          {/* Status */}
          <div className="w-full lg:w-52">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => {
                setStatus(
                  e.target.value as PaymentStatus | ""
                );
                setPage(1);
              }}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            >
              <option value="">All Status</option>

              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSearch}
              className="h-11 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 text-sm font-semibold text-white transition hover:from-red-600 hover:to-rose-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-rose-100 bg-white">
          <div className="flex items-center gap-2 text-rose-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading payments...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">
            Failed to load payments.
          </p>

          <p className="mt-1 text-sm text-red-500">
            Please try again.
          </p>
        </div>
      )}

      {/* Payment Table */}
      {!isLoading && !isError && (
        <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                All Payments
              </h2>

              <p className="text-xs text-gray-500">
                {meta?.total ?? 0} total payment
                {(meta?.total ?? 0) !== 1 ? "s" : ""}
              </p>
            </div>

            {isFetching && (
              <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
            )}
          </div>

          {payments.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center text-center">
              <div>
                <CreditCard className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                <p className="font-medium text-gray-600">
                  No payments found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try changing your search or filter.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-rose-50/50 text-left">
                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Recipient
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Blood Request
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Method
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Transaction
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-gray-50 hover:bg-rose-50/30"
                      >
                        {/* Recipient */}
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">
                            {payment.bloodRequest.recipient?.name ??
                              "Unknown"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {payment.bloodRequest.recipient?.email ??
                              "No email"}
                          </p>
                        </td>

                        {/* Blood Request */}
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-800">
                            {payment.bloodRequest.bloodGroup}
                          </p>

                          <p className="text-xs text-gray-500">
                            {payment.bloodRequest.units} unit
                            {payment.bloodRequest.units !== 1
                              ? "s"
                              : ""}
                            {" • "}
                            {payment.bloodRequest.hospitalName}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900">
                            {formatAmount(payment.amount)}
                          </p>

                          <p className="text-xs text-gray-400">
                            {payment.currency}
                          </p>
                        </td>

                        {/* Method */}
                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600">
                            {payment.method}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                              statusStyles[payment.status]
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        {/* Transaction */}
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs text-gray-600">
                            {payment.transactionId ?? "—"}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                          {formatDate(payment.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                <p className="text-sm text-gray-500">
                  Page{" "}
                  <span className="font-medium text-gray-800">
                    {meta?.page ?? page}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-800">
                    {meta?.totalPages ?? 1}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={
                      page <= 1 || isFetching
                    }
                    onClick={() =>
                      setPage((prev) => prev - 1)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >= (meta?.totalPages ?? 1) ||
                      isFetching
                    }
                    onClick={() =>
                      setPage((prev) => prev + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}