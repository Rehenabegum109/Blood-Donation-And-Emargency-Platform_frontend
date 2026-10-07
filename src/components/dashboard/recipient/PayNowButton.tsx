// "use client";

// import { useState } from "react";
// import { CreditCard, Loader2 } from "lucide-react";
// import { toast } from "sonner";

// import { useInitiatePayment } from "@/src/hooks/use-payment";

// interface PayNowButtonProps {
//   bloodRequestId: string;
//   disabled?: boolean;
// }

// export default function PayNowButton({
//   bloodRequestId,
//   disabled = false,
// }: PayNowButtonProps) {
//   const [isRedirecting, setIsRedirecting] = useState(false);

//   const initiatePayment = useInitiatePayment();

//   const handlePayment = async () => {
//     try {
//       setIsRedirecting(true);

//       const result = await initiatePayment.mutateAsync({
//         bloodRequestId,
//       });

//       const paymentUrl = result.data.paymentUrl;

//       if (!paymentUrl) {
//         throw new Error("Payment URL was not returned");
//       }

//       toast.success("Payment initiated successfully");

//       window.location.href = paymentUrl;
//     } catch (error) {
//       console.error("Payment initiation error:", error);

//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Unable to initiate payment"
//       );

//       setIsRedirecting(false);
//     }
//   };

//   const loading = initiatePayment.isPending || isRedirecting;

//   return (
//     <button
//       type="button"
//       onClick={handlePayment}
//       disabled={disabled || loading}
//       className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
//     >
//       {loading ? (
//         <>
//           <Loader2 className="h-4 w-4 animate-spin" />
//           Opening bKash...
//         </>
//       ) : (
//         <>
//           <CreditCard className="h-4 w-4" />
//           Pay Now
//         </>
//       )}
//     </button>
//   );
// }

"use client";

import { useState } from "react";
import {
  CreditCard,
  Loader2,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

import {
  useCreateStripeCheckoutSession,
  useInitiatePayment,
} from "@/src/hooks/use-payment";

interface PayNowButtonProps {
  bloodRequestId: string;
  disabled?: boolean;
}

type PaymentMethod = "BKASH" | "STRIPE";

export default function PayNowButton({
  bloodRequestId,
  disabled = false,
}: PayNowButtonProps) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("BKASH");

  const [isRedirecting, setIsRedirecting] =
    useState(false);

  const initiateBkashPayment =
    useInitiatePayment();

  const createStripeCheckout =
    useCreateStripeCheckoutSession();

  const handlePayment = async () => {
    if (!bloodRequestId) {
      toast.error("Blood request ID is missing");
      return;
    }

    try {
      setIsRedirecting(true);

      /* =========================
         bKash Payment
      ========================= */
      if (paymentMethod === "BKASH") {
        const result =
          await initiateBkashPayment.mutateAsync({
            bloodRequestId,
          });

        const paymentUrl =
          result?.data?.paymentUrl;

        if (!paymentUrl) {
          throw new Error(
            "bKash payment URL was not returned"
          );
        }

        toast.success(
          "bKash payment initiated successfully"
        );

        window.location.assign(paymentUrl);
        return;
      }

    
      const result =
        await createStripeCheckout.mutateAsync({
          bloodRequestId,
        });

      console.log(
        "Stripe checkout response:",
        result
      );

      const checkoutUrl =
        result?.data?.paymentUrl;

      console.log(
        "Stripe checkout URL:",
        checkoutUrl
      );

      if (!checkoutUrl) {
        throw new Error(
          "Stripe checkout URL was not returned"
        );
      }
     

      toast.success(
        "Stripe checkout initiated successfully"
      );

      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error(
        "Payment initiation error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to initiate payment"
      );

      setIsRedirecting(false);
    }
  };

  const loading =
    initiateBkashPayment.isPending ||
    createStripeCheckout.isPending ||
    isRedirecting;

  return (
    <div className="w-full space-y-3">
      {/* Payment Method Selection */}
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-700">
          Select Payment Method
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* bKash */}
          <button
            type="button"
            onClick={() =>
              setPaymentMethod("BKASH")
            }
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
              paymentMethod === "BKASH"
                ? "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Smartphone className="h-4 w-4" />

            <span>bKash</span>
          </button>

          {/* Stripe */}
          <button
            type="button"
            onClick={() =>
              setPaymentMethod("STRIPE")
            }
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
              paymentMethod === "STRIPE"
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <CreditCard className="h-4 w-4" />

            <span>Stripe</span>
          </button>
        </div>
      </div>

      {/* Pay Button */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={disabled || loading}
        className="inline-flex w-full min-w-32 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />

            <span>
              {paymentMethod === "BKASH"
                ? "Opening bKash..."
                : "Opening Stripe..."}
            </span>
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />

            <span>
              {paymentMethod === "BKASH"
                ? "Pay with bKash"
                : "Pay with Stripe"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}