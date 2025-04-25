import type React from "react";
import { cn } from "@/lib/utils";
import { type HTMLAttributes, JSX, forwardRef } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, children, className, ...props }, ref) => {
    const Component = level as keyof JSX.IntrinsicElements as React.ElementType;

    const styles = {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
    };

    return (
      <Component ref={ref} className={cn(styles[level], className)} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
