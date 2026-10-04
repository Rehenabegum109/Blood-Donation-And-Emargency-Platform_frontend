"use client";

import type { ReactNode } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  Phone,
  User,
  X,
  XCircle,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

interface VerificationDetailsProps {
  request: IBloodRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

/**
 * Keep this component outside VerificationDetails.
 * React Compiler does not allow components to be
 * created inside another component's render.
 */
function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-800">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function getUrgencyClass(
  urgency: IBloodRequest["urgency"]
): string {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";

    case "HIGH":
      return "bg-orange-100 text-orange-700";

    case "NORMAL":
      return "bg-blue-100 text-blue-700";

    case "LOW":
      return "bg-slate-100 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function VerificationDetails({
  request,
  open,
  onOpenChange,
}: VerificationDetailsProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Blood Request Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review complete request information
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Verification + Urgency */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getUrgencyClass(
                request.urgency
              )}`}
            >
              {request.urgency}
            </span>

            {request.verificationStatus === "PENDING" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                <Clock3 className="h-4 w-4" />
                PENDING
              </span>
            )}

            {request.verificationStatus === "VERIFIED" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                VERIFIED
              </span>
            )}

            {request.verificationStatus === "REJECTED" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                <XCircle className="h-4 w-4" />
                REJECTED
              </span>
            )}
          </div>

          {/* Blood Information */}
          <section className="rounded-xl border border-red-100 bg-red-50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-red-600" />

              <h3 className="font-semibold text-slate-900">
                Blood Information
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={
                  <Droplets className="h-5 w-5" />
                }
                label="Blood Group"
                value={request.bloodGroup}
              />

              <InfoItem
                icon={
                  <Droplets className="h-5 w-5" />
                }
                label="Required Units"
                value={`${request.units} unit${
                  request.units > 1 ? "s" : ""
                }`}
              />

              <InfoItem
                icon={
                  <CalendarDays className="h-5 w-5" />
                }
                label="Required Date"
                value={formatDate(request.requiredDate)}
              />

              <InfoItem
                icon={
                  <Clock3 className="h-5 w-5" />
                }
                label="Request Status"
                value={request.status}
              />
            </div>
          </section>

          {/* Patient Information */}
          <section className="rounded-xl border border-slate-200 p-5">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-slate-600" />

              <h3 className="font-semibold text-slate-900">
                Patient Information
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={
                  <User className="h-5 w-5" />
                }
                label="Patient Name"
                value={request.patientName ?? "N/A"}
              />

              <InfoItem
                icon={
                  <Phone className="h-5 w-5" />
                }
                label="Contact Number"
                value={request.contactNumber ?? "N/A"}
              />

              <InfoItem
                icon={
                  <User className="h-5 w-5" />
                }
                label="Recipient"
                value={request.recipient.name}
              />

              <InfoItem
                icon={
                  <Phone className="h-5 w-5" />
                }
                label="Recipient Phone"
                value={request.recipient.phone ?? "N/A"}
              />
            </div>
          </section>

          {/* Hospital Information */}
          <section className="rounded-xl border border-slate-200 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Hospital className="h-5 w-5 text-slate-600" />

              <h3 className="font-semibold text-slate-900">
                Hospital Information
              </h3>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={
                  <Hospital className="h-5 w-5" />
                }
                label="Hospital"
                value={request.hospitalName}
              />

              <InfoItem
                icon={
                  <MapPin className="h-5 w-5" />
                }
                label="Address"
                value={
                  request.hospitalAddress ?? "N/A"
                }
              />
            </div>
          </section>

          {/* Additional Notes */}
          {request.notes && (
            <section className="rounded-xl border border-slate-200 p-5">
              <h3 className="mb-3 font-semibold text-slate-900">
                Additional Notes
              </h3>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {request.notes}
              </p>
            </section>
          )}

          {/* Rejection Reason */}
          {request.verificationStatus === "REJECTED" &&
            request.rejectionReason && (
              <section className="rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold text-red-800">
                    Rejection Reason
                  </h3>
                </div>

                <p className="text-sm leading-6 text-red-700">
                  {request.rejectionReason}
                </p>
              </section>
            )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}