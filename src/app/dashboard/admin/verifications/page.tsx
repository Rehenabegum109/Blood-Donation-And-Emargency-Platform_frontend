
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import VerificationHeader from "@/src/components/dashboard/admin/verifications/VerificationHeader";
import VerificationTable from "@/src/components/dashboard/admin/verifications/VerificationTable";
import VerificationDetails from "@/src/components/dashboard/admin/verifications/VerificationDetails";
import RejectRequestDialog from "@/src/components/dashboard/admin/verifications/RejectRequestDialog";

import {
  useGetBloodRequests,
  useVerifyBloodRequest,
  useRejectBloodRequest,
} from "@/src/hooks/use-blood-request";

import type { IBloodRequest } from "@/src/types/blood-request.types";

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData &&
      typeof responseData.message === "string"
    ) {
      return responseData.message;
    }

    return error.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

export default function AdminVerificationsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [selectedRequest, setSelectedRequest] =
    useState<IBloodRequest | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [rejectRequest, setRejectRequest] =
    useState<IBloodRequest | null>(null);

  const { data, isLoading, isError, error } = useGetBloodRequests({
    page,
    limit,
    verificationStatus: "PENDING",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const verifyMutation = useVerifyBloodRequest();
  const rejectMutation = useRejectBloodRequest();

  const requests = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 1;

  const handleView = (request: IBloodRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleVerify = async (id: string) => {
    try {
      await verifyMutation.mutateAsync(id);

      toast.success("Blood request verified successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleReject = (request: IBloodRequest) => {
    setRejectRequest(request);
  };

  const handleConfirmReject = async (rejectionReason: string) => {
    if (!rejectRequest) {
      return;
    }

    try {
      await rejectMutation.mutateAsync({
        id: rejectRequest.id,
        rejectionReason,
      });

      toast.success("Blood request rejected successfully");

      setRejectRequest(null);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((currentPage) =>
      Math.min(currentPage + 1, totalPages)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <VerificationHeader />

        {/* Error */}
        {isError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {getErrorMessage(error)}
            </p>
          </div>
        )}

        {/* Table */}
        <VerificationTable
          requests={requests}
          isLoading={isLoading}
          isVerifying={verifyMutation.isPending}
          verifyingId={verifyMutation.variables}
          onView={handleView}
          onVerify={handleVerify}
          onReject={handleReject}
        />

        {/* Pagination */}
        {!isLoading && !isError && requests.length > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-800">
                {meta?.page ?? page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page <= 1}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Request Details */}
        {selectedRequest && (
          <VerificationDetails
            request={selectedRequest}
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
          />
        )}

        {/* Reject Dialog */}
        {rejectRequest && (
          <RejectRequestDialog
            key={rejectRequest.id}
            request={rejectRequest}
            open={Boolean(rejectRequest)}
            isSubmitting={rejectMutation.isPending}
            onOpenChange={(open: boolean) => {
              if (!open) {
                setRejectRequest(null);
              }
            }}
            onConfirm={handleConfirmReject}
          />
        )}
      </div>
    </div>
  );
}
