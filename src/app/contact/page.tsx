
"use client";

import { FormEvent, useState } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@bloodlink.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1XXX-XXXXXX",
    description: "Available during support hours",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Sylhet, Bangladesh",
    description: "Serving communities across Bangladesh",
  },
  {
    icon: Clock3,
    title: "Support Hours",
    value: "24/7 Emergency Support",
    description: "We're here when help is needed",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Message submitted successfully!");
      event.currentTarget.reset();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero */}
      <section className="relative px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
            <MessageSquare className="h-4 w-4" />
            Contact BloodLink
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We&apos;re here to{" "}
            <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              help.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Have a question, feedback, or need help using BloodLink? Send us a
            message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact Information */}
          <div>
            <div className="rounded-3xl bg-gradient-to-br from-red-600 to-rose-600 p-7 text-white shadow-xl shadow-red-200 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-widest text-red-100">
                Get in touch
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Let&apos;s talk about how we can help.
              </h2>

              <p className="mt-4 leading-7 text-red-100">
                Whether you&apos;re a donor, recipient, volunteer, or simply
                interested in BloodLink, we&apos;d love to hear from you.
              </p>

              <div className="mt-8 space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-100">
                          {item.title}
                        </p>

                        <p className="mt-0.5 font-bold">{item.value}</p>

                        <p className="mt-0.5 text-xs text-red-100">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Note */}
            <div className="mt-5 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <MessageSquare className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Emergency blood request?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    For an actual blood emergency, use the Blood Requests
                    section instead of the contact form.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg shadow-red-100/40 sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                Send a message
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                How can we help?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fill out the form below and send us your message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-red-100 bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Every connection can make a difference.
          </h2>

          <p className="mt-3 text-slate-500">
            Together, we can make blood support faster and more accessible.
          </p>
        </div>
      </section>
    </main>
  );
}