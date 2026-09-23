import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionColorTheme = 'default' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet';

interface CardSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  phase?: string;
  note?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isSelected?: boolean;
  colorTheme?: SectionColorTheme;
  titleAs?: "h3" | "h4";
  isEditable?: boolean;
  onUpdateHeader?: (field: "title" | "note" | "phase" | "colorTheme", value: string) => void;
}

const COLOR_MAP: Record<SectionColorTheme, { headerBg: string; dotBg: string; ring: string; border: string }> = {
  default: { headerBg: "bg-primary text-primary-foreground", dotBg: "bg-primary", ring: "ring-primary", border: "border-primary" },
  emerald: { headerBg: "bg-emerald-400 text-slate-950", dotBg: "bg-emerald-400", ring: "ring-emerald-500", border: "border-emerald-600" },
  amber: { headerBg: "bg-amber-400 text-slate-950", dotBg: "bg-amber-400", ring: "ring-amber-500", border: "border-amber-600" },
  rose: { headerBg: "bg-rose-400 text-slate-950", dotBg: "bg-rose-400", ring: "ring-rose-500", border: "border-rose-600" },
  sky: { headerBg: "bg-sky-400 text-slate-950", dotBg: "bg-sky-400", ring: "ring-sky-500", border: "border-sky-600" },
  violet: { headerBg: "bg-violet-400 text-slate-950", dotBg: "bg-violet-400", ring: "ring-violet-500", border: "border-violet-600" },
};

function CardSection({
  phase,
  note,
  title,
  children,
  footer,
  className,
  isSelected = false,
  colorTheme = 'default',
  titleAs = "h3",
  isEditable = false,
  onUpdateHeader,
  ...props
}: CardSectionProps) {
  const currentTheme = COLOR_MAP[colorTheme] || COLOR_MAP.default;
  const TitleTag = titleAs;

  const titleSizeClasses =
    titleAs === "h3"
      ? "text-xl font-black md:text-2xl"
      : "text-lg font-bold md:text-xl";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg transition-all",
        "border-3 border-border",
        "bg-card text-card-foreground",
        "shadow-[4px_4px_0_var(--border)]",
        isSelected && `ring-3 ${currentTheme.ring} ring-offset-2 ${currentTheme.border}`,
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      {(note || phase || isEditable) && (
        <div
          className={cn(
            "flex min-h-8 items-center justify-between gap-3",
            "border-b-3 border-border px-4 py-1.5",
            "font-heading text-[11px] font-bold uppercase tracking-wide transition-colors",
            currentTheme.headerBg
          )}
        >
          {/* Note Section */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="size-2.5 rounded-full bg-foreground shrink-0" />
            {isEditable && onUpdateHeader ? (
              <input
                type="text"
                value={typeof note === "string" ? note : ""}
                onChange={(e) => onUpdateHeader("note", e.target.value)}
                placeholder="SUB-CATATAN..."
                className="bg-transparent font-heading font-bold uppercase text-[11px] outline-none border-b border-transparent hover:border-current focus:border-current w-full max-w-[180px]"
              />
            ) : (
              note && <span className="truncate">{note}</span>
            )}
          </div>

          {/* Color Picker Buttons */}
          {isEditable && onUpdateHeader && (
            <div
              className="flex items-center gap-1 bg-background/40 p-1 rounded border border-border/40 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {(Object.keys(COLOR_MAP) as SectionColorTheme[]).map((themeKey) => (
                <button
                  key={themeKey}
                  type="button"
                  title={`Ubah warna ke ${themeKey}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateHeader("colorTheme", themeKey);
                  }}
                  className={cn(
                    "size-3.5 rounded-full border border-border transition-transform hover:scale-125 cursor-pointer",
                    COLOR_MAP[themeKey].dotBg,
                    colorTheme === themeKey && "scale-125 ring-2 ring-foreground"
                  )}
                />
              ))}
            </div>
          )}

          {/* Phase Badge */}
          {(phase || isEditable) && (
            <div
              className={cn(
                "shrink-0",
                "border border-border",
                "bg-background px-1.5 py-0.5",
                "font-mono text-[9px] font-bold text-foreground"
              )}
            >
              {isEditable && onUpdateHeader ? (
                <input
                  type="text"
                  value={typeof phase === "string" ? phase : ""}
                  onChange={(e) => onUpdateHeader("phase", e.target.value)}
                  placeholder="FASE 1"
                  className="bg-transparent font-mono font-bold text-[9px] text-foreground outline-none text-center w-12"
                />
              ) : (
                <span>{phase}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="p-4 md:p-6">
        {isEditable && onUpdateHeader ? (
          <input
            type="text"
            value={typeof title === "string" ? title : ""}
            onChange={(e) => onUpdateHeader("title", e.target.value)}
            placeholder="JUDUL SUB-SECTION..."
            className={cn(
              "w-full font-heading uppercase leading-tight tracking-tight bg-transparent outline-none border-b-2 border-transparent hover:border-border/40 focus:border-border text-foreground mb-3",
              titleSizeClasses
            )}
          />
        ) : (
          title && (
            <TitleTag className={cn("font-heading uppercase leading-tight tracking-tight mb-3", titleSizeClasses)}>
              {title}
            </TitleTag>
          )
        )}

        <div>{children}</div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t-2 border-border px-4 py-2 md:px-6 bg-muted/10">
          {footer}
        </div>
      )}
    </section>
  );
}

export { CardSection };
