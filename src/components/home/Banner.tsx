
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
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-red-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-rose-200/40 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/50 blur-[120px]" />

      {/* Soft Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Floating Background Icons */}
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

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="banner-content banner-delay-1 mb-7 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-red-700 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              EVERY DROP MATTERS
            </div>

            {/* Heading */}
            <h1 className="banner-content banner-delay-2 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-red-950 sm:text-6xl lg:text-7xl xl:text-8xl">
              Give Blood.
              <span className="bloodlink-gradient-text block">
                Give Hope.
              </span>
              <span className="block">Save a Life.</span>
            </h1>

            {/* Description */}
            <p className="banner-content banner-delay-3 mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              BloodLink connects generous donors with people who urgently need
              blood. One donation can become someone&apos;s second chance at
              life.
            </p>

            {/* Buttons */}
            <div className="banner-content banner-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/find-donors"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:-translate-y-1 hover:from-red-700 hover:to-rose-700 hover:shadow-xl"
              >
                Find a Donor
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white/80 px-7 py-3.5 text-sm font-bold text-red-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-50"
              >
                Become a Donor
              </Link>
            </div>

            {/* Trust Info */}
            <div className="banner-content banner-delay-5 mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-600" />
                Trusted Community
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-600" />
                Real Donors
              </div>

              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-red-600" />
                Emergency Support
              </div>
            </div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="banner-visual relative mx-auto flex h-[390px] w-full max-w-xl items-center justify-center sm:h-[500px]">
            {/* Main Orbit */}
            <div className="bloodlink-orbit absolute h-[260px] w-[260px] rounded-full border border-red-300/70 sm:h-[360px] sm:w-[360px] lg:h-[410px] lg:w-[410px]">
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-300" />

              <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-400" />
            </div>

            {/* Inner Orbit */}
            <div className="bloodlink-orbit-reverse absolute h-[205px] w-[205px] rounded-full border border-rose-300/60 sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]">
              <span className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-rose-400" />
            </div>

            {/* Glow */}
            <div className="absolute h-56 w-56 rounded-full bg-red-400/20 blur-[80px] sm:h-64 sm:w-64" />

            {/* Pulse Rings */}
            <div className="bloodlink-pulse absolute h-52 w-52 rounded-full border border-red-300/40 sm:h-60 sm:w-60" />

            <div className="bloodlink-pulse-delay absolute h-64 w-64 rounded-full border border-red-300/30 sm:h-72 sm:w-72" />

            {/* Main Heart */}
            <div className="bloodlink-main-heart relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-red-600 to-rose-500 shadow-[0_20px_80px_rgba(239,68,68,0.30)] sm:h-52 sm:w-52 lg:h-60 lg:w-60">
              <div className="absolute inset-4 rounded-full border border-white/30" />

              <Heart className="relative z-10 h-28 w-28 fill-white text-white drop-shadow-lg sm:h-32 sm:w-32 lg:h-36 lg:w-36" />

              <div className="absolute flex items-center justify-center">
                <HeartPulse className="h-10 w-10 text-red-500 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              </div>
            </div>

            {/* Floating Blood Drop */}
            <div className="bloodlink-floating-drop absolute right-[5%] top-[8%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-white/80 shadow-xl backdrop-blur-md sm:right-[10%] sm:top-[12%] sm:h-16 sm:w-16">
              <Droplets className="h-8 w-8 fill-red-500 text-red-500 sm:h-9 sm:w-9" />
            </div>

            {/* Community Card */}
            <div className="bloodlink-card-one absolute left-0 top-[17%] z-20 rounded-2xl border border-red-100 bg-white/85 p-3 shadow-xl backdrop-blur-md sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 sm:h-11 sm:w-11">
                  <Users className="h-5 w-5 text-red-600" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Community
                  </p>

                  <p className="text-xs font-bold text-slate-800 sm:text-sm">
                    Donors Ready
                  </p>
                </div>
              </div>
            </div>

            {/* Live Request Card */}
            <div className="bloodlink-card-two absolute bottom-[14%] right-0 z-20 rounded-2xl border border-red-100 bg-white/85 p-3 shadow-xl backdrop-blur-md sm:bottom-[17%] sm:p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-xs font-black text-white shadow-lg sm:h-11 sm:w-11 sm:text-sm">
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

                  <p className="text-xs font-bold text-slate-800 sm:text-sm">
                    Blood Needed
                  </p>
                </div>
              </div>
            </div>

            {/* Spark */}
            <div className="bloodlink-spark absolute bottom-[27%] left-[12%]">
              <Sparkles className="h-5 w-5 text-red-400" />
            </div>

            {/* ECG */}
            <div className="bloodlink-ecg absolute bottom-[5%] left-1/2 w-[240px] -translate-x-1/2 overflow-hidden sm:w-[290px]">
              <svg
                viewBox="0 0 300 60"
                className="h-10 w-full sm:h-12"
                fill="none"
              >
                <path
                  d="M0 30 H50 L60 30 L72 30 L82 8 L94 52 L106 30 H135 L145 30 L156 30 L166 16 L178 44 L190 30 H220 L230 30 L242 7 L254 53 L266 30 H300"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-red-400"
                />
              </svg>
            </div>

            {/* Bottom Message */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-red-100 bg-white/80 px-4 py-2 text-[10px] font-semibold text-red-600 shadow-sm backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-[11px]">
              One donation can save a life.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 to-transparent" />

      <style jsx>{`
        /* ========================================
           CONTENT REVEAL
           Animation first -> text afterwards
        ======================================== */

        .banner-content {
          opacity: 0;
          animation: contentReveal 0.8s ease-out forwards;
        }

        .banner-delay-1 {
          animation-delay: 1.8s;
        }

        .banner-delay-2 {
          animation-delay: 2.05s;
        }

        .banner-delay-3 {
          animation-delay: 2.3s;
        }

        .banner-delay-4 {
          animation-delay: 2.55s;
        }

        .banner-delay-5 {
          animation-delay: 2.8s;
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ========================================
           MAIN VISUAL ENTRANCE
        ======================================== */

        .banner-visual {
          opacity: 0;
          transform: scale(0.65);
          animation: visualReveal 1.5s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @keyframes visualReveal {
          0% {
            opacity: 0;
            transform: scale(0.65) rotate(-8deg);
          }

          70% {
            opacity: 1;
            transform: scale(1.04) rotate(1deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* ========================================
           GRADIENT TEXT
        ======================================== */

        .bloodlink-gradient-text {
          background: linear-gradient(
            90deg,
            #dc2626,
            #ef4444,
            #f43f5e,
            #ef4444,
            #dc2626
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 5s ease infinite;
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

        /* ========================================
           HEART
        ======================================== */

        .bloodlink-main-heart {
          animation: heartbeat 2.2s ease-in-out infinite;
        }

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

        /* ========================================
           ORBITS
        ======================================== */

        .bloodlink-orbit {
          animation: orbitRotate 18s linear infinite;
        }

        .bloodlink-orbit-reverse {
          animation: orbitRotateReverse 13s linear infinite;
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

        /* ========================================
           PULSE RINGS
        ======================================== */

        .bloodlink-pulse {
          animation: pulseRing 3s ease-out infinite;
        }

        .bloodlink-pulse-delay {
          animation: pulseRing 3s ease-out infinite 1.2s;
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

        /* ========================================
           FLOATING CARDS
        ======================================== */

        .bloodlink-card-one {
          animation: floatOne 4s ease-in-out infinite;
        }

        .bloodlink-card-two {
          animation: floatTwo 4.5s ease-in-out infinite;
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

        /* ========================================
           BLOOD DROP
        ======================================== */

        .bloodlink-floating-drop {
          animation: dropFloat 3.5s ease-in-out infinite;
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

        /* ========================================
           SPARK
        ======================================== */

        .bloodlink-spark {
          animation: sparkle 2s ease-in-out infinite;
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

        /* ========================================
           ECG
        ======================================== */

        .bloodlink-ecg {
          animation: ecgGlow 2s ease-in-out infinite;
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

        /* ========================================
           BACKGROUND FLOATING ICONS
        ======================================== */

        .blood-cell {
          position: absolute;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(248, 113, 113, 0.08);
          color: rgba(220, 38, 38, 0.25);
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

        /* ========================================
           REDUCED MOTION
        ======================================== */

        @media (prefers-reduced-motion: reduce) {
          .banner-content,
          .banner-visual,
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
            opacity: 1;
            transform: none;
          }
        }

        /* ========================================
           MOBILE RESPONSIVE
        ======================================== */

        @media (max-width: 640px) {
          .bloodlink-orbit {
            height: 260px;
            width: 260px;
          }

          .bloodlink-orbit-reverse {
            height: 205px;
            width: 205px;
          }

          .bloodlink-card-one {
            left: 0;
            transform: scale(0.78);
            transform-origin: left center;
          }

          .bloodlink-card-two {
            right: 0;
            transform: scale(0.78);
            transform-origin: right center;
          }

          .blood-cell-3,
          .blood-cell-4 {
            display: none;
          }
        }

        @media (max-width: 420px) {
          .banner-visual {
            height: 350px;
          }

          .bloodlink-card-one {
            left: -12px;
            transform: scale(0.68);
          }

          .bloodlink-card-two {
            right: -12px;
            transform: scale(0.68);
          }

          .bloodlink-floating-drop {
            right: 0;
            transform: scale(0.85);
          }

          .bloodlink-ecg {
            width: 200px;
          }
        }
      `}</style>
    </section>
  );
      }