import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Comp = "div",
  ...props
}: ComponentProps<"div"> & { as?: "div" | "section" | "article" | "main" }) {
  return <Comp className={cn("container-page", className)} {...props} />;
}
