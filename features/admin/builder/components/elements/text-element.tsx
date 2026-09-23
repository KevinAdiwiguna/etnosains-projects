'use client';

import React from 'react';
import { CardElement } from "../../types/builder";

interface TextElementProps {
  element: CardElement;
  cardId: string;
  onUpdateValue: (cardId: string, elementId: string, newValue: Record<string, any>) => void;
}

export function TextElement({ element, cardId, onUpdateValue }: TextElementProps) {
  const { value } = element;

  return (
    <div className="space-y-3 p-1">
      <div className="w-full">
        <input
          type="text"
          value={value?.title || ''}
          onChange={(e) =>
            onUpdateValue(cardId, element.id, { title: e.target.value })
          }
          placeholder="JUDUL / BADGE TEKS (OPSIONAL)..."
          className="text-xs p-1.5 border border-border bg-background font-bold font-heading uppercase w-full outline-none focus:border-primary"
        />
      </div>

      <textarea
        value={value?.text || ''}
        onChange={(e) =>
          onUpdateValue(cardId, element.id, { text: e.target.value })
        }
        placeholder="Tuliskan narasi atau penjelasan materi etnosains di sini..."
        className="w-full text-xs md:text-sm p-2 border border-border bg-background outline-none resize-y leading-relaxed focus:border-primary"
        rows={3}
      />
    </div>
  );
}
