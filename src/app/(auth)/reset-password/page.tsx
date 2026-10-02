
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/src/services/auth/auth.api";



export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      setIsLoading(true);

      await resetPassword({
        email,
        otp,
        newPassword,
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Password reset failed. Please try again."
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

            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800 px-6 py-10 text-center text-white">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <LockKeyhole className="h-8 w-8" />
              </div>

              <h1 className="text-3xl font-bold">
                Reset Password
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-red-100">
                Enter the verification code and create
                your new password.
              </p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">

              <div className="mb-6 rounded-xl border border-red-100 bg-red-50/70 p-4 dark:border-red-900/30 dark:bg-red-950/10">
                <p className="text-xs text-muted-foreground">
                  Resetting password for
                </p>

                <p className="mt-1 break-all text-sm font-semibold">
                  {email || "Your email address"}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* OTP */}
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

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    New Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(event.target.value)
                      }
                      className="h-12 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-red-600"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Minimum 8 characters with uppercase,
                    lowercase, number and special character.
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  isDisabled={
                    isLoading ||
                    otp.length !== 6 ||
                    !newPassword
                  }
                  className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                >
                  {isLoading ? (
                    "Resetting password..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Reset Password
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <p className="text-xs leading-5 text-muted-foreground">
                  Your new password will replace your old
                  password immediately after verification.
                </p>
              </div>

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