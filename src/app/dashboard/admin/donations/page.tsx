"use client";

import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import {
  useGetAdminDonations,
} from "@/src/hooks/use-admin";

import type {
  AdminBloodGroup,
  AdminDonationStatus,
  IAdminDonation,
} from "@/src/types/admin.types";

import DonationsHeader from "@/src/components/dashboard/admin/donations/DonationsHeader";
import DonationsFilters from "@/src/components/dashboard/admin/donations/DonationsFilters";
import DonationsTable from "@/src/components/dashboard/admin/donations/DonationsTable";
import DonationDetails from "@/src/components/dashboard/admin/donations/DonationDetails";
import DonationsPagination from "@/src/components/dashboard/admin/donations/DonationsPagination";

const LIMIT = 10;

export default function AdminDonationsPage() {
  const [page, setPage] = useState(1);

  const [status, setStatus] =
    useState<AdminDonationStatus | "">("");

  const [bloodGroup, setBloodGroup] =
    useState<AdminBloodGroup | "">("");

  const [selectedDonation, setSelectedDonation] =
    useState<IAdminDonation | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAdminDonations({
    page,
    limit: LIMIT,
    ...(status ? { status } : {}),
    ...(bloodGroup ? { bloodGroup } : {}),
  });

  const donations = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const handleStatusChange = (
    value: AdminDonationStatus | ""
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleBloodGroupChange = (
    value: AdminBloodGroup | ""
  ) => {
    setBloodGroup(value);
    setPage(1);
  };

  const handleReset = () => {
    setStatus("");
    setBloodGroup("");
    setPage(1);
  };

  const handleView = (
    donation: IAdminDonation
  ) => {
    setSelectedDonation(donation);
  };

  const handleCloseDetails = () => {
    setSelectedDonation(null);
  };

  const handleRetry = async () => {
    try {
      await refetch();

      toast.success("Donations refreshed");
    } catch {
      toast.error("Failed to refresh donations");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <DonationsHeader
          total={meta?.total ?? 0}
        />

        <DonationsFilters
          status={status}
          bloodGroup={bloodGroup}
          onStatusChange={handleStatusChange}
          onBloodGroupChange={handleBloodGroupChange}
          onReset={handleReset}
        />

        {isError ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Failed to load donations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while loading donations."}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <DonationsTable
              donations={donations}
              isLoading={isLoading}
              onView={handleView}
            />

            {!isLoading && meta && (
              <DonationsPagination
                page={meta.page}
                totalPages={meta.totalPage}
                total={meta.total}
                limit={meta.limit}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      <DonationDetails
        donation={selectedDonation}
        onClose={handleCloseDetails}
      />
    </div>
  );
}