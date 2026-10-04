"use client";

import { Droplets, Heart } from "lucide-react";

export default function DonationsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Heart className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            My Donations
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Track your blood donation requests and their status.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/70 px-4 py-3">
        <Droplets className="h-4 w-4 shrink-0 text-red-600" />

        <p className="text-sm text-red-700">
          Thank you for helping save lives through blood donation.
        </p>
      </div>
    </div>
  );
}