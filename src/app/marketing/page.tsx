import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header className="fixed z-50 w-full bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-x-12">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.svg"
                alt="Condo Manager"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <a
                href="#features"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Features
              </a>
              <a
                href="#amenities"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Amenities
              </a>
              <a
                href="#contact"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <Link
              href="/signin"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Modern Living, Simplified Management
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience seamless condo living with our comprehensive management
              platform. From maintenance requests to amenity bookings,
              everything you need in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a
                href="#features"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#gradient)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="gradient"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base leading-7 font-semibold text-indigo-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Smart Condo Management
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides all the tools you need to manage your condo
              efficiently.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "Maintenance Requests",
                  description:
                    "Submit and track maintenance requests with real-time updates.",
                  icon: "🔧",
                },
                {
                  name: "Amenity Booking",
                  description:
                    "Easy booking system for all community amenities.",
                  icon: "📅",
                },
                {
                  name: "Community Updates",
                  description:
                    "Stay informed with important announcements and events.",
                  icon: "📢",
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="mb-2 text-2xl">{feature.icon}</dt>
                  <dt className="text-base leading-7 font-semibold text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Get in touch
                </h2>
                <p className="mt-4 leading-7 text-gray-600">
                  We're here to help you with any questions about our condo
                  management platform.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="mt-2 text-gray-600">contact@condomanager.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="mt-2 text-gray-600">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Condo Manager. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
