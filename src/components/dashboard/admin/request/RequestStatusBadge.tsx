import type {
  BloodRequestStatus,
  UrgencyLevel,
  VerificationStatus,
} from "@/src/types/blood-request.types";

interface RequestStatusBadgeProps {
  type: "status" | "urgency" | "verification";
  value:
    | BloodRequestStatus
    | UrgencyLevel
    | VerificationStatus;
}

export default function RequestStatusBadge({
  type,
  value,
}: RequestStatusBadgeProps) {
  if (type === "status") {
    const styles: Record<BloodRequestStatus, string> = {
      PENDING:
        "border-amber-100 bg-amber-50 text-amber-700",
      FULFILLED:
        "border-green-100 bg-green-50 text-green-700",
      CANCELLED:
        "border-zinc-200 bg-zinc-100 text-zinc-600",
      EXPIRED:
        "border-red-100 bg-red-50 text-red-700",
    };

    const labels: Record<BloodRequestStatus, string> = {
      PENDING: "Pending",
      FULFILLED: "Fulfilled",
      CANCELLED: "Cancelled",
      EXPIRED: "Expired",
    };

    return (
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${styles[value as BloodRequestStatus]}`}
      >
        {labels[value as BloodRequestStatus]}
      </span>
    );
  }

  if (type === "urgency") {
    const styles: Record<UrgencyLevel, string> = {
      LOW: "border-green-100 bg-green-50 text-green-700",
      NORMAL: "border-blue-100 bg-blue-50 text-blue-700",
      HIGH: "border-orange-100 bg-orange-50 text-orange-700",
      CRITICAL:
        "border-red-100 bg-red-50 text-red-700",
    };

    const labels: Record<UrgencyLevel, string> = {
      LOW: "Low",
      NORMAL: "Normal",
      HIGH: "High",
      CRITICAL: "Critical",
    };

    return (
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${styles[value as UrgencyLevel]}`}
      >
        {labels[value as UrgencyLevel]}
      </span>
    );
  }

  const verificationStyles: Record<
    VerificationStatus,
    string
  > = {
    PENDING:
      "border-amber-100 bg-amber-50 text-amber-700",
    VERIFIED:
      "border-green-100 bg-green-50 text-green-700",
    REJECTED:
      "border-red-100 bg-red-50 text-red-700",
  };

  const verificationLabels: Record<
    VerificationStatus,
    string
  > = {
    PENDING: "Pending",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${verificationStyles[value as VerificationStatus]}`}
    >
      {verificationLabels[value as VerificationStatus]}
    </span>
  );
}