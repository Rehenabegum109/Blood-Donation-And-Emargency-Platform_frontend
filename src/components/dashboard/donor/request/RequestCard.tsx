"use client";

import {
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  IBloodRequest,
  UrgencyLevel,
} from "@/src/types/blood-request.types";

import RequestInfoItem from "./RequestInfoItem";

interface RequestCardProps {
  request: IBloodRequest;
  onDonate: (request: IBloodRequest) => void;
  isDonating?: boolean;
}

const urgencyStyles: Record<UrgencyLevel, string> = {
  LOW: "bg-slate-100 text-slate-700",
  NORMAL: "bg-blue-50 text-blue-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const urgencyLabels: Record<UrgencyLevel, string> = {
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
  CRITICAL: "Critical",
};

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RequestCard({
  request,
  onDonate,
  isDonating = false,
}: RequestCardProps) {
  const isPending = request.status === "PENDING";

  return (
    <article className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-100/50">
      <div className="border-b border-red-50 bg-gradient-to-r from-red-50 via-white to-rose-50 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-lg font-bold text-white shadow-lg shadow-red-200">
              {formatBloodGroup(request.bloodGroup)}
            </div>

            <div>
              <h2 className="font-bold text-zinc-900">
                {request.patientName || "Blood Needed"}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                <Hospital className="h-3.5 w-3.5" />
                {request.hospitalName}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              urgencyStyles[request.urgency]
            }`}
          >
            {urgencyLabels[request.urgency]}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <RequestInfoItem
            icon={Droplets}
            label="Blood Required"
            value={`${formatBloodGroup(request.bloodGroup)} • ${request.units} unit${
              request.units > 1 ? "s" : ""
            }`}
          />

          <RequestInfoItem
            icon={CalendarDays}
            label="Required Date"
            value={formatDate(request.requiredDate)}
          />

          <RequestInfoItem
            icon={Hospital}
            label="Hospital"
            value={request.hospitalName}
          />

          <RequestInfoItem
            icon={MapPin}
            label="Hospital Address"
            value={request.hospitalAddress || "Address not provided"}
          />

          <RequestInfoItem
            icon={UserRound}
            label="Requested By"
            value={request.recipient.name}
          />

          <RequestInfoItem
            icon={MapPin}
            label="Recipient Location"
            value={request.recipient.location || "Location not provided"}
          />
        </div>

        {request.notes && (
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Additional Notes
            </p>

            <p className="text-sm leading-6 text-zinc-600">
              {request.notes}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-400">
              Request status
            </span>

            <p className="mt-1 text-sm font-semibold text-zinc-700">
              {request.status}
            </p>
          </div>

          <Button
            type="button"
            isDisabled={!isPending || isDonating}
            onClick={() => onDonate(request)}
            className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
          >
            <Droplets className="mr-2 h-4 w-4" />

            {isDonating ? "Submitting..." : "Donate Now"}
          </Button>
        </div>
      </div>
    </article>
  );
}