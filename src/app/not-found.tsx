import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-2xl flex-col items-start px-4 py-24 md:px-8">
      <div className="mb-6 h-[3px] w-16 bg-red-earth" aria-hidden="true" />
      <h1 className="font-serif-heading text-4xl font-semibold text-storm-charcoal">
        Story Not Found
      </h1>
      <p className="mt-4 text-base text-muted-gray">
        The page you requested may have moved, changed, or is no longer available.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-prairie-blue hover:text-deep-sky"
      >
        Return to Oklahoma News
      </Link>
    </div>
  );
}
