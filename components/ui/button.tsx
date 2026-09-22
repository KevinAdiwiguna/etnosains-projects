import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",
    "text-sm font-semibold",
    "transition-none",
    "outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "border-2 border-border",
          "shadow-[4px_4px_0_var(--border)]",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0_var(--border)]",
          "active:translate-x-[4px] active:translate-y-[4px]",
          "active:shadow-none",
        ],

        accent: [
          "bg-accent text-accent-foreground",
          "border-2 border-border",
          "shadow-[4px_4px_0_var(--border)]",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0_var(--border)]",
          "active:translate-x-[4px] active:translate-y-[4px]",
          "active:shadow-none",
        ],

        outline: [
          "bg-transparent text-foreground",
          "border-2 border-border",
          "shadow-[4px_4px_0_var(--border)]",
          "hover:bg-secondary",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0_var(--border)]",
          "active:translate-x-[4px] active:translate-y-[4px]",
          "active:shadow-none",
        ],

        ghost: [
          "border-2 border-transparent",
          "text-foreground",
          "hover:bg-secondary",
        ],

        link: [
          "border-0",
          "p-0",
          "h-auto",
          "text-foreground",
          "hover:text-accent",
          "underline-offset-4",
          "hover:underline",
        ],

        icon: [
          "border-2 border-border",
          "bg-background text-foreground",
          "shadow-[3px_3px_0_var(--border)]",
          "hover:bg-secondary",
          "hover:translate-x-[1px] hover:translate-y-[1px]",
          "hover:shadow-[2px_2px_0_var(--border)]",
          "active:translate-x-[3px] active:translate-y-[3px]",
          "active:shadow-none",
        ],
      },

      size: {
        sm: "h-9 px-3",
        default: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-base",

        icon: "size-10 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
