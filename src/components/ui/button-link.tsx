import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-brown",
  secondary: "bg-foreground text-surface hover:bg-anthracite",
  ghost: "bg-transparent text-foreground hover:bg-surface-secondary/70",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs tracking-[0.08em]",
  md: "h-12 px-6 text-xs tracking-[0.1em]",
  lg: "h-14 px-8 text-sm tracking-[0.12em]",
};

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase transition-colors duration-300 ease-[var(--ease-out)]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
