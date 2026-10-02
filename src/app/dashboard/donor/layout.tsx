import Link from "next/link";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

export default function DonorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const menuItems = [ { title: "Dashboard", href: "/dashboard/donor", icon: LayoutDashboard, }, { title: "My Profile", href: "/dashboard/donor/profile", icon: User, }, { title: "My Donations", href: "/dashboard/donor/donations", icon: HeartPulse, }, { title: "Blood Requests", href: "/dashboard/donor/requests", icon: ClipboardList, }, { title: "Settings", href: "/dashboard/donor/settings", icon: Settings, }, ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-red-100 bg-gradient-to-b from-red-700 via-red-600 to-rose-600 text-white shadow-xl md:block">
           
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-white/15 px-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              <span className="text-white">Blood</span>
              <span className="text-red-100">Link</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 p-4">

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

            {/* Logout */}
            <button
              type="button"
              className="group mt-4 flex w-full items-center gap-3 rounded-xl border-t border-white/15 px-4 py-4 pt-5 text-sm font-medium text-red-50 transition-all hover:text-white"
            >
              <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Logout</span>
            </button>

          </nav>

          {/* Sidebar Bottom Card */}
          <div className="mx-4 mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
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
        <main className="relative flex-1 overflow-hidden">

          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

          {/* Soft grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Page Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}