
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Heart,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/src/services/auth/auth.api";



export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setIsLoading(true);

      await forgotPassword({
        email: email.trim(),
      });

      router.push(
        `/reset-password?email=${encodeURIComponent(
          email.trim()
        )}`
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Failed to send reset code. Please try again."
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
                <Mail className="h-8 w-8" />
              </div>

              <h1 className="text-3xl font-bold">
                Forgot Password?
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-red-100">
                Enter your registered email and we&apos;ll
                send you a verification code.
              </p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  isDisabled={isLoading}
                  className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                >
                  {isLoading ? (
                    "Sending code..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Reset Code
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
                <ShieldCheck className="h-5 w-5 shrink-0 text-red-600" />

                <p className="text-xs leading-5 text-muted-foreground">
                  A verification code will be sent to your
                  registered email address.
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