"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useGetBloodRequests } from "@/src/hooks/use-blood-request";

import type {
  BloodGroup,
  BloodRequestStatus,
  IBloodRequest,
  UrgencyLevel,
  VerificationStatus,
} from "@/src/types/blood-request.types";

type SortOrder = "asc" | "desc";

const BLOOD_GROUP_OPTIONS: {
  value: BloodGroup;
  label: string;
}[] = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

const URGENCY_OPTIONS: {
  value: UrgencyLevel;
  label: string;
}[] = [
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

const STATUS_OPTIONS: {
  value: BloodRequestStatus;
  label: string;
}[] = [
  { value: "PENDING", label: "Pending" },
  { value: "FULFILLED", label: "Fulfilled" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "EXPIRED", label: "Expired" },
];

const VERIFICATION_OPTIONS: {
  value: VerificationStatus;
  label: string;
}[] = [
  { value: "PENDING", label: "Pending" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
];

const urgencyStyles: Record<
  UrgencyLevel,
  {
    badge: string;
    dot: string;
  }
> = {
  LOW: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-500",
  },
  NORMAL: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  HIGH: {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
  },
  CRITICAL: {
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-600",
  },
};

const statusStyles: Record<
  BloodRequestStatus,
  {
    badge: string;
  }
> = {
  PENDING: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  FULFILLED: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  CANCELLED: {
    badge: "bg-slate-100 text-slate-600 border-slate-200",
  },
  EXPIRED: {
    badge: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

const verificationStyles: Record<
  VerificationStatus,
  {
    badge: string;
  }
> = {
  PENDING: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  VERIFIED: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  REJECTED: {
    badge: "bg-red-50 text-red-700 border-red-200",
  },
};

function formatBloodGroup(bloodGroup: BloodGroup) {
  return bloodGroup
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function formatDate(date: string) {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not specified";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isRequiredDatePassed(date: string) {
  if (!date) return false;

  const requiredDate = new Date(date);

  if (Number.isNaN(requiredDate.getTime())) {
    return false;
  }

  return requiredDate.getTime() < Date.now();
}

function BloodRequestCard({
  request,
}: {
  request: IBloodRequest;
}) {
  const urgency = urgencyStyles[request.urgency];
  const status = statusStyles[request.status];
  const verification = verificationStyles[request.verificationStatus];

  const requiredDatePassed =
    request.status === "PENDING" && isRequiredDatePassed(request.requiredDate);

  return (
    <article className="group overflow-hidden rounded-2xl border border-red-100 bg-white/95 shadow-[0_10px_35px_rgba(190,24,93,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_45px_rgba(190,24,93,0.14)]">
      {/* Top section */}
      <div className="border-b border-red-50 bg-gradient-to-br from-red-50 via-white to-rose-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200">
              <Droplets className="h-7 w-7 fill-current" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
                Blood Request
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {formatBloodGroup(request.bloodGroup)}
              </h2>

              <p className="text-sm text-slate-500">
                {request.units} {request.units === 1 ? "unit" : "units"} required
              </p>
            </div>
          </div>

          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${urgency.badge}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${urgency.dot}`}
            />
            {formatLabel(request.urgency)}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.badge}`}
          >
            {formatLabel(request.status)}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${verification.badge}`}
          >
            {request.verificationStatus === "VERIFIED" ? (
              <ShieldCheck className="h-3.5 w-3.5" />
            ) : (
              <Clock3 className="h-3.5 w-3.5" />
            )}

            {formatLabel(request.verificationStatus)}
          </span>

          {requiredDatePassed && (
            <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              Date passed
            </span>
          )}
        </div>
      </div>

      {/* Information */}
      <div className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Hospital className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Hospital
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-800">
              {request.hospitalName}
            </p>

            {request.hospitalAddress && (
              <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                {request.hospitalAddress}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Required date
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {formatDate(request.requiredDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <UserRound className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Recipient
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                {request.recipient?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {request.hospitalAddress && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

            <p className="line-clamp-2 text-xs leading-5 text-slate-600">
              {request.hospitalAddress}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Posted</p>
            <p className="mt-0.5 text-xs font-medium text-slate-600">
              {formatDate(request.createdAt)}
            </p>
          </div>

          <Link
            href={`/blood-requests/${request.id}`}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:from-red-700 hover:to-rose-700 hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function BloodRequestSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-slate-200" />

            <div>
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="mt-2 h-7 w-14 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
            </div>
          </div>

          <div className="h-7 w-20 rounded-full bg-slate-200" />
        </div>

        <div className="mt-5 h-16 rounded-xl bg-slate-100" />

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="h-10 rounded-xl bg-slate-100" />
          <div className="h-10 rounded-xl bg-slate-100" />
        </div>

        <div className="mt-5 h-10 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export default function BloodRequestsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const [bloodGroup, setBloodGroup] = useState<BloodGroup | undefined>();
  const [urgency, setUrgency] = useState<UrgencyLevel | undefined>();
  const [status, setStatus] = useState<BloodRequestStatus | undefined>();
  const [verificationStatus, setVerificationStatus] = useState<
    VerificationStatus | undefined
  >();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetBloodRequests({
      page,
      limit,
      bloodGroup,
      urgency,
      status,
      verificationStatus,
      sortBy,
      sortOrder,
    });

  const requests = data?.data ?? [];
  const meta = data?.meta;

  const filteredRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return requests;
    }

    return requests.filter((request) => {
      const values = [
        request.hospitalName,
        request.hospitalAddress,
        request.patientName,
        request.recipient?.name,
        request.bloodGroup,
        formatBloodGroup(request.bloodGroup),
      ];

      return values.some((value) =>
        value?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [requests, search]);

  const activeFilterCount = [
    bloodGroup,
    urgency,
    status,
    verificationStatus,
  ].filter(Boolean).length;

  const totalPages = meta?.totalPages ?? 1;

  const clearFilters = () => {
    setBloodGroup(undefined);
    setUrgency(undefined);
    setStatus(undefined);
    setVerificationStatus(undefined);
    setSearch("");
    setPage(1);
  };

  const handleRefetch = async () => {
    try {
      await refetch();
      toast.success("Blood requests refreshed");
    } catch {
      toast.error("Failed to refresh blood requests");
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((current) => current + 1);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8d8dd]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-40 h-[560px] w-[560px] rounded-full bg-red-500/25 blur-3xl" />

        <div className="absolute -right-48 top-0 h-[600px] w-[600px] rounded-full bg-rose-500/25 blur-3xl" />

        <div className="absolute left-1/2 top-[35%] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-red-300/25 blur-3xl" />

        <div className="absolute -bottom-56 -left-32 h-[620px] w-[620px] rounded-full bg-rose-500/25 blur-3xl" />

        <div className="absolute -bottom-56 -right-32 h-[620px] w-[620px] rounded-full bg-red-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-gradient-to-br from-red-300/10 via-white/10 to-rose-400/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_70px_rgba(159,18,57,0.12)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-red-600">
                <Droplets className="h-3.5 w-3.5 fill-current" />
                BloodLink
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Blood Requests
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Find blood requests, check urgency, and help connect the right
                donors with people who need blood.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/recipient/requests/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-rose-700 hover:shadow-xl"
              >
                <Droplets className="h-4 w-4" />
                Create Request
              </Link>

              <button
                type="button"
                onClick={handleRefetch}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isFetching ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="mt-6 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_15px_50px_rgba(159,18,57,0.09)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search hospital, patient, recipient..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition ${
                showFilters || activeFilterCount > 0
                  ? "border-red-300 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters

              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Blood Group */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Blood Group
                  </label>

                  <select
                    value={bloodGroup ?? ""}
                    onChange={(event) => {
                      setBloodGroup(
                        (event.target.value || undefined) as
                          | BloodGroup
                          | undefined
                      );
                      setPage(1);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="">All blood groups</option>

                    {BLOOD_GROUP_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Urgency
                  </label>

                  <select
                    value={urgency ?? ""}
                    onChange={(event) => {
                      setUrgency(
                        (event.target.value || undefined) as
                          | UrgencyLevel
                          | undefined
                      );
                      setPage(1);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="">All urgency</option>

                    {URGENCY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </label>

                  <select
                    value={status ?? ""}
                    onChange={(event) => {
                      setStatus(
                        (event.target.value || undefined) as
                          | BloodRequestStatus
                          | undefined
                      );
                      setPage(1);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="">All statuses</option>

                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verification */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Verification
                  </label>

                  <select
                    value={verificationStatus ?? ""}
                    onChange={(event) => {
                      setVerificationStatus(
                        (event.target.value || undefined) as
                          | VerificationStatus
                          | undefined
                      );
                      setPage(1);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="">All verification</option>

                    {VERIFICATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Sort
                  </label>

                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="createdAt">Created date</option>
                    <option value="requiredDate">Required date</option>
                    <option value="urgency">Urgency</option>
                    <option value="bloodGroup">Blood group</option>
                    <option value="status">Status</option>
                  </select>

                  <select
                    value={sortOrder}
                    onChange={(event) => {
                      setSortOrder(event.target.value as SortOrder);
                      setPage(1);
                    }}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Result header */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Requests
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {isLoading
                ? "Loading blood requests..."
                : `${filteredRequests.length} request${
                    filteredRequests.length === 1 ? "" : "s"
                  } shown`}
            </p>
          </div>

          {isFetching && !isLoading && (
            <div className="inline-flex items-center gap-2 text-xs font-medium text-red-600">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Updating...
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BloodRequestSkeleton key={index} />
            ))}
          </section>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <section className="mt-5 rounded-2xl border border-red-200 bg-white/90 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Unable to load blood requests
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading the blood requests."}
            </p>

            <button
              type="button"
              onClick={handleRefetch}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </section>
        )}

        {/* Empty */}
        {!isLoading &&
          !isError &&
          filteredRequests.length === 0 && (
            <section className="mt-5 rounded-2xl border border-red-100 bg-white/90 px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Droplets className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No blood requests found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We could not find any blood requests matching your current
                filters. Try changing the filters or search again.
              </p>

              {(activeFilterCount > 0 || search) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </section>
          )}

        {/* Requests */}
        {!isLoading && !isError && filteredRequests.length > 0 && (
          <>
            <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredRequests.map((request) => (
                <BloodRequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Page{" "}
                  <span className="font-bold text-slate-900">
                    {meta?.page ?? page}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={page <= 1 || isFetching}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="hidden h-10 items-center rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600 sm:flex">
                    {page}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={page >= totalPages || isFetching}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}