"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Droplets,
  FilePlus2,
  Heart,
  Hospital,
  MapPin,
  Plus,
  UserRound,
} from "lucide-react";
import { useGetMe } from "@/src/hooks";
import { useGetBloodRequests } from "@/src/hooks/use-blood-request";



function formatBloodGroup(group: string) {
  return group
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatUrgency(urgency: string) {
  return urgency.charAt(0) + urgency.slice(1).toLowerCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getUrgencyClass(urgency: string) {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";

    case "HIGH":
      return "bg-orange-100 text-orange-700";

    case "NORMAL":
      return "bg-blue-100 text-blue-700";

    case "LOW":
      return "bg-green-100 text-green-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-700";

    case "FULFILLED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-zinc-100 text-zinc-600";

    case "EXPIRED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export default function RecipientDashboard() {
  const { data: userResponse, isPending: userLoading } = useGetMe();

  const { data: requestResponse, isPending: requestsLoading } =
    useGetBloodRequests({
      page: 1,
      limit: 100,
    });

  const user = userResponse?.data;

  // Get only requests created by the logged-in recipient
  const myRequests =
    requestResponse?.data?.filter(
      (request) => request.recipientId === user?.id
    ) ?? [];

  const totalRequests = myRequests.length;

  const pendingRequests = myRequests.filter(
    (request) => request.status === "PENDING"
  ).length;

  const fulfilledRequests = myRequests.filter(
    (request) => request.status === "FULFILLED"
  ).length;

  const cancelledRequests = myRequests.filter(
    (request) => request.status === "CANCELLED"
  ).length;

  const recentRequests = myRequests.slice(0, 5);

  if (userLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

          <p className="text-sm font-semibold text-zinc-700">
            Loading your dashboard...
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Please wait a moment
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:block">
          <div className="sticky top-0 flex min-h-screen flex-col">
            {/* Logo */}
            <div className="border-b border-white/10 px-6 py-6">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Heart className="h-6 w-6 fill-white text-white" />
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    BloodLink
                  </h1>

                  <p className="text-xs text-red-100">
                    Recipient Dashboard
                  </p>
                </div>
              </Link>
            </div>

            {/* User */}
            <div className="border-b border-white/10 px-5 py-6">
              <div className="flex items-center gap-3">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-12 w-12 rounded-full border-2 border-white/30 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                    <UserRound className="h-6 w-6" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {user?.name || "Recipient"}
                  </p>

                  <p className="truncate text-xs text-red-100">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-6">
              <Link
                href="/dashboard/recipient"
                className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
              >
                <Heart className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/recipient/requests"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-50 transition hover:bg-white/10"
              >
                <FilePlus2 className="h-5 w-5" />
                My Requests
              </Link>

              <Link
                href="/dashboard/recipient/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-50 transition hover:bg-white/10"
              >
                <UserRound className="h-5 w-5" />
                Profile
              </Link>
            </nav>

            {/* Bottom */}
            <div className="border-t border-white/10 p-5">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                Back to Website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="relative flex-1 overflow-hidden">
          {/* Background decoration */}
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

          <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Mobile top */}
            <div className="mb-6 flex items-center justify-between md:hidden">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Heart className="h-5 w-5 fill-white" />
                </div>

                <span className="font-bold text-zinc-900">
                  BloodLink
                </span>
              </Link>

              <Link
                href="/dashboard/recipient/profile"
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-red-100 bg-white shadow-sm"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-5 w-5 text-red-600" />
                )}
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold text-red-600">
                  Recipient Dashboard
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                  Welcome, {user?.name?.split(" ")[0] || "Recipient"} 👋
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                  Manage your blood requests and find the support you
                  need through BloodLink.
                </p>
              </div>

              <Link
                href="/dashboard/recipient/requests"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
              >
                <Plus className="h-4 w-4" />
                Create Blood Request
              </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total */}
              <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Total Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold text-zinc-900">
                      {requestsLoading ? "..." : totalRequests}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FilePlus2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-zinc-900">
                      {requestsLoading ? "..." : pendingRequests}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Fulfilled */}
              <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Fulfilled
                    </p>

                    <p className="mt-2 text-3xl font-bold text-zinc-900">
                      {requestsLoading ? "..." : fulfilledRequests}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Droplets className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Cancelled */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Cancelled
                    </p>

                    <p className="mt-2 text-3xl font-bold text-zinc-900">
                      {requestsLoading ? "..." : cancelledRequests}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600">
                    <FilePlus2 className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <section className="mt-8 rounded-3xl border border-red-100 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">
                    Recent Blood Requests
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Your latest blood requests.
                  </p>
                </div>

                <Link
                  href="/dashboard/recipient/requests"
                  className="inline-flex items-center gap-2 text-sm font-bold text-red-600 transition hover:text-red-700"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="p-6">
                {requestsLoading ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

                    <p className="text-sm text-zinc-500">
                      Loading requests...
                    </p>
                  </div>
                ) : recentRequests.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/40 px-6 py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                      <Droplets className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-zinc-900">
                      No blood requests yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
                      Create your first blood request and provide the
                      required information to find donors.
                    </p>

                    <Link
                      href="/dashboard/recipient/requests"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4" />
                      Create Request
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 transition hover:border-red-100 hover:bg-red-50/30"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                              <Droplets className="h-6 w-6" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-zinc-900">
                                  {formatBloodGroup(
                                    request.bloodGroup
                                  )}
                                </h3>

                                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                                  {request.units}{" "}
                                  {request.units === 1
                                    ? "Unit"
                                    : "Units"}
                                </span>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getUrgencyClass(
                                    request.urgency
                                  )}`}
                                >
                                  {formatUrgency(request.urgency)}
                                </span>
                              </div>

                              <div className="mt-2 flex flex-col gap-1.5 text-sm text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-5">
                                <span className="flex items-center gap-1.5">
                                  <Hospital className="h-4 w-4 text-zinc-400" />
                                  {request.hospitalName}
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <CalendarDays className="h-4 w-4 text-zinc-400" />
                                  {formatDate(
                                    request.requiredDate
                                  )}
                                </span>
                              </div>

                              {request.hospitalAddress && (
                                <p className="mt-2 flex items-start gap-1.5 text-xs text-zinc-400">
                                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                  <span>
                                    {request.hospitalAddress}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3 lg:flex-col lg:items-end">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClass(
                                request.status
                              )}`}
                            >
                              {formatStatus(request.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-8 grid gap-5 md:grid-cols-2">
              <Link
                href="/dashboard/recipient/requests"
                className="group rounded-3xl border border-red-100 bg-gradient-to-br from-red-600 to-rose-500 p-6 text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <Plus className="h-6 w-6" />
                  </div>

                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Create Blood Request
                </h3>

                <p className="mt-2 text-sm leading-6 text-red-100">
                  Need blood for a patient? Create a request with
                  hospital and patient details.
                </p>
              </Link>

              <Link
                href="/dashboard/recipient/profile"
                className="group rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <UserRound className="h-6 w-6" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-red-600" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-zinc-900">
                  View Your Profile
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Check your personal information, account status,
                  and verification details.
                </p>
              </Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}