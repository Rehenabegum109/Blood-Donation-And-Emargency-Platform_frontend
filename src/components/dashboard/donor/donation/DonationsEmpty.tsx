"use client";

import Link from "next/link";
import { Droplets, Heart } from "lucide-react";

export default function DonationsEmpty() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <Droplets className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-zinc-900">
        No donations yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        You have not submitted any donation requests yet.
        Browse available blood requests and help someone in need.
      </p>

      <Link
        href="/dashboard/donor/requests"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        <Heart className="h-4 w-4" />
        Find Blood Requests
      </Link>
    </div>
  );
}