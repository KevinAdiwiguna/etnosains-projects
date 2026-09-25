'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface EthnographicDescriptionProps {
  /** Teks badge mengambang di pojok kiri atas */
  badgeText?: string;
  /** Teks paragraf utama / deskripsi */
  descriptionText?: React.ReactNode;
  /** Warna background badge (default: warm yellow/primary) */
  badgeBgColor?: string;
  /** Warna teks badge */
  badgeTextColor?: string;
  /** Warna background kotak utama */
  cardBgColor?: string;
  /** Warna teks utama */
  textColor?: string;
  /** Warna border tebal */
  borderColor?: string;
  /** Ketebalan border (default: border-2) */
  borderWidth?: string;
  /** Mode editable untuk WYSIWYG Builder */
  isEditable?: boolean;
  /** Callback saat nilai diubah */
  onChange?: (data: { badgeText?: string; descriptionText?: string }) => void;
  className?: string;
}

export function EthnographicDescription({
  badgeText = 'DESKRIPSI ETNOGRAFIS',
  descriptionText = 'Kereta tradisional bertenaga kuda khas Lombok (Cidomo - Cikar, Dokar, Mobil) yang melintasi pesisir pantai Senggigi dan jalan aspal. Penyelidikan difokuskan pada kalkulasi empiris bagaimana kusir membatasi jumlah muatan dan laju derap kuda saat menembus hambatan pasir basah versus permukaan padat.',
  badgeBgColor = 'bg-primary',
  badgeTextColor = 'text-primary-foreground',
  cardBgColor = 'bg-card',
  textColor = 'text-foreground',
  borderColor = 'border-border',
  borderWidth = 'border-2',
  isEditable = false,
  onChange,
  className,
}: EthnographicDescriptionProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg p-5 pt-7 transition-all shadow-[4px_4px_0_var(--border)]',
        borderWidth,
        borderColor,
        cardBgColor,
        className
      )}
    >
      {/* Floating Badge Header */}
      <div
        className={cn(
          'absolute -top-3.5 left-4 border-2 border-border px-3 py-0.5 font-heading text-xs font-black uppercase tracking-wider shadow-[1px_1px_0_var(--border)] select-none',
          badgeBgColor,
          badgeTextColor,
          borderColor
        )}
      >
        {isEditable ? (
          <input
            type="text"
            value={badgeText}
            onChange={(e) => onChange?.({ badgeText: e.target.value })}
            placeholder="LABEL BADGE..."
            className="bg-transparent outline-none w-full border-b border-dashed border-current focus:border-solid font-heading font-black text-xs uppercase"
          />
        ) : (
          <span>{badgeText}</span>
        )}
      </div>

      {/* Main Description Body */}
      <div className={cn('text-sm md:text-base leading-relaxed font-medium', textColor)}>
        {isEditable ? (
          <textarea
            value={typeof descriptionText === 'string' ? descriptionText : ''}
            onChange={(e) => onChange?.({ descriptionText: e.target.value })}
            placeholder="Tuliskan deskripsi etnografis di sini..."
            rows={3}
            className="w-full bg-transparent outline-none resize-y border-b border-dashed border-border/60 focus:border-border font-medium leading-relaxed"
          />
        ) : (
          <div>{descriptionText}</div>
        )}
      </div>
    </div>
  );
}
