"use client";

import { Droplets, Heart } from "lucide-react";

export default function DonorRequestsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <Heart className="h-6 w-6 fill-current" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-red-500" />

            <span className="text-sm font-semibold text-red-600">
              BloodLink
            </span>
          </div>

          <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
            Blood Requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Find people who need blood and help save a life by
            becoming a donor.
          </p>
        </div>
      </div>
    </div>
  );
}