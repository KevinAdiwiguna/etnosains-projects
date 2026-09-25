'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

export interface InfoCalloutBarProps {
  titleText?: string;
  descriptionText?: React.ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
  cardBgColor?: string;
  borderColor?: string;
  isEditable?: boolean;
  onChange?: (data: { titleText?: string; descriptionText?: string }) => void;
  className?: string;
}

export function InfoCalloutBar({
  titleText = 'Analisis Telemetry:',
  descriptionText = 'Meskipun grafik kecepatan sesaat berosilasi periodik (frekuensi langkah kaki kuda menghentak aspal), gradien posisi kumulatif pada grafik x-t menunjukkan tren garis lurus seragam dengan nilai kemiringan rata-rata konstan.',
  iconBgColor = 'bg-accent/10',
  iconTextColor = 'text-accent',
  cardBgColor = 'bg-card',
  borderColor = 'border-border',
  isEditable = false,
  onChange,
  className,
}: InfoCalloutBarProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border-2 p-4 shadow-[4px_4px_0_var(--border)] transition-all',
        borderColor,
        cardBgColor,
        className
      )}
    >
      {/* Icon Info Blue */}
      <div className={cn('p-1.5 rounded-full shrink-0 mt-0.5', iconBgColor, iconTextColor)}>
        <Info className="size-5" />
      </div>

      {/* Content Text */}
      <div className="flex-1 text-xs md:text-sm leading-relaxed text-foreground font-medium">
        {isEditable ? (
          <div className="space-y-1">
            <input
              type="text"
              value={titleText}
              onChange={(e) => onChange?.({ titleText: e.target.value })}
              placeholder="JUDUL CALLOUT..."
              className="w-full font-heading font-black uppercase bg-transparent outline-none border-b border-dashed border-border"
            />
            <textarea
              value={typeof descriptionText === 'string' ? descriptionText : ''}
              onChange={(e) => onChange?.({ descriptionText: e.target.value })}
              placeholder="Isi deskripsi analisis telemetri..."
              rows={2}
              className="w-full bg-transparent outline-none resize-y border-b border-dashed border-border"
            />
          </div>
        ) : (
          <p>
            <span className="font-heading font-black text-foreground mr-1.5">{titleText}</span>
            <span className="text-foreground/90">{descriptionText}</span>
          </p>
        )}
      </div>
    </div>
  );
}
