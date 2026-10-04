"use client";

import type { ReactNode } from "react";

import AdminSidebar from "@/src/components/dashboard/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}