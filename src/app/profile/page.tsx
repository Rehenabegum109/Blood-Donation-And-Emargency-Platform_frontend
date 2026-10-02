
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, CalendarDays, Droplet, Pencil } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetMe } from "@/src/hooks";

export default function ProfilePage() {
  const { data, isPending, isError } = useGetMe();

  if (isPending) {
    return (
      <main className="min-h-screen bg-muted/30 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-10 text-center">
            <h2 className="text-xl font-semibold">
              Please login first
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You need to login to view your profile.
            </p>

            <Link href="/login">
              <Button className="mt-5 bg-red-600 hover:bg-red-700">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const user = data.data;

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-500" />

          <CardContent className="relative px-6 pb-6">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* User */}
              <div className="flex items-end gap-4">

                {/* Profile Image */}
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-muted-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl font-bold">
                    {user.name}
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <Link href="/profile/edit">
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 font-medium break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 font-medium">
                    {user.phone || "Not added"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    {user.location || "Not added"}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <UserIcon />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Role
                  </p>

                  <Badge className="mt-1 bg-red-600">
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-muted-foreground">
                  Account Status
                </p>

                <Badge
                  variant={
                    user.status === "ACTIVE"
                      ? "default"
                      : "destructive"
                  }
                  className="mt-1"
                >
                  {user.status}
                </Badge>
              </div>

              {/* Email Verification */}
              <div>
                <p className="text-xs text-muted-foreground">
                  Email Verification
                </p>

                <Badge
                  className={
                    user.emailVerified
                      ? "mt-1 bg-green-600"
                      : "mt-1 bg-yellow-500"
                  }
                >
                  {user.emailVerified
                    ? "Verified"
                    : "Not Verified"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donor Information */}
        {user.donor && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-red-600" />
                Donor Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {/* Blood Group */}
                <div>
                  <p className="text-xs text-muted-foreground">
                    Blood Group
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                      {user.donor.bloodGroup}
                    </div>

                    <span className="font-semibold">
                      {user.donor.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <p className="text-xs text-muted-foreground">
                    Date of Birth
                  </p>

                  <div className="mt-2 flex items-center gap-2 font-medium">
                    <CalendarDays className="h-4 w-4 text-red-600" />

                    {user.donor.dateOfBirth
                      ? new Date(
                          user.donor.dateOfBirth
                        ).toLocaleDateString()
                      : "Not added"}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="text-xs text-muted-foreground">
                    Address
                  </p>

                  <p className="mt-2 font-medium">
                    {user.donor.address || "Not added"}
                  </p>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-xs text-muted-foreground">
                    Donation Availability
                  </p>

                  <Badge
                    className={
                      user.donor.isAvailable
                        ? "mt-2 bg-green-600"
                        : "mt-2 bg-gray-500"
                    }
                  >
                    {user.donor.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </Badge>
                </div>
              </div>

              {/* Last Donation */}
              <div className="mt-6 border-t pt-5">
                <p className="text-xs text-muted-foreground">
                  Last Donation
                </p>

                <p className="mt-1 font-medium">
                  {user.donor.lastDonationDate
                    ? new Date(
                        user.donor.lastDonationDate
                      ).toLocaleDateString()
                    : "No donation record"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}