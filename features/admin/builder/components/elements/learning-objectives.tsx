'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

export interface ObjectiveItem {
  id: string;
  title: string;
  description: React.ReactNode;
  badgeBgColor?: string;
  badgeTextColor?: string;
}

export interface LearningObjectivesProps {
  /** Judul header atas */
  headerTitle?: string;
  /** Array daftar poin tujuan pembelajaran */
  items?: ObjectiveItem[];
  /** Warna background kartu utama */
  cardBgColor?: string;
  /** Warna background bar header */
  headerBgColor?: string;
  /** Warna border tebal */
  borderColor?: string;
  /** Mode editable untuk WYSIWYG Builder */
  isEditable?: boolean;
  /** Callback saat data diubah */
  onChange?: (data: { headerTitle?: string; items?: ObjectiveItem[] }) => void;
  className?: string;
}

export function LearningObjectives({
  headerTitle = 'TUJUAN PEMBELAJARAN',
  items = [
    {
      id: 'obj-1',
      title: 'Analisis Dinamika Newton',
      description: (
        <span>
          Menganalisis korelasi kuantitatif antara gaya tarik konstan <strong>F</strong>, variasi massa beban <strong>m</strong>, dan percepatan <strong>a</strong> berdasar formulasi <strong>F = ma</strong>.
        </span>
      ),
      badgeBgColor: 'bg-accent',
      badgeTextColor: 'text-accent-foreground',
    },
    {
      id: 'obj-2',
      title: 'Variabel & Koefisien Gesek',
      description: (
        <span>
          Mengidentifikasi variabel bebas, terikat, dan kontrol pada perbandingan lintasan aspal halus <strong>(μk ≈ 0.05)</strong> versus pasir pantai Senggigi berbutir kasar <strong>(μk ≈ 0.40)</strong>.
        </span>
      ),
      badgeBgColor: 'bg-accent',
      badgeTextColor: 'text-accent-foreground',
    },
    {
      id: 'obj-3',
      title: 'Penalaran Ilmiah Toulmin',
      description: 'Membangun klaim terargumentasi (Claim, Evidence, Warrant, Rebuttal) menggunakan dataset simulasi virtual untuk menjustifikasi kearifan batas muatan lokal.',
      badgeBgColor: 'bg-accent',
      badgeTextColor: 'text-accent-foreground',
    },
  ],
  cardBgColor = 'bg-card',
  headerBgColor = 'bg-muted/40',
  borderColor = 'border-border',
  isEditable = false,
  onChange,
  className,
}: LearningObjectivesProps) {
  // Update item individual
  const handleUpdateItem = (id: string, field: 'title' | 'description', val: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    onChange?.({ items: newItems });
  };

  // Tambah poin baru
  const handleAddItem = () => {
    const newItem: ObjectiveItem = {
      id: `obj-${Date.now()}`,
      title: 'Tujuan Pembelajaran Baru',
      description: 'Deskripsi singkat tujuan pembelajaran...',
      badgeBgColor: 'bg-accent',
      badgeTextColor: 'text-accent-foreground',
    };
    onChange?.({ items: [...items, newItem] });
  };

  // Hapus poin
  const handleRemoveItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    onChange?.({ items: newItems });
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden border-2 transition-all shadow-[4px_4px_0_var(--border)]',
        borderColor,
        cardBgColor,
        className
      )}
    >
      {/* Header Bar */}
      <div
        className={cn(
          'border-b-2 px-4 py-2.5 font-heading text-xs md:text-sm font-black uppercase tracking-wider text-foreground select-none',
          borderColor,
          headerBgColor
        )}
      >
        {isEditable ? (
          <input
            type="text"
            value={headerTitle}
            onChange={(e) => onChange?.({ headerTitle: e.target.value })}
            placeholder="JUDUL HEADER..."
            className="bg-transparent outline-none w-full border-b border-dashed border-border/60 focus:border-border font-black uppercase"
          />
        ) : (
          <span>{headerTitle}</span>
        )}
      </div>

      {/* Items List */}
      <div className="p-4 space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={cn(
              'flex items-start gap-3 rounded border-2 p-3 bg-background shadow-[2px_2px_0_var(--border)] transition-all',
              borderColor
            )}
          >
            {/* Number Badge Box */}
            <div
              className={cn(
                'flex size-6 shrink-0 items-center justify-center border-2 font-heading text-xs font-black shadow-[1px_1px_0_var(--border)] select-none mt-0.5',
                borderColor,
                item.badgeBgColor || 'bg-accent',
                item.badgeTextColor || 'text-accent-foreground'
              )}
            >
              {idx + 1}
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-1">
              {isEditable ? (
                <>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                    placeholder="Judul Poin..."
                    className="w-full bg-transparent font-heading text-xs md:text-sm font-bold uppercase text-foreground outline-none border-b border-dashed border-border/60 focus:border-border"
                  />
                  <textarea
                    value={typeof item.description === 'string' ? item.description : ''}
                    onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                    placeholder="Deskripsi Poin..."
                    rows={2}
                    className="w-full bg-transparent text-xs md:text-sm text-muted-foreground outline-none resize-y border-b border-dashed border-transparent hover:border-border"
                  />
                </>
              ) : (
                <div className="text-xs md:text-sm leading-relaxed text-foreground">
                  <span className="font-bold text-foreground">{item.title}: </span>
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              )}
            </div>

            {/* Remove Item Button */}
            {isEditable && (
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="p-1 text-destructive hover:scale-110 transition-transform shrink-0"
                title="Hapus Poin"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        ))}

        {/* Add New Item Button */}
        {isEditable && (
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center justify-center gap-1.5 w-full border-2 border-dashed border-border bg-background p-2 font-heading text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:border-solid transition-all"
          >
            <Plus className="size-4" />
            <span>Tambah Poin Tujuan</span>
          </button>
        )}
      </div>
    </div>
  );
}
