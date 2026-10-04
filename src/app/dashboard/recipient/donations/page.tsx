"use client";

import {
  CheckCircle2,
  Clock3,
  Heart,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import DonationCard from "@/src/components/dashboard/recipient/DonationCard";

import {
  useApproveDonation,
  useGetReceivedDonations,
  useRejectDonation,
} from "@/src/hooks/use-donor";

export default function RecipientDonationsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useGetReceivedDonations(1, 20);

  const approveDonation = useApproveDonation();
  const rejectDonation = useRejectDonation();

  const donations = data?.data?.data ?? [];

  const handleApprove = (donationId: string) => {
    approveDonation.mutate(donationId, {
      onSuccess: () => {
        toast.success("Donation approved successfully");
      },
      onError: (error) => {
        console.error("Approve donation error:", error);

        toast.error(
          "Unable to approve donation"
        );
      },
    });
  };

  const handleReject = (donationId: string) => {
    rejectDonation.mutate(donationId, {
      onSuccess: () => {
        toast.success("Donation rejected successfully");
      },
      onError: (error) => {
        console.error("Reject donation error:", error);

        toast.error(
          "Unable to reject donation"
        );
      },
    });
  };

  const pendingCount = donations.filter(
    (donation) => donation.status === "PENDING"
  ).length;

  const acceptedCount = donations.filter(
    (donation) => donation.status === "ACCEPTED"
  ).length;

  const rejectedCount = donations.filter(
    (donation) => donation.status === "REJECTED"
  ).length;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Heart className="h-6 w-6 fill-current" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Donation Requests
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Review and manage donor responses to your
              blood requests.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-800">
                {pendingCount}
              </p>
            </div>

            <Clock3 className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">
                Accepted
              </p>

              <p className="mt-1 text-2xl font-bold text-green-800">
                {acceptedCount}
              </p>
            </div>

            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">
                Rejected
              </p>

              <p className="mt-1 text-2xl font-bold text-red-800">
                {rejectedCount}
              </p>
            </div>

            <XCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />

            <p className="mt-3 text-sm text-zinc-500">
              Loading donation requests...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <XCircle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-3 text-lg font-semibold text-red-800">
            Unable to load donations
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Please refresh the page and try again.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && donations.length === 0 && (
        <div className="rounded-2xl border border-dashed border-red-200 bg-white p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-red-200" />

          <h2 className="mt-4 text-lg font-semibold text-zinc-800">
            No donation requests yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            When a donor accepts one of your verified blood
            requests, their donation request will appear here.
          </p>
        </div>
      )}

      {/* Donations */}
      {!isLoading && !isError && donations.length > 0 && (
        <div className="space-y-5">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onApprove={handleApprove}
              onReject={handleReject}
              isApproving={
                approveDonation.isPending &&
                approveDonation.variables === donation.id
              }
              isRejecting={
                rejectDonation.isPending &&
                rejectDonation.variables === donation.id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}