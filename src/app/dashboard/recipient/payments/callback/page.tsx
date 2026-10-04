"use client";

import { useEffect } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useExecuteBkashPayment } from "@/src/hooks/use-payment";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();

  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");

  const executePayment = useExecuteBkashPayment();

  useEffect(() => {
    if (!paymentID) {
      return;
    }

    if (status && status !== "success") {
      return;
    }

    executePayment.mutate(paymentID, {
      onSuccess: (response) => {
        const transactionStatus =
          typeof response.data === "object" &&
          response.data !== null &&
          "transactionStatus" in response.data
            ? response.data.transactionStatus
            : undefined;

        if (
          transactionStatus &&
          transactionStatus !== "Completed"
        ) {
          toast.error("Payment was not completed");
          return;
        }

        toast.success("Payment completed successfully");
      },

      onError: (error) => {
        console.error(
          "Payment execution error:",
          error
        );

        toast.error("Payment could not be completed");
      },
    });
  }, [paymentID, status]);

  /*
   * No payment ID
   */
  if (!paymentID) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-9 w-9 text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            Invalid Payment
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Payment information was not found.
          </p>

          <Link
            href="/dashboard/recipient/requests"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Back to Blood Requests
          </Link>
        </div>
      </div>
    );
  }

  /*
   * bKash cancelled / failed
   */
  if (status && status !== "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-9 w-9 text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            Payment Cancelled
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Your bKash payment was cancelled or failed.
            You can try again.
          </p>

          <Link
            href="/dashboard/recipient/requests"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Back to Blood Requests
          </Link>
        </div>
      </div>
    );
  }

  /*
   * Payment execution is running
   */
  if (executePayment.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            Processing Payment
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Please wait while we confirm your bKash
            payment.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Payment execution failed
   */
  if (executePayment.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-9 w-9 text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            Payment Failed
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We could not complete your payment. Please
            try again.
          </p>

          <Link
            href="/dashboard/recipient/requests"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Back to Blood Requests
          </Link>
        </div>
      </div>
    );
  }

  /*
   * Payment successful
   */
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-zinc-900">
          Payment Successful
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Your bKash payment has been completed
          successfully.
        </p>

        <div className="mt-6 grid gap-3">
          <Link
            href="/dashboard/recipient/payments"
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            View Payments
          </Link>

          <Link
            href="/dashboard/recipient/requests"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
          >
            My Blood Requests
          </Link>
        </div>
      </div>
    </div>
  );
}