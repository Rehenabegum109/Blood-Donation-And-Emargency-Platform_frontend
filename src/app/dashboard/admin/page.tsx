"use client";

import {
  Activity,
  Droplets,
  Heart,
  Loader2,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useGetAdminDashboardStats } from "@/src/hooks/use-admin";
import { useGetMe } from "@/src/hooks/useGetMe";

import AdminStatCard from "@/src/components/dashboard/admin/AdminStatCard";
import AdminQuickActions from "@/src/components/dashboard/admin/AdminQuickActions";

export default function AdminDashboard() {
  const {
    data: userResponse,
    isPending: isUserPending,
    isError: isUserError,
    error: userError,
  } = useGetMe();

  const {
    data: statsResponse,
    isPending: isStatsPending,
    isError: isStatsError,
    error: statsError,
  } = useGetAdminDashboardStats();

  // Loading
  if (isUserPending || isStatsPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40">
        <div className="text-center">
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-red-600" />

          <p className="mt-4 text-sm font-medium text-zinc-600">
            Loading admin dashboard...
          </p>
        </div>
      </main>
    );
  }

  // Error
  if (isUserError || isStatsError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <ShieldCheck className="h-7 w-7 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-zinc-900">
            Unable to load admin dashboard
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {userError instanceof Error
              ? userError.message
              : statsError instanceof Error
                ? statsError.message
                : "Something went wrong."}
          </p>
        </div>
      </main>
    );
  }

  const user = userResponse?.data;
  const stats = statsResponse?.data;

  // Missing data
  if (!user || !stats) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-zinc-500">
          Admin dashboard data not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            Welcome Banner
        ====================================================== */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-rose-500 p-6 text-white shadow-xl md:p-8 lg:p-10">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-32 right-40 h-80 w-80 rounded-full bg-red-950/20" />

          <div className="pointer-events-none absolute -left-24 bottom-[-100px] h-64 w-64 rounded-full bg-rose-300/10" />

          {/* Blood drop decoration */}
          <div className="pointer-events-none absolute right-10 top-8 hidden opacity-10 md:block">
            <Droplets className="h-48 w-48 fill-white" />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {/* Welcome content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />

                <span>Admin Dashboard</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
                Welcome, {user.name} 👋
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-red-50 md:text-base">
                Manage users, blood requests, donations and platform
                activities from one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm">
                  ADMIN
                </div>

                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur-sm">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Admin Icon */}
            <div className="hidden shrink-0 md:flex">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md lg:h-44 lg:w-44">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 lg:h-28 lg:w-28">
                  <Droplets className="h-14 w-14 fill-white text-white lg:h-16 lg:w-16" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            Stats
        ====================================================== */}
        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              Platform Overview
            </p>

            <h2 className="mt-1 text-xl font-black text-zinc-900">
              BloodLink Statistics
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Current platform activity.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AdminStatCard
              title="Total Users"
              value={stats.users.total}
              description={`${stats.users.donors} donors • ${stats.users.recipients} recipients`}
              icon={Users}
              iconClassName="bg-blue-50 text-blue-600"
            />

            <AdminStatCard
              title="Blood Requests"
              value={stats.bloodRequests.total}
              description={`${stats.bloodRequests.pending} pending • ${stats.bloodRequests.fulfilled} fulfilled`}
              icon={Droplets}
              iconClassName="bg-red-50 text-red-600"
            />

            <AdminStatCard
              title="Donations"
              value={stats.donations.total}
              description={`${stats.donations.accepted} accepted`}
              icon={Heart}
              iconClassName="bg-green-50 text-green-600"
            />

            <AdminStatCard
              title="Rejected Donations"
              value={stats.donations.rejected}
              description="Donation requests rejected"
              icon={Activity}
              iconClassName="bg-amber-50 text-amber-600"
            />
          </div>
        </section>

        {/* =====================================================
            Quick Actions
        ====================================================== */}
        <AdminQuickActions />

        {/* =====================================================
            Detailed Overview
        ====================================================== */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {/* Users */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">Users</p>

                <p className="text-xl font-black text-zinc-900">
                  {stats.users.total}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-sm">
              <span className="text-zinc-500">Donors</span>

              <span className="font-bold text-zinc-900">
                {stats.users.donors}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Recipients</span>

              <span className="font-bold text-zinc-900">
                {stats.users.recipients}
              </span>
            </div>
          </div>

          {/* Blood Requests */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Droplets className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Blood Requests
                </p>

                <p className="text-xl font-black text-zinc-900">
                  {stats.bloodRequests.total}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-sm">
              <span className="text-zinc-500">Pending</span>

              <span className="font-bold text-amber-600">
                {stats.bloodRequests.pending}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Fulfilled</span>

              <span className="font-bold text-green-600">
                {stats.bloodRequests.fulfilled}
              </span>
            </div>
          </div>

          {/* Donations */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">Donations</p>

                <p className="text-xl font-black text-zinc-900">
                  {stats.donations.total}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-sm">
              <span className="text-zinc-500">Accepted</span>

              <span className="font-bold text-green-600">
                {stats.donations.accepted}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Rejected</span>

              <span className="font-bold text-red-600">
                {stats.donations.rejected}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}