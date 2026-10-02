import type { LucideIcon } from "lucide-react";

interface RequestInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function RequestInfoItem({
  icon: Icon,
  label,
  value,
}: RequestInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-400">{label}</p>

        <p className="mt-0.5 break-words text-sm font-medium text-zinc-700">
          {value}
        </p>
      </div>
    </div>
  );
}