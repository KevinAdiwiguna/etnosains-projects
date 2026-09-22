import * as React from "react";

import { cn } from "@/lib/utils";

interface LabeledBoxProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

function LabeledBox({
  label,
  children,
  className,
  labelClassName,
}: LabeledBoxProps) {
  return (
    <section
      className={cn(
        "relative border-2 border-border bg-background",
        "px-7 pb-7 pt-9",
        "shadow-[4px_4px_0_var(--border)]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute -top-4.25 left-7",
          "border-2 border-border",
          "bg-primary px-4 py-1",
          "font-heading text-sm font-bold uppercase tracking-wider",
          "leading-none",
          "shadow-[3px_3px_0_var(--border)]",
          labelClassName,
        )}
      >
        {label}
      </div>

      <div className="text-base leading-relaxed text-foreground md:text-lg">
        {children}
      </div>
    </section>
  );
}

export { LabeledBox };
