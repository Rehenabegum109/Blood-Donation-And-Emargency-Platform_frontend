
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

export default function DonorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/donor",
      icon: LayoutDashboard,
    },
    {
      title: "My Profile",
      href: "/dashboard/donor/profile",
      icon: User,
    },
    {
      title: "My Donations",
      href: "/dashboard/donor/donations",
      icon: HeartPulse,
    },
    {
      title: "Blood Requests",
      href: "/dashboard/donor/requests",
      icon: ClipboardList,
    },
    {
      title: "Settings",
      href: "/dashboard/donor/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    toast.success("Redirecting to login...");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:flex md:flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center border-b border-white/15 px-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              <span className="text-white">Blood</span>
              <span className="text-red-100">Link</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col p-4">
            <div className="flex-1 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-50 transition-all duration-200 hover:bg-white/15 hover:text-white"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />

                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout Button */}
            <div className="mt-4 border-t border-white/15 pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-50 transition-all duration-200 hover:bg-white/15 hover:text-white"
              >
                <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />

                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="mx-4 mb-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>

            <p className="text-sm font-bold text-white">
              Every Drop Matters
            </p>

            <p className="mt-1 text-xs leading-5 text-red-100">
              Your donation can become someone&apos;s second chance at life.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative min-w-0 flex-1 overflow-hidden">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Page Content */}
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
