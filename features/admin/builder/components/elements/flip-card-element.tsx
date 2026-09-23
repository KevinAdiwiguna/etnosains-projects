'use client';

import React from 'react';
import { CardElement } from '../../types/builder';
import { FlipCard } from '@/components/shared/flip-card';

interface FlipCardElementProps {
  element: CardElement;
  cardId: string;
  onUpdateValue: (cardId: string, elementId: string, newValue: Record<string, any>) => void;
}

export function FlipCardElement({ element, cardId, onUpdateValue }: FlipCardElementProps) {
  const { value } = element;

  return (
    <div className="w-full my-2">
      <FlipCard
        className="h-60 w-full"
        front={
          <div className="space-y-2 w-full">
            <span className="text-[10px] font-heading font-bold uppercase text-muted-foreground tracking-wider block">
              Sisi Depan (Klik teks untuk mengedit)
            </span>

            <input
              type="text"
              value={value?.frontTitle || ''}
              onChange={(e) =>
                onUpdateValue(cardId, element.id, { frontTitle: e.target.value })
              }
              placeholder="JUDUL DEPAN..."
              className="w-full font-heading font-black text-base uppercase bg-transparent border-b-2 border-dashed border-border/60 focus:border-solid focus:border-border outline-none text-foreground placeholder:text-muted-foreground/60"
            />

            <textarea
              value={value?.frontText || ''}
              onChange={(e) =>
                onUpdateValue(cardId, element.id, { frontText: e.target.value })
              }
              placeholder="Ketik deskripsi sisi depan di sini..."
              className="w-full text-xs text-muted-foreground bg-transparent outline-none resize-none leading-relaxed border-b border-dashed border-transparent focus:border-border"
              rows={3}
            />
          </div>
        }
        back={
          <div className="space-y-2 w-full">
            <span className="text-[10px] font-heading font-bold uppercase text-muted-foreground tracking-wider block">
              Sisi Belakang (Klik teks untuk mengedit)
            </span>

            <input
              type="text"
              value={value?.backTitle || ''}
              onChange={(e) =>
                onUpdateValue(cardId, element.id, { backTitle: e.target.value })
              }
              placeholder="JUDUL BELAKANG..."
              className="w-full font-heading font-black text-base uppercase bg-transparent border-b-2 border-dashed border-border/60 focus:border-solid focus:border-border outline-none text-foreground placeholder:text-muted-foreground/60"
            />

            <textarea
              value={value?.backText || ''}
              onChange={(e) =>
                onUpdateValue(cardId, element.id, { backText: e.target.value })
              }
              placeholder="Ketik deskripsi sisi belakang di sini..."
              className="w-full text-xs text-foreground bg-transparent outline-none resize-none leading-relaxed border-b border-dashed border-transparent focus:border-border"
              rows={3}
            />
          </div>
        }
      />
    </div>
  );
}
