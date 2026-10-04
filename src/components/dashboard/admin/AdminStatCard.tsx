import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export default function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "bg-red-50 text-red-600",
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-black text-zinc-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}