"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface SimplifiedSelectProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  className?: string;
  triggerClassName?: string;
}

const SelectDropdown = ({
  options,
  label,
  placeholder = "Select an option",
  value,
  onChange,
  disabled,
  helperText,
  id,
  className,
  triggerClassName,
}: SimplifiedSelectProps) => {
  // Generate a unique ID if not provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`grid w-full items-center gap-1.5 ${className}`}>
      {label && <Label htmlFor={selectId}>{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={selectId} className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};
export default SelectDropdown;
