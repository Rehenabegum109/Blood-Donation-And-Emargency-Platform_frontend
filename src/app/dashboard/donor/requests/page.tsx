
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
  const [donatingRequestId, setDonatingRequestId] = useState<string | null>(
    null
  );

  const { data, isPending, isError, error } = useGetBloodRequests({
    page,
    limit: 10,
    status: "PENDING",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const createDonation = useCreateDonation();

  const requests = data?.data ?? [];
  const meta = data?.meta;

  const filteredRequests = requests.filter((request) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    return (
      request.hospitalName.toLowerCase().includes(searchValue) ||
      request.hospitalAddress?.toLowerCase().includes(searchValue) ||
      request.patientName?.toLowerCase().includes(searchValue) ||
      request.recipient.name.toLowerCase().includes(searchValue)
    );
  });

  const handleDonate = (request: IBloodRequest) => {
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
              "Donation request submitted successfully."
          );
        },

        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            "Failed to submit donation request.";

          toast.error(message);
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
        <RequestsHeader
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

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
                    isDonating={donatingRequestId === request.id}
                  />
                ))}
              </div>
            )}

            {meta && (
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
