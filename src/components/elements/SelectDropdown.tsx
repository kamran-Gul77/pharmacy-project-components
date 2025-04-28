"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
} from "@radix-ui/react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps
  extends Omit<SelectProps, "onValueChange" | "value"> {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  selectTriggerProps?: SelectTriggerProps;
  selectContentProps?: SelectContentProps;
  selectGroupProps?: SelectGroupProps;
  selectItemProps?: Partial<SelectItemProps>; // partial because each item might not need all props
  selectLabelProps?: SelectLabelProps;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  selectTriggerProps,
  selectContentProps,
  selectGroupProps,
  selectItemProps,
  selectLabelProps,
  ...selectProps
}) => {
  return (
    <Select value={value} onValueChange={onChange} {...selectProps}>
      <SelectTrigger {...selectTriggerProps}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent {...selectContentProps}>
        <SelectGroup {...selectGroupProps}>
          {label && <SelectLabel {...selectLabelProps}>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              {...selectItemProps}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
