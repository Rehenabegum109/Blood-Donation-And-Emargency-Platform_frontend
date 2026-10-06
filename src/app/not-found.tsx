
import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[15%] top-[20%] h-48 w-48 animate-pulse rounded-full bg-red-500/10 blur-3xl" />

        <div className="absolute bottom-[15%] right-[15%] h-56 w-56 animate-pulse rounded-full bg-rose-500/10 blur-3xl [animation-delay:1.5s]" />
      </div>

      <div className="w-full max-w-lg text-center">
        {/* Unique Animated 404 Icon */}
        <div className="relative mx-auto mb-10 h-40 w-40">
          {/* Outer Orbit */}
          <div className="absolute inset-2 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-red-300/60" />

          {/* Inner Orbit */}
          <div className="absolute inset-7 animate-[spin_5s_linear_infinite_reverse] rounded-full border border-red-200/50" />

          {/* Orbit Dot */}
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />

          {/* Main Icon */}
          <div className="absolute inset-10 flex animate-float items-center justify-center rounded-full border bg-background shadow-xl">
            <SearchX className="h-10 w-10 text-red-500" />
          </div>

          {/* Floating Dot */}
          <span className="absolute bottom-5 left-4 h-2.5 w-2.5 animate-bounce rounded-full bg-rose-400" />

          {/* Ping Dot */}
          <span className="absolute right-2 top-14 h-2 w-2 animate-ping rounded-full bg-red-400" />
        </div>

        {/* 404 Content */}
        <div className="space-y-3">
          <p className="text-7xl font-black tracking-tight text-red-500 sm:text-8xl">
            404
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Page Not Found
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
            Oops! The page you are looking for seems to have
            disappeared. Let us take you somewhere safe.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8">
          <Link href="/">
            <Button className="group bg-red-500 px-6 text-white transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30">
              <Home className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative Line */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-border" />

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />

          <span className="h-px w-12 bg-border" />
        </div>
      </div>
    </main>
  );
}
