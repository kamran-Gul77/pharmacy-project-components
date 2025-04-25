import type React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import type { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

interface SimplifiedButtonProps extends ShadcnButtonProps {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  label,
  icon,
  iconPosition = "left",
  children,
  ...props
}: SimplifiedButtonProps) => {
  // If both label and children are provided, prioritize children
  const content = children || label;

  if (!icon) {
    return <ShadcnButton {...props}>{content}</ShadcnButton>;
  }

  return (
    <ShadcnButton {...props}>
      {iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {content}
      {iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </ShadcnButton>
  );
};

export default Button;
