
"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Droplets,
  MapPin,
  Phone,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  useFindNearbyDonors,
  useMatchDonors,
} from "@/src/hooks/use-donor";

import { useGetBloodRequests } from "@/src/hooks/use-blood-request";

import type {
  BloodGroup,
  IBloodRequest,
} from "@/src/types/blood-request.types";

import type {
  IMatchedDonor,
  INearbyDonor,
} from "@/src/types/donor.types";

type SearchMode = "matched" | "nearby";

type Donor = IMatchedDonor | INearbyDonor;

const bloodGroupLabels: Record<BloodGroup, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

const urgencyStyles: Record<
  IBloodRequest["urgency"],
  string
> = {
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
  NORMAL: "border-blue-200 bg-blue-50 text-blue-700",
  HIGH: "border-orange-200 bg-orange-50 text-orange-700",
  CRITICAL: "border-red-200 bg-red-50 text-red-700",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isNearbyDonor(
  donor: Donor
): donor is INearbyDonor {
  return "distanceKm" in donor;
}

function RequestCard({
  request,
  selected,
  onSelect,
}: {
  request: IBloodRequest;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-red-500 bg-red-50 shadow-lg shadow-red-200/40"
          : "border-red-100 bg-white/95 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Droplets className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {request.hospitalName}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">
              {request.hospitalAddress ||
                "Hospital address unavailable"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${urgencyStyles[request.urgency]}`}
        >
          {request.urgency}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-red-50/70 p-3">
          <p className="text-xs text-slate-500">
            Blood Group
          </p>

          <p className="mt-1 font-bold text-red-600">
            {bloodGroupLabels[request.bloodGroup]}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Units
          </p>

          <p className="mt-1 font-bold text-slate-800">
            {request.units}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Required
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {formatDate(request.requiredDate)}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-xs text-slate-500">
            Verification
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-600">
            VERIFIED
          </p>
        </div>
      </div>

      {selected && (
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-red-600">
          <CheckCircle2 className="h-4 w-4" />
          Selected blood request
        </div>
      )}
    </button>
  );
}

function DonorCard({
  donor,
  nearby,
}: {
  donor: Donor;
  nearby: boolean;
}) {
  const { user } = donor;

  return (
    <div className="rounded-2xl border border-red-100 bg-white/95 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-100/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100 text-red-600 ring-4 ring-red-50">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-5 w-5" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {user.name || "Anonymous Donor"}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                {bloodGroupLabels[
                  donor.bloodGroup as BloodGroup
                ] || donor.bloodGroup}
              </span>

              {donor.isAvailable && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              )}
            </div>
          </div>
        </div>

        {nearby && isNearbyDonor(donor) && (
          <div className="shrink-0 rounded-xl bg-blue-50 px-3 py-2 text-center">
            <MapPin className="mx-auto h-4 w-4 text-blue-600" />

            <p className="mt-1 text-xs font-bold text-blue-700">
              {donor.distanceKm} km
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {user.location && (
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>{user.location}</span>
          </div>
        )}

        {donor.address && (
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>{donor.address}</span>
          </div>
        )}

        {user.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{user.phone}</span>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">
            Last donation
          </span>

          <span className="font-medium text-slate-700">
            {donor.lastDonationDate
              ? formatDate(donor.lastDonationDate)
              : "No record"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FindDonorsPage() {
  const [selectedRequestId, setSelectedRequestId] =
    useState<string>();

  const [mode, setMode] =
    useState<SearchMode>("matched");

  const [radius, setRadius] = useState(20);

  const {
    data: requestResponse,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useGetBloodRequests({
    page: 1,
    limit: 100,
    status: "PENDING",
    verificationStatus: "VERIFIED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const requests = useMemo(
    () => requestResponse?.data ?? [],
    [requestResponse]
  );

  const selectedRequest = requests.find(
    (request) => request.id === selectedRequestId
  );

  const matchedQuery = useMatchDonors(
    mode === "matched"
      ? selectedRequestId
      : undefined
  );

  const nearbyQuery = useFindNearbyDonors(
    mode === "nearby"
      ? selectedRequestId
      : undefined,
    radius
  );

  const donors: Donor[] =
    mode === "matched"
      ? matchedQuery.data?.data?.donors ?? []
      : nearbyQuery.data?.data?.donors ?? [];

  const isDonorsLoading =
    mode === "matched"
      ? matchedQuery.isLoading
      : nearbyQuery.isLoading;

  const donorError =
    mode === "matched"
      ? matchedQuery.isError
      : nearbyQuery.isError;

  const handleSelectRequest = (
    request: IBloodRequest
  ) => {
    setSelectedRequestId(request.id);
  };

  const handleModeChange = (
    nextMode: SearchMode
  ) => {
    if (!selectedRequestId) {
      toast.error(
        "Please select a blood request first."
      );
      return;
    }

    if (
      nextMode === "nearby" &&
      (!selectedRequest?.hospitalLatitude ||
        !selectedRequest?.hospitalLongitude)
    ) {
      toast.error(
        "This blood request does not have hospital coordinates."
      );
      return;
    }

    setMode(nextMode);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffe4e8]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Red Glow */}
        <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-red-400/30 blur-3xl" />

        {/* Top Right Rose Glow */}
        <div className="absolute -right-40 top-10 h-[550px] w-[550px] rounded-full bg-rose-400/30 blur-3xl" />

        {/* Center Red Glow */}
        <div className="absolute left-1/2 top-[35%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-300/25 blur-3xl" />

        {/* Bottom Left */}
        <div className="absolute -bottom-48 -left-20 h-[550px] w-[550px] rounded-full bg-rose-400/30 blur-3xl" />

        {/* Bottom Right */}
        <div className="absolute -bottom-48 -right-20 h-[550px] w-[550px] rounded-full bg-red-400/25 blur-3xl" />

        {/* Overall Red Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 via-transparent to-rose-300/25" />

        {/* Soft White Center */}
        <div className="absolute left-1/2 top-[45%] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="border-b border-red-200/70 bg-white/65 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-300/50">
                <Search className="h-7 w-7" />
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Find Blood Donors
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-slate-700">
                Find available compatible blood donors
                for verified emergency blood requests.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            {/* Blood Requests */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Blood Requests
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    Select a request to find donors
                  </p>
                </div>

                <span className="rounded-full border border-red-200 bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm">
                  {requests.length} Requests
                </span>
              </div>

              {requestsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-48 animate-pulse rounded-2xl bg-white/60 shadow-sm"
                    />
                  ))}
                </div>
              ) : requestsError ? (
                <div className="rounded-2xl border border-red-300 bg-red-50/95 p-6 text-center shadow-sm">
                  <AlertCircle className="mx-auto h-7 w-7 text-red-500" />

                  <p className="mt-3 font-semibold text-red-700">
                    Unable to load blood requests
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    Please login as a recipient or admin.
                  </p>
                </div>
              ) : requests.length === 0 ? (
                <div className="rounded-2xl border border-red-100 bg-white/90 p-8 text-center shadow-sm">
                  <Droplets className="mx-auto h-8 w-8 text-red-300" />

                  <p className="mt-3 font-semibold text-slate-700">
                    No verified pending requests
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    There are currently no requests
                    available for donor matching.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      selected={
                        request.id === selectedRequestId
                      }
                      onSelect={() =>
                        handleSelectRequest(request)
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Donors */}
            <div>
              <div className="rounded-2xl border border-red-100 bg-white/90 p-5 shadow-lg shadow-red-200/20 backdrop-blur-md">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Available Donors
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                      {selectedRequest
                        ? `Donors for ${
                            bloodGroupLabels[
                              selectedRequest.bloodGroup
                            ]
                          } blood request`
                        : "Select a blood request first"}
                    </p>
                  </div>

                  <div className="flex rounded-xl bg-red-100/80 p-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleModeChange("matched")
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        mode === "matched"
                          ? "bg-white text-red-600 shadow-md"
                          : "text-red-700/70 hover:text-red-800"
                      }`}
                    >
                      Compatible
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleModeChange("nearby")
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        mode === "nearby"
                          ? "bg-white text-red-600 shadow-md"
                          : "text-red-700/70 hover:text-red-800"
                      }`}
                    >
                      Nearby
                    </button>
                  </div>
                </div>

                {mode === "nearby" && (
                  <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/90 p-4">
                    <MapPin className="h-5 w-5 text-blue-600" />

                    <span className="text-sm font-medium text-blue-800">
                      Search radius
                    </span>

                    {[5, 10, 20, 50].map(
                      (value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setRadius(value)
                          }
                          disabled={!selectedRequestId}
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                            radius === value
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-white text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {value} km
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {!selectedRequestId ? (
                <div className="mt-5 rounded-2xl border border-dashed border-red-300 bg-white/75 p-12 text-center shadow-sm backdrop-blur-sm">
                  <Users className="mx-auto h-10 w-10 text-red-300" />

                  <h3 className="mt-4 font-semibold text-slate-800">
                    Select a blood request
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    Choose a verified pending request
                    from the left to see compatible
                    donors.
                  </p>
                </div>
              ) : isDonorsLoading ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-64 animate-pulse rounded-2xl bg-white/60 shadow-sm"
                    />
                  ))}
                </div>
              ) : donorError ? (
                <div className="mt-5 rounded-2xl border border-red-300 bg-red-50/95 p-8 text-center shadow-sm">
                  <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

                  <h3 className="mt-3 font-semibold text-red-700">
                    Donor search failed
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    This request may no longer be
                    eligible for donor matching.
                  </p>
                </div>
              ) : donors.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-red-100 bg-white/90 p-10 text-center shadow-sm">
                  <Users className="mx-auto h-9 w-9 text-red-200" />

                  <h3 className="mt-3 font-semibold text-slate-800">
                    No donors found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    No available compatible donors were
                    found for this request.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-slate-600">
                      {donors.length} donor
                      {donors.length !== 1
                        ? "s"
                        : ""}{" "}
                      found
                    </p>

                    {mode === "matched" &&
                      matchedQuery.data?.data
                        ?.compatibleBloodGroups && (
                        <p className="text-xs text-slate-600">
                          Compatible:{" "}
                          {matchedQuery.data.data.compatibleBloodGroups
                            .map(
                              (group: BloodGroup) =>
                                bloodGroupLabels[group] ||
                                group
                            )
                            .join(", ")}
                        </p>
                      )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {donors.map((donor) => (
                      <DonorCard
                        key={donor.id}
                        donor={donor}
                        nearby={mode === "nearby"}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}