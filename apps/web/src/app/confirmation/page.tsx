"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const date = searchParams.get("date") || "-";
  const time = searchParams.get("time") || "-";

  return (
    <main className="px-4 py-20 md:py-24">
      <section className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-semibold">Reservation Confirmed</h1>
        <p className="mb-6 text-gray-700">
          Thank you, {name}. We have received your reservation request.
        </p>
        <div className="mb-8 space-y-1 text-gray-800">
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
        <Link
          href="/"
          className="inline-flex rounded-md border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
