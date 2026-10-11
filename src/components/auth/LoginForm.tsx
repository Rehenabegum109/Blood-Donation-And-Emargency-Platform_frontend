
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Users,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginUser } from "@/src/services/auth/auth.api";

type DemoRole = "DONOR" | "RECIPIENT" | "ADMIN";

const getDashboardPath = (role: string) => {
  switch (role.toUpperCase()) {
    case "DONOR":
      return "/dashboard/donor";
    case "RECIPIENT":
      return "/dashboard/recipient";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/";
  }
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedRole, setSelectedRole] =
    useState<DemoRole | null>(null);

  const selectDemoRole = (role: DemoRole) => {
    setSelectedRole(role);
    setError("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await loginUser({
        email: email.trim(),
        password,
      });

      const response = result as {
        data?: {
          user?: { role?: string };
          role?: string;
        };
        user?: { role?: string };
        role?: string;
      };

      const role =
        response?.data?.user?.role ??
        response?.user?.role ??
        response?.data?.role ??
        response?.role;

      if (!role) {
        setError(
          "Login succeeded, but the user role was not found in the response."
        );
        return;
      }

      window.location.href = getDashboardPath(role);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Demo Role Selection */}
      <div className="mb-6 space-y-3">
        <p className="text-sm font-semibold text-foreground">
          Quick Role Access
        </p>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            isDisabled={isLoading}
            onPress={() => selectDemoRole("DONOR")}
            className={`h-auto min-h-16 flex-col gap-1 rounded-xl border-red-200 py-3 hover:border-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 ${
              selectedRole === "DONOR"
                ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                : ""
            }`}
          >
            <UserRound className="h-5 w-5 text-red-600" />
            <span className="text-xs">Donor</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            isDisabled={isLoading}
            onPress={() => selectDemoRole("RECIPIENT")}
            className={`h-auto min-h-16 flex-col gap-1 rounded-xl border-red-200 py-3 hover:border-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 ${
              selectedRole === "RECIPIENT"
                ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                : ""
            }`}
          >
            <Users className="h-5 w-5 text-red-600" />
            <span className="text-xs">Recipient</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            isDisabled={isLoading}
            onPress={() => selectDemoRole("ADMIN")}
            className={`h-auto min-h-16 flex-col gap-1 rounded-xl border-red-200 py-3 hover:border-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 ${
              selectedRole === "ADMIN"
                ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                : ""
            }`}
          >
            <ShieldCheck className="h-5 w-5 text-red-600" />
            <span className="text-xs">Admin</span>
          </Button>
        </div>

        {selectedRole && (
          <p className="text-xs text-muted-foreground">
            {selectedRole} selected. Enter the credentials of an existing{" "}
            {selectedRole.toLowerCase()} account.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pr-12"
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
          >
            {error}
          </div>
        )}

        {/* Sign In */}
        <Button
          type="submit"
          isDisabled={isLoading}
          className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
        >
          {isLoading ? (
            "Signing in..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign In
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>
      </form>

      {/* Register */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Do not have an account?{" "}

        <Link
          href="/register"
          className="font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
