"use client";

import {
  Activity,
  CalendarDays,
  Droplets,
  Heart,
  Loader2,
  MapPin,
} from "lucide-react";

import {
  useGetMyDonorProfile,
  useUpdateDonorAvailability,
} from "@/src/hooks/use-donor";

import { useGetMyDonations } from "@/src/hooks/use-donation";

import DonorStatCard from "@/src/components/dashboard/donor/DonorStatCard";
import DonorQuickActions from "@/src/components/dashboard/donor/DonorQuickActions";

export default function DonorDashboard() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useGetMyDonorProfile();

  const updateAvailability = useUpdateDonorAvailability();

  const { data: donationsResponse } = useGetMyDonations(1, 100);

  const donations = donationsResponse?.data?.data ?? [];

  const totalDonations = donations.length;

  const pendingDonations = donations.filter(
    (donation) => donation.status === "PENDING"
  ).length;

  const completedDonations = donations.filter(
    (donation) => donation.status === "COMPLETED"
  ).length;

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-9 w-9 animate-spin text-red-600" />

          <p className="text-sm font-medium text-zinc-600">
            Loading donor dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load donor profile
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong"}
          </p>
        </div>
      </main>
    );
  }

  const donor = data?.data;

  if (!donor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <p className="text-gray-500">
          Donor profile not found.
        </p>
      </main>
    );
  }

  const handleAvailability = (checked: boolean) => {
    updateAvailability.mutate({
      isAvailable: checked,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= WELCOME BANNER ================= */}

        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 p-6 text-white shadow-xl shadow-red-200/40 md:p-8 lg:p-10">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-32 right-40 h-80 w-80 rounded-full bg-white/5" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Heart className="h-3.5 w-3.5 fill-white" />
                Donor Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
                Welcome, {donor.user.name} 👋
              </h1>

              <p className="mt-3 text-sm text-red-50 md:text-base">
                Here is your donor information at a glance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm">
                  <Droplets className="h-4 w-4" />
                  {donor.bloodGroup}
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      donor.isAvailable
                        ? "bg-green-300"
                        : "bg-white/50"
                    }`}
                  />

                  {donor.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />

                  {donor.address || "Location not added"}
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 md:flex">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm lg:h-44 lg:w-44">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 lg:h-28 lg:w-28">
                  <Heart className="h-14 w-14 fill-white text-white lg:h-16 lg:w-16" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= STATISTICS ================= */}

        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              Donation Overview
            </p>

            <h2 className="mt-1 text-xl font-black text-zinc-900">
              Your donation activity
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <DonorStatCard
              title="Blood Group"
              value={donor.bloodGroup || "N/A"}
              description="Your registered blood group"
              icon={Droplets}
            />

            <DonorStatCard
              title="Total Donations"
              value={totalDonations}
              description="Donation requests created"
              icon={Heart}
              iconClassName="bg-rose-50 text-rose-600"
            />

            <DonorStatCard
              title="Pending"
              value={pendingDonations}
              description="Waiting for recipient action"
              icon={Activity}
              iconClassName="bg-amber-50 text-amber-600"
            />

            <DonorStatCard
              title="Completed"
              value={completedDonations}
              description="Successfully completed"
              icon={Heart}
              iconClassName="bg-green-50 text-green-600"
            />

          </div>
        </section>

        {/* ================= DONOR DETAILS ================= */}

        <section className="mt-8">
          <div className="grid gap-5 md:grid-cols-2">

            {/* Availability */}

            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Donor Availability
                  </p>

                  <p
                    className={`mt-2 text-xl font-bold ${
                      donor.isAvailable
                        ? "text-green-600"
                        : "text-zinc-500"
                    }`}
                  >
                    {donor.isAvailable
                      ? "Available to Donate"
                      : "Currently Unavailable"}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                Let recipients know whether you are currently
                available for blood donation.
              </p>

              <button
                type="button"
                disabled={updateAvailability.isPending}
                onClick={() =>
                  handleAvailability(!donor.isAvailable)
                }
                className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateAvailability.isPending
                  ? "Updating..."
                  : donor.isAvailable
                    ? "Set Unavailable"
                    : "Set Available"}
              </button>
            </div>

            {/* Last Donation */}

            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Last Donation
                  </p>

                  <p className="mt-2 text-xl font-bold text-zinc-900">
                    {donor.lastDonationDate
                      ? new Date(
                          donor.lastDonationDate
                        ).toLocaleDateString()
                      : "No donation yet"}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <CalendarDays className="h-5 w-5 text-red-600" />
                </div>
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                Your most recent completed blood donation date.
              </p>
            </div>

          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <DonorQuickActions />

        {/* ================= DONOR INFORMATION ================= */}

        <section className="mt-8 rounded-2xl border border-red-100 bg-white shadow-sm">

          <div className="border-b border-zinc-100 p-6 md:p-8">

            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              Donor Profile
            </p>

            <h2 className="mt-1 text-xl font-black text-zinc-900">
              Donor Information
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your registered donor details.
            </p>

          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-3">

            <div>
              <p className="text-sm text-zinc-500">
                Name
              </p>

              <p className="mt-1 font-semibold text-zinc-900">
                {donor.user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Email
              </p>

              <p className="mt-1 break-all font-semibold text-zinc-900">
                {donor.user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Phone
              </p>

              <p className="mt-1 font-semibold text-zinc-900">
                {donor.user.phone || "Not added"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Blood Group
              </p>

              <p className="mt-1 font-semibold text-red-600">
                {donor.bloodGroup || "Not added"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Address
              </p>

              <p className="mt-1 font-semibold text-zinc-900">
                {donor.address || "Not added"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Date of Birth
              </p>

              <p className="mt-1 font-semibold text-zinc-900">
                {donor.dateOfBirth
                  ? new Date(
                      donor.dateOfBirth
                    ).toLocaleDateString()
                  : "Not added"}
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}