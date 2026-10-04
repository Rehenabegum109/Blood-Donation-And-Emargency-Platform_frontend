"use client";

import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import type { IAdminUser } from "@/src/types/admin.types";

import UserActions from "./UserActions";
import UserStatusBadge from "./UserStatusBadge";

interface UsersTableProps {
  users: IAdminUser[];
  processingUserId: string | null;
  onBlock: (user: IAdminUser) => void;
  onUnblock: (user: IAdminUser) => void;
}

export default function UsersTable({
  users,
  processingUserId,
  onBlock,
  onUnblock,
}: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                User
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Role
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                Joined
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-zinc-50/70"
              >
                {/* User */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                        {user.name
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-zinc-900">
                        {user.name}
                      </p>

                      <p className="max-w-[220px] truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <UserStatusBadge
                    type="role"
                    value={user.role}
                  />
                </td>

                {/* Contact */}
                <td className="px-5 py-4">
                  <div className="space-y-1">
                    {user.phone ? (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{user.phone}</span>
                      </div>
                    ) : null}

                    {user.location ? (
                      <div className="flex max-w-[180px] items-center gap-1.5 truncate text-xs text-zinc-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {user.location}
                        </span>
                      </div>
                    ) : null}

                    {!user.phone && !user.location && (
                      <span className="text-xs text-zinc-400">
                        No contact info
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <div className="space-y-1.5">
                    <UserStatusBadge
                      type="status"
                      value={user.status}
                    />

                    {user.emailVerified && (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-green-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified
                      </div>
                    )}
                  </div>
                </td>

                {/* Joined */}
                <td className="px-5 py-4 text-sm text-zinc-500">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <UserActions
                    user={user}
                    isProcessing={
                      processingUserId === user.id
                    }
                    onBlock={onBlock}
                    onUnblock={onUnblock}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet cards */}
      <div className="divide-y divide-zinc-100 lg:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    {user.name
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-900">
                    {user.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>

              <UserActions
                user={user}
                isProcessing={
                  processingUserId === user.id
                }
                onBlock={onBlock}
                onUnblock={onUnblock}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <UserStatusBadge
                type="role"
                value={user.role}
              />

              <UserStatusBadge
                type="status"
                value={user.status}
              />

              {user.emailVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>

            <div className="mt-4 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  {user.phone}
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {user.location}
                </div>
              )}

              <div>
                Joined{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}