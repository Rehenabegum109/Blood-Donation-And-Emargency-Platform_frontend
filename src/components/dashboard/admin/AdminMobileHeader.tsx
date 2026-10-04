"use client";

import { Menu } from "lucide-react";

interface AdminMobileHeaderProps {
  onMenuClick: () => void;
}

export default function AdminMobileHeader({
  onMenuClick,
}: AdminMobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-zinc-200 bg-white/95 px-4 backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition hover:bg-red-50 hover:text-red-600"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-3">
        <h1 className="text-lg font-black text-zinc-900">
          Blood<span className="text-red-600">Link</span>
        </h1>

        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
          Admin Panel
        </p>
      </div>
    </header>
  );
}