
import {
  Clock3,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Verified Donors",
    description:
      "Connect with registered donors and find the blood group you need with confidence.",
  },
  {
    number: "02",
    icon: Clock3,
    title: "Fast Response",
    description:
      "Emergency requests are easier to discover so donors can respond when time matters.",
  },
  {
    number: "03",
    icon: LockKeyhole,
    title: "Secure Platform",
    description:
      "Your account and personal information are handled through a secure platform.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Community Driven",
    description:
      "Bring donors and recipients together through a community built around helping others.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
            Why BloodLink?
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Built Around
            <span className="text-red-600"> Saving Lives</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            BloodLink makes emergency blood support simpler by connecting
            people who need blood with people who are ready to help.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 dark:hover:border-red-900/60"
              >
                {/* Number */}
                <span className="absolute right-5 top-5 text-4xl font-bold text-red-500/10 transition-colors duration-300 group-hover:text-red-500/20">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white dark:text-red-400">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Bottom line */}
                <div className="mt-6 h-1 w-8 rounded-full bg-red-500 transition-all duration-300 group-hover:w-16" />
              </div>
            );
          })}
        </div>

        {/* Trust Strip */}
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-red-100 bg-red-50/70 px-6 py-5 dark:border-red-900/40 dark:bg-red-950/20">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-semibold text-foreground">
                One platform. One community. One purpose.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Making blood donation easier when it matters most.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
              <HeartHandshake className="h-5 w-5" />
              Together We Help
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
