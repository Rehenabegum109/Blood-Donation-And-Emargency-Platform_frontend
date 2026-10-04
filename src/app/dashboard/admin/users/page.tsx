"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { isAxiosError } from "axios";

import {
  useBlockAdminUser,
  useGetAdminUsers,
  useUnblockAdminUser,
} from "@/src/hooks/use-admin";

import type {
  AccountStatus,
  AdminUserRole,
  IAdminUser,
} from "@/src/types/admin.types";

import UsersHeader from "@/src/components/dashboard/admin/users/UsersHeader";
import UsersFilters from "@/src/components/dashboard/admin/users/UsersFilters";
import UsersTable from "@/src/components/dashboard/admin/users/UsersTable";
import UsersPagination from "@/src/components/dashboard/admin/users/UsersPagination";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] =
    useState<AdminUserRole | undefined>(undefined);
  const [status, setStatus] =
    useState<AccountStatus | undefined>(undefined);

  const [processingUserId, setProcessingUserId] =
    useState<string | null>(null);

  const {
    data: response,
    isPending,
    isError,
    error,
  } = useGetAdminUsers({
    page,
    limit: 10,
    searchTerm: searchTerm.trim() || undefined,
    role,
    status,
  });

  const blockUser = useBlockAdminUser();
  const unblockUser = useUnblockAdminUser();

  const users = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRoleChange = (
    value?: AdminUserRole
  ) => {
    setRole(value);
    setPage(1);
  };

  const handleStatusChange = (
    value?: AccountStatus
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setRole(undefined);
    setStatus(undefined);
    setPage(1);
  };

  const getErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
      return (
        error.response?.data?.message ||
        "Something went wrong."
      );
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Something went wrong.";
  };

  const handleBlock = (user: IAdminUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to block ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setProcessingUserId(user.id);

    blockUser.mutate(user.id, {
      onSuccess: (response) => {
        toast.success(
          response.message ||
            `${user.name} has been blocked.`
        );
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },

      onSettled: () => {
        setProcessingUserId(null);
      },
    });
  };

  const handleUnblock = (user: IAdminUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to unblock ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setProcessingUserId(user.id);

    unblockUser.mutate(user.id, {
      onSuccess: (response) => {
        toast.success(
          response.message ||
            `${user.name} has been unblocked.`
        );
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },

      onSettled: () => {
        setProcessingUserId(null);
      },
    });
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <UsersHeader total={meta?.total ?? 0} />

        {/* Filters */}
        <UsersFilters
          searchTerm={searchTerm}
          role={role}
          status={status}
          onSearchChange={handleSearchChange}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
          onClear={handleClear}
        />

        {/* Loading */}
        {isPending && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-200 bg-white">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-red-600" />

              <p className="mt-3 text-sm font-medium text-zinc-600">
                Loading users...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-zinc-900">
                Unable to load users
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>
        )}

        {/* Users */}
        {!isPending && !isError && (
          <>
            {users.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                  <AlertCircle className="h-6 w-6 text-zinc-400" />
                </div>

                <h2 className="mt-4 text-lg font-bold text-zinc-900">
                  No users found
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
                <UsersTable
                  users={users}
                  processingUserId={processingUserId}
                  onBlock={handleBlock}
                  onUnblock={handleUnblock}
                />

                {meta && (
                  <UsersPagination
                    page={meta.page}
                    totalPage={meta.totalPage}
                    total={meta.total}
                    limit={meta.limit}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}