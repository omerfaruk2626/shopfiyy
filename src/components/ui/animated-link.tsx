import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function AnimatedLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group relative inline-flex items-center text-sm text-foreground transition-colors hover:text-brown",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100"
      />
    </Link>
  );
}
