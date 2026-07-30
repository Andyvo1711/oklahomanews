"use client";

import { useState } from "react";

export function NewsletterDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section aria-label="Newsletter signup" className="bg-prairie-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="border border-border-stone bg-canvas-white p-6 md:p-8">
          <h2 className="font-serif-heading text-xl font-semibold text-storm-charcoal">
            Oklahoma, Delivered Clearly
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-gray">
            A focused selection of stories from communities across the state.
          </p>

          {submitted ? (
            <p className="mt-4 text-sm font-medium text-deep-sky">
              Thanks for your interest. Newsletter delivery is not connected yet.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full max-w-sm border border-border-stone bg-canvas-white px-3 py-2 text-sm text-storm-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sky sm:w-auto"
              />
              <button
                type="submit"
                className="bg-deep-sky px-5 py-2 text-sm font-medium text-canvas-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sky"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
