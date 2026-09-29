import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  error?: string;
};

export function Field({ label, icon, error, className, id, ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="group block min-w-0" htmlFor={fieldId}>
      <span className="mb-2 block text-xs font-medium text-smoke">{label}</span>
      <span className="flex items-center gap-3 border-b border-white/20 pb-3 transition-colors group-focus-within:border-horizon">
        {icon && <span className="shrink-0 text-smoke">{icon}</span>}
        <input
          id={fieldId}
          className={cn("w-full min-w-0 bg-transparent text-sm text-porcelain outline-none placeholder:text-smoke/70", className)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
      </span>
      {error && <span id={`${fieldId}-error`} className="mt-1.5 block text-xs text-[#ff9e91]">{error}</span>}
    </label>
  );
}
