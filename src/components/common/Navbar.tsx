
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  UserCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGetMe } from "@/src/hooks";
import { useLogout } from "@/src/hooks/logOut";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Find Donor", href: "/find-donors" },
  { name: "Blood Requests", href: "/blood-requests" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const protectedRoutes = [
  "/find-donors",
  "/blood-requests",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { data, isPending } = useGetMe();

  const logoutMutation = useLogout();

  const user = data?.data;
  const isLoggedIn = !!user;

  const handleProtectedNavigation = (href: string) => {
    setOpen(false);

    if (isPending) return;

    if (!isLoggedIn && protectedRoutes.includes(href)) {
      router.push(
        `/login?redirect=${encodeURIComponent(href)}`
      );
      return;
    }

    router.push(href);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      setOpen(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
            <Heart className="h-5 w-5 fill-current" />
          </div>

          <span className="text-xl font-bold text-foreground">
            Blood<span className="text-red-600">Link</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
            protectedRoutes.includes(item.href) ? (
              <button
                key={item.href}
                type="button"
                onClick={() =>
                  handleProtectedNavigation(item.href)
                }
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : isLoggedIn ? (
            <>
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              {/* Profile */}
              <Link
                href="/profile"
                className="inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-5 w-5" />
                )}

                <span>{user.name}</span>
              </Link>

              {/* Logout */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleLogout}
                isDisabled={logoutMutation.isPending}
                className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />

                {logoutMutation.isPending
                  ? "Logging out..."
                  : "Logout"}
              </Button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-border bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

            {/* Navigation Links */}
            {navItems.map((item) =>
              protectedRoutes.includes(item.href) ? (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation(item.href)
                  }
                  className="w-full rounded-md px-3 py-3 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {item.name}
                </Link>
              )
            )}

            <div className="mt-3 border-t border-border pt-4">
              {isPending ? (
                <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
              ) : isLoggedIn ? (
                <div className="space-y-2">

                  {/* Mobile Dashboard */}
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-md bg-red-600 px-3 py-3 text-sm font-medium text-white hover:bg-red-700"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  {/* Mobile Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-7 w-7" />
                    )}

                    <div>
                      <p className="font-semibold">
                        {user.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        View Profile
                      </p>
                    </div>
                  </Link>

                  {/* Mobile Logout */}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleLogout}
                    isDisabled={logoutMutation.isPending}
                    className="w-full justify-start gap-3 px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />

                    {logoutMutation.isPending
                      ? "Logging out..."
                      : "Logout"}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">

                  {/* Login */}
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-9 flex-1 items-center justify-center rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Login
                  </Link>

                  {/* Register */}
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex h-9 flex-1 items-center justify-center rounded-md bg-red-600 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
