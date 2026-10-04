"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
  User,
  Heart,
  CreditCard,
  HandHeart,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/recipient",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/dashboard/recipient/profile",
    icon: User,
  },
  {
    title: "My Blood Requests",
    href: "/dashboard/recipient/requests",
    icon: ClipboardList,
  },
  {
    title: "Create Request",
    href: "/dashboard/recipient/requests?create=true",
    icon: PlusCircle,
  },
   {
    title: "Donation Requests",
    href: "/dashboard/recipient/donations",
    icon: HandHeart,
  },
  {
    title: "Payments",
    href: "/dashboard/recipient/payments",
    icon: CreditCard,
  },
];

export default function RecipientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:block">
      <div className="sticky top-0 flex min-h-screen flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/15 px-6">
          <Link
            href="/dashboard/recipient"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Blood<span className="text-red-100">Link</span>
              </h2>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-100/80">
                Recipient Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-100/70">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            const basePath = item.href.split("?")[0];

            const isActive =
              item.href === "/dashboard/recipient"
                ? pathname === item.href
                : pathname.startsWith(basePath);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-red-700 shadow-lg"
                    : "text-red-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive
                      ? "text-red-600"
                      : "text-red-100 group-hover:text-white"
                  }`}
                />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}
        <div className="p-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <Heart className="h-4 w-4 fill-white" />
            </div>

            <p className="text-sm font-semibold">
              Need blood?
            </p>

            <p className="mt-1 text-xs leading-5 text-red-100">
              Create a blood request and let nearby donors know.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}