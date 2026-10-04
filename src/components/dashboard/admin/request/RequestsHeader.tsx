"use client";

import { Droplets } from "lucide-react";

interface RequestsHeaderProps {
  total: number;
}

export default function RequestsHeader({
  total,
}: RequestsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Droplets className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
            Blood Requests
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            View and monitor blood requests submitted by recipients.
          </p>
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600">
        {total} {total === 1 ? "request" : "requests"} found
      </div>
    </div>
  );
}