import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { fieldClasses } from "@/utils/field-styles";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  placeholder: string;
  options: SelectOption[];
};

export function SelectField({
  label,
  placeholder,
  options,
  className,
  id,
  ...rest
}: SelectFieldProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="mb-2 inline-block">
        {label}
      </label>
      <select id={inputId} className={cn(fieldClasses.bordered, className)} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
