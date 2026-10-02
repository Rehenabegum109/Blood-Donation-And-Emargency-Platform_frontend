
import Link from "next/link";
import { ArrowRight, HeartPulse, ShieldCheck, Users } from "lucide-react";

export default function BecomeDonor() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-background to-rose-50 py-20 dark:from-red-950/20 dark:via-background dark:to-rose-950/10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Patient Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-red-100 bg-white p-3 shadow-xl shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-950">
              {/* Illustration area */}
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-red-50 via-white to-rose-100 dark:from-red-950/40 dark:via-zinc-900 dark:to-rose-950/30">
                {/* Decorative circles */}
                <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-red-200/70 dark:border-red-800/50" />
                <div className="absolute right-8 top-12 h-32 w-32 rounded-full border border-rose-200/70 dark:border-rose-800/40" />
                <div className="absolute bottom-8 left-16 h-16 w-16 rounded-full bg-red-500/10" />

                {/* Patient illustration */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative flex h-56 w-64 items-center justify-center rounded-[3rem] bg-white shadow-lg shadow-red-500/10 dark:bg-zinc-900">
                    {/* Bed */}
                    <div className="absolute bottom-12 h-20 w-48 rounded-2xl bg-white shadow-md dark:bg-zinc-800">
                      <div className="absolute -bottom-3 left-5 h-5 w-5 rounded-full bg-zinc-400" />
                      <div className="absolute -bottom-3 right-5 h-5 w-5 rounded-full bg-zinc-400" />
                    </div>

                    {/* Pillow */}
                    <div className="absolute bottom-28 left-8 h-10 w-16 rounded-xl bg-red-100 dark:bg-red-950/50" />

                    {/* Patient body */}
                    <div className="absolute bottom-20 left-20 h-16 w-28 rounded-t-[2rem] rounded-b-xl bg-red-500/90" />

                    {/* Patient head */}
                    <div className="absolute bottom-32 left-[4.5rem] h-14 w-14 rounded-full bg-amber-200">
                      <div className="absolute left-2 top-0 h-5 w-10 rounded-full bg-zinc-800" />
                      <div className="absolute left-4 top-7 h-1.5 w-1.5 rounded-full bg-zinc-700" />
                      <div className="absolute right-4 top-7 h-1.5 w-1.5 rounded-full bg-zinc-700" />
                      <div className="absolute left-5 top-10 h-1 w-5 rounded-full bg-red-300" />
                    </div>

                    {/* Blanket */}
                    <div className="absolute bottom-16 right-6 h-16 w-28 rounded-2xl bg-red-100 dark:bg-red-950/60" />

                    {/* Heart */}
                    <HeartPulse className="absolute right-5 top-5 h-8 w-8 animate-pulse text-red-500" />
                  </div>

                  {/* Hospital monitor */}
                  <div className="absolute right-3 top-20 hidden h-28 w-20 rounded-xl border border-red-100 bg-white p-3 shadow-lg sm:block dark:border-red-900/40 dark:bg-zinc-900">
                    <div className="mb-2 text-[9px] font-semibold text-muted-foreground">
                      HEART
                    </div>

                    <svg
                      viewBox="0 0 100 35"
                      className="h-10 w-full text-red-500"
                      fill="none"
                    >
                      <path
                        d="M0 18 H18 L24 18 L29 7 L36 29 L43 18 H60 L66 18 L71 12 L77 24 L84 18 H100"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>

                    <div className="mt-1 text-center text-sm font-bold text-red-600">
                      72
                    </div>
                  </div>
                </div>

                {/* Floating donor badge */}
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-red-100 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-red-900/40 dark:bg-zinc-900/90">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Community
                    </p>
                    <p className="text-sm font-bold">Donors Helping Lives</p>
                  </div>
                </div>

                {/* Floating verified badge */}
                <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full border border-red-100 bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur dark:border-red-900/40 dark:bg-zinc-900/90">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:border-red-900/50 dark:text-red-400">
              <HeartPulse className="h-4 w-4" />
              Every Drop Matters
            </div>

            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Someone Is Waiting
              <span className="block text-red-600">For Your Blood.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              A simple donation can become someone&apos;s second chance at
              life. Join BloodLink and connect with people who need your help
              when every minute matters.
            </p>

            {/* Feature points */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-white/80 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-900/70">
                <HeartPulse className="mb-3 h-6 w-6 text-red-600" />

                <h3 className="font-semibold text-foreground">
                  Save Lives
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Your donation can help a patient during a critical moment.
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-white/80 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10 dark:border-red-900/40 dark:bg-zinc-900/70">
                <Users className="mb-3 h-6 w-6 text-red-600" />

                <h3 className="font-semibold text-foreground">
                  Join the Community
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Become part of a community built around helping others.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/25"
              >
                Become a Donor

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/donors"
                className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 dark:border-red-900/50 dark:bg-zinc-950 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                Find a Donor
              </Link>
            </div>

            {/* Small note */}
            <p className="mt-5 text-xs text-muted-foreground">
              BloodLink connects donors and recipients through a trusted
              emergency blood network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
