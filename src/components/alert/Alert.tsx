import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

const variants = {
  info: "border-[#b6effb] bg-[#cff4fc] text-[#055160]",
  success: "border-[#badbcc] bg-[#d1e7dd] text-[#0f5132]",
  danger: "border-[#f5c2c7] bg-[#f8d7da] text-[#842029]",
} as const;

type AlertProps = {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
};

export function Alert({ variant = "info", children, className }: AlertProps) {
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={cn("mb-4 rounded-md border px-4 py-3 text-sm", variants[variant], className)}
    >
      {children}
    </div>
  );
}
