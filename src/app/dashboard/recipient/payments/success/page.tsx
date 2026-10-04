"use client";

import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Heart,
} from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/40">
          {/* Top */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
              <CheckCircle2 className="h-11 w-11" />
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              Payment Successful!
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50 sm:text-base">
              Your bKash payment has been completed successfully.
              Thank you for completing your payment.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-emerald-900">
                    Payment Completed
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Your payment has been recorded successfully.
                    You can view your payment details from the
                    Payments section.
                  </p>
                </div>
              </div>
            </div>

            {/* BloodLink message */}
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
                  <Heart className="h-5 w-5 fill-current" />
                </div>

                <div>
                  <h2 className="font-bold text-zinc-900">
                    Thank you for using BloodLink
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    Your payment helps us keep the blood
                    donation and emergency assistance process
                    organized and transparent.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard/recipient/payments"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <FileText className="h-4 w-4" />
                View Payments
              </Link>

              <Link
                href="/dashboard/recipient/requests"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
              >
                My Blood Requests
              </Link>
            </div>

            {/* Dashboard */}
            <Link
              href="/dashboard/recipient"
              className="mt-3 flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-100 px-6 py-4 text-center">
            <p className="text-xs text-zinc-400">
              BloodLink • Blood Donation & Emergency Assistance
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}