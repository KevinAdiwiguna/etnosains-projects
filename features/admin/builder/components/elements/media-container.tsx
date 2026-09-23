'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

export interface TelemetryBadge {
  id: string;
  label: string;
  value: string;
  bgColor?: string;
  textColor?: string;
}

export interface MediaContainerProps {
  /** Teks label di header kiri atas */
  headerTagText?: string;
  /** Warna indikator kotak kecil di header */
  headerDotColor?: string;
  /** Teks placeholder di tengah area dashed */
  placeholderText?: string;
  /** Array lencana parameter fisis di bawah */
  badges?: TelemetryBadge[];
  /** Warna background kartu utama */
  cardBgColor?: string;
  /** Warna border tebal kartu */
  borderColor?: string;
  /** Mode editable untuk WYSIWYG Builder */
  isEditable?: boolean;
  /** Callback saat data diubah */
  onChange?: (data: {
    headerTagText?: string;
    placeholderText?: string;
    badges?: TelemetryBadge[];
  }) => void;
  className?: string;
}

export function MediaContainer({
  headerTagText = 'DIAGRAM BEBAS VEKTOR',
  headerDotColor = 'bg-destructive',
  placeholderText = 'ISI VIDEO/GRAFIK/YANG LAIN',
  badges = [
    {
      id: 'b-1',
      label: 'Kereta',
      value: 'Cidomo Kayu',
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
    },
    {
      id: 'b-2',
      label: 'Traksi',
      value: 'Kuda Lombok',
      bgColor: 'bg-sky-200',
      textColor: 'text-slate-900',
    },
    {
      id: 'b-3',
      label: 'Beban',
      value: '0 - 600 kg',
      bgColor: 'bg-rose-200',
      textColor: 'text-slate-900',
    },
  ],
  cardBgColor = 'bg-card',
  borderColor = 'border-border',
  isEditable = false,
  onChange,
  className,
}: MediaContainerProps) {
  // Update badge individual
  const handleUpdateBadge = (id: string, field: 'label' | 'value', val: string) => {
    const newBadges = badges.map((b) => (b.id === id ? { ...b, [field]: val } : b));
    onChange?.({ badges: newBadges });
  };

  // Tambah badge baru
  const handleAddBadge = () => {
    const newBadge: TelemetryBadge = {
      id: `badge-${Date.now()}`,
      label: 'Parameter',
      value: 'Nilai',
      bgColor: 'bg-secondary',
      textColor: 'text-foreground',
    };
    onChange?.({ badges: [...badges, newBadge] });
  };

  // Hapus badge
  const handleRemoveBadge = (id: string) => {
    const newBadges = badges.filter((b) => b.id !== id);
    onChange?.({ badges: newBadges });
  };

  return (
    <div
      className={cn(
        'relative rounded-lg p-4 pt-6 transition-all shadow-[4px_4px_0_var(--border)] border-2',
        borderColor,
        cardBgColor,
        className
      )}
    >
      {/* Header Badge (Kiri Atas) */}
      <div className="absolute -top-3 left-4 border-2 border-border bg-background px-2.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-foreground shadow-[1px_1px_0_var(--border)] flex items-center gap-1.5 select-none">
        <span className={cn('size-2 shrink-0 border border-border', headerDotColor)} />
        {isEditable ? (
          <input
            type="text"
            value={headerTagText}
            onChange={(e) => onChange?.({ headerTagText: e.target.value })}
            placeholder="LABEL HEADER..."
            className="bg-transparent outline-none font-heading font-black text-[10px] uppercase border-b border-dashed border-border/60 focus:border-border w-36"
          />
        ) : (
          <span>{headerTagText}</span>
        )}
      </div>

      {/* Dashed Media Box */}
      <div className="my-2 flex min-h-[180px] w-full items-center justify-center rounded border-2 border-dashed border-border/80 bg-muted/30 p-6 text-center">
        {isEditable ? (
          <input
            type="text"
            value={placeholderText}
            onChange={(e) => onChange?.({ placeholderText: e.target.value })}
            placeholder="TEKS MEDIA / SIMULASI..."
            className="w-full bg-transparent text-center font-heading text-sm md:text-base font-black uppercase tracking-wider text-foreground outline-none border-b border-dashed border-transparent hover:border-border focus:border-border"
          />
        ) : (
          <span className="font-heading text-sm md:text-base font-black uppercase tracking-widest text-foreground/90">
            {placeholderText}
          </span>
        )}
      </div>

      {/* Telemetry Badges Section */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-1">
        {badges.map((b) => (
          <div
            key={b.id}
            className={cn(
              'flex items-center gap-1.5 border-2 border-border px-3 py-1 font-heading text-xs shadow-[2px_2px_0_var(--border)] transition-all',
              b.bgColor || 'bg-secondary',
              b.textColor || 'text-foreground'
            )}
          >
            {isEditable ? (
              <>
                <input
                  type="text"
                  value={b.label}
                  onChange={(e) => handleUpdateBadge(b.id, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-16 bg-transparent font-bold outline-none border-b border-dashed border-current focus:border-solid text-right"
                />
                <span>:</span>
                <input
                  type="text"
                  value={b.value}
                  onChange={(e) => handleUpdateBadge(b.id, 'value', e.target.value)}
                  placeholder="Nilai"
                  className="w-24 bg-transparent font-black uppercase outline-none border-b border-dashed border-current focus:border-solid"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBadge(b.id)}
                  className="ml-1 text-destructive hover:scale-125 transition-transform"
                  title="Hapus badge"
                >
                  <Trash2 className="size-3" />
                </button>
              </>
            ) : (
              <>
                <span className="font-bold opacity-80">{b.label}:</span>
                <span className="font-black uppercase">{b.value}</span>
              </>
            )}
          </div>
        ))}

        {/* Tombol Tambah Badge (Hanya saat Editable) */}
        {isEditable && (
          <button
            type="button"
            onClick={handleAddBadge}
            className="flex items-center gap-1 border-2 border-dashed border-border bg-background px-2.5 py-1 font-heading text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:border-solid transition-all"
          >
            <Plus className="size-3" />
            <span>Tambah Badge</span>
          </button>
        )}
      </div>
    </div>
  );
}
