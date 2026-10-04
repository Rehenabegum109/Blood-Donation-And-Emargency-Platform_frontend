"use client";

import {
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

export default function VerificationHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <ShieldCheck className="h-5 w-5 text-red-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Request Verification
            </h1>

            <p className="text-sm text-slate-500">
              Review and verify blood requests
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <ClipboardCheck className="h-5 w-5 text-red-500" />

        <div>
          <p className="text-xs text-slate-500">
            Admin Review
          </p>

          <p className="text-sm font-semibold text-slate-800">
            Pending Requests
          </p>
        </div>
      </div>
    </div>
  );
}