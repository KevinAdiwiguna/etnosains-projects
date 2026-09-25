'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export interface PhysicsCalloutProps {
  /** Teks badge di header kiri atas */
  badgeText?: string;
  /** Teks utama pertanyaan esensial / konsep inti */
  questionText?: React.ReactNode;
  /** Warna background badge header (default: destructive / merah) */
  badgeBgColor?: string;
  /** Warna teks pada badge header */
  badgeTextColor?: string;
  /** Warna background kartu utama */
  cardBgColor?: string;
  /** Warna teks pertanyaan utama */
  textColor?: string;
  /** Warna border tebal */
  borderColor?: string;
  /** Mode editable untuk WYSIWYG Builder */
  isEditable?: boolean;
  /** Callback saat nilai diubah di mode builder */
  onChange?: (data: { badgeText?: string; questionText?: string }) => void;
  className?: string;
}

export function PhysicsCallout({
  badgeText = 'FISIKA INTI: KINEMATIKA, HUKUM II NEWTON & GESEKAN LINTASAN',
  questionText = (
    <span>
      Mengapa kusir Cidomo membatasi kapasitas penumpang ketika melintasi pasir gembur pesisir? Selidiki relasi kuantitatif antara massa total kereta <strong>(Σm)</strong>, resultan gaya tarik kuda <strong>(F)</strong>, dan hambatan gesek permukaan <strong>(f_k)</strong> terhadap percepatan gerak melalui telemetri empiris.
    </span>
  ),
  badgeBgColor = 'bg-destructive',
  badgeTextColor = 'text-destructive-foreground',
  cardBgColor = 'bg-card',
  textColor = 'text-foreground',
  borderColor = 'border-border',
  isEditable = false,
  onChange,
  className,
}: PhysicsCalloutProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg p-5 pt-7 transition-all shadow-[4px_4px_0_var(--border)] border-2',
        borderColor,
        cardBgColor,
        className
      )}
    >
      {/* Floating Red Badge Header */}
      <div
        className={cn(
          'absolute -top-3.5 left-4 border-2 border-border px-3 py-1 font-heading text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0_var(--border)] flex items-center gap-2 select-none',
          badgeBgColor,
          badgeTextColor,
          borderColor
        )}
      >
        <BookOpen className="size-3.5 shrink-0" />
        {isEditable ? (
          <input
            type="text"
            value={badgeText}
            onChange={(e) => onChange?.({ badgeText: e.target.value })}
            placeholder="LABEL FISIKA INTI..."
            className="bg-transparent outline-none w-full border-b border-dashed border-current focus:border-solid font-heading font-black text-[11px] uppercase min-w-[240px]"
          />
        ) : (
          <span>{badgeText}</span>
        )}
      </div>

      {/* Main Question Body */}
      <div className={cn('text-sm md:text-base leading-relaxed font-medium', textColor)}>
        {isEditable ? (
          <textarea
            value={typeof questionText === 'string' ? questionText : ''}
            onChange={(e) => onChange?.({ questionText: e.target.value })}
            placeholder="Tuliskan pertanyaan esensial / konsep fisika inti di sini..."
            rows={3}
            className="w-full bg-transparent outline-none resize-y border-b border-dashed border-border/60 focus:border-border font-medium leading-relaxed text-sm md:text-base"
          />
        ) : (
          <div>{questionText}</div>
        )}
      </div>
    </div>
  );
}
