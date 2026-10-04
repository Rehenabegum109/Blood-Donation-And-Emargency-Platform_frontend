import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Heart,
  UserRound,
} from "lucide-react";

export default function DonorQuickActions() {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-red-600">
          Quick Actions
        </p>

        <h2 className="mt-1 text-xl font-black text-zinc-900">
          What would you like to do?
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Quickly access your most important donor activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard/donor/requests"
          className="group rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Droplets className="h-5 w-5" />
            </div>

            <ArrowRight className="h-5 w-5 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-red-600" />
          </div>

          <h3 className="mt-4 font-bold text-zinc-900">
            Find Blood Requests
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Find people who need your blood group.
          </p>
        </Link>

        <Link
          href="/dashboard/donor/donations"
          className="group rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Heart className="h-5 w-5" />
            </div>

            <ArrowRight className="h-5 w-5 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-red-600" />
          </div>

          <h3 className="mt-4 font-bold text-zinc-900">
            My Donations
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Track your donation requests and history.
          </p>
        </Link>

        <Link
          href="/dashboard/donor/profile"
          className="group rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
              <UserRound className="h-5 w-5" />
            </div>

            <ArrowRight className="h-5 w-5 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-red-600" />
          </div>

          <h3 className="mt-4 font-bold text-zinc-900">
            My Profile
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            View and manage your donor profile.
          </p>
        </Link>
      </div>
    </section>
  );
}