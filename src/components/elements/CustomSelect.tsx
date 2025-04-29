import React from "react";
import Select, { Props as SelectProps } from "react-select";
const CustomSelect: React.FC<SelectProps> = ({ ...props }) => {
  return (
    <Select
      {...props}
      theme={(defaultTheme) => ({
        ...defaultTheme,
        borderRadius: 8,
        colors: {
          ...defaultTheme.colors,
          primary25: "#f3f4f6",
          primary: "#6b7280",
        },
      })}
    />
  );
};

export default CustomSelect;
