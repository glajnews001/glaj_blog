import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { fieldClasses, type FieldStyle } from "@/utils/field-styles";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  fieldStyle?: FieldStyle;
};

export function TextAreaField({
  label,
  fieldStyle = "bordered",
  className,
  id,
  ...rest
}: TextAreaFieldProps) {
  const inputId = id ?? rest.name;
  return (
    <div className={fieldStyle === "bordered" ? "mb-4" : "my-2"}>
      {label && (
        <label htmlFor={inputId} className="mb-2 inline-block">
          {label}
        </label>
      )}
      <textarea id={inputId} className={cn(fieldClasses[fieldStyle], className)} {...rest} />
    </div>
  );
}
