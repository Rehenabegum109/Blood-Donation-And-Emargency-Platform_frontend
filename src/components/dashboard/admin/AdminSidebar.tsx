"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ClipboardList,
  Droplets,
  FileClock,
  Heart,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { useGetMe } from "@/src/hooks/useGetMe";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Blood Requests",
    href: "/dashboard/admin/requests",
    icon: Droplets,
  },
  {
    title: "Donations",
    href: "/dashboard/admin/donations",
    icon: HeartHandshake,
  },
  {
    title: "Verifications",
    href: "/dashboard/admin/verifications",
    icon: ShieldCheck,
  },
  {
    title: "Audit Logs",
    href: "/dashboard/admin/audit-logs",
    icon: FileClock,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const { data } = useGetMe();
  const admin = data?.data;

  const handleLogout = () => {
    // Backend logout endpoint থাকলে এখানে পরে API call বসানো যাবে।
    toast.success("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:block">
      <div className="sticky top-0 flex min-h-screen flex-col">
        {/* =====================================================
            Logo
        ====================================================== */}
        <div className="flex h-20 items-center border-b border-white/15 px-6">
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>

            {/* Logo Text */}
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Blood<span className="text-red-100">Link</span>
              </h2>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-100/80">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* =====================================================
            Navigation
        ====================================================== */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-100/70">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);

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

        {/* =====================================================
            Platform Status Card
        ====================================================== */}
        <div className="px-4 pb-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <Activity className="h-4 w-4 text-white" />
            </div>

            <p className="text-sm font-semibold">
              Platform Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-300" />

              <p className="text-xs text-red-100">
                System Operational
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            Admin Account
        ====================================================== */}
        <div className="border-t border-white/15 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
            {/* Avatar */}
            {admin?.profileImage ? (
              <img
                src={admin.profileImage}
                alt={admin.name}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white">
                {admin?.name?.charAt(0).toUpperCase() || "A"}
              </div>
            )}

            {/* User info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {admin?.name || "Administrator"}
              </p>

              <p className="truncate text-[11px] text-red-100">
                {admin?.email || "Admin account"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-50 transition-all hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}