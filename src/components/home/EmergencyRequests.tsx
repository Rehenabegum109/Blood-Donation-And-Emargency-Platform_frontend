
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Droplets,
  MapPin,
  Siren,
} from "lucide-react";
import { apiClient } from "@/src/lib/api-client";


type BloodRequest = {
  id: string;
  bloodGroup: string;
  hospitalName?: string;
  hospital?: string;
  hospitalAddress?: string;
  location?: string;
  urgency?: string;
  createdAt?: string;
};

export default function EmergencyRequests() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await apiClient.get("/blood-requests", {
          params: {
            page: 1,
            limit: 3,
          },
        });

        const result = response.data?.data;

        const list = Array.isArray(result)
          ? result
          : Array.isArray(result?.bloodRequests)
            ? result.bloodRequests
            : Array.isArray(result?.requests)
              ? result.requests
              : [];

        setRequests(list.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch blood requests:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.10),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.08),transparent_35%)] py-20">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
              <Siren className="h-4 w-4" />
              Emergency Assistance
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              People Need Blood
              <span className="text-red-600"> Right Now</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Help someone in an emergency by responding to nearby blood
              requests.
            </p>
          </div>

          <Link
            href="/blood-requests"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          >
            View All Requests
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-border bg-card p-6"
              >
                <div className="h-14 w-14 rounded-xl bg-muted" />
                <div className="mt-6 h-4 w-3/4 rounded bg-muted" />
                <div className="mt-3 h-4 w-1/2 rounded bg-muted" />
                <div className="mt-8 h-8 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-500/20 bg-card p-8 text-center">
            <p className="font-semibold text-foreground">
              Unable to load blood requests.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again later or view all requests.
            </p>
            <Link
              href="/blood-requests"
              className="mt-4 inline-flex text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View All Requests
            </Link>
          </div>
        ) : requests.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <Droplets className="mx-auto h-10 w-10 text-red-500" />
            <p className="mt-3 font-semibold text-foreground">
              No blood requests available right now.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5"
              >
                <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  {request.urgency || "Urgent"}
                </div>

                <div className="flex items-center gap-4 pr-16">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-xl font-black text-white shadow-lg shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
                    {request.bloodGroup}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Blood Group
                    </p>
                    <h3 className="mt-1 font-bold text-foreground">
                      {request.bloodGroup} Blood Needed
                    </h3>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-red-500/10 p-2 text-red-600">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Hospital</p>
                    <p className="mt-1 break-words text-sm font-semibold text-foreground">
                      {request.hospitalName ||
                        request.hospital ||
                        "Hospital not specified"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {request.hospitalAddress ||
                        request.location ||
                        "Location not specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="h-4 w-4 shrink-0" />
                    {request.createdAt
                      ? new Date(request.createdAt).toLocaleDateString()
                      : "Blood needed"}
                  </div>

                  <Link
                    href={`/requests/${request.id}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-700"
                  >
                    Respond
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <Droplets className="pointer-events-none absolute -bottom-6 -right-5 h-24 w-24 rotate-12 text-red-500/5 transition-all duration-300 group-hover:text-red-500/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
