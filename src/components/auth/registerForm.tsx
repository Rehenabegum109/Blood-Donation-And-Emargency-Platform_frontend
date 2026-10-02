
// "use client";

// import { useState } from "react";
// import { ArrowRight, Droplets, Eye, EyeOff, ShieldCheck } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RegisterFormValues, registerSchema } from "@/src/schema/auth.schema";
// import { registerUser } from "@/src/services/auth/auth.api";



// export default function RegisterForm() {
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [fieldErrors, setFieldErrors] = useState<
//     Partial<Record<keyof RegisterFormValues, string>>
//   >({});

//   async function handleSubmit(formData: FormData) {
//     setServerError("");
//     setFieldErrors({});
//     setIsLoading(true);

//     const values = {
//       name: String(formData.get("name") || ""),
//       email: String(formData.get("email") || ""),
//       phone: String(formData.get("phone") || ""),
//       location: String(formData.get("location") || ""),
//       password: String(formData.get("password") || ""),
//       confirmPassword: String(formData.get("confirmPassword") || ""),
//     };

//     const validation = registerSchema.safeParse(values);

//     if (!validation.success) {
//       const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

//       validation.error.issues.forEach((issue) => {
//         const field = issue.path[0] as keyof RegisterFormValues;

//         if (!errors[field]) {
//           errors[field] = issue.message;
//         }
//       });

//       setFieldErrors(errors);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         name: validation.data.name,
//         email: validation.data.email,
//         password: validation.data.password,
//         ...(validation.data.phone && {
//           phone: validation.data.phone,
//         }),
//         ...(validation.data.location && {
//           location: validation.data.location,
//         }),
//       };

//       await registerUser(payload);

//       router.push(
//         `/verify-email?email=${encodeURIComponent(
//           validation.data.email
//         )}`
//       );
//     } catch (error) {
//       if (error instanceof Error) {
//         setServerError(error.message);
//       } else {
//         setServerError("Registration failed. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
//           <ShieldCheck className="h-4 w-4" />
//           Secure Registration
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
//             <Droplets className="h-6 w-6" />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-foreground">
//               Join BloodLink
//             </h1>

//             <p className="mt-1 text-sm text-muted-foreground">
//               Create your account and help save lives.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <form action={handleSubmit} className="space-y-5">
//         {/* Name + Email */}
//         <div className="grid gap-5 sm:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name</Label>

//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="John Doe"
//               autoComplete="name"
//               className={
//                 fieldErrors.name
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }
//             />

//             {fieldErrors.name && (
//               <p className="text-xs font-medium text-red-600">
//                 {fieldErrors.name}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address</Label>

//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               autoComplete="email"
//               className={
//                 fieldErrors.email
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }
//             />

//             {fieldErrors.email && (
//               <p className="text-xs font-medium text-red-600">
//                 {fieldErrors.email}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Phone + Location */}
//         <div className="grid gap-5 sm:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="phone">
//               Phone Number
//               <span className="ml-1 text-xs text-muted-foreground">
//                 (optional)
//               </span>
//             </Label>

//             <Input
//               id="phone"
//               name="phone"
//               type="tel"
//               placeholder="01XXXXXXXXX"
//               autoComplete="tel"
//               className={
//                 fieldErrors.phone
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }
//             />

//             {fieldErrors.phone && (
//               <p className="text-xs font-medium text-red-600">
//                 {fieldErrors.phone}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="location">
//               Location
//               <span className="ml-1 text-xs text-muted-foreground">
//                 (optional)
//               </span>
//             </Label>

//             <Input
//               id="location"
//               name="location"
//               type="text"
//               placeholder="Dhaka, Bangladesh"
//               autoComplete="address-level2"
//               className={
//                 fieldErrors.location
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }
//             />

//             {fieldErrors.location && (
//               <p className="text-xs font-medium text-red-600">
//                 {fieldErrors.location}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Password */}
//         <div className="space-y-2">
//           <Label htmlFor="password">Password</Label>

//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a strong password"
//               autoComplete="new-password"
//               className={`pr-12 ${
//                 fieldErrors.password
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }`}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
//               aria-label={
//                 showPassword ? "Hide password" : "Show password"
//               }
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5" />
//               ) : (
//                 <Eye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {fieldErrors.password ? (
//             <p className="text-xs font-medium text-red-600">
//               {fieldErrors.password}
//             </p>
//           ) : (
//             <p className="text-xs text-muted-foreground">
//               Use 8+ characters with uppercase, lowercase, number and
//               special character.
//             </p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-2">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>

//           <div className="relative">
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Re-enter your password"
//               autoComplete="new-password"
//               className={`pr-12 ${
//                 fieldErrors.confirmPassword
//                   ? "border-red-500 focus-visible:ring-red-500"
//                   : ""
//               }`}
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmPassword((prev) => !prev)
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
//               aria-label={
//                 showConfirmPassword
//                   ? "Hide confirm password"
//                   : "Show confirm password"
//               }
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="h-5 w-5" />
//               ) : (
//                 <Eye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {fieldErrors.confirmPassword && (
//             <p className="text-xs font-medium text-red-600">
//               {fieldErrors.confirmPassword}
//             </p>
//           )}
//         </div>

//         {/* Server Error */}
//         {serverError && (
//           <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
//             {serverError}
//           </div>
//         )}

//         {/* Submit */}
//         <Button
//           type="submit"
//           isDisabled={isLoading}
//           className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-red-600/30"
//         >
//           {isLoading ? (
//             "Creating account..."
//           ) : (
//             <span className="flex items-center justify-center gap-2">
//               Create BloodLink Account
//               <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </span>
//           )}
//         </Button>

//         {/* Trust Note */}
//         <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
//           <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

//           <p className="text-xs leading-5 text-muted-foreground">
//             Your information is used only to help connect blood donors
//             with people who need them.
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import {
  ArrowRight,
  Droplets,
  Eye,
  EyeOff,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  RegisterFormValues,
  registerSchema,
} from "@/src/schema/auth.schema";

import { registerUser } from "@/src/services/auth/auth.api";

type UserRole = "DONOR" | "RECIPIENT";

type BloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

const bloodGroups: {
  value: BloodGroup;
  label: string;
}[] = [
  {
    value: "A_POSITIVE",
    label: "A+",
  },
  {
    value: "A_NEGATIVE",
    label: "A-",
  },
  {
    value: "B_POSITIVE",
    label: "B+",
  },
  {
    value: "B_NEGATIVE",
    label: "B-",
  },
  {
    value: "AB_POSITIVE",
    label: "AB+",
  },
  {
    value: "AB_NEGATIVE",
    label: "AB-",
  },
  {
    value: "O_POSITIVE",
    label: "O+",
  },
  {
    value: "O_NEGATIVE",
    label: "O-",
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [selectedRole, setSelectedRole] =
    useState<UserRole | "">("");

  const [selectedBloodGroup, setSelectedBloodGroup] =
    useState<BloodGroup | "">("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});

  async function handleSubmit(formData: FormData) {
    setServerError("");
    setFieldErrors({});
    setIsLoading(true);

    // Role validation
    if (!selectedRole) {
      setServerError(
        "Please select whether you want to register as a Donor or Recipient."
      );

      setIsLoading(false);
      return;
    }

    // Blood group validation for donor
    if (
      selectedRole === "DONOR" &&
      !selectedBloodGroup
    ) {
      setServerError(
        "Please select your blood group to register as a Donor."
      );

      setIsLoading(false);
      return;
    }

    const values = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      location: String(formData.get("location") || ""),
      password: String(formData.get("password") || ""),
      confirmPassword: String(
        formData.get("confirmPassword") || ""
      ),
    };

    const validation = registerSchema.safeParse(values);

    if (!validation.success) {
      const errors: Partial<
        Record<keyof RegisterFormValues, string>
      > = {};

      validation.error.issues.forEach((issue) => {
        const field =
          issue.path[0] as keyof RegisterFormValues;

        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });

      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
        role: selectedRole,

        ...(validation.data.phone
          ? {
              phone: validation.data.phone,
            }
          : {}),

        ...(validation.data.location
          ? {
              location: validation.data.location,
            }
          : {}),

        ...(selectedRole === "DONOR" &&
        selectedBloodGroup
          ? {
              bloodGroup: selectedBloodGroup,
            }
          : {}),
      };

      await registerUser(payload);

      router.push(
        `/verify-email?email=${encodeURIComponent(
          validation.data.email
        )}`
      );
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError(
          "Registration failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
          <ShieldCheck className="h-4 w-4" />
          Secure Registration
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
            <Droplets className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Join BloodLink
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your account and help save lives.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form action={handleSubmit} className="space-y-5">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label>
            I want to register as
          </Label>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Donor */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("DONOR");
                setServerError("");
              }}
              className={`rounded-2xl border p-4 text-left transition-all ${
                selectedRole === "DONOR"
                  ? "border-red-600 bg-red-50 shadow-md dark:border-red-500 dark:bg-red-950/20"
                  : "border-border bg-background hover:border-red-300 hover:bg-red-50/50 dark:hover:border-red-800 dark:hover:bg-red-950/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    selectedRole === "DONOR"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                  }`}
                >
                  <Droplets className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Donor
                  </p>

                  <p className="text-xs text-muted-foreground">
                    I want to donate blood
                  </p>
                </div>
              </div>
            </button>

            {/* Recipient */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("RECIPIENT");
                setSelectedBloodGroup("");
                setServerError("");
              }}
              className={`rounded-2xl border p-4 text-left transition-all ${
                selectedRole === "RECIPIENT"
                  ? "border-red-600 bg-red-50 shadow-md dark:border-red-500 dark:bg-red-950/20"
                  : "border-border bg-background hover:border-red-300 hover:bg-red-50/50 dark:hover:border-red-800 dark:hover:bg-red-950/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    selectedRole === "RECIPIENT"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Recipient
                  </p>

                  <p className="text-xs text-muted-foreground">
                    I need blood
                  </p>
                </div>
              </div>
            </button>
          </div>

          {selectedRole && (
            <p className="text-xs text-muted-foreground">
              Selected role:{" "}
              <span className="font-semibold text-red-600">
                {selectedRole === "DONOR"
                  ? "Donor"
                  : "Recipient"}
              </span>
            </p>
          )}
        </div>

        {/* Blood Group - Donor Only */}
        {selectedRole === "DONOR" && (
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">
              Blood Group
              <span className="ml-1 text-red-600">
                *
              </span>
            </Label>

            <select
              id="bloodGroup"
              value={selectedBloodGroup}
              onChange={(e) =>
                setSelectedBloodGroup(
                  e.target.value as BloodGroup
                )
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <option value="">
                Select your blood group
              </option>

              {bloodGroups.map((bloodGroup) => (
                <option
                  key={bloodGroup.value}
                  value={bloodGroup.value}
                >
                  {bloodGroup.label}
                </option>
              ))}
            </select>

            <p className="text-xs text-muted-foreground">
              Your blood group is required for donor
              registration.
            </p>
          </div>
        )}

        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className={
                fieldErrors.name
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {fieldErrors.name && (
              <p className="text-xs font-medium text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={
                fieldErrors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {fieldErrors.email && (
              <p className="text-xs font-medium text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone + Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number
              <span className="ml-1 text-xs text-muted-foreground">
                (optional)
              </span>
            </Label>

            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
              className={
                fieldErrors.phone
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {fieldErrors.phone && (
              <p className="text-xs font-medium text-red-600">
                {fieldErrors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              Location
              <span className="ml-1 text-xs text-muted-foreground">
                (optional)
              </span>
            </Label>

            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Dhaka, Bangladesh"
              autoComplete="address-level2"
              className={
                fieldErrors.location
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {fieldErrors.location && (
              <p className="text-xs font-medium text-red-600">
                {fieldErrors.location}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Create a strong password"
              autoComplete="new-password"
              className={`pr-12 ${
                fieldErrors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {fieldErrors.password ? (
            <p className="text-xs font-medium text-red-600">
              {fieldErrors.password}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Use 8+ characters with uppercase, lowercase,
              number and special character.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm Password
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className={`pr-12 ${
                fieldErrors.confirmPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {fieldErrors.confirmPassword && (
            <p className="text-xs font-medium text-red-600">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          isDisabled={isLoading}
          className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-red-600/30"
        >
          {isLoading ? (
            "Creating account..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Create BloodLink Account
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>

        {/* Trust Note */}
        <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

          <p className="text-xs leading-5 text-muted-foreground">
            Your information is used only to help connect blood
            donors with people who need them.
          </p>
        </div>
      </form>
    </div>
  );
}