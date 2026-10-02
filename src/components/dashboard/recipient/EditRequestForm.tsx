"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUpdateBloodRequest } from "@/src/hooks/use-blood-request";

import type {
  BloodGroup,
  UrgencyLevel,
  IBloodRequest,
  IUpdateBloodRequestPayload,
} from "@/src/types/blood-request.types";

interface EditRequestFormProps {
  request: IBloodRequest;
}

interface FormState {
  bloodGroup: BloodGroup;
  units: string;
  urgency: UrgencyLevel;
  requiredDate: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalLatitude: string;
  hospitalLongitude: string;
  patientName: string;
  contactNumber: string;
  notes: string;
}

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

const urgencyLevels: UrgencyLevel[] = [
  "LOW",
  "NORMAL",
  "HIGH",
  "CRITICAL",
];

function formatBloodGroup(value: string) {
  return value
    .replace("_POSITIVE", " +")
    .replace("_NEGATIVE", " -");
}

function formatUrgency(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function getDateTimeLocalValue(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function createInitialForm(request: IBloodRequest): FormState {
  return {
    bloodGroup: request.bloodGroup,
    units: String(request.units),
    urgency: request.urgency,
    requiredDate: getDateTimeLocalValue(request.requiredDate),
    hospitalName: request.hospitalName,
    hospitalAddress: request.hospitalAddress ?? "",
    hospitalLatitude:
      request.hospitalLatitude !== null &&
      request.hospitalLatitude !== undefined
        ? String(request.hospitalLatitude)
        : "",
    hospitalLongitude:
      request.hospitalLongitude !== null &&
      request.hospitalLongitude !== undefined
        ? String(request.hospitalLongitude)
        : "",
    patientName: request.patientName ?? "",
    contactNumber: request.contactNumber ?? "",
    notes: request.notes ?? "",
  };
}

export default function EditRequestForm({
  request,
}: EditRequestFormProps) {
  const router = useRouter();

  const updateMutation = useUpdateBloodRequest();

  const [form, setForm] = useState<FormState>(() =>
    createInitialForm(request)
  );

  const [error, setError] = useState("");

  function handleChange(
    field: keyof FormState,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const units = Number(form.units);

    if (!form.bloodGroup) {
      setError("Please select a blood group.");
      return;
    }

    if (!form.units || Number.isNaN(units) || units < 1) {
      setError("Units must be at least 1.");
      return;
    }

    if (!form.hospitalName.trim()) {
      setError("Hospital name is required.");
      return;
    }

    if (!form.requiredDate) {
      setError("Required date is required.");
      return;
    }

    const requiredDate = new Date(form.requiredDate);

    if (Number.isNaN(requiredDate.getTime())) {
      setError("Please enter a valid required date.");
      return;
    }

    const payload: IUpdateBloodRequestPayload = {
      bloodGroup: form.bloodGroup,
      units,
      urgency: form.urgency,
      hospitalName: form.hospitalName.trim(),
      requiredDate,
      hospitalAddress:
        form.hospitalAddress.trim() || undefined,
      hospitalLatitude:
        form.hospitalLatitude.trim() !== ""
          ? Number(form.hospitalLatitude)
          : undefined,
      hospitalLongitude:
        form.hospitalLongitude.trim() !== ""
          ? Number(form.hospitalLongitude)
          : undefined,
      patientName:
        form.patientName.trim() || undefined,
      contactNumber:
        form.contactNumber.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };

    try {
      await updateMutation.mutateAsync({
        id: request.id,
        payload,
      });

      toast.success("Blood request updated successfully.");

      router.push(
        `/dashboard/recipient/requests/${request.id}`
      );
    } catch (err) {
      console.error("Update blood request error:", err);

      setError(
        "Failed to update blood request. Please try again."
      );

      toast.error("Failed to update blood request.");
    }
  }

  function handleCancel() {
    router.push(
      `/dashboard/recipient/requests/${request.id}`
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/40">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-red-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Request Details
            </button>

            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Edit Blood Request
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Update the information of your blood request.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-zinc-100 bg-gradient-to-r from-red-50 to-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Droplets className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-zinc-900">
                  Request Information
                </h2>

                <p className="text-sm text-zinc-500">
                  Make the necessary changes below.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8 p-6">
              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Blood Information */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold text-zinc-900">
                    Blood Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {/* Blood Group */}
                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Blood Group
                    </label>

                    <select
                      id="bloodGroup"
                      value={form.bloodGroup}
                      onChange={(event) =>
                        handleChange(
                          "bloodGroup",
                          event.target.value as BloodGroup
                        )
                      }
                      className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
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
                    <label
                      htmlFor="units"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Blood Units
                    </label>

                    <input
                      id="units"
                      type="number"
                      min="1"
                      value={form.units}
                      onChange={(event) =>
                        handleChange(
                          "units",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Urgency */}
                  <div>
                    <label
                      htmlFor="urgency"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Urgency
                    </label>

                    <select
                      id="urgency"
                      value={form.urgency}
                      onChange={(event) =>
                        handleChange(
                          "urgency",
                          event.target.value as UrgencyLevel
                        )
                      }
                      className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      {urgencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {formatUrgency(level)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Date */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold text-zinc-900">
                    Required Date
                  </h3>
                </div>

                <div className="max-w-md">
                  <label
                    htmlFor="requiredDate"
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    When is the blood needed?
                  </label>

                  <input
                    id="requiredDate"
                    type="datetime-local"
                    value={form.requiredDate}
                    onChange={(event) =>
                      handleChange(
                        "requiredDate",
                        event.target.value
                      )
                    }
                    className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </section>

              {/* Hospital Information */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <Hospital className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold text-zinc-900">
                    Hospital Information
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Hospital Name */}
                  <div>
                    <label
                      htmlFor="hospitalName"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Hospital Name *
                    </label>

                    <input
                      id="hospitalName"
                      type="text"
                      value={form.hospitalName}
                      onChange={(event) =>
                        handleChange(
                          "hospitalName",
                          event.target.value
                        )
                      }
                      placeholder="Enter hospital name"
                      className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Hospital Address */}
                  <div>
                    <label
                      htmlFor="hospitalAddress"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Hospital Address
                    </label>

                    <textarea
                      id="hospitalAddress"
                      rows={3}
                      value={form.hospitalAddress}
                      onChange={(event) =>
                        handleChange(
                          "hospitalAddress",
                          event.target.value
                        )
                      }
                      placeholder="Enter hospital address"
                      className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Coordinates */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="hospitalLatitude"
                        className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700"
                      >
                        <MapPin className="h-4 w-4 text-red-500" />
                        Hospital Latitude
                      </label>

                      <input
                        id="hospitalLatitude"
                        type="number"
                        step="any"
                        value={form.hospitalLatitude}
                        onChange={(event) =>
                          handleChange(
                            "hospitalLatitude",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 24.8949"
                        className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="hospitalLongitude"
                        className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700"
                      >
                        <MapPin className="h-4 w-4 text-red-500" />
                        Hospital Longitude
                      </label>

                      <input
                        id="hospitalLongitude"
                        type="number"
                        step="any"
                        value={form.hospitalLongitude}
                        onChange={(event) =>
                          handleChange(
                            "hospitalLongitude",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 91.8687"
                        className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Patient Information */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold text-zinc-900">
                    Patient Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Patient Name */}
                  <div>
                    <label
                      htmlFor="patientName"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Patient Name
                    </label>

                    <input
                      id="patientName"
                      type="text"
                      value={form.patientName}
                      onChange={(event) =>
                        handleChange(
                          "patientName",
                          event.target.value
                        )
                      }
                      placeholder="Enter patient name"
                      className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                      Contact Number
                    </label>

                    <input
                      id="contactNumber"
                      type="tel"
                      value={form.contactNumber}
                      onChange={(event) =>
                        handleChange(
                          "contactNumber",
                          event.target.value
                        )
                      }
                      placeholder="Enter contact number"
                      className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Additional Notes
                </label>

                <textarea
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(event) =>
                    handleChange("notes", event.target.value)
                  }
                  placeholder="Add any additional information..."
                  className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </section>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 bg-zinc-50 px-6 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updateMutation.isPending}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updateMutation.isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}