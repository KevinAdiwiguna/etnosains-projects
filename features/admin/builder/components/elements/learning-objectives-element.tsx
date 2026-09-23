'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ObjectiveItem {
  title: string;
  text: string;
}

interface LearningObjectivesProps {
  title?: string;
  items?: ObjectiveItem[];
  isEditable?: boolean;
  onUpdate?: (items: ObjectiveItem[]) => void;
}

export function LearningObjectivesElement({
  title = 'TUJUAN PEMBELAJARAN',
  items = [
    {
      title: 'Analisis Dinamika Newton',
      text: 'Menganalisis korelasi kuantitatif antara gaya tarik konstan F, variasi massa beban m, dan percepatan a berdasar formulasi F = ma',
    },
    {
      title: 'Variabel & Koefisien Gesek',
      text: 'Mengidentifikasi variabel bebas, terikat, dan kontrol pada perbandingan lintasan aspal halus (μk = 0.05) versus pasir pantai Senggigi berbutir kasar (μk = 0.40).',
    },
    {
      title: 'Penalaran Ilmiah Toulmin',
      text: 'Membangun klaim terargumentasi (Claim, Evidence, Warrant, Rebuttal) menggunakan dataset simulasi virtual untuk menjustifikasi kearifan batas muatan lokal.',
    },
  ],
  isEditable = false,
  onUpdate,
}: LearningObjectivesProps) {
  const handleAddItem = () => {
    const newItems = [...items, { title: 'Tujuan Baru', text: 'Deskripsi tujuan pembelajaran...' }];
    onUpdate?.(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, idx) => idx !== index);
    onUpdate?.(newItems);
  };

  const handleUpdateItem = (index: number, field: keyof ObjectiveItem, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onUpdate?.(newItems);
  };

  return (
    <div className="rounded-lg border-2 border-border bg-card p-4 shadow-[3px_3px_0_var(--border)] space-y-3">
      {/* Header Bar */}
      <div className="border-b-2 border-border pb-2">
        <h4 className="font-heading text-xs font-black uppercase tracking-wider text-foreground">
          {title}
        </h4>
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-md border-2 border-border bg-background p-3 shadow-[2px_2px_0_var(--border)]"
          >
            {/* Number Box */}
            <div className="flex size-6 shrink-0 items-center justify-center border-2 border-border bg-accent font-heading text-xs font-black text-accent-foreground shadow-[1px_1px_0_var(--border)]">
              {idx + 1}
            </div>

            {/* Content Text */}
            <div className="flex-1 space-y-1">
              {isEditable ? (
                <>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItem(idx, 'title', e.target.value)}
                    className="w-full bg-transparent font-heading text-xs font-bold uppercase text-foreground outline-none border-b border-dashed border-border"
                  />
                  <textarea
                    value={item.text}
                    onChange={(e) => handleUpdateItem(idx, 'text', e.target.value)}
                    rows={2}
                    className="w-full bg-transparent text-xs text-muted-foreground outline-none resize-none"
                  />
                </>
              ) : (
                <p className="text-xs leading-normal text-foreground">
                  <span className="font-bold text-foreground">{item.title}: </span>
                  <span className="text-muted-foreground">{item.text}</span>
                </p>
              )}
            </div>

            {isEditable && (
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="p-1 text-destructive hover:bg-destructive/10 rounded"
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditable && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAddItem}
          className="w-full border-2 border-dashed border-border font-heading text-xs uppercase"
        >
          <Plus className="mr-1 size-3.5" /> Tambah Poin Tujuan
        </Button>
      )}
    </div>
  );
}
