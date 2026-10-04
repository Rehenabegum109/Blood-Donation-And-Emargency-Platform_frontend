"use client";

import {
  CalendarDays,
  Droplets,
  Hospital,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

import type { IAdminDonation } from "@/src/types/admin.types";

import DonationStatusBadge from "./DonationStatusBadge";

interface DonationDetailsProps {
  donation: IAdminDonation | null;
  onClose: () => void;
}

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatDate(value?: string | null) {
  if (!value) return "Not available";

  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

function formatDateTime(value?: string | null) {
  if (!value) return "Not available";

  return new Date(value).toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DonationDetails({
  donation,
  onClose,
}: DonationDetailsProps) {
  if (!donation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Donation Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              ID: {donation.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Droplets className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Donation
                </p>

                <p className="text-lg font-bold text-slate-900">
                  {formatBloodGroup(
                    donation.donor.bloodGroup
                  )}{" "}
                  • {donation.units} unit
                  {donation.units > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <DonationStatusBadge
              status={donation.status}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 p-5">
              <h3 className="mb-5 font-bold text-slate-900">
                Donor Information
              </h3>

              <div className="space-y-4">
                <DetailRow
                  icon={User}
                  label="Name"
                  value={donation.donor.user.name}
                />

                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={donation.donor.user.email}
                />

                <DetailRow
                  icon={Phone}
                  label="Phone"
                  value={
                    donation.donor.user.phone ??
                    "Not provided"
                  }
                />

                <DetailRow
                  icon={Droplets}
                  label="Blood Group"
                  value={formatBloodGroup(
                    donation.donor.bloodGroup
                  )}
                />

                <DetailRow
                  icon={CalendarDays}
                  label="Last Donation"
                  value={formatDate(
                    donation.donor.lastDonationDate
                  )}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-5">
              <h3 className="mb-5 font-bold text-slate-900">
                Recipient Information
              </h3>

              <div className="space-y-4">
                <DetailRow
                  icon={User}
                  label="Name"
                  value={
                    donation.bloodRequest.recipient.name
                  }
                />

                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={
                    donation.bloodRequest.recipient.email
                  }
                />

                <DetailRow
                  icon={Phone}
                  label="Phone"
                  value={
                    donation.bloodRequest.recipient.phone ??
                    "Not provided"
                  }
                />

                <DetailRow
                  icon={Droplets}
                  label="Requested Blood"
                  value={formatBloodGroup(
                    donation.bloodRequest.bloodGroup
                  )}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-5 md:col-span-2">
              <h3 className="mb-5 font-bold text-slate-900">
                Blood Request
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                <DetailRow
                  icon={Hospital}
                  label="Hospital"
                  value={
                    donation.bloodRequest.hospitalName
                  }
                />

                <DetailRow
                  icon={MapPin}
                  label="Hospital Address"
                  value={
                    donation.bloodRequest
                      .hospitalAddress ??
                    "Not provided"
                  }
                />

                <DetailRow
                  icon={User}
                  label="Patient"
                  value={
                    donation.bloodRequest.patientName ??
                    "Not provided"
                  }
                />

                <DetailRow
                  icon={CalendarDays}
                  label="Required Date"
                  value={formatDate(
                    donation.bloodRequest.requiredDate
                  )}
                />

                <DetailRow
                  icon={Droplets}
                  label="Requested Units"
                  value={
                    donation.bloodRequest.units
                  }
                />

                <DetailRow
                  icon={CalendarDays}
                  label="Donation Date"
                  value={formatDate(
                    donation.donationDate
                  )}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-5 md:col-span-2">
              <h3 className="mb-5 font-bold text-slate-900">
                Additional Information
              </h3>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Request Urgency
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {donation.bloodRequest.urgency}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Request Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {donation.bloodRequest.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Verification
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {
                      donation.bloodRequest
                        .verificationStatus
                    }
                  </p>
                </div>
              </div>

              {donation.notes && (
                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Donation Notes
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {donation.notes}
                  </p>
                </div>
              )}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Created:{" "}
                  {formatDateTime(
                    donation.createdAt
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Updated:{" "}
                  {formatDateTime(
                    donation.updatedAt
                  )}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}