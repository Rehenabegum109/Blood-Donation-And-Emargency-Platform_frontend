"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useGetBloodRequests } from "@/src/hooks/use-blood-request";
import { useCreateDonation } from "@/src/hooks/use-donation";

import type { IBloodRequest } from "@/src/types/blood-request.types";

import RequestsHeader from "@/src/components/dashboard/donor/request/RequestsHeader";
import RequestsEmpty from "@/src/components/dashboard/donor/request/RequestsEmpty";
import RequestCard from "@/src/components/dashboard/donor/request/RequestCard";
import RequestsPagination from "@/src/components/dashboard/donor/request/RequestsPagination";

export default function DonorRequestsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [donatingRequestId, setDonatingRequestId] =
    useState<string | null>(null);

  // All blood requests
  const {
    data,
    isPending,
    isError,
    error,
  } = useGetBloodRequests({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const createDonation = useCreateDonation();

  const requests = data?.data ?? [];
  const meta = data?.meta;

  // Search
  const filteredRequests = requests.filter((request) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    return (
      request.hospitalName
        ?.toLowerCase()
        .includes(searchValue) ||
      request.hospitalAddress
        ?.toLowerCase()
        .includes(searchValue) ||
      request.patientName
        ?.toLowerCase()
        .includes(searchValue) ||
      request.recipient.name
        ?.toLowerCase()
        .includes(searchValue) ||
      request.bloodGroup
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  // Accept / Donate
  const handleDonate = (request: IBloodRequest) => {
    // Safety check
    if (request.status !== "PENDING") {
      toast.error(
        "This blood request is no longer available."
      );
      return;
    }

    if (request.verificationStatus !== "VERIFIED") {
      toast.error(
        "This blood request has not been verified by admin yet."
      );
      return;
    }

    setDonatingRequestId(request.id);

    createDonation.mutate(
      {
        bloodRequestId: request.id,
        units: request.units,
      },
      {
        onSuccess: (response) => {
          toast.success(
            response.message ||
              "Donation request accepted successfully!"
          );
        },

        onError: (error: unknown) => {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          const backendMessage =
            axiosError.response?.data?.message || "";

          if (
            backendMessage
              .toLowerCase()
              .includes("already submitted")
          ) {
            toast.info(
              "You have already submitted a donation for this blood request."
            );
            return;
          }

          toast.error(
            backendMessage ||
              "Failed to submit donation request."
          );
        },

        onSettled: () => {
          setDonatingRequestId(null);
        },
      }
    );
  };

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <RequestsHeader
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {/* Loading */}
        {isPending && (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-red-600" />

              <p className="mt-3 text-sm font-medium text-zinc-600">
                Loading blood requests...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-zinc-900">
                Unable to load requests
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while loading blood requests."}
              </p>
            </div>
          </div>
        )}

        {/* Data */}
        {!isPending && !isError && (
          <>
            {filteredRequests.length === 0 ? (
              <RequestsEmpty />
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onDonate={handleDonate}
                    isDonating={
                      donatingRequestId === request.id
                    }
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <RequestsPagination
                page={meta.page}
                totalPages={meta.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}