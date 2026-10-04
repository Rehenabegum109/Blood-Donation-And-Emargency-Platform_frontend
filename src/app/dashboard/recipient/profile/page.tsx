"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";

import { useGetMe } from "@/src/hooks/useGetMe";

export default function RecipientProfilePage() {
  const { data, isPending, isError } = useGetMe();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm font-medium text-zinc-600">
            Loading your profile...
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Please wait a moment
          </p>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-zinc-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We could not load your profile information. Please login again.
          </p>

          <Link
            href="/login"
            className="mt-5 inline-flex rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const user = data.data;

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <main className="relative min-h-screen overflow-hidden">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          {/* Mobile heading */}
          <div className="mb-6 md:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
              BloodLink
            </p>

            <h2 className="mt-1 text-xl font-bold text-zinc-900">
              Recipient Profile
            </h2>
          </div>

          {/* Back button */}
          <Link
            href="/dashboard/recipient"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-red-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          {/* ================= PROFILE HEADER ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 p-6 text-white shadow-xl shadow-red-200/50 sm:p-8">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Profile image */}
              <div className="relative shrink-0">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white/30 bg-white/15 shadow-xl backdrop-blur">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-14 w-14 text-white/80" />
                  )}
                </div>

                <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-red-600 bg-white text-red-600 shadow-md">
                  <UserRound className="h-4 w-4" />
                </div>
              </div>

              {/* Profile details */}
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Recipient Account
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {user.name}
                </h1>

                <p className="mt-2 break-all text-sm text-red-50">
                  {user.email}
                </p>

                {user.location && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-50">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{user.location}</span>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {user.status}
                  </span>

                  {user.emailVerified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Email Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ================= PERSONAL INFORMATION ================= */}
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
                Personal Information
              </p>

              <h2 className="mt-1 text-2xl font-bold text-zinc-900">
                Your Details
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Information associated with your BloodLink account.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <User className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Full Name
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-zinc-900">
                      {user.name || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Email Address
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-zinc-900">
                      {user.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Phone Number
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-zinc-900">
                      {user.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Location
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-zinc-900">
                      {user.location || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ACCOUNT INFORMATION ================= */}
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
                Account
              </p>

              <h2 className="mt-1 text-2xl font-bold text-zinc-900">
                Account Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Role */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <UserRound className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {user.role}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">
                  Account Status
                </p>

                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {user.status}
                </p>
              </div>

              {/* Email verification */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">
                  Email Status
                </p>

                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {user.emailVerified
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </div>

              {/* Joined */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">
                  Joined
                </p>

                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Bottom spacing */}
          <div className="h-10" />
        </div>
      </main>
    </div>
  );
}