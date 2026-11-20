import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { fieldClasses, type FieldStyle } from "@/utils/field-styles";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  fieldStyle?: FieldStyle;
  wrapperClassName?: string;
};

export function TextField({
  label,
  fieldStyle = "bordered",
  wrapperClassName,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? rest.name;
  return (
    <div className={cn(fieldStyle === "bordered" ? "mb-4" : "my-2", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="mb-2 inline-block">
          {label}
        </label>
      )}
      <input id={inputId} className={cn(fieldClasses[fieldStyle], className)} {...rest} />
    </div>
  );
}
