
import { Droplets } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-float flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <Droplets className="h-8 w-8" />
        </div>

        <p className="mt-5 text-sm font-medium text-slate-500">
          Finding compatible donors...
        </p>
      </div>
    </main>
  );
}
