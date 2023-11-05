import Link from 'next/link';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-bBlack-60"
      >
        Collaboration Hub{' '}
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-bBlack-60"
      >
        Project Proposal
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-bBlack-60"
      >
        Heading 3
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-bBlack-60"
      >
        Heading 4
      </Link>
    </nav>
  );
}
