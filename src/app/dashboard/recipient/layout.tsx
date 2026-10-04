import RecipientSidebar from "@/src/components/dashboard/recipient/RecipientSidebar";

export default function RecipientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <RecipientSidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}