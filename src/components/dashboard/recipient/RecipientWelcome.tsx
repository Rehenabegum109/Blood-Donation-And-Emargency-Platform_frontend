"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Heart,
  Plus,
} from "lucide-react";

interface RecipientWelcomeProps {
  name: string;
  totalRequests: number;
  pendingRequests: number;
  fulfilledRequests: number;
}

export default function RecipientWelcome({
  name,
  totalRequests,
  pendingRequests,
  fulfilledRequests,
}: RecipientWelcomeProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 p-6 text-white shadow-xl shadow-red-200/50 sm:p-8">
      {/* Decorative circles */}
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Content */}
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <Heart className="h-3.5 w-3.5 fill-white" />
            Recipient Dashboard
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome, {name} 👋
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-red-50 sm:text-base">
            Manage your blood requests, track their status, and connect with
            people who are ready to help.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/recipient/requests?create=true"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-lg transition hover:bg-red-50"
            >
              <Plus className="h-4 w-4" />
              Create Blood Request
            </Link>

            <Link
              href="/dashboard/recipient/requests"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              View My Requests
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 lg:w-[330px]">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur">
            <ClipboardList className="mx-auto mb-2 h-5 w-5 text-red-100" />
            <p className="text-2xl font-bold">{totalRequests}</p>
            <p className="mt-1 text-[11px] text-red-100">Total</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur">
            <div className="mx-auto mb-2 h-5 w-5 rounded-full border-2 border-yellow-200" />
            <p className="text-2xl font-bold">{pendingRequests}</p>
            <p className="mt-1 text-[11px] text-red-100">Pending</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur">
            <div className="mx-auto mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-300/20">
              <span className="h-2 w-2 rounded-full bg-emerald-200" />
            </div>
            <p className="text-2xl font-bold">{fulfilledRequests}</p>
            <p className="mt-1 text-[11px] text-red-100">Fulfilled</p>
          </div>
        </div>
      </div>
    </section>
  );
}