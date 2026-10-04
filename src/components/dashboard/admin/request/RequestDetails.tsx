import {
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import type { IBloodRequest } from "@/src/types/blood-request.types";

import RequestStatusBadge from "./RequestStatusBadge";

interface RequestDetailsProps {
  request: IBloodRequest;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-sm font-semibold text-zinc-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function RequestDetails({
  request,
}: RequestDetailsProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            Blood Request
          </p>

          <h2 className="mt-1 text-xl font-black text-zinc-900">
            {formatBloodGroup(request.bloodGroup)} Blood
          </h2>

          <p className="mt-1 text-xs text-zinc-400">
            ID: {request.id}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <RequestStatusBadge
            type="status"
            value={request.status}
          />

          <RequestStatusBadge
            type="urgency"
            value={request.urgency}
          />

          <RequestStatusBadge
            type="verification"
            value={request.verificationStatus}
          />
        </div>
      </div>

      <div className="my-6 h-px bg-zinc-100" />

      <div className="grid gap-6 md:grid-cols-2">
        <InfoItem
          icon={<Droplets className="h-4 w-4" />}
          label="Blood Group"
          value={formatBloodGroup(request.bloodGroup)}
        />

        <InfoItem
          icon={<Droplets className="h-4 w-4" />}
          label="Required Units"
          value={`${request.units} unit${request.units === 1 ? "" : "s"}`}
        />

        <InfoItem
          icon={<Hospital className="h-4 w-4" />}
          label="Hospital"
          value={request.hospitalName}
        />

        <InfoItem
          icon={<MapPin className="h-4 w-4" />}
          label="Hospital Address"
          value={
            request.hospitalAddress ||
            "Address not provided"
          }
        />

        <InfoItem
          icon={<User className="h-4 w-4" />}
          label="Patient"
          value={
            request.patientName ||
            "Patient name not provided"
          }
        />

        <InfoItem
          icon={<Phone className="h-4 w-4" />}
          label="Contact"
          value={
            request.contactNumber ||
            "Contact number not provided"
          }
        />

        <InfoItem
          icon={<CalendarDays className="h-4 w-4" />}
          label="Required Date"
          value={formatDate(request.requiredDate)}
        />

        <InfoItem
          icon={<User className="h-4 w-4" />}
          label="Recipient"
          value={request.recipient.name}
        />
      </div>

      <div className="mt-6 rounded-xl bg-zinc-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Recipient Contact
        </p>

        <div className="mt-3 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
          <p>
            <span className="font-semibold text-zinc-800">
              Phone:
            </span>{" "}
            {request.recipient.phone || "Not provided"}
          </p>

          <p>
            <span className="font-semibold text-zinc-800">
              Location:
            </span>{" "}
            {request.recipient.location ||
              "Not provided"}
          </p>
        </div>
      </div>

      {request.notes && (
        <div className="mt-5 rounded-xl border border-zinc-100 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Additional Notes
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {request.notes}
          </p>
        </div>
      )}

      {request.rejectionReason && (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-red-500">
            Rejection Reason
          </p>

          <p className="mt-2 text-sm leading-6 text-red-700">
            {request.rejectionReason}
          </p>
        </div>
      )}
    </div>
  );
}