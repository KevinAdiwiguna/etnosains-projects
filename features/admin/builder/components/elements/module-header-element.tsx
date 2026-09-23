'use client';

import React from 'react';

interface ModuleHeaderProps {
  badgeText?: string;
  title?: string;
  descriptionTitle?: string;
  descriptionText?: string;
  isEditable?: boolean;
  onUpdate?: (field: string, val: string) => void;
}

export function ModuleHeaderElement({
  badgeText = 'MODUL 01: CIDOMO – DINAMIKA GERAK',
  title = 'CIDOMO: DINAMIKA GERAK & VARIASI BEBAN PANTAI',
  descriptionTitle = 'DESKRIPSI ETNOGRAFIS',
  descriptionText = 'Kereta tradisional bertenaga kuda khas Lombok (Cidomo - Cikar, Dokar, Delman) yang melintasi pesisir pantai Senggigi dan jalan aspal. Penyelidikan difokuskan pada kalkulasi empiris bagaimana kusir membatasi jumlah muatan dan laju derap kuda saat menembus hambatan pasir.',
  isEditable = false,
  onUpdate,
}: ModuleHeaderProps) {
  return (
    <div className="w-full space-y-4">
      {/* Top Badge Tag */}
      <div className="inline-block border-2 border-border bg-primary px-3 py-1 font-heading text-xs font-black uppercase tracking-wider text-primary-foreground shadow-[2px_2px_0_var(--border)]">
        {isEditable ? (
          <input
            type="text"
            value={badgeText}
            onChange={(e) => onUpdate?.('badgeText', e.target.value)}
            className="bg-transparent outline-none w-full border-b border-dashed border-border"
          />
        ) : (
          badgeText
        )}
      </div>

      {/* Main Title */}
      <div className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-foreground md:text-4xl">
        {isEditable ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onUpdate?.('title', e.target.value)}
            className="w-full bg-transparent outline-none border-b-2 border-dashed border-border"
          />
        ) : (
          title
        )}
      </div>

      {/* Description Box with Floating Badge Header */}
      <div className="relative mt-4 rounded-lg border-2 border-border bg-card p-4 pt-6 shadow-[3px_3px_0_var(--border)]">
        {/* Floating Badge Header */}
        <div className="absolute -top-3 left-4 border-2 border-border bg-primary px-2.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-[1px_1px_0_var(--border)]">
          {isEditable ? (
            <input
              type="text"
              value={descriptionTitle}
              onChange={(e) => onUpdate?.('descriptionTitle', e.target.value)}
              className="bg-transparent outline-none"
            />
          ) : (
            descriptionTitle
          )}
        </div>

        {/* Description Body */}
        {isEditable ? (
          <textarea
            value={descriptionText}
            onChange={(e) => onUpdate?.('descriptionText', e.target.value)}
            rows={3}
            className="w-full bg-transparent text-xs leading-relaxed text-card-foreground outline-none resize-y md:text-sm"
          />
        ) : (
          <p className="text-xs leading-relaxed text-card-foreground md:text-sm font-medium">
            {descriptionText}
          </p>
        )}
      </div>
    </div>
  );
}
