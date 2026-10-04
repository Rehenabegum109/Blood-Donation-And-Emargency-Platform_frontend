"use client";

import { Loader2 } from "lucide-react";

import type { IDonation } from "@/src/types/donation.types";
import DonationCard from "./DonationCard";

interface DonationsListProps {
  donations: IDonation[];
  isLoading: boolean;
  isError: boolean;
}

export default function DonationsList({
  donations,
  isLoading,
  isError,
}: DonationsListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-red-600" />

          <p className="mt-3 text-sm font-medium text-zinc-600">
            Loading your donations...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900">
          Unable to load donations
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Something went wrong while loading your donation history.
        </p>
      </div>
    );
  }

  if (donations.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {donations.map((donation) => (
        <DonationCard
          key={donation.id}
          donation={donation}
        />
      ))}
    </div>
  );
}