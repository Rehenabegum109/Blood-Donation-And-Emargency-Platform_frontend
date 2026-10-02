"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/src/hooks";

export default function DashboardPage() {
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();

  useEffect(() => {
    if (isPending) return;

    if (isError || !data?.data) {
      router.replace("/login");
      return;
    }

    const role = data.data.role;

    switch (role) {
      case "DONOR":
        router.replace("/dashboard/donor");
        break;

      case "RECIPIENT":
        router.replace("/dashboard/recipient");
        break;

      case "ADMIN":
        router.replace("/dashboard/admin");
        break;

      default:
        router.replace("/");
    }
  }, [data, isPending, isError, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

        <p className="text-sm font-medium text-zinc-600">
          Loading your dashboard...
        </p>

        <p className="mt-1 text-xs text-zinc-400">
          Please wait a moment
        </p>
      </div>
    </main>
  );
}