import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const infoChipVariants = cva(
  [
    "inline-flex items-center gap-2",
    "border-2 border-border",
    "bg-secondary text-secondary-foreground",
    "px-3 py-2",
    "font-heading text-sm font-bold uppercase tracking-wider",
    "leading-none",
    "shadow-[3px_3px_0_var(--border)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-secondary",
          "text-secondary-foreground",
        ],

        primary: [
          "bg-primary",
          "text-primary-foreground",
        ],

        accent: [
          "bg-accent",
          "text-accent-foreground",
        ],

        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
        ],
      },

      size: {
        sm: "px-2.5 py-1.5 text-xs",
        default: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface InfoChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoChipVariants> {
  icon?: React.ReactNode;
}

function InfoChip({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: InfoChipProps) {
  return (
    <div
      data-slot="info-chip"
      className={cn(
        infoChipVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:size-4">
          {icon}
        </span>
      )}

      <span>{children}</span>
    </div>
  );
}

export { InfoChip, infoChipVariants };
