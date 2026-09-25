'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RotateCw } from 'lucide-react';

export interface FlipCardElementProps {
  frontTitle?: string;
  frontSub?: string;
  backTitle?: string;
  backText?: string;
  frontBgColor?: string;
  backBgColor?: string;
  isEditable?: boolean;
  onChange?: (data: {
    frontTitle?: string;
    frontSub?: string;
    backTitle?: string;
    backText?: string;
    frontBgColor?: string;
    backBgColor?: string;
  }) => void;
  className?: string;
}

export function FlipCardElement({
  frontTitle = 'CIDOMO',
  frontSub = 'ISTILAH LOKAL LOMBOK',
  backTitle = 'KONSEP FISIKA',
  backText = 'Cidomo menggunakan prinsip roda berporos, Hukum II Newton, dan gaya gesek permukaan pasir Senggigi.',
  frontBgColor = 'bg-card',
  backBgColor = 'bg-primary/20',
  isEditable = false,
  onChange,
  className,
}: FlipCardElementProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => !isEditable && setIsFlipped(!isFlipped)}
      className={cn(
        'relative min-h-[160px] w-full cursor-pointer rounded-lg border-2 border-border p-4 shadow-[4px_4px_0_var(--border)] transition-all select-none',
        isFlipped ? backBgColor : frontBgColor,
        className
      )}
    >
      <div className="flex h-full flex-col justify-between space-y-3">
        {/* Header Indicator */}
        <div className="flex items-center justify-between border-b border-dashed border-border pb-1">
          <span className="font-heading text-[10px] font-black uppercase tracking-wider text-muted-foreground">
            {isFlipped ? 'SISI BELAKANG (PENJELASAN)' : 'SISI DEPAN (ISTILAH)'}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="p-1 hover:bg-muted rounded border border-border"
            title="Balik Kartu"
          >
            <RotateCw className="size-3 text-foreground" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-auto space-y-2 text-center">
          {!isFlipped ? (
            <>
              {isEditable ? (
                <>
                  <input
                    type="text"
                    value={frontTitle}
                    onChange={(e) => onChange?.({ frontTitle: e.target.value })}
                    placeholder="JUDUL DEPAN..."
                    className="w-full text-center font-heading text-lg font-black uppercase bg-transparent outline-none border-b border-dashed border-border focus:border-solid"
                  />
                  <input
                    type="text"
                    value={frontSub}
                    onChange={(e) => onChange?.({ frontSub: e.target.value })}
                    placeholder="TEKS KECIL / SUBDEPAN..."
                    className="w-full text-center font-mono text-xs text-muted-foreground bg-transparent outline-none border-b border-dashed border-border focus:border-solid"
                  />
                </>
              ) : (
                <>
                  <h4 className="font-heading text-lg font-black uppercase text-foreground">{frontTitle}</h4>
                  <p className="font-mono text-xs text-muted-foreground uppercase">{frontSub}</p>
                </>
              )}
            </>
          ) : (
            <>
              {isEditable ? (
                <>
                  <input
                    type="text"
                    value={backTitle}
                    onChange={(e) => onChange?.({ backTitle: e.target.value })}
                    placeholder="JUDUL BELAKANG..."
                    className="w-full text-center font-heading text-sm font-black uppercase bg-transparent outline-none border-b border-dashed border-border focus:border-solid"
                  />
                  <textarea
                    value={backText}
                    onChange={(e) => onChange?.({ backText: e.target.value })}
                    placeholder="PENJELASAN BELAKANG..."
                    rows={2}
                    className="w-full text-center text-xs leading-relaxed text-foreground bg-transparent outline-none resize-y border-b border-dashed border-border focus:border-solid"
                  />
                </>
              ) : (
                <>
                  <h5 className="font-heading text-xs font-bold uppercase text-primary-foreground bg-primary px-2 py-0.5 inline-block border border-border shadow-[1px_1px_0_var(--border)]">{backTitle}</h5>
                  <p className="text-xs leading-relaxed text-foreground font-medium mt-1">{backText}</p>
                </>
              )}
            </>
          )}
        </div>

        {!isEditable && (
          <p className="text-center font-mono text-[9px] text-muted-foreground uppercase">
            [ Klik untuk membalik kartu ]
          </p>
        )}
      </div>
    </div>
  );
}
