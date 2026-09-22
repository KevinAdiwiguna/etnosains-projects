"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.ComponentProps<"input">, "title"> {
  title: string;
  placeholder?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

function Input({
  title,
  placeholder,
  required = false,
  type = "text",
  showPasswordToggle = false,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  const inputId =
    id ?? title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      <div className="mb-2 flex items-center justify-between gap-4">
        <label
          htmlFor={inputId}
          className="font-heading text-base font-bold uppercase"
        >
          {title}
        </label>

        {required && (
          <span
            className="
              shrink-0
              border-2 border-border
              bg-primary
              px-2 py-1
              font-heading
              text-[10px]
              font-bold
              uppercase
              leading-none
            "
          >
            Wajib Diisi
          </span>
        )}
      </div>

      {/* Input */}
      <div
        className="
          flex h-13 w-full items-center gap-3
          border-4 border-border
          bg-background
          px-3
          shadow-[2px_2px_0_var(--border)]
          focus-within:ring-2
          focus-within:ring-ring
        "
      >
        {icon && (
          <span className="flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}

        <input
          {...props}
          id={inputId}
          type={inputType}
          required={required}
          placeholder={placeholder}
          className="
            min-w-0 flex-1
            bg-transparent
            text-sm
            text-foreground
            outline-none
            placeholder:text-muted-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="
              shrink-0
              text-muted-foreground
              hover:text-foreground
            "
            aria-label={
              showPassword
                ? "Sembunyikan password"
                : "Tampilkan password"
            }
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export { Input };
