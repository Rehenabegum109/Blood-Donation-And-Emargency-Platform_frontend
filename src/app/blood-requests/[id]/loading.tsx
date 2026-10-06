
export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        {/* Animated Blood Drop */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-200/60" />

          <div className="absolute inset-3 animate-pulse rounded-full bg-red-100" />

          <div className="relative flex h-16 w-16 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16 animate-bounce text-red-600"
              aria-hidden="true"
            >
              <path d="M12 2.69l-.59.72C10.28 4.72 5 11.15 5 15.5a7 7 0 0014 0c0-4.35-5.28-10.78-6.41-12.09L12 2.69z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-7 text-center">
          <h2 className="text-xl font-bold text-red-700">
            Loading Blood Request
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we fetch the request details...
          </p>
        </div>

        {/* Animated Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-500" />
        </div>
      </div>
    </main>
  );
}
