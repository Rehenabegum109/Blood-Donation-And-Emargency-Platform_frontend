"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useInitiatePayment } from "@/src/hooks/use-payment";

interface PayNowButtonProps {
  bloodRequestId: string;
  disabled?: boolean;
}

export default function PayNowButton({
  bloodRequestId,
  disabled = false,
}: PayNowButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const initiatePayment = useInitiatePayment();

  const handlePayment = async () => {
    try {
      setIsRedirecting(true);

      const result = await initiatePayment.mutateAsync({
        bloodRequestId,
      });

      const paymentUrl = result.data.paymentUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL was not returned");
      }

      toast.success("Payment initiated successfully");

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment initiation error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to initiate payment"
      );

      setIsRedirecting(false);
    }
  };

  const loading = initiatePayment.isPending || isRedirecting;

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled || loading}
      className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Opening bKash...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4" />
          Pay Now
        </>
      )}
    </button>
  );
}