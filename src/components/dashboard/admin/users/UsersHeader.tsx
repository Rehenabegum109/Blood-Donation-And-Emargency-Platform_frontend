"use client";

import { Users } from "lucide-react";

interface UsersHeaderProps {
  total: number;
}

export default function UsersHeader({
  total,
}: UsersHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Users className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
            Manage Users
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            View, search and manage BloodLink users.
          </p>
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600">
        {total} {total === 1 ? "user" : "users"} found
      </div>
    </div>
  );
}