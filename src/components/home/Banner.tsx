


// "use client";

// import Link from "next/link";
// import {
//   ArrowRight,
//   Heart,
//   ShieldCheck,
//   Users,
//   Droplets,
//   Activity,
// } from "lucide-react";

// export default function Banner() {
//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-br from-red-50 via-background to-rose-50 dark:from-red-950/30 dark:via-background dark:to-rose-950/20">
//       {/* Background glow */}
//       <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-500/15 blur-3xl" />

//       <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-rose-500/15 blur-3xl" />

//       {/* Floating particles */}
//       <div className="pointer-events-none absolute left-[10%] top-[20%] h-3 w-3 animate-ping rounded-full bg-red-500/40" />

//       <div className="pointer-events-none absolute right-[15%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-red-600/50" />

//       <div className="pointer-events-none absolute bottom-[20%] left-[45%] h-2 w-2 animate-pulse rounded-full bg-rose-500/50" />

//       <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//         <div className="grid min-h-[calc(100vh-64px)] items-center gap-16 lg:grid-cols-2">

//           {/* ================= LEFT ================= */}
//           <div className="relative z-10 animate-[fadeInUp_0.8s_ease-out]">

//             {/* Badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm backdrop-blur dark:border-red-900/50 dark:bg-white/5">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
//               </span>

//               Emergency Blood Network
//             </div>

//             {/* Heading */}
//             <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
//               One Donation.
//               <br />

//               <span className="bg-gradient-to-r from-red-600 via-red-500 to-rose-500 bg-clip-text text-transparent">
//                 Three Lives.
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
//               BloodLink brings donors, recipients, and emergency blood
//               requests together in one trusted platform. Your single
//               donation can become someone&apos;s second chance.
//             </p>

//             {/* Buttons */}
//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <Link
//                 href="/register"
//                 className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30"
//               >
//                 Become a Donor

//                 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//               </Link>

//               <Link
//                 href="/requests"
//                 className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white/60 px-7 text-sm font-bold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:text-red-600 dark:border-red-900/50 dark:bg-white/5"
//               >
//                 <Droplets className="h-4 w-4 text-red-600" />
//                 Find Blood
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
//               <div className="rounded-xl border border-red-100 bg-white/60 p-4 backdrop-blur dark:border-red-900/30 dark:bg-white/5">
//                 <p className="text-2xl font-black text-red-600">1K+</p>
//                 <p className="mt-1 text-xs text-muted-foreground">
//                   Donors
//                 </p>
//               </div>

//               <div className="rounded-xl border border-red-100 bg-white/60 p-4 backdrop-blur dark:border-red-900/30 dark:bg-white/5">
//                 <p className="text-2xl font-black text-red-600">500+</p>
//                 <p className="mt-1 text-xs text-muted-foreground">
//                   Lives Helped
//                 </p>
//               </div>

//               <div className="rounded-xl border border-red-100 bg-white/60 p-4 backdrop-blur dark:border-red-900/30 dark:bg-white/5">
//                 <p className="text-2xl font-black text-red-600">24/7</p>
//                 <p className="mt-1 text-xs text-muted-foreground">
//                   Support
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT ================= */}
//           <div className="relative flex min-h-[500px] items-center justify-center">

//             {/* Large glow */}
//             <div className="absolute h-[330px] w-[330px] rounded-full bg-red-500/10 blur-3xl" />

//             {/* Rotating outer ring */}
//             <div className="absolute h-[420px] w-[420px] animate-[spin_25s_linear_infinite] rounded-full border border-dashed border-red-500/20" />

//             <div className="absolute h-[350px] w-[350px] animate-[spin_18s_linear_infinite_reverse] rounded-full border border-red-500/10" />

//             {/* Main blood circle */}
//             <div className="relative flex h-64 w-64 animate-[heartbeat_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-600/40">
//               <div className="absolute inset-3 rounded-full border border-white/20" />

//               <Heart className="h-28 w-28 fill-white text-white" />
//             </div>

//             {/* Top floating card */}
//             <div className="absolute left-0 top-14 animate-[float_4s_ease-in-out_infinite] rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950">
//                   <Activity className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <p className="text-xs text-muted-foreground">
//                     Emergency
//                   </p>

//                   <p className="text-sm font-bold text-foreground">
//                     Blood Request
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom floating card */}
//             <div className="absolute bottom-16 right-0 animate-[float_4s_ease-in-out_infinite_1s] rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950">
//                   <ShieldCheck className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <p className="text-xs text-muted-foreground">
//                     Community
//                   </p>

//                   <p className="text-sm font-bold text-foreground">
//                     Together We Save
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Donor card */}
//             <div className="absolute bottom-2 left-10 flex animate-[float_5s_ease-in-out_infinite] items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-xl dark:border-red-900/30 dark:bg-black/40">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white">
//                 <Users className="h-3.5 w-3.5" />
//               </div>

//               <span className="text-xs font-semibold text-foreground">
//                 People helping people
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade */}
//       <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HeartPulse,
  ShieldCheck,
  Users,
  Droplets,
  Activity,
  Sparkles,
  Plus,
} from "lucide-react";

export default function Banner() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-50">

      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}

      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-red-200/40 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-rose-200/50 blur-[130px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/50 blur-[120px]" />

      {/* =========================================================
          SOFT GRID
      ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* =========================================================
          FLOATING BLOOD CELLS
      ========================================================= */}

      <div className="blood-cell blood-cell-1">
        <Droplets />
      </div>

      <div className="blood-cell blood-cell-2">
        <Droplets />
      </div>

      <div className="blood-cell blood-cell-3">
        <Plus />
      </div>

      <div className="blood-cell blood-cell-4">
        <Heart />
      </div>

      <div className="blood-cell blood-cell-5">
        <Droplets />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="max-w-2xl">

            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-red-600 shadow-sm backdrop-blur-md">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />

                <span className="relative h-2.5 w-2.5 rounded-full bg-red-600" />

              </span>

              EVERY DROP MATTERS

            </div>

            {/* Heading */}

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl xl:text-8xl">

              Give Blood.

              <span className="bloodlink-gradient-text block">
                Give Hope.
              </span>

              <span className="block">
                Save a Life.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              BloodLink connects generous donors with people who urgently need
              blood. One donation can become someone&apos;s second chance at
              life.
            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/donors"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30"
              >
                Find a Donor

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-7 py-3.5 text-sm font-bold text-zinc-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Become a Donor
              </Link>

            </div>

            {/* Trust */}

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm text-zinc-500">

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-500" />
                Trusted Community
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                Real Donors
              </div>

              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-red-500" />
                Emergency Support
              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <div className="relative mx-auto flex h-[500px] w-full max-w-xl items-center justify-center">

            {/* =================================================
                LARGE ROTATING ORBIT
            ================================================= */}

            <div className="bloodlink-orbit absolute h-[360px] w-[360px] rounded-full border border-red-200/60 sm:h-[410px] sm:w-[410px]">

              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />

              <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-400" />

            </div>

            {/* Second orbit */}

            <div className="bloodlink-orbit-reverse absolute h-[280px] w-[280px] rounded-full border border-rose-200/60 sm:h-[320px] sm:w-[320px]">

              <span className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-rose-400" />

            </div>

            {/* =================================================
                GLOW
            ================================================= */}

            <div className="absolute h-64 w-64 rounded-full bg-red-300/30 blur-[80px]" />

            {/* =================================================
                PULSE CIRCLES
            ================================================= */}

            <div className="bloodlink-pulse absolute h-60 w-60 rounded-full border border-red-300/30" />

            <div className="bloodlink-pulse-delay absolute h-72 w-72 rounded-full border border-red-200/20" />

            {/* =================================================
                MAIN HEART
            ================================================= */}

            <div className="bloodlink-main-heart relative z-10 flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-red-600 to-rose-500 shadow-[0_20px_70px_rgba(220,38,38,0.30)] sm:h-60 sm:w-60">

              {/* Inner circle */}

              <div className="absolute inset-4 rounded-full border border-white/20" />

              {/* Heart */}

              <Heart
                className="relative z-10 h-32 w-32 fill-white text-white drop-shadow-lg sm:h-36 sm:w-36"
              />

              {/* ECG icon */}

              <div className="absolute flex items-center justify-center">

                <HeartPulse className="h-12 w-12 text-red-500 sm:h-14 sm:w-14" />

              </div>

            </div>

            {/* =================================================
                FLOATING DROP
            ================================================= */}

            <div className="bloodlink-floating-drop absolute right-[10%] top-[12%] z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-white/90 shadow-xl backdrop-blur-md">

              <Droplets className="h-9 w-9 fill-red-500 text-red-600" />

            </div>

            {/* =================================================
                COMMUNITY CARD
            ================================================= */}

            <div className="bloodlink-card-one absolute left-0 top-[17%] z-20 rounded-2xl border border-red-100 bg-white/90 p-4 shadow-xl backdrop-blur-md">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">

                  <Users className="h-5 w-5 text-red-600" />

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                    Community
                  </p>

                  <p className="text-sm font-bold text-zinc-900">
                    Donors Ready
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                URGENT REQUEST CARD
            ================================================= */}

            <div className="bloodlink-card-two absolute bottom-[17%] right-0 z-20 rounded-2xl border border-red-100 bg-white/90 p-4 shadow-xl backdrop-blur-md">

              <div className="flex items-center gap-3">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-sm font-black text-white shadow-lg shadow-red-500/20">

                  O-

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />

                </div>

                <div>

                  <div className="flex items-center gap-1.5">

                    <Activity className="h-3 w-3 text-red-500" />

                    <p className="text-[10px] uppercase tracking-wider text-red-500">
                      Live Request
                    </p>

                  </div>

                  <p className="text-sm font-bold text-zinc-900">
                    Blood Needed
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SPARKLE
            ================================================= */}

            <div className="bloodlink-spark absolute bottom-[29%] left-[14%]">

              <Sparkles className="h-5 w-5 text-red-400" />

            </div>

            {/* =================================================
                ECG LINE
            ================================================= */}

            <div className="bloodlink-ecg absolute bottom-[8%] left-1/2 w-[290px] -translate-x-1/2 overflow-hidden">

              <svg
                viewBox="0 0 300 60"
                className="h-12 w-full"
                fill="none"
              >

                <path
                  d="M0 30 H50 L60 30 L72 30 L82 8 L94 52 L106 30 H135 L145 30 L156 30 L166 16 L178 44 L190 30 H220 L230 30 L242 7 L254 53 L266 30 H300"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-red-500"
                />

              </svg>

            </div>

            {/* Quote */}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-red-100 bg-white/80 px-5 py-2.5 text-[11px] font-semibold text-zinc-500 shadow-sm backdrop-blur-md">

              One donation can save a life.

            </div>

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style jsx>{`

        /* ==============================
           GRADIENT TEXT
        ============================== */

        .bloodlink-gradient-text {
          background: linear-gradient(
            90deg,
            #ef4444,
            #dc2626,
            #f43f5e,
            #dc2626,
            #ef4444
          );

          background-size: 300% 100%;

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          animation: gradientMove 5s ease infinite;
        }

        /* ==============================
           HEART
        ============================== */

        .bloodlink-main-heart {
          animation: heartbeat 2.2s ease-in-out infinite;
        }

        /* ==============================
           ORBITS
        ============================== */

        .bloodlink-orbit {
          animation: orbitRotate 18s linear infinite;
        }

        .bloodlink-orbit-reverse {
          animation: orbitRotateReverse 13s linear infinite;
        }

        /* ==============================
           PULSE
        ============================== */

        .bloodlink-pulse {
          animation: pulseRing 3s ease-out infinite;
        }

        .bloodlink-pulse-delay {
          animation: pulseRing 3s ease-out infinite 1.2s;
        }

        /* ==============================
           FLOATING CARDS
        ============================== */

        .bloodlink-card-one {
          animation: floatOne 4s ease-in-out infinite;
        }

        .bloodlink-card-two {
          animation: floatTwo 4.5s ease-in-out infinite;
        }

        /* ==============================
           BLOOD DROP
        ============================== */

        .bloodlink-floating-drop {
          animation: dropFloat 3.5s ease-in-out infinite;
        }

        /* ==============================
           SPARK
        ============================== */

        .bloodlink-spark {
          animation: sparkle 2s ease-in-out infinite;
        }

        /* ==============================
           ECG
        ============================== */

        .bloodlink-ecg {
          animation: ecgGlow 2s ease-in-out infinite;
        }

        /* ==============================
           BLOOD CELLS
        ============================== */

        .blood-cell {
          position: absolute;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(239, 68, 68, 0.08);
          color: rgba(220, 38, 38, 0.35);
          backdrop-filter: blur(4px);
        }

        .blood-cell svg {
          height: 12px;
          width: 12px;
        }

        .blood-cell-1 {
          left: 8%;
          top: 25%;
          height: 34px;
          width: 34px;
          animation: cellFloatOne 7s ease-in-out infinite;
        }

        .blood-cell-2 {
          left: 20%;
          bottom: 18%;
          height: 24px;
          width: 24px;
          animation: cellFloatTwo 8s ease-in-out infinite;
        }

        .blood-cell-3 {
          left: 44%;
          top: 12%;
          height: 20px;
          width: 20px;
          animation: cellFloatThree 6s ease-in-out infinite;
        }

        .blood-cell-4 {
          right: 18%;
          top: 24%;
          height: 30px;
          width: 30px;
          animation: cellFloatOne 9s ease-in-out infinite;
        }

        .blood-cell-5 {
          right: 8%;
          bottom: 22%;
          height: 22px;
          width: 22px;
          animation: cellFloatTwo 7s ease-in-out infinite;
        }

        /* ==============================
           KEYFRAMES
        ============================== */

        @keyframes heartbeat {

          0%,
          100% {
            transform: scale(1);
          }

          15% {
            transform: scale(1.06);
          }

          30% {
            transform: scale(1);
          }

          45% {
            transform: scale(1.08);
          }

          60% {
            transform: scale(1);
          }

        }

        @keyframes orbitRotate {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }

        @keyframes orbitRotateReverse {

          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }

        }

        @keyframes pulseRing {

          0% {
            transform: scale(0.7);
            opacity: 0.7;
          }

          70% {
            transform: scale(1.2);
            opacity: 0;
          }

          100% {
            transform: scale(1.2);
            opacity: 0;
          }

        }

        @keyframes floatOne {

          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-14px) rotate(1deg);
          }

        }

        @keyframes floatTwo {

          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(13px) rotate(-1deg);
          }

        }

        @keyframes dropFloat {

          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-16px) rotate(7deg);
          }

        }

        @keyframes sparkle {

          0%,
          100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.4;
          }

          50% {
            transform: scale(1.25) rotate(20deg);
            opacity: 1;
          }

        }

        @keyframes ecgGlow {

          0%,
          100% {
            opacity: 0.35;
            transform: translateX(-50%) scaleX(0.95);
          }

          50% {
            opacity: 0.8;
            transform: translateX(-50%) scaleX(1);
          }

        }

        @keyframes cellFloatOne {

          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }

          50% {
            transform: translate(35px, -40px) rotate(180deg);
          }

        }

        @keyframes cellFloatTwo {

          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-25px, -45px);
          }

        }

        @keyframes cellFloatThree {

          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(30px) scale(1.3);
          }

        }

        @keyframes gradientMove {

          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          .bloodlink-gradient-text,
          .bloodlink-main-heart,
          .bloodlink-orbit,
          .bloodlink-orbit-reverse,
          .bloodlink-pulse,
          .bloodlink-pulse-delay,
          .bloodlink-card-one,
          .bloodlink-card-two,
          .bloodlink-floating-drop,
          .bloodlink-spark,
          .bloodlink-ecg,
          .blood-cell {
            animation: none;
          }

        }

        @media (max-width: 640px) {

          .bloodlink-orbit {
            height: 290px;
            width: 290px;
          }

          .bloodlink-orbit-reverse {
            height: 230px;
            width: 230px;
          }

          .bloodlink-card-one {
            left: 0;
            transform: scale(0.9);
          }

          .bloodlink-card-two {
            right: 0;
            transform: scale(0.9);
          }

        }

      `}</style>
    </section>
  );
}