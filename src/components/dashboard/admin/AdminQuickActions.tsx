import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

const actions = [
  {
    href: "/dashboard/admin/users",
    title: "Manage Users",
    description: "View and manage registered users.",
    icon: Users,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    href: "/dashboard/admin/requests",
    title: "Blood Requests",
    description: "Review and manage blood requests.",
    icon: Droplets,
    iconClassName: "bg-red-50 text-red-600",
  },
  {
    href: "/dashboard/admin/donations",
    title: "Donations",
    description: "Monitor donor donation activities.",
    icon: HeartHandshake,
    iconClassName: "bg-green-50 text-green-600",
  },
  {
    href: "/dashboard/admin/verifications",
    title: "Verifications",
    description: "Review pending verification activities.",
    icon: ShieldCheck,
    iconClassName: "bg-amber-50 text-amber-600",
  },
];

export default function AdminQuickActions() {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-red-600">
          Administration
        </p>

        <h2 className="mt-1 text-xl font-black text-zinc-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Manage the BloodLink platform from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.iconClassName}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowRight className="h-5 w-5 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-red-600" />
              </div>

              <h3 className="mt-4 font-bold text-zinc-900">
                {action.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}