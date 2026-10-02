"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyEmail } from "@/src/services/auth/auth.api";



export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Verification code must be 6 digits.");
      return;
    }

    try {
      setIsLoading(true);

      await verifyEmail({
        email,
        otp,
      });

      setSuccess("Email verified successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Email verification failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/20 dark:via-zinc-950 dark:to-rose-950/10">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-2xl shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-950">

          
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800 px-6 py-10 text-center text-white">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Mail className="h-8 w-8" />
              </div>

              <h1 className="text-3xl font-bold">
                Verify Your Email
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-red-100">
                We sent a 6-digit verification code to your
                email address.
              </p>
            </div>

            <div className="p-6 sm:p-8">

       
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50/70 p-4 dark:border-red-900/30 dark:bg-red-950/10">
                <div className="flex items-start gap-3">

                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Verification email sent to
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold">
                      {email || "Your email address"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="otp">
                    Verification Code
                  </Label>

                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(event) => {
                      const value = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      setOtp(value);
                    }}
                    className="h-12 text-center text-xl font-bold tracking-[0.5em]"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                {/* Success */}
                {success && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    {success}
                  </div>
                )}

                <Button
                  type="submit"
                  isDisabled={
                    isLoading || otp.length !== 6
                  }
                  className="h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                >
                  {isLoading
                    ? "Verifying..."
                    : "Verify Email"}
                </Button>
              </form>

              {/* Login */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Back to Login
                </Link>
              </div>

            </div>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            BloodLink • Every drop can make a difference.
          </p>

        </div>
      </div>
    </main>
  );
}
