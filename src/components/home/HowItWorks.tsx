
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Search,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Droplets,
    title: "Request Blood",
    description:
      "Create a blood request with the required blood group, location, hospital, and urgency details.",
  },
  {
    number: "02",
    icon: Search,
    title: "Find a Donor",
    description:
      "Search for suitable blood donors based on blood group and location when someone needs help.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Save a Life",
    description:
      "Connect with the donor and respond to the emergency. Your donation can make a real difference.",
  },
];

export default function HowItWorks() {
  return (

<section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.10),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.08),transparent_35%)] py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
            <HeartHandshake className="h-4 w-4" />
            Simple & Meaningful
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How <span className="text-red-600">BloodLink</span> Works
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Helping donors and recipients connect quickly when every second
            matters.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-red-500/10 via-red-500/40 to-red-500/10 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full rounded-2xl border border-border bg-background p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5">
                  
                  {/* Number */}
                  <span className="absolute right-5 top-5 text-4xl font-black text-red-500/5 transition-colors duration-300 group-hover:text-red-500/10">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Step indicator */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    <span className="h-1.5 w-8 rounded-full bg-red-600/10 transition-all duration-300 group-hover:w-12 group-hover:bg-red-600/30" />
                  </div>
                </div>

                {/* Arrow between cards */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-14 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-red-500/20 bg-background text-red-600 md:flex">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          >
            Join the BloodLink community
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
