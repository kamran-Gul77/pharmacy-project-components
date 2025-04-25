import type React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SimplifiedInputProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnInput> {
  label?: string;
  helperText?: string;
  id?: string;
}

const Input = ({
  label,
  helperText,
  id,
  className,
  ...props
}: SimplifiedInputProps) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <ShadcnInput id={inputId} className={className} {...props} />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};
export default Input;
