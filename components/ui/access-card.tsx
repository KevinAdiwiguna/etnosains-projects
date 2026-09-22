import * as React from "react";
import { cn } from "@/lib/utils";

interface AccessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  phase?: string;
  eyebrow?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  note?: string;
}

function AccessCard({
  phase,
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
  note,
  ...props
}: AccessCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg",
        "border-4 border-border",
        "bg-card text-card-foreground",
        "shadow-[6px_6px_0_var(--border)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex min-h-10 items-center justify-between gap-4",
          "border-b-4 border-border",
          "bg-primary px-5 py-2",
          "font-heading text-xs font-bold uppercase tracking-wide",
        )}
      >
        {note && (
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-foreground" />
          <span>{note}</span>
        </div>
        )}

        {phase && (
          <span
            className={cn(
              "shrink-0",
              "border-2 border-border",
              "bg-background px-2 py-1",
              "font-mono text-[10px] font-bold",
            )}
          >
            {phase}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-7 md:px-9 md:py-8">
        {eyebrow && (
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">
            {eyebrow}
          </div>
        )}

        <h2 className="font-heading text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
          {title}
        </h2>

        {description && (
          <div className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </div>
        )}

        <div className="mt-7">{children}</div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t-2 border-border px-6 py-3 md:px-9">
          {footer}
        </div>
      )}
    </section>
  );
}

export { AccessCard };
