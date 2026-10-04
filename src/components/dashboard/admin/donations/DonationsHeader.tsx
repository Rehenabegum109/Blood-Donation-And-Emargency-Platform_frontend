import {
  Activity,
  Droplets,
} from "lucide-react";

interface DonationsHeaderProps {
  total: number;
}

export default function DonationsHeader({
  total,
}: DonationsHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Droplets className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Donations Management
            </h1>

            <p className="text-sm text-slate-500">
              Monitor and manage blood donations
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Activity className="h-4 w-4 text-red-500" />

        <div>
          <p className="text-xs text-slate-500">
            Total Donations
          </p>

          <p className="text-lg font-bold text-slate-900">
            {total}
          </p>
        </div>
      </div>
    </div>
  );
}