
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Connect Donors",
    description:
      "Find eligible blood donors based on blood group and availability.",
  },
  {
    icon: MapPin,
    title: "Find Nearby Help",
    description:
      "Connect recipients with suitable donors when blood is urgently needed.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Requests",
    description:
      "Blood requests go through verification to keep the platform reliable.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description:
      "Make it easier to reach potential donors during critical situations.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a Request",
    description:
      "Recipients can submit their blood requirement with hospital and patient information.",
  },
  {
    number: "02",
    title: "Request Verification",
    description:
      "The submitted request is reviewed and verified before donor matching.",
  },
  {
    number: "03",
    title: "Find Donors",
    description:
      "Eligible donors can be matched according to blood group and availability.",
  },
  {
    number: "04",
    title: "Save a Life",
    description:
      "Recipients and donors can connect and complete the donation process.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero */}
      <section className="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
                <Droplets className="h-4 w-4 fill-red-500" />
                About BloodLink
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Connecting people who can{" "}
                <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                  save lives.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                BloodLink is a blood donation and emergency assistance platform
                designed to make finding and connecting with blood donors
                simpler, faster, and more reliable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/find-donors"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:from-red-700 hover:to-rose-700"
                >
                  Find Donors
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/blood-requests"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                >
                  Blood Requests
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
                <div className="absolute inset-0 animate-pulse rounded-full bg-red-100/70" />
                <div className="absolute inset-8 rounded-full border border-red-200 bg-white/80 shadow-xl" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-red-600 to-rose-500 shadow-2xl shadow-red-300">
                  <div className="flex h-full flex-col items-center justify-center text-white">
                    <Droplets className="h-20 w-20 fill-white" />
                    <p className="mt-3 text-2xl font-extrabold">BloodLink</p>
                    <p className="mt-1 text-sm text-red-100">
                      Together, we save lives.
                    </p>
                  </div>
                </div>

                <div className="absolute -left-2 top-12 rounded-2xl border border-red-100 bg-white p-4 shadow-lg sm:left-0">
                  <HeartHandshake className="h-7 w-7 text-red-600" />
                </div>

                <div className="absolute -right-2 bottom-12 rounded-2xl border border-red-100 bg-white p-4 shadow-lg sm:right-0">
                  <ShieldCheck className="h-7 w-7 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-red-100 bg-white/80 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-red-600">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Making blood support more accessible
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              In an emergency, every minute matters. BloodLink aims to reduce
              the difficulty of finding suitable donors by bringing recipients,
              donors, and verified blood requests together in one platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-red-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Simple steps. Real impact.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              BloodLink keeps the process simple so people can focus on what
              matters most during an emergency.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="h-full rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
                  <span className="text-4xl font-black text-red-100">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BloodLink */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-12 text-white shadow-xl shadow-red-200 sm:px-10 lg:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-red-100">
                Why BloodLink?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Built around people, not just technology.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-red-100">
                BloodLink combines donor availability, blood compatibility,
                verified requests, and emergency-focused workflows to create a
                better experience for both donors and recipients.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Blood group matching",
                "Verified blood requests",
                "Donor availability",
                "Emergency assistance",
                "Role-based access",
                "Secure platform",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-red-100 bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <HeartHandshake className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Be part of the BloodLink community
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Whether you are a donor ready to help or someone looking for blood,
            BloodLink is here to make the connection easier.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
            >
              Join BloodLink
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/blood-requests"
              className="inline-flex items-center rounded-xl border border-red-200 px-6 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              Explore Requests
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}