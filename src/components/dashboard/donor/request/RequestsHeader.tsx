"use client";

import { ClipboardList, Droplets, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface RequestsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function RequestsHeader({
  search,
  onSearchChange,
}: RequestsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
            <Droplets className="h-3.5 w-3.5" />
            BloodLink Requests
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Blood Requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Find people who need blood and become a lifesaving donor.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search hospital or patient..."
            className="h-11 border-red-100 bg-white pl-10 shadow-sm focus-visible:ring-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-white/80 px-4 py-3 shadow-sm">
        <ClipboardList className="h-4 w-4 text-red-600" />

        <p className="text-sm text-zinc-600">
          Showing blood requests that may need your help.
        </p>
      </div>
    </div>
  );
}