"use client";

import { useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { useGetAdminAuditLogs } from "@/src/hooks/use-admin";

const ACTIONS = [
  "ALL",
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "PAYMENT",
  "APPROVE",
  "REJECT",
  "BLOCK",
  "UNBLOCK",
];

function getActionStyle(action: string) {
  switch (action) {
    case "CREATE":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "UPDATE":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "DELETE":
      return "bg-red-50 text-red-700 border-red-200";

    case "LOGIN":
      return "bg-violet-50 text-violet-700 border-violet-200";

    case "LOGOUT":
      return "bg-slate-100 text-slate-700 border-slate-200";

    case "PAYMENT":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "APPROVE":
      return "bg-green-50 text-green-700 border-green-200";

    case "REJECT":
      return "bg-rose-50 text-rose-700 border-rose-200";

    case "BLOCK":
      return "bg-red-50 text-red-700 border-red-200";

    case "UNBLOCK":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDetails(details: unknown) {
  if (!details) {
    return "—";
  }

  if (typeof details === "string") {
    return details;
  }

  try {
    return JSON.stringify(details);
  } catch {
    return "—";
  }
}

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [action, setAction] = useState("ALL");

  const limit = 10;

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAdminAuditLogs({
    page,
    limit,
    ...(action !== "ALL" && { action }),
  });

  const logs = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const totalPages = meta?.totalPage ?? 1;

  const handleActionChange = (value: string) => {
    setAction(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <ClipboardList className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Audit Logs
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor important activities performed across BloodLink.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Filter */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Filter by action
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Select an action to view specific activity logs.
              </p>
            </div>

            <select
              value={action}
              onChange={(event) =>
                handleActionChange(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            >
              {ACTIONS.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL" ? "All Actions" : item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <div>
                <h3 className="font-semibold text-red-800">
                  Failed to load audit logs
                </h3>

                <p className="mt-1 text-sm text-red-700">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong while loading audit logs."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />

              <p className="text-sm text-slate-500">
                Loading audit logs...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        User
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Action
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Entity
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Entity ID
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Details
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {logs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-16 text-center"
                        >
                          <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />

                          <p className="mt-3 text-sm font-medium text-slate-600">
                            No audit logs found
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            There are no activity logs for the selected filter.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr
                          key={log.id}
                          className="transition hover:bg-slate-50/80"
                        >
                          <td className="px-5 py-4">
                            {log.user ? (
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {log.user.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {log.user.email}
                                </p>

                                <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                                  {log.user.role}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">
                                System
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getActionStyle(
                                log.action
                              )}`}
                            >
                              {log.action}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-slate-800">
                              {log.entity}
                            </span>
                          </td>

                          <td className="max-w-[180px] px-5 py-4">
                            <span
                              className="block truncate font-mono text-xs text-slate-500"
                              title={log.entityId}
                            >
                              {log.entityId || "—"}
                            </span>
                          </td>

                          <td className="max-w-[300px] px-5 py-4">
                            <p
                              className="truncate text-xs text-slate-600"
                              title={formatDetails(log.details)}
                            >
                              {formatDetails(log.details)}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                            {formatDate(log.createdAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="grid gap-4 lg:hidden">
              {logs.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
                  <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No audit logs found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    There are no activity logs for the selected filter.
                  </p>
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {log.user ? (
                          <>
                            <p className="text-sm font-semibold text-slate-900">
                              {log.user.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {log.user.email}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-slate-600">
                            System
                          </p>
                        )}
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getActionStyle(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Entity
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {log.entity}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Date
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {formatDate(log.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Entity ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-500">
                        {log.entityId || "—"}
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Details
                      </p>

                      <p className="mt-1 break-words text-sm text-slate-600">
                        {formatDetails(log.details)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {logs.length > 0 && (
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-800">
                    {meta?.page ?? page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {totalPages}
                  </span>
                  {meta?.total !== undefined && (
                    <>
                      {" "}
                      · {meta.total} total logs
                    </>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    disabled={page <= 1 || isFetching}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) =>
                        Math.min(totalPages, current + 1)
                      )
                    }
                    disabled={page >= totalPages || isFetching}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}