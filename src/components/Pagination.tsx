import Link from "next/link";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const separator = basePath.includes("?") ? "&" : "?";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between border-t border-border-stone pt-6"
    >
      {hasPreviousPage ? (
        <Link
          href={currentPage - 1 === 1 ? basePath : `${basePath}${separator}page=${currentPage - 1}`}
          className="text-sm font-medium text-prairie-blue hover:text-deep-sky"
        >
          Previous
        </Link>
      ) : (
        <span className="text-sm text-muted-gray">Previous</span>
      )}

      {hasNextPage ? (
        <Link
          href={`${basePath}${separator}page=${currentPage + 1}`}
          className="text-sm font-medium text-prairie-blue hover:text-deep-sky"
        >
          Next
        </Link>
      ) : (
        <span className="text-sm text-muted-gray">Next</span>
      )}
    </nav>
  );
}
