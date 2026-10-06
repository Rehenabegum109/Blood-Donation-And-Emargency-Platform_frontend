
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        {/* Animated Blood Drop */}
        <div className="relative mb-8 h-24 w-24">
          {/* Pulse Ring */}
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10" />

          {/* Outer Circle */}
          <div className="absolute inset-2 flex items-center justify-center rounded-full border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            {/* Blood Drop */}
            <div className="relative h-10 w-10 animate-bounce">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  d="M12 2.5C12 2.5 5.5 9.5 5.5 14.5C5.5 18.37 8.41 21.5 12 21.5C15.59 21.5 18.5 18.37 18.5 14.5C18.5 9.5 12 2.5 12 2.5Z"
                  fill="currentColor"
                  className="text-red-500"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold">
          BloodLink
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Loading your experience...
        </p>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:150ms]" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}
