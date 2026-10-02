
import type { ReactNode } from "react";

interface RecipientLayoutProps {
  children: ReactNode;
}

export default function RecipientLayout({
  children,
}: RecipientLayoutProps) {
  return <>{children}</>;
}