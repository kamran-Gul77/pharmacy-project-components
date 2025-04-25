import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

const Paragraph = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
});

Paragraph.displayName = "Paragraph";

export { Paragraph };
