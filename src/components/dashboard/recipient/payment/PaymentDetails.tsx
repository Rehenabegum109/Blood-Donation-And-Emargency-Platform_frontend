"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Droplets,
  FileText,
  Hospital,
  MapPin,
  ReceiptText,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import type { IPayment } from "@/src/types/payment.types";

interface PaymentDetailsProps {
  payment: IPayment;
}

function formatDate(
  date?: string | null
): string {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(
  amount: number,
  currency: string
): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export default function PaymentDetails({
  payment,
}: PaymentDetailsProps) {
  const bloodRequest = payment.bloodRequest;

  const receiptUrl = payment.receiptPdfUrl;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/recipient/payments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-red-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Payments
      </Link>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <ReceiptText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Payment Details
                </h1>

                <p className="mt-1 break-all text-xs text-slate-500">
                  Payment ID: {payment.id}
                </p>
              </div>
            </div>

            <PaymentStatusBadge
              status={payment.status}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Amount */}
          <div className="rounded-2xl bg-slate-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              Payment Amount
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {formatAmount(
                payment.amount,
                payment.currency
              )}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Payment Method:{" "}
              <span className="font-semibold text-slate-700">
                {payment.method}
              </span>
            </p>
          </div>

          {/* Transaction Information */}
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Transaction Information
            </h2>

            <div className="grid gap-5 rounded-2xl border border-slate-100 p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {payment.id}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    bKash Payment ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {payment.bkashPaymentId ??
                      "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Transaction ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {payment.transactionId ??
                      "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {payment.method}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Created At
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(
                      payment.createdAt
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Paid At
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(
                      payment.paidAt
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Currency
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {payment.currency}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment Status
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {payment.status}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Blood Request Information */}
          <section className="mt-8 border-t border-slate-100 pt-8">
            <div className="mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-red-600" />

              <h2 className="text-lg font-semibold text-slate-900">
                Blood Request Information
              </h2>
            </div>

            <div className="grid gap-5 rounded-2xl border border-slate-100 p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Blood Group
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.bloodGroup}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Units
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.units} unit
                    {bloodRequest.units !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hospital className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Hospital
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.hospitalName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Hospital Address
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.hospitalAddress ??
                      "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Required Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(
                      bloodRequest.requiredDate
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Urgency
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.urgency}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Request Status
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {bloodRequest.status}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Blood Request ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {bloodRequest.id}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Receipt */}
          {receiptUrl && (
            <section className="mt-8 border-t border-slate-100 pt-8">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-emerald-800">
                        Payment Receipt
                      </h3>

                      <p className="mt-1 text-sm text-emerald-700">
                        Your payment receipt is
                        available.
                      </p>
                    </div>
                  </div>

                  <a
                    href={receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <FileText className="h-4 w-4" />
                    View Receipt
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* PAID */}
          {payment.status === "PAID" && (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                <div>
                  <h3 className="font-semibold text-emerald-800">
                    Payment Completed
                  </h3>

                  <p className="mt-1 text-sm text-emerald-700">
                    Your payment has been
                    successfully completed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PENDING */}
          {payment.status === "PENDING" && (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <div>
                  <h3 className="font-semibold text-amber-800">
                    Payment Pending
                  </h3>

                  <p className="mt-1 text-sm text-amber-700">
                    This payment has not been
                    completed yet.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FAILED */}
          {payment.status === "FAILED" && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <div>
                  <h3 className="font-semibold text-red-800">
                    Payment Failed
                  </h3>

                  <p className="mt-1 text-sm text-red-700">
                    This payment could not be
                    completed. You may try the
                    payment again from the blood
                    request page.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CANCELLED */}
          {payment.status === "CANCELLED" && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Payment Cancelled
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    This payment was cancelled.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REFUNDED */}
          {payment.status === "REFUNDED" && (
            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <h3 className="font-semibold text-blue-800">
                    Payment Refunded
                  </h3>

                  <p className="mt-1 text-sm text-blue-700">
                    This payment has been
                    refunded.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}