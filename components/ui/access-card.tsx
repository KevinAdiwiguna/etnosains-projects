import * as React from "react";
import { cn } from "@/lib/utils";

export type CardColorTheme = 'default' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet';

interface AccessCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  phase?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  note?: string;
  isSelected?: boolean;
  colorTheme?: CardColorTheme;
  onUpdateHeader?: (field: "title" | "note" | "phase" | "description" | "colorTheme", value: string) => void;
  isEditable?: boolean;
}

const COLOR_MAP: Record<CardColorTheme, { bg: string; border: string; ring: string }> = {
  default: { bg: "bg-primary text-primary-foreground", border: "border-primary", ring: "ring-primary" },
  emerald: { bg: "bg-emerald-400 text-slate-950", border: "border-emerald-600", ring: "ring-emerald-500" },
  amber: { bg: "bg-amber-400 text-slate-950", border: "border-amber-600", ring: "ring-amber-500" },
  rose: { bg: "bg-rose-400 text-slate-950", border: "border-rose-600", ring: "ring-rose-500" },
  sky: { bg: "bg-sky-400 text-slate-950", border: "border-sky-600", ring: "ring-sky-500" },
  violet: { bg: "bg-violet-400 text-slate-950", border: "border-violet-600", ring: "ring-violet-500" },
};

function AccessCard({
  phase,
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
  note,
  isSelected = false,
  colorTheme = 'default',
  onUpdateHeader,
  isEditable = false,
  ...props
}: AccessCardProps) {
  const currentTheme = COLOR_MAP[colorTheme] || COLOR_MAP.default;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg transition-all",
        "border-4 border-border",
        "bg-card text-card-foreground",
        "shadow-[6px_6px_0_var(--border)]",
        isSelected && `ring-4 ${currentTheme.ring} ring-offset-2 ${currentTheme.border}`,
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      {(note || phase || isEditable) && (
        <div
          className={cn(
            "flex min-h-10 items-center justify-between gap-4",
            "border-b-4 border-border px-5 py-2",
            "font-heading text-xs font-bold uppercase tracking-wide transition-colors",
            currentTheme.bg
          )}
        >
          {/* Note Section & Theme Selector */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="size-3 rounded-full bg-foreground shrink-0" />
            {isEditable && onUpdateHeader ? (
              <input
                type="text"
                value={typeof note === "string" ? note : ""}
                onChange={(e) => onUpdateHeader("note", e.target.value)}
                placeholder="CATATAN / BADGE NOTE..."
                className="bg-transparent font-heading font-bold uppercase text-xs outline-none border-b border-transparent hover:border-current focus:border-current w-full max-w-[200px]"
              />
            ) : (
              note && <span className="truncate">{note}</span>
            )}
          </div>

          {/* Color Picker Buttons (Hanya muncul jika Editable) */}
          {isEditable && onUpdateHeader && (
            <div className="flex items-center gap-1 bg-background/30 p-1 rounded border border-border/40">
              {(Object.keys(COLOR_MAP) as CardColorTheme[]).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  title={`Ubah warna ke ${theme}`}
                  onClick={() => onUpdateHeader("colorTheme", theme)}
                  className={cn(
                    "size-3.5 rounded-full border border-border transition-transform hover:scale-125",
                    theme === 'default' ? 'bg-primary' : `bg-${theme}-400`,
                    colorTheme === theme && "scale-125 ring-2 ring-foreground"
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
                "border-2 border-border",
                "bg-background px-2 py-1",
                "font-mono text-[10px] font-bold text-foreground"
              )}
            >
              {isEditable && onUpdateHeader ? (
                <input
                  type="text"
                  value={typeof phase === "string" ? phase : ""}
                  onChange={(e) => onUpdateHeader("phase", e.target.value)}
                  placeholder="FASE 1"
                  className="bg-transparent font-mono font-bold text-[10px] text-foreground outline-none text-center w-16"
                />
              ) : (
                <span>{phase}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="px-6 py-7 md:px-9 md:py-8">
        {eyebrow && (
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">
            {eyebrow}
          </div>
        )}

        {isEditable && onUpdateHeader ? (
          <input
            type="text"
            value={typeof title === "string" ? title : ""}
            onChange={(e) => onUpdateHeader("title", e.target.value)}
            placeholder="JUDUL MODUL / KARTU..."
            className="w-full font-heading text-3xl font-black uppercase leading-none tracking-tight md:text-4xl bg-transparent outline-none border-b-2 border-transparent hover:border-border/40 focus:border-border text-foreground"
          />
        ) : (
          title && (
            <h2 className="font-heading text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
              {title}
            </h2>
          )
        )}

        {isEditable && onUpdateHeader ? (
          <textarea
            value={typeof description === "string" ? description : ""}
            onChange={(e) => onUpdateHeader("description", e.target.value)}
            placeholder="Tuliskan deskripsi modul / kartu di sini..."
            className="mt-3 w-full text-sm leading-relaxed text-muted-foreground md:text-base bg-transparent outline-none resize-none border-b border-dashed border-transparent hover:border-border/40 focus:border-border"
            rows={2}
          />
        ) : (
          description && (
            <div className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </div>
          )
        )}

        {children && <div className="mt-7">{children}</div>}
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
