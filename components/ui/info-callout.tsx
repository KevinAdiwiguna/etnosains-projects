import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const infoCalloutVariants = cva(
  [
    "flex w-full items-start gap-3",
    "rounded-md border p-4 text-sm leading-relaxed",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200",
          "[&_svg]:text-blue-600 dark:[&_svg]:text-blue-400",
        ],
        good: [
          "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
          "[&_svg]:text-emerald-600 dark:[&_svg]:text-emerald-400",
        ],
        warning: [
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
          "[&_svg]:text-amber-600 dark:[&_svg]:text-amber-400",
        ],
        danger: [
          "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200",
          "[&_svg]:text-rose-600 dark:[&_svg]:text-rose-400",
        ],
      },
      size: {
        sm: "p-3 text-xs [&_svg]:size-4",
        default: "p-4 text-sm [&_svg]:size-5",
        lg: "p-5 text-base [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InfoCalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCalloutVariants> {
  icon?: React.ReactNode;
}

function InfoCallout({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: InfoCalloutProps) {
  return (
    <div
      data-slot="info-callout"
      className={cn(infoCalloutVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export { InfoCallout, infoCalloutVariants };
