'use client';

import React from 'react';

export interface TelemetryTag {
  label: string;
  value: string;
  colorBg?: string;
}

interface MediaContainerProps {
  headerBadge?: string;
  placeholderText?: string;
  tags?: TelemetryTag[];
  isEditable?: boolean;
  onUpdate?: (field: string, val: any) => void;
}

export function MediaContainerElement({
  headerBadge = 'DIAGRAM BEBAS VEKTOR',
  placeholderText = 'ISI VIDEO/GRAFIK/YANG LAIN',
  tags = [
    { label: 'Kereta', value: 'Cidomo Kayu' },
    { label: 'Traksi', value: 'Kuda Lombok' },
    { label: 'Beban', value: '0 - 800 kg' },
  ],
  isEditable = false,
  onUpdate,
}: MediaContainerProps) {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 pt-6 shadow-[3px_3px_0_var(--border)]">
      {/* Floating Header Tag */}
      <div className="absolute -top-3 left-4 border-2 border-border bg-card px-2.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-foreground shadow-[1px_1px_0_var(--border)] flex items-center gap-1.5">
        <span className="size-2 bg-destructive rounded-none inline-block" />
        <span>{headerBadge}</span>
      </div>

      {/* Dashed Media Zone */}
      <div className="my-2 flex h-52 w-full items-center justify-center rounded border-2 border-dashed border-border bg-muted/40 p-4 text-center">
        {isEditable ? (
          <input
            type="text"
            value={placeholderText}
            onChange={(e) => onUpdate?.('placeholderText', e.target.value)}
            className="w-full bg-transparent text-center font-heading text-sm font-black uppercase text-muted-foreground outline-none"
          />
        ) : (
          <span className="font-heading text-sm font-black uppercase tracking-widest text-muted-foreground md:text-base">
            {placeholderText}
          </span>
        )}
      </div>

      {/* Telemetry Tag Badges di Bawah */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 border-2 border-border bg-secondary px-3 py-1 font-heading text-xs shadow-[1.5px_1.5px_0_var(--border)]"
          >
            <span className="font-bold text-muted-foreground">{tag.label}:</span>
            <span className="font-black text-foreground uppercase">{tag.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
