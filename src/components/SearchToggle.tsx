"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SearchToggle() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="header-search-panel"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-medium text-storm-charcoal hover:text-prairie-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sky px-2 py-1"
      >
        Search
      </button>
      {open && (
        <form
          id="header-search-panel"
          onSubmit={handleSubmit}
          className="absolute right-0 top-full z-40 mt-2 flex w-64 items-center border border-border-stone bg-canvas-white p-2 shadow-sm"
          role="search"
        >
          <label htmlFor="header-search-input" className="sr-only">
            Search Oklahoma stories
          </label>
          <input
            ref={inputRef}
            id="header-search-input"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search stories"
            className="w-full border-none bg-transparent px-1 py-1 text-sm text-storm-charcoal focus:outline-none"
          />
          <button
            type="submit"
            className="whitespace-nowrap px-2 py-1 text-sm font-medium text-prairie-blue hover:text-deep-sky"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
}
