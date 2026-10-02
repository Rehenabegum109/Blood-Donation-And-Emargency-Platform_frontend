
import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Find Donor", href: "/donors" },
    { name: "Blood Requests", href: "/requests" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  account: [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
                <Heart className="h-5 w-5 fill-current" />
              </div>

              <span className="text-xl font-bold text-white">
                Blood<span className="text-red-600">Link</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Connecting blood donors with people in need and helping
              communities respond quickly during emergencies.
            </p>

            <div className="mt-5 flex items-center gap-4">
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-red-500"
              >
                Facebook
              </Link>

              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-red-500"
              >
                GitHub
              </Link>

              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-red-500"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Account
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BloodLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
