import Link from "next/link";

import { cn } from "@/lib/utils";
import { useUserDetailsQuery } from "@/store/auth";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data } = useUserDetailsQuery({});
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
      >
        Collaboration Hub{" "}
      </Link>
      <Link
        href="/project-proposal"
        className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
      >
        Project Proposal
      </Link>
      {data?.role === "ADMIN" && (
        <Link
          href="/add-organisation"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Add Organisation
        </Link>
      )}
      {data?.role === "ADMIN" && (
        <Link
          href="/add-area-of-interest"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Add Area of Interest
        </Link>
      )}
      {data?.role === "ADMIN" && (
        <Link
          href="/verify-user"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Verify User
        </Link>
      )}
      {data?.role === "ADMIN" && (
        <Link
          href="/make-representive"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Make Representative
        </Link>
      )}

      {(data?.role === "ACADEMIC_REP" || data?.role === "ACADEMIC_USER") && (
        <Link
          href="/create-supervise"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Add Students
        </Link>
      )}
      {(data?.role === "ACADEMIC_REP" ||
        data?.role === "ACADEMIC_USER" ||
        data?.role === "INDUSTRY_USER" ||
        data?.role === "INDUSTRY_REP") && (
        <Link
          href="/search-users"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Search Users
        </Link>
      )}
      {(data?.role === "ACADEMIC_REP" ||
        data?.role === "ACADEMIC_USER" ||
        data?.role === "INDUSTRY_USER" ||
        data?.role === "INDUSTRY_REP") && (
        <Link
          href="/add-user"
          className="text mr-4 font-medium transition-colors hover:text-bBlack-60"
        >
          Add Users
        </Link>
      )}
    </nav>
  );
}
