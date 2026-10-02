
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Heart,
} from "lucide-react";

const bloodGroups = [
  {
    group: "A+",
    type: "A Positive",
    description: "Can donate to A+ and AB+",
  },
  {
    group: "A-",
    type: "A Negative",
    description: "Can donate to A+, A-, AB+, AB-",
  },
  {
    group: "B+",
    type: "B Positive",
    description: "Can donate to B+ and AB+",
  },
  {
    group: "B-",
    type: "B Negative",
    description: "Can donate to B+, B-, AB+, AB-",
  },
  {
    group: "AB+",
    type: "AB Positive",
    description: "Can donate to AB+",
  },
  {
    group: "AB-",
    type: "AB Negative",
    description: "Can donate to AB+ and AB-",
  },
  {
    group: "O+",
    type: "O Positive",
    description: "Can donate to O+ and AB+",
  },
  {
    group: "O-",
    type: "O Negative",
    description: "Universal red cell donor",
  },
];

export default function BloodGroups() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
            <Droplets className="h-4 w-4" />
            Blood Compatibility
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find the Right
            <span className="text-red-600"> Blood Group</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Explore blood groups and connect with donors who can help when
            someone needs blood.
          </p>
        </div>

        {/* Blood Group Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {bloodGroups.map((blood) => (
            <Link
              key={blood.group}
              href={`/donors?bloodGroup=${encodeURIComponent(blood.group)}`}
              className="group"
            >
              <div className="relative flex h-full min-h-[190px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10">
                
                {/* Decorative heart */}
                <Heart className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rotate-12 text-red-500/5 transition-colors duration-300 group-hover:text-red-500/10" />

                {/* Blood Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-600/30">
                  <Droplets className="h-6 w-6 fill-current" />
                </div>

                {/* Group */}
                <h3 className="mt-4 text-2xl font-black text-red-600">
                  {blood.group}
                </h3>

                {/* Name */}
                <p className="mt-1 text-xs font-semibold text-foreground">
                  {blood.type}
                </p>

                {/* Description */}
                <p className="mt-2 hidden text-[10px] leading-4 text-muted-foreground lg:block">
                  {blood.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-red-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Find Donors
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/donors"
            className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
          >
            Find a Blood Donor
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
