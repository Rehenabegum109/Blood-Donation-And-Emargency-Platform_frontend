import { ClipboardList, Droplets } from "lucide-react";

export default function RequestsEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-red-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <Droplets className="h-7 w-7" />
      </div>

      <div className="mb-2 flex items-center justify-center gap-2">
        <ClipboardList className="h-4 w-4 text-red-500" />

        <h2 className="text-lg font-bold text-zinc-900">
          No blood requests found
        </h2>
      </div>

      <p className="mx-auto max-w-md text-sm leading-6 text-zinc-500">
        There are currently no blood requests matching your search.
        Please check again later.
      </p>
    </div>
  );
}