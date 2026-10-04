"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

import { useGetBloodRequests } from "@/src/hooks/use-blood-request";

import type {
  BloodGroup,
  BloodRequestStatus,
  IBloodRequest,
  UrgencyLevel,
  VerificationStatus,
} from "@/src/types/blood-request.types";
import RequestsHeader from "@/src/components/dashboard/admin/request/RequestsHeader";
import RequestsFilters from "@/src/components/dashboard/admin/request/RequestsFilters";
import RequestsPagination from "@/src/components/dashboard/admin/request/RequestsPagination";
import RequestsTable from "@/src/components/dashboard/admin/request/RequestsTable";
import RequestDetails from "@/src/components/dashboard/admin/request/RequestDetails";



export default function AdminBloodRequestsPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [bloodGroup, setBloodGroup] =
    useState<BloodGroup | undefined>();

  const [urgency, setUrgency] =
    useState<UrgencyLevel | undefined>();

  const [status, setStatus] =
    useState<BloodRequestStatus | undefined>();

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus | undefined>();

  const [selectedRequest, setSelectedRequest] =
    useState<IBloodRequest | null>(null);

  const {
    data,
    isPending,
    isError,
    error,
  } = useGetBloodRequests({
    page,
    limit: 10,
    status,
    bloodGroup,
    urgency,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const requests = data?.data ?? [];
  const meta = data?.meta;

  const filteredRequests = requests.filter(
    (request) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      if (!searchValue) {
        return true;
      }

      return (
        request.hospitalName
          .toLowerCase()
          .includes(searchValue) ||
        request.hospitalAddress
          ?.toLowerCase()
          .includes(searchValue) ||
        request.patientName
          ?.toLowerCase()
          .includes(searchValue) ||
        request.contactNumber
          ?.toLowerCase()
          .includes(searchValue) ||
        request.recipient.name
          .toLowerCase()
          .includes(searchValue)
      );
    }
  );

  const handleClear = () => {
    setSearch("");
    setBloodGroup(undefined);
    setUrgency(undefined);
    setStatus(undefined);
    setVerificationStatus(undefined);
    setPage(1);
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Something went wrong while loading blood requests.";
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RequestsHeader total={meta?.total ?? 0} />

        <RequestsFilters
          search={search}
          bloodGroup={bloodGroup}
          urgency={urgency}
          status={status}
          verificationStatus={verificationStatus}
          onSearchChange={(value) => {
            setSearch(value);
          }}
          onBloodGroupChange={(value) => {
            setBloodGroup(value);
            setPage(1);
          }}
          onUrgencyChange={(value) => {
            setUrgency(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onVerificationChange={(value) => {
            setVerificationStatus(value);
            setPage(1);
          }}
          onClear={handleClear}
        />

        {isPending && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-red-600" />

              <p className="mt-3 text-sm font-medium text-zinc-600">
                Loading blood requests...
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-zinc-900">
                Unable to load blood requests
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>
        )}

        {!isPending && !isError && (
          <>
            {filteredRequests.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                  <AlertCircle className="h-6 w-6 text-zinc-400" />
                </div>

                <h2 className="mt-4 text-lg font-bold text-zinc-900">
                  No blood requests found
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-5 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <RequestsTable
                  requests={filteredRequests}
                  onView={setSelectedRequest}
                />

                {meta && (
                  <RequestsPagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    total={meta.total}
                    limit={meta.limit}
                    onPageChange={(nextPage) => {
                      setPage(nextPage);
                      setSelectedRequest(null);
                    }}
                  />
                )}
              </>
            )}

            {selectedRequest && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-black text-zinc-900">
                    Request Details
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRequest(null)
                    }
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    Close
                  </button>
                </div>

                <RequestDetails
                  request={selectedRequest}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}