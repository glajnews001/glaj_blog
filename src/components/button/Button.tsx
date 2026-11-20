import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "dark" | "navy" | "gold" | "success" | "secondary" | "pink" | "danger";

const variants: Record<ButtonVariant, string> = {
  dark: "bg-[#212529] text-white hover:bg-black",
  navy: "bg-navy text-white hover:bg-navy-deep",
  gold: "bg-gold text-brand hover:brightness-95",
  success: "bg-[#198754] text-white hover:bg-[#157347]",
  secondary: "bg-[#6c757d] text-white hover:bg-[#5c636a]",
  pink: "bg-pink text-white hover:bg-black",
  danger: "bg-[#dc3545] text-white hover:bg-[#bb2d3b]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  block?: boolean;
  loading?: boolean;
  loadingText?: string;
  small?: boolean;
};

export function Button({
  variant = "dark",
  block,
  loading,
  loadingText,
  small,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-md border-0 font-medium transition-colors",
        small ? "px-3 py-1 text-sm" : "px-4 py-2",
        variants[variant],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
