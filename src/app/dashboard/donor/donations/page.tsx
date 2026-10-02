"use client";

import {
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  User,
  FileText,
  AlertCircle,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

import { useGetMyDonations } from "@/src/hooks/use-donation";

function formatDate(date?: string | null) {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    CANCELLED: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles: Record<string, string> = {
    LOW: "bg-slate-50 text-slate-600 border-slate-200",
    NORMAL: "bg-blue-50 text-blue-600 border-blue-200",
    HIGH: "bg-orange-50 text-orange-600 border-orange-200",
    CRITICAL: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[urgency] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {urgency}
    </span>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-zinc-700">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DonorDonationsPage() {
  const [page, setPage] = useState(1);

  const limit = 6;

  const { data, isPending, isError, error } = useGetMyDonations(
    page,
    limit
  );

  /*
   * Backend response:
   *
   * data: {
   *   data: [...donations],
   *   meta: {...}
   * }
   *
   * So:
   * data?.data?.data
   * data?.data?.meta
   */

  const donations = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  if (isPending) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-48 animate-pulse rounded-3xl bg-red-100" />

          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 p-4 md:p-8">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
          <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={28} />
            </div>

            <h2 className="text-xl font-bold text-zinc-800">
              Unable to load donations
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading your donations."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 p-6 text-white shadow-xl md:p-8">
          {/* Decorative circles */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-52 w-52 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                <HeartHandshake size={15} />
                Donation History
              </div>

              <h1 className="text-3xl font-bold md:text-4xl">
                My Donations
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-red-100 md:text-base">
                Track your blood donation requests and see how your
                contributions are helping people in need.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Droplets size={40} />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Total Donations
                </p>

                <p className="mt-1 text-3xl font-bold text-zinc-800">
                  {meta?.total ?? donations.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Droplets size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Current Page
                </p>

                <p className="mt-1 text-3xl font-bold text-zinc-800">
                  {meta?.page ?? page}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <FileText size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* Empty state */}
        {donations.length === 0 ? (
          <section className="flex min-h-[400px] items-center justify-center rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Droplets size={38} />
              </div>

              <h2 className="text-2xl font-bold text-zinc-800">
                No donations yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                You have not made any blood donation requests yet. Once you
                respond to a blood request, your donation history will appear
                here.
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* Donation Cards */}
            <section className="grid gap-6 md:grid-cols-2">
              {donations.map((donation) => {
                const request = donation.bloodRequest;

                return (
                  <article
                    key={donation.id}
                    className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Card top */}
                    <div className="border-b border-zinc-100 bg-gradient-to-r from-red-50 to-rose-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                            <Droplets size={23} />
                          </div>

                          <div>
                            <p className="text-xs font-medium text-zinc-400">
                              Blood Group
                            </p>

                            <h2 className="text-xl font-bold text-red-600">
                              {request.bloodGroup}
                            </h2>
                          </div>
                        </div>

                        <StatusBadge status={donation.status} />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="space-y-5 p-5">
                      {/* Request info */}
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-sm font-bold text-zinc-800">
                            Blood Request
                          </h3>

                          <UrgencyBadge urgency={request.urgency} />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <InfoItem
                            icon={User}
                            label="Patient"
                            value={request.patientName || "Not specified"}
                          />

                          <InfoItem
                            icon={Droplets}
                            label="Required Units"
                            value={`${request.units} unit${
                              request.units > 1 ? "s" : ""
                            }`}
                          />

                          <InfoItem
                            icon={Hospital}
                            label="Hospital"
                            value={request.hospitalName}
                          />

                          <InfoItem
                            icon={CalendarDays}
                            label="Required Date"
                            value={formatDate(request.requiredDate)}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      {request.hospitalAddress && (
                        <div className="border-t border-zinc-100 pt-4">
                          <InfoItem
                            icon={MapPin}
                            label="Hospital Address"
                            value={request.hospitalAddress}
                          />
                        </div>
                      )}

                      {/* Donation details */}
                      <div className="border-t border-zinc-100 pt-4">
                        <h3 className="mb-4 text-sm font-bold text-zinc-800">
                          Donation Details
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <InfoItem
                            icon={Droplets}
                            label="Your Units"
                            value={`${donation.units} unit${
                              donation.units > 1 ? "s" : ""
                            }`}
                          />

                          <InfoItem
                            icon={CalendarDays}
                            label="Donation Date"
                            value={formatDate(donation.donationDate)}
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      {donation.notes && (
                        <div className="rounded-xl bg-zinc-50 p-4">
                          <div className="flex gap-3">
                            <FileText
                              size={17}
                              className="mt-0.5 shrink-0 text-zinc-400"
                            />

                            <div>
                              <p className="text-xs font-semibold text-zinc-500">
                                Your Notes
                              </p>

                              <p className="mt-1 text-sm leading-6 text-zinc-600">
                                {donation.notes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card footer */}
                    <div className="border-t border-zinc-100 bg-zinc-50/70 px-5 py-3">
                      <p className="text-xs text-zinc-400">
                        Donation created on{" "}
                        <span className="font-medium text-zinc-500">
                          {formatDate(donation.createdAt)}
                        </span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="flex h-10 items-center gap-1 rounded-xl border border-red-100 bg-white px-4 text-sm font-medium text-zinc-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white">
                  {meta.page}
                </div>

                <button
                  type="button"
                  disabled={page >= meta.totalPage}
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(meta.totalPage, prev + 1)
                    )
                  }
                  className="flex h-10 items-center gap-1 rounded-xl border border-red-100 bg-white px-4 text-sm font-medium text-zinc-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}