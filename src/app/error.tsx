
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-32 w-32 animate-pulse rounded-full bg-red-500/10 blur-2xl" />

        <div className="absolute right-[10%] top-[25%] h-40 w-40 animate-pulse rounded-full bg-rose-500/10 blur-3xl [animation-delay:1s]" />

        <div className="absolute bottom-[10%] left-[30%] h-36 w-36 animate-pulse rounded-full bg-red-400/10 blur-3xl [animation-delay:2s]" />
      </div>

      {/* Error Content */}
      <div className="w-full max-w-md text-center">
        {/* Animated Icon */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10" />

          {/* Icon Container */}
          <div className="relative flex h-20 w-20 animate-bounce items-center justify-center rounded-full border border-red-200 bg-red-50 text-4xl shadow-lg dark:border-red-900 dark:bg-red-950/40">
            ⚠️
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
            Error 500
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Something went wrong
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
            We could not load this page right now. Please try again
            or come back later.
          </p>
        </div>

        {/* Button */}
        <div className="mt-8">
          <Button
            onClick={() => reset()}
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Try Again
          </Button>
        </div>

        {/* Small animated dots */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-400" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:150ms]" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}