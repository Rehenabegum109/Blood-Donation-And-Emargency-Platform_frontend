

import RegisterForm from "@/src/components/auth/registerForm";
import Link from "next/link";



export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/20 dark:via-zinc-950 dark:to-rose-950/10">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-2xl shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-950 lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <span className="text-xl">♥</span>
                </div>

                <span className="text-xl font-bold">
                  Blood<span className="text-red-200">Link</span>
                </span>
              </Link>
            </div>

            <div className="relative z-10 my-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur">
                ♥
              </div>

              <h2 className="max-w-md text-4xl font-bold leading-tight">
                One account.
                <br />
                One community.
                <br />
                <span className="text-red-200">Many lives.</span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-red-100">
                Join BloodLink and become part of a community that connects
                blood donors with people who need help when it matters most.
              </p>
            </div>

            <div className="relative z-10">
              <p className="text-sm text-red-100">
                Every drop can make a difference.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <RegisterForm />

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
