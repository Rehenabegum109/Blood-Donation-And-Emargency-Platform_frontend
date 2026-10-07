// "use client";

// import Link from "next/link";
// import {
//   CalendarDays,
//   ChevronRight,
//   CreditCard,
//   Droplets,
//   FileText,
//   Hospital,
//   ReceiptText,
// } from "lucide-react";

// import PaymentStatusBadge from "./PaymentStatusBadge";

// import type { IPayment } from "@/src/types/payment.types";

// interface PaymentCardProps {
//   payment: IPayment;
// }

// function formatDate(date: string) {
//   return new Date(date).toLocaleDateString(
//     "en-BD",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     }
//   );
// }

// function formatAmount(
//   amount: number,
//   currency: string
// ) {
//   return `${currency} ${amount.toLocaleString()}`;
// }

// export default function PaymentCard({
//   payment,
// }: PaymentCardProps) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div className="flex items-start gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
//             <CreditCard className="h-5 w-5" />
//           </div>

//           <div>
//             <h3 className="font-semibold text-slate-900">
//               Blood Request Payment
//             </h3>

//             <p className="mt-1 text-xs text-slate-500">
//               Payment ID: {payment.id}
//             </p>
//           </div>
//         </div>

//         <PaymentStatusBadge
//           status={payment.status}
//         />
//       </div>

//       {/* Amount */}
//       <div className="mt-5 rounded-xl bg-slate-50 p-4">
//         <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//           Amount
//         </p>

//         <p className="mt-1 text-2xl font-bold text-slate-900">
//           {formatAmount(
//             payment.amount,
//             payment.currency
//           )}
//         </p>
//       </div>

//       {/* Request info */}
//       <div className="mt-5 grid gap-4 sm:grid-cols-2">
//         <div className="flex items-start gap-3">
//           <Droplets className="mt-0.5 h-4 w-4 text-red-500" />

//           <div>
//             <p className="text-xs text-slate-500">
//               Blood Group
//             </p>

//             <p className="mt-1 text-sm font-semibold text-slate-800">
//               {payment.bloodRequest.bloodGroup}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <Droplets className="mt-0.5 h-4 w-4 text-red-500" />

//           <div>
//             <p className="text-xs text-slate-500">
//               Units
//             </p>

//             <p className="mt-1 text-sm font-semibold text-slate-800">
//               {payment.bloodRequest.units} unit
//               {payment.bloodRequest.units !== 1
//                 ? "s"
//                 : ""}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <Hospital className="mt-0.5 h-4 w-4 text-red-500" />

//           <div>
//             <p className="text-xs text-slate-500">
//               Hospital
//             </p>

//             <p className="mt-1 text-sm font-semibold text-slate-800">
//               {payment.bloodRequest.hospitalName}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <CalendarDays className="mt-0.5 h-4 w-4 text-red-500" />

//           <div>
//             <p className="text-xs text-slate-500">
//               Required Date
//             </p>

//             <p className="mt-1 text-sm font-semibold text-slate-800">
//               {formatDate(
//                 payment.bloodRequest.requiredDate
//               )}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Transaction */}
//       <div className="mt-5 border-t border-slate-100 pt-4">
//         <div className="grid gap-3 text-sm sm:grid-cols-2">
//           <div>
//             <p className="text-xs text-slate-500">
//               Payment Method
//             </p>

//             <p className="mt-1 font-medium text-slate-800">
//               {payment.method}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-slate-500">
//               Created
//             </p>

//             <p className="mt-1 font-medium text-slate-800">
//               {formatDate(payment.createdAt)}
//             </p>
//           </div>

//           {payment.transactionId && (
//             <div>
//               <p className="text-xs text-slate-500">
//                 Transaction ID
//               </p>

//               <p className="mt-1 break-all font-medium text-slate-800">
//                 {payment.transactionId}
//               </p>
//             </div>
//           )}

//           {payment.paidAt && (
//             <div>
//               <p className="text-xs text-slate-500">
//                 Paid At
//               </p>

//               <p className="mt-1 font-medium text-slate-800">
//                 {formatDate(payment.paidAt)}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
//         <div className="flex items-center gap-2 text-xs text-slate-500">
//           <FileText className="h-4 w-4" />

//           <span>
//             Request ID:{" "}
//             {payment.bloodRequestId}
//           </span>
//         </div>

//         <Link
//           href={`/dashboard/recipient/payments/${payment.id}`}
//           className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
//         >
//           <ReceiptText className="h-4 w-4" />
//           View Details
//           <ChevronRight className="h-4 w-4" />
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  CreditCard,
  Droplets,
  FileText,
  Hospital,
  Loader2,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import PaymentStatusBadge from "./PaymentStatusBadge";

import { useCreateStripeCheckoutSession } from "@/src/hooks/use-payment";
import type { IPayment } from "@/src/types/payment.types";

interface PaymentCardProps {
  payment: IPayment;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

export default function PaymentCard({ payment }: PaymentCardProps) {
  const stripeCheckoutMutation = useCreateStripeCheckoutSession();

  const handleStripePayment = async () => {
    try {
      const response = await stripeCheckoutMutation.mutateAsync({
        bloodRequestId: payment.bloodRequestId,
      });

      const checkoutUrl = response.data?.paymentUrl;

      if (!checkoutUrl) {
        toast.error("Stripe checkout URL was not returned.");
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start Stripe payment.";

      toast.error(message);
    }
  };

  const canPayWithStripe =
    payment.method === "STRIPE" &&
    (payment.status === "PENDING" ||
      payment.status === "FAILED" ||
      payment.status === "CANCELLED");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Blood Request Payment
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Payment ID: {payment.id}
            </p>
          </div>
        </div>

        <PaymentStatusBadge status={payment.status} />
      </div>

      {/* Amount */}
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Amount
        </p>

        <p className="mt-1 text-2xl font-bold text-slate-900">
          {formatAmount(payment.amount, payment.currency)}
        </p>
      </div>

      {/* Request info */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Droplets className="mt-0.5 h-4 w-4 text-red-500" />

          <div>
            <p className="text-xs text-slate-500">Blood Group</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {payment.bloodRequest.bloodGroup}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Droplets className="mt-0.5 h-4 w-4 text-red-500" />

          <div>
            <p className="text-xs text-slate-500">Units</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {payment.bloodRequest.units} unit
              {payment.bloodRequest.units !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Hospital className="mt-0.5 h-4 w-4 text-red-500" />

          <div>
            <p className="text-xs text-slate-500">Hospital</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {payment.bloodRequest.hospitalName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 text-red-500" />

          <div>
            <p className="text-xs text-slate-500">Required Date</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(payment.bloodRequest.requiredDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Payment Method</p>

            <p className="mt-1 font-medium text-slate-800">
              {payment.method}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Created</p>

            <p className="mt-1 font-medium text-slate-800">
              {formatDate(payment.createdAt)}
            </p>
          </div>

          {payment.transactionId && (
            <div>
              <p className="text-xs text-slate-500">Transaction ID</p>

              <p className="mt-1 break-all font-medium text-slate-800">
                {payment.transactionId}
              </p>
            </div>
          )}

          {payment.paidAt && (
            <div>
              <p className="text-xs text-slate-500">Paid At</p>

              <p className="mt-1 font-medium text-slate-800">
                {formatDate(payment.paidAt)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stripe Payment Action */}
      {canPayWithStripe && (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50/60 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Complete your payment
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Continue securely with Stripe Test Mode.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStripePayment}
              disabled={stripeCheckoutMutation.isPending}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {stripeCheckoutMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay with Stripe
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FileText className="h-4 w-4 shrink-0" />

          <span className="break-all">
            Request ID: {payment.bloodRequestId}
          </span>
        </div>

        <Link
          href={`/dashboard/recipient/payments/${payment.id}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <ReceiptText className="h-4 w-4" />
          View Details
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
