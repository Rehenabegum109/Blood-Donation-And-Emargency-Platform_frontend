import type {
  AccountStatus,
  AdminUserRole,
} from "@/src/types/admin.types";

interface UserStatusBadgeProps {
  type: "status" | "role";
  value: AccountStatus | AdminUserRole;
}

export default function UserStatusBadge({
  type,
  value,
}: UserStatusBadgeProps) {
  if (type === "status") {
    const statusStyles: Record<
      AccountStatus,
      string
    > = {
      ACTIVE:
        "bg-green-50 text-green-700 border-green-100",
      BLOCKED:
        "bg-red-50 text-red-700 border-red-100",
      DELETED:
        "bg-zinc-100 text-zinc-600 border-zinc-200",
    };

    const statusLabels: Record<
      AccountStatus,
      string
    > = {
      ACTIVE: "Active",
      BLOCKED: "Blocked",
      DELETED: "Deleted",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[value as AccountStatus]}`}
      >
        <span
          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
            value === "ACTIVE"
              ? "bg-green-500"
              : value === "BLOCKED"
                ? "bg-red-500"
                : "bg-zinc-400"
          }`}
        />

        {statusLabels[value as AccountStatus]}
      </span>
    );
  }

  const roleStyles: Record<
    AdminUserRole,
    string
  > = {
    ADMIN:
      "bg-purple-50 text-purple-700 border-purple-100",
    DONOR:
      "bg-red-50 text-red-700 border-red-100",
    RECIPIENT:
      "bg-blue-50 text-blue-700 border-blue-100",
  };

  const roleLabels: Record<
    AdminUserRole,
    string
  > = {
    ADMIN: "Admin",
    DONOR: "Donor",
    RECIPIENT: "Recipient",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${roleStyles[value as AdminUserRole]}`}
    >
      {roleLabels[value as AdminUserRole]}
    </span>
  );
}