
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetMe, useUpdateProfile } from "@/src/hooks";

export default function EditProfilePage() {
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();
  const updateProfile = useUpdateProfile();

  const user = data?.data;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await updateProfile.mutateAsync({
        name: name.trim(),
        phone: phone.trim() || undefined,
        location: location.trim() || undefined,
        profileImage: profileImage.trim() || undefined,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="h-[600px] animate-pulse rounded-2xl bg-white/70" />
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-100 px-4">
        <Card className="w-full max-w-md border-red-100 bg-white/95 shadow-xl">
          <CardContent className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <User className="h-7 w-7 text-red-600" />
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              Please login first
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You need to login to edit your profile.
            </p>

            <Button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-5 bg-red-600 text-white hover:bg-red-700"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-100 px-4 py-10 sm:px-6 lg:px-8">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/40 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto max-w-2xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </button>

        {/* Main Card */}
        <Card className="overflow-hidden border-red-100 bg-white/95 shadow-xl backdrop-blur">

          {/* Card Header */}
          <div className="border-b border-red-100 bg-gradient-to-r from-red-600 to-rose-500 px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <User className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Edit Profile
                </h1>

                <p className="mt-1 text-sm text-red-100">
                  Update your personal information
                </p>
              </div>
            </div>
          </div>

          <CardHeader>
            <CardTitle>Personal Information</CardTitle>

            <CardDescription>
              Keep your BloodLink profile information up to date.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Profile Image Preview */}
              <div className="flex flex-col items-center gap-3 border-b pb-6">

                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-red-100 bg-red-50 shadow-md">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-red-300" />
                  )}

                </div>

                <div className="text-center">
                  <p className="text-sm font-medium">
                    Profile Picture
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Preview of your profile image
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name
                </Label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="h-11 pl-10 focus-visible:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="h-11 bg-muted/50 pl-10"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed.
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone
                </Label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    className="h-11 pl-10 focus-visible:ring-red-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="location"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="e.g. Sylhet, Bangladesh"
                    className="h-11 pl-10 focus-visible:ring-red-500"
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">
                  Profile Image URL
                </Label>

                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="profileImage"
                    type="url"
                    value={profileImage}
                    onChange={(e) =>
                      setProfileImage(e.target.value)
                    }
                    placeholder="https://example.com/profile.jpg"
                    className="h-11 pl-10 focus-visible:ring-red-500"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Use a publicly accessible image URL.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-red-100 pt-6 sm:flex-row sm:justify-end">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/profile")}
                  isDisabled={updateProfile.isPending}
                  className="h-11"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isDisabled={updateProfile.isPending}
                  className="h-11 gap-2 bg-red-600 text-white hover:bg-red-700"
                >
                  <Save className="h-4 w-4" />

                  {updateProfile.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </Button>

              </div>

            </form>
          </CardContent>
        </Card>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Your profile information helps BloodLink connect you
          with the right people when blood is needed.
        </p>

      </div>
    </main>
  );
}
