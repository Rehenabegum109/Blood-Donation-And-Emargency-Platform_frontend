"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  Send,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";



import type {
  BloodGroup,
  UrgencyLevel,
} from "@/src/types/blood-request.types";
import { useCreateBloodRequest } from "@/src/hooks/use-blood-request";

interface CreateRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  bloodGroup: BloodGroup;
  units: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalLatitude: string;
  hospitalLongitude: string;
  patientName: string;
  contactNumber: string;
  requiredDate: string;
  urgency: UrgencyLevel;
  notes: string;
}

const initialForm: FormData = {
  bloodGroup: "A_POSITIVE",
  units: "1",
  hospitalName: "",
  hospitalAddress: "",
  hospitalLatitude: "",
  hospitalLongitude: "",
  patientName: "",
  contactNumber: "",
  requiredDate: "",
  urgency: "NORMAL",
  notes: "",
};

const bloodGroups: BloodGroup[] = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

const urgencyOptions: UrgencyLevel[] = [
  "LOW",
  "NORMAL",
  "HIGH",
  "CRITICAL",
];

function formatBloodGroup(group: BloodGroup) {
  return group
    .replace("_POSITIVE", "+")
    .replace("_NEGATIVE", "-");
}

function formatUrgency(urgency: UrgencyLevel) {
  return urgency.charAt(0) + urgency.slice(1).toLowerCase();
}

export default function CreateRequestForm({
  onSuccess,
  onCancel,
}: CreateRequestFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);

  const createRequest = useCreateBloodRequest();

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.hospitalName.trim()) {
      toast.error("Hospital name is required.");
      return;
    }

    if (!form.hospitalAddress.trim()) {
      toast.error("Hospital address is required.");
      return;
    }

    if (!form.requiredDate) {
      toast.error("Required date is required.");
      return;
    }

    const units = Number(form.units);

    if (!Number.isInteger(units) || units < 1) {
      toast.error("Blood units must be at least 1.");
      return;
    }

    const latitude = form.hospitalLatitude
      ? Number(form.hospitalLatitude)
      : undefined;

    const longitude = form.hospitalLongitude
      ? Number(form.hospitalLongitude)
      : undefined;

    if (
      latitude !== undefined &&
      (Number.isNaN(latitude) || latitude < -90 || latitude > 90)
    ) {
      toast.error("Latitude must be between -90 and 90.");
      return;
    }

    if (
      longitude !== undefined &&
      (Number.isNaN(longitude) || longitude < -180 || longitude > 180)
    ) {
      toast.error("Longitude must be between -180 and 180.");
      return;
    }

    const requiredDate = new Date(form.requiredDate);

    if (Number.isNaN(requiredDate.getTime())) {
      toast.error("Please enter a valid required date.");
      return;
    }

    createRequest.mutate(
      {
        bloodGroup: form.bloodGroup,
        units,
        hospitalName: form.hospitalName.trim(),
        hospitalAddress: form.hospitalAddress.trim(),

        hospitalLatitude: latitude,
        hospitalLongitude: longitude,

        patientName: form.patientName.trim() || undefined,
        contactNumber: form.contactNumber.trim() || undefined,

        requiredDate,

        urgency: form.urgency,

        notes: form.notes.trim() || undefined,
      },
      {
        onSuccess: (response) => {
          toast.success(
            response.message ||
              "Blood request created successfully."
          );

          setForm(initialForm);

          onSuccess?.();
        },

        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            "Failed to create blood request.";

          toast.error(message);
        },
      }
    );
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-100/30">
      {/* Header */}
      <div className="border-b border-red-100 bg-gradient-to-r from-red-600 to-rose-500 px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Send className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Create Blood Request
            </h2>

            <p className="text-sm text-red-100">
              Provide the patient and hospital information.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Blood Information */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-red-600" />

            <h3 className="font-bold text-zinc-900">
              Blood Information
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Blood Group */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Blood Group *
              </label>

              <select
                value={form.bloodGroup}
                onChange={(event) =>
                  updateField(
                    "bloodGroup",
                    event.target.value as BloodGroup
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
              >
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {formatBloodGroup(group)}
                  </option>
                ))}
              </select>
            </div>

            {/* Units */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Blood Units *
              </label>

              <input
                type="number"
                min={1}
                value={form.units}
                onChange={(event) =>
                  updateField("units", event.target.value)
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="1"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Urgency *
              </label>

              <select
                value={form.urgency}
                onChange={(event) =>
                  updateField(
                    "urgency",
                    event.target.value as UrgencyLevel
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
              >
                {urgencyOptions.map((urgency) => (
                  <option key={urgency} value={urgency}>
                    {formatUrgency(urgency)}
                  </option>
                ))}
              </select>
            </div>

            {/* Required Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Required Date & Time *
              </label>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                <input
                  type="datetime-local"
                  value={form.requiredDate}
                  onChange={(event) =>
                    updateField(
                      "requiredDate",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Information */}
        <div className="mt-8 border-t border-zinc-100 pt-8">
          <div className="mb-4 flex items-center gap-2">
            <Hospital className="h-5 w-5 text-red-600" />

            <h3 className="font-bold text-zinc-900">
              Hospital Information
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Hospital Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Hospital Name *
              </label>

              <input
                type="text"
                value={form.hospitalName}
                onChange={(event) =>
                  updateField(
                    "hospitalName",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="e.g. Sylhet MAG Osmani Medical College Hospital"
              />
            </div>

            {/* Hospital Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Hospital Address *
              </label>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />

                <textarea
                  rows={3}
                  value={form.hospitalAddress}
                  onChange={(event) =>
                    updateField(
                      "hospitalAddress",
                      event.target.value
                    )
                  }
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  placeholder="Full hospital address"
                />
              </div>
            </div>

            {/* Latitude */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Hospital Latitude
              </label>

              <input
                type="number"
                step="any"
                value={form.hospitalLatitude}
                onChange={(event) =>
                  updateField(
                    "hospitalLatitude",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="e.g. 24.8949"
              />
            </div>

            {/* Longitude */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Hospital Longitude
              </label>

              <input
                type="number"
                step="any"
                value={form.hospitalLongitude}
                onChange={(event) =>
                  updateField(
                    "hospitalLongitude",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="e.g. 91.8687"
              />
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mt-8 border-t border-zinc-100 pt-8">
          <div className="mb-4 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-red-600" />

            <h3 className="font-bold text-zinc-900">
              Patient Information
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Patient Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Patient Name
              </label>

              <input
                type="text"
                value={form.patientName}
                onChange={(event) =>
                  updateField(
                    "patientName",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="Patient full name"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Contact Number
              </label>

              <input
                type="tel"
                value={form.contactNumber}
                onChange={(event) =>
                  updateField(
                    "contactNumber",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Additional Notes
              </label>

              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) =>
                  updateField("notes", event.target.value)
                }
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder="Add any additional information..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={createRequest.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createRequest.isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Creating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Create Blood Request
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}