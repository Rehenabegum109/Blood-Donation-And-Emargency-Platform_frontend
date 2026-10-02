// "use client";

// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ArrowRight,
//   Eye,
//   EyeOff,
//   Heart,
//   ShieldCheck,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { loginUser } from "@/src/services/auth/auth.api";



// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSubmit(
//     event: FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     setError("");

//     if (!email.trim()) {
//       setError("Please enter your email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter your password.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const result = await loginUser({
//         email,
//         password,
//       });

//       console.log("Login successful:", result);

//       router.push("/");
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError("Login failed. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/20 dark:via-zinc-950 dark:to-rose-950/10">
//       <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">

//         <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-2xl shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-950 lg:grid-cols-2">

//           {/* Left Side */}
//           <div className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">

//             <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

//             <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

//             {/* Logo */}
//             <Link
//               href="/"
//               className="relative z-10 inline-flex w-fit items-center gap-2"
//             >
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
//                 <Heart className="h-5 w-5 fill-white" />
//               </div>

//               <span className="text-xl font-bold">
//                 Blood<span className="text-red-200">
//                   Link
//                 </span>
//               </span>
//             </Link>

//             {/* Content */}
//             <div className="relative z-10 my-12">
//               <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur">
//                 ♥
//               </div>

//               <h2 className="max-w-md text-4xl font-bold leading-tight">
//                 Welcome
//                 <br />
//                 back to
//                 <br />
//                 <span className="text-red-200">
//                   BloodLink.
//                 </span>
//               </h2>

//               <p className="mt-6 max-w-md text-base leading-7 text-red-100">
//                 Sign in to connect with donors, respond to
//                 blood requests, and help save lives when it
//                 matters most.
//               </p>
//             </div>

//             {/* Bottom */}
//             <div className="relative z-10 flex items-center gap-3 text-sm text-red-100">
//               <ShieldCheck className="h-5 w-5" />
//               <span>
//                 Your account is protected with secure
//                 authentication.
//               </span>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
//             <div className="w-full max-w-md">

//               {/* Header */}
//               <div className="mb-8">
//                 <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
//                   <ShieldCheck className="h-4 w-4" />
//                   Secure Login
//                 </div>

//                 <h1 className="text-3xl font-bold tracking-tight">
//                   Welcome Back
//                 </h1>

//                 <p className="mt-2 text-sm leading-6 text-muted-foreground">
//                   Sign in to your BloodLink account.
//                 </p>
//               </div>

//               {/* Form */}
//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-5"
//               >

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email">
//                     Email Address
//                   </Label>

//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     autoComplete="email"
//                     value={email}
//                     onChange={(event) =>
//                       setEmail(event.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="password">
//                       Password
//                     </Label>

//                     <Link
//                       href="/forgot-password"
//                       className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>

//                   <div className="relative">
//                     <Input
//                       id="password"
//                       name="password"
//                       type={
//                         showPassword
//                           ? "text"
//                           : "password"
//                       }
//                       placeholder="Enter your password"
//                       autoComplete="current-password"
//                       value={password}
//                       onChange={(event) =>
//                         setPassword(event.target.value)
//                       }
//                       className="pr-12"
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPassword(
//                           (previous) => !previous
//                         )
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
//                       aria-label={
//                         showPassword
//                           ? "Hide password"
//                           : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5" />
//                       ) : (
//                         <Eye className="h-5 w-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
//                     {error}
//                   </div>
//                 )}

//                 {/* Submit */}
//                 <Button
//                   type="submit"
//                   isDisabled={isLoading}
//                   className="group h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
//                 >
//                   {isLoading ? (
//                     "Signing in..."
//                   ) : (
//                     <span className="flex items-center justify-center gap-2">
//                       Sign In
//                       <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//                     </span>
//                   )}
//                 </Button>
//               </form>

//               {/* Register */}
//               <div className="mt-6 text-center text-sm text-muted-foreground">
//                 Do not have an account?{" "}
//                 <Link
//                   href="/register"
//                   className="font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
//                 >
//                   Create an account
//                 </Link>
//               </div>

//               {/* Trust */}
//               <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
//                 <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

//                 <p className="text-xs leading-5 text-muted-foreground">
//                   BloodLink uses secure authentication to
//                   protect your account and personal
//                   information.
//                 </p>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// 
"use client";

import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";
import GoogleLoginButton from "@/src/components/auth/GoogleLoginButton";
import LoginForm from "@/src/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/20 dark:via-zinc-950 dark:to-rose-950/10">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-2xl shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-950 lg:grid-cols-2">

          {/* =========================
              Left Side
          ========================== */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 inline-flex w-fit items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Heart className="h-5 w-5 fill-white" />
              </div>

              <span className="text-xl font-bold">
                Blood
                <span className="text-red-200">
                  Link
                </span>
              </span>
            </Link>

            {/* Content */}
            <div className="relative z-10 my-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur">
                ♥
              </div>

              <h2 className="max-w-md text-4xl font-bold leading-tight">
                Welcome
                <br />
                back to
                <br />

                <span className="text-red-200">
                  BloodLink.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-red-100">
                Sign in to connect with donors, respond to
                blood requests, and help save lives when it
                matters most.
              </p>
            </div>

            {/* Security */}
            <div className="relative z-10 flex items-center gap-3 text-sm text-red-100">
              <ShieldCheck className="h-5 w-5" />

              <span>
                Your account is protected with secure
                authentication.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">

              {/* Header */}
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                  <ShieldCheck className="h-4 w-4" />

                  Secure Login
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome Back
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sign in to your BloodLink account.
                </p>
              </div>

              <LoginForm />

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />

                <span className="text-xs font-medium text-muted-foreground">
                  OR
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              <GoogleLoginButton/>

              {/* Security message */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 dark:border-red-900/30 dark:bg-red-950/10">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

                <p className="text-xs leading-5 text-muted-foreground">
                  BloodLink uses secure authentication to
                  protect your account and personal
                  information.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
