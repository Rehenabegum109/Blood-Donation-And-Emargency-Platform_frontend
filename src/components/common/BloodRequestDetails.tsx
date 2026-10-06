
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, CalendarDays, Hospital, MapPin, User } from "lucide-react";

import { useRouter } from "next/navigation";

import { useGetMe } from "@/src/hooks/useGetMe";
import { useGetBloodRequest } from "@/src/hooks/use-blood-request";

interface Props {
  id: string;
}

export default function BloodRequestDetails({ id }: Props) {
  const router = useRouter();

  const { data: meData, isLoading: meLoading } = useGetMe();

  const isAuthenticated = Boolean(meData?.data);

  const {
    data,
    isLoading: requestLoading,
    isError,
  } = useGetBloodRequest(id);

  useEffect(() => {
    if (!meLoading && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(`/blood-requests/${id}`)}`
      );
    }
  }, [id, isAuthenticated, meLoading, router]);

  if (meLoading || requestLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading request...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) return null;

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="font-semibold text-red-600">
            Blood request not found
          </p>

          <Link
            href="/blood-requests"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Link>
        </div>
      </main>
    );
  }

  const request = data.data;

  const urgencyClass =
    request.urgency === "CRITICAL"
      ? "bg-red-100 text-red-700"
      : request.urgency === "HIGH"
        ? "bg-orange-100 text-orange-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/blood-requests"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blood Requests
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-red-100">Blood Required</p>

                <h1 className="mt-1 text-3xl font-bold">
                  {request.bloodGroup.replace("_", " ")}
                </h1>

                <p className="mt-1 text-sm text-red-100">
                  {request.units} unit{request.units > 1 ? "s" : ""}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${urgencyClass}`}
              >
                {request.urgency}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5 p-6">
            <Info
              icon={<Hospital className="h-5 w-5" />}
              title="Hospital"
              value={request.hospitalName}
            />

            {request.hospitalAddress && (
              <Info
                icon={<MapPin className="h-5 w-5" />}
                title="Address"
                value={request.hospitalAddress}
              />
            )}

            <Info
              icon={<CalendarDays className="h-5 w-5" />}
              title="Required Date"
              value={new Date(request.requiredDate).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            />

            {request.patientName && (
              <Info
                icon={<User className="h-5 w-5" />}
                title="Patient"
                value={request.patientName}
              />
            )}

            {/* Status */}
            <div className="flex flex-wrap gap-2 border-t pt-5">
              <Badge label={`Status: ${request.status}`} />
              <Badge
                label={`Verification: ${request.verificationStatus}`}
              />
            </div>

            {request.notes && (
              <div className="border-t pt-5">
                <p className="text-sm font-semibold text-slate-700">
                  Notes
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {request.notes}
                </p>
              </div>
            )}

            {/* Recipient */}
            <div className="border-t pt-5">
              <p className="text-sm font-semibold text-slate-700">
                Requested by
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {request.recipient.name}
              </p>

              {request.recipient.location && (
                <p className="text-sm text-slate-500">
                  {request.recipient.location}
                </p>
              )}
            </div>

            {/* Find Donors */}
            {request.status === "PENDING" &&
              request.verificationStatus === "VERIFIED" && (
                <Link
                  href={`/find-donors?requestId=${request.id}`}
                  className="flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Find Matching Donors
                </Link>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-red-600">{icon}</div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
      {label}
    </span>
  );
}



