"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, "children"> {
  title: string;
  description?: string;
}

function Checkbox({
  title,
  description,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id ?? title.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "group flex cursor-pointer items-start gap-3",
        "select-none",
        "has-disabled:cursor-not-allowed",
        className
      )}
    >
      <CheckboxPrimitive.Root
        {...props}
        id={checkboxId}
        data-slot="checkbox"
        className="
          relative mt-0.5
          flex size-5 shrink-0
          items-center justify-center

          border-3 border-border
          bg-background

          shadow-[2px_2px_0_var(--border)]

          outline-none
          transition-[background-color,box-shadow]
          duration-150

          group-hover:bg-secondary

          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background

          disabled:cursor-not-allowed
          disabled:opacity-50

          data-checked:bg-primary
          data-checked:text-primary-foreground

          data-indeterminate:bg-primary
          data-indeterminate:text-primary-foreground
        "
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center"
        >
          <CheckIcon className="size-4 stroke-[3]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <span className="flex flex-col gap-0.5">
        <span className="font-heading text-sm font-bold uppercase">
          {title}
        </span>

        {description && (
          <span className="text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export { Checkbox };
