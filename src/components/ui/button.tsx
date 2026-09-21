import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-brown focus-visible:ring-accent",
  secondary:
    "bg-foreground text-surface hover:bg-anthracite focus-visible:ring-foreground",
  ghost: "bg-transparent text-foreground hover:bg-surface-secondary/70",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs tracking-[0.08em]",
  md: "h-12 px-6 text-xs tracking-[0.1em]",
  lg: "h-14 px-8 text-sm tracking-[0.12em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase transition-colors duration-300 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-40",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
