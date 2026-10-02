
"use client";

import { useGetMyDonorProfile } from "@/src/hooks/use-donor";
import {
  User,
  Mail,
  Phone,
  Droplets,
  MapPin,
  CalendarDays,
  Activity,
  ShieldCheck,
} from "lucide-react";



export default function DonorProfilePage() {
  const { data, isPending, isError, error } =
    useGetMyDonorProfile();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm font-medium text-zinc-600">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <User className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-red-600">
            Failed to load profile
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
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
        <p className="text-zinc-500">
          Donor profile not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 p-6 text-white shadow-xl shadow-red-200/40 md:p-8">
          
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-80 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">

            {/* Profile Image */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/20 shadow-lg backdrop-blur-sm">
              {donor.user.profileImage ? (
                <img
                  src={donor.user.profileImage}
                  alt={donor.user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-14 w-14 text-white" />
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-red-50">
                Donor Profile
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                {donor.user.name}
              </h1>

              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-red-50 sm:justify-start">
                <Mail className="h-4 w-4" />
                {donor.user.email}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                
                {/* Blood Group */}
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm">
                  <Droplets className="h-4 w-4" />
                  {donor.bloodGroup}
                </span>

                {/* Availability */}
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
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
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">

          <div className="border-b border-zinc-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <User className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Personal Details
                </p>

                <h2 className="text-xl font-black text-zinc-900">
                  Basic Information
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">

            <ProfileItem
              icon={<User className="h-4 w-4" />}
              label="Full Name"
              value={donor.user.name}
            />

            <ProfileItem
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={donor.user.email}
            />

            <ProfileItem
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={donor.user.phone || "Not added"}
            />

            <ProfileItem
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={donor.user.location || "Not added"}
            />

            <ProfileItem
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value={donor.address || "Not added"}
            />

            <ProfileItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Date of Birth"
              value={
                donor.dateOfBirth
                  ? new Date(
                      donor.dateOfBirth
                    ).toLocaleDateString()
                  : "Not added"
              }
            />
          </div>
        </section>

        {/* Donor Information */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">

          <div className="border-b border-zinc-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <Droplets className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Blood Donation
                </p>

                <h2 className="text-xl font-black text-zinc-900">
                  Donor Information
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Blood Group */}
            <div className="rounded-xl bg-red-50/70 p-5">
              <div className="flex items-center gap-2 text-red-600">
                <Droplets className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Blood Group
                </span>
              </div>

              <p className="mt-3 text-3xl font-black text-red-600">
                {donor.bloodGroup}
              </p>
            </div>

            {/* Availability */}
            <div className="rounded-xl bg-green-50 p-5">
              <div className="flex items-center gap-2 text-green-600">
                <Activity className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Availability
                </span>
              </div>

              <p
                className={`mt-3 text-xl font-black ${
                  donor.isAvailable
                    ? "text-green-600"
                    : "text-zinc-500"
                }`}
              >
                {donor.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>

            {/* Last Donation */}
            <div className="rounded-xl bg-rose-50 p-5">
              <div className="flex items-center gap-2 text-rose-600">
                <CalendarDays className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Last Donation
                </span>
              </div>

              <p className="mt-3 text-lg font-black text-zinc-900">
                {donor.lastDonationDate
                  ? new Date(
                      donor.lastDonationDate
                    ).toLocaleDateString()
                  : "No donation yet"}
              </p>
            </div>
          </div>
        </section>

        {/* Location Information */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">

          <div className="border-b border-zinc-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Location
                </p>

                <h2 className="text-xl font-black text-zinc-900">
                  Donor Location
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">

            <ProfileItem
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value={donor.address || "Not added"}
            />

            <ProfileItem
              icon={<MapPin className="h-4 w-4" />}
              label="Coordinates"
              value={
                donor.latitude !== null &&
                donor.latitude !== undefined &&
                donor.longitude !== null &&
                donor.longitude !== undefined
                  ? `${donor.latitude}, ${donor.longitude}`
                  : "Location coordinates not added"
              }
            />
          </div>
        </section>

        {/* Account Status */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-900">
                Donor Account
              </p>

              <p className="mt-1 text-sm text-green-600">
                Your donor profile is active.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* Reusable Profile Item */

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 transition hover:border-red-100 hover:bg-red-50/30">
      <div className="flex items-center gap-2 text-zinc-500">
        <span className="text-red-500">{icon}</span>

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words font-semibold text-zinc-900">
        {value}
      </p>
    </div>
  );
}
