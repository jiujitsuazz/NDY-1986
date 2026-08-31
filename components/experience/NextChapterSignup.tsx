"use client";

import { useState } from "react";

export function NextChapterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await response.json();
      setMessage(body.message);
    } catch {
      setMessage("Something went wrong. Try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="next-chapter" className="border-b border-ndy-charcoal py-20 sm:py-28">
      <div className="container-ndy max-w-lg">
        <h2 className="text-3xl text-ndy-bone sm:text-4xl">THE NEXT CHAPTER</h2>
        <p className="mt-4 text-ndy-fog">Be first to know.</p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="w-full border border-ndy-graphite bg-transparent px-4 py-3 text-ndy-bone placeholder:text-ndy-ash focus:border-ndy-bone"
          />
          <button
            type="submit"
            disabled={submitting}
            className="whitespace-nowrap border border-ndy-bone bg-ndy-bone px-6 py-3 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone disabled:opacity-50"
          >
            JOIN THE LIST
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-ndy-mist">{message}</p>}
      </div>
    </section>
  );
}
