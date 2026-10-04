"use client";

import { Loader2, Lock, Unlock } from "lucide-react";

import type { IAdminUser } from "@/src/types/admin.types";

interface UserActionsProps {
  user: IAdminUser;
  isProcessing: boolean;
  onBlock: (user: IAdminUser) => void;
  onUnblock: (user: IAdminUser) => void;
}

export default function UserActions({
  user,
  isProcessing,
  onBlock,
  onUnblock,
}: UserActionsProps) {
  // Admin users cannot be blocked/unblocked
  if (user.role === "ADMIN") {
    return (
      <span className="text-xs font-medium text-zinc-400">
        Protected
      </span>
    );
  }

  if (isProcessing) {
    return (
      <div className="flex h-9 items-center justify-center px-3">
        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
      </div>
    );
  }

  if (user.status === "BLOCKED") {
    return (
      <button
        type="button"
        onClick={() => onUnblock(user)}
        className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100"
      >
        <Unlock className="h-3.5 w-3.5" />
        Unblock
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onBlock(user)}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
    >
      <Lock className="h-3.5 w-3.5" />
      Block
    </button>
  );
}