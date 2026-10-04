"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { use } from "react";

import PaymentDetails from "@/src/components/dashboard/recipient/payment/PaymentDetails";
import { useGetSinglePayment } from "@/src/hooks/use-payment";

interface PaymentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { id } = use(params);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetSinglePayment(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading payment details...</span>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    console.error(
      "Payment details error:",
      error
    );

    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Payment Not Found
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Unable to load the payment details.
            Please try again later.
          </p>

          <Link
            href="/dashboard/recipient/payments"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PaymentDetails payment={data.data} />
  );
}