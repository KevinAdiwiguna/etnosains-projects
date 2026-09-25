'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Play, Lock, Plus, Trash2 } from 'lucide-react';

export interface PhaseItem {
  id: string;
  code: string;
  title: string;
  description: React.ReactNode;
  status: 'TERBUKA' | 'TERKUNCI';
  activeBgColor?: string;
  activeTextColor?: string;
}

export interface PhaseGridProps {
  /** Judul header paling atas */
  headerTitle?: string;
  /** Daftar kartu fase pembelajaran */
  phases?: PhaseItem[];
  /** Warna background kartu utama */
  cardBgColor?: string;
  /** Warna background bar header */
  headerBgColor?: string;
  /** Warna border tebal */
  borderColor?: string;
  /** Mode editable untuk WYSIWYG Builder */
  isEditable?: boolean;
  /** Callback saat data diubah */
  onChange?: (data: { headerTitle?: string; phases?: PhaseItem[] }) => void;
  /** Callback saat fase yang terbuka diklik oleh siswa */
  onSelectPhase?: (phaseCode: string) => void;
  className?: string;
}

export function PhaseGrid({
  headerTitle = '4 TEMA TAHAPAN PEMBELAJARAN',
  phases = [
    {
      id: 'p-1',
      code: 'FASE 01',
      title: 'ORIENTASI BUDAYA, TARGET BELAJAR, DAN PREDIKSI AWAL',
      description:
        'Penetapan target SRL, pemetaan asumsi awal, serta formulasi hipotesis matematis gaya-massa.',
      status: 'TERBUKA',
      activeBgColor: 'bg-emerald-400',
      activeTextColor: 'text-emerald-950',
    },
    {
      id: 'p-2',
      code: 'FASE 02',
      title: 'EKSPLORASI ETNOSAINS DAN KONSTRUKSI KONSEP',
      description:
        'Dekomposisi konsep gerak lurus, terminologi kearifan Sasak, serta klasifikasi fakta versus model fisis.',
      status: 'TERKUNCI',
    },
    {
      id: 'p-3',
      code: 'FASE 03',
      title: 'SIMULASI, BANK BUKTI, DAN MONITORING PEMAHAMAN',
      description:
        'Simulasi eksperimen 3+ trial, variasi beban kargo kuintal, stopwatch digital, dan kurva v-t realtime.',
      status: 'TERKUNCI',
    },
    {
      id: 'p-4',
      code: 'FASE 04',
      title: 'ARGUMENTASI, REFLEKSI, DAN TRANSFER PENGETAHUAN',
      description:
        'Penyusunan klaim berbasis data uji, penarikan kesimpulan Hukum II Newton, dan evaluasi portofolio.',
      status: 'TERKUNCI',
    },
  ],
  cardBgColor = 'bg-card',
  headerBgColor = 'bg-muted/40',
  borderColor = 'border-border',
  isEditable = false,
  onChange,
  onSelectPhase,
  className,
}: PhaseGridProps) {

  const handleToggleStatus = (id: string) => {
    const updatedPhases = phases.map((item) => {
      if (item.id === id) {
        const nextStatus: 'TERBUKA' | 'TERKUNCI' =
          item.status === 'TERBUKA' ? 'TERKUNCI' : 'TERBUKA';

        return { ...item, status: nextStatus };
      }
      return item;
    });
    onChange?.({ phases: updatedPhases });
  };

  // Update Teks Item Individual
  const handleUpdatePhase = (
    id: string,
    field: keyof PhaseItem,
    value: string
  ) => {
    const updatedPhases = phases.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange?.({ phases: updatedPhases });
  };

  // Tambah Fase Baru
  const handleAddPhase = () => {
    const newPhase: PhaseItem = {
      id: `p-${Date.now()}`,
      code: `FASE 0${phases.length + 1}`,
      title: 'JUDUL TAHAPAN BARU',
      description: 'Deskripsi tahapan pembelajaran baru...',
      status: 'TERKUNCI',
    };
    onChange?.({ phases: [...phases, newPhase] });
  };

  // Hapus Fase
  const handleRemovePhase = (id: string) => {
    const updatedPhases = phases.filter((item) => item.id !== id);
    onChange?.({ phases: updatedPhases });
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
            placeholder="JUDUL GRID TAHAPAN..."
            className="bg-transparent outline-none w-full border-b border-dashed border-border/60 focus:border-border font-black uppercase"
          />
        ) : (
          <span>{headerTitle}</span>
        )}
      </div>

      {/* Grid Item 2x2 */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {phases.map((item) => {
            const isOpen = item.status === 'TERBUKA';

            return (
              <div
                key={item.id}
                onClick={() =>
                  !isEditable && isOpen && onSelectPhase?.(item.code)
                }
                className={cn(
                  'group flex flex-col justify-between rounded-md border-2 p-3 shadow-[3px_3px_0_var(--border)] transition-all relative',
                  borderColor,
                  isOpen
                    ? cn(
                        item.activeBgColor || 'bg-emerald-400',
                        item.activeTextColor || 'text-emerald-950'
                      )
                    : 'bg-background opacity-90'
                )}
              >
                <div className="space-y-2">
                  {/* Code Badge & Toggle Status */}
                  <div className="flex items-center justify-between pb-1">
                    {isEditable ? (
                      <input
                        type="text"
                        value={item.code}
                        onChange={(e) =>
                          handleUpdatePhase(item.id, 'code', e.target.value)
                        }
                        placeholder="FASE 01"
                        className="w-20 border-2 border-border bg-background px-1.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-foreground shadow-[1px_1px_0_var(--border)] outline-none"
                      />
                    ) : (
                      <span className="border-2 border-border bg-amber-200 px-2 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-[1px_1px_0_var(--border)]">
                        {item.code}
                      </span>
                    )}

                    {/* Status Button (Terbuka / Terkunci) */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isEditable) handleToggleStatus(item.id);
                        }}
                        className={cn(
                          'border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase transition-all select-none',
                          isOpen
                            ? 'border-emerald-900 bg-emerald-100 text-emerald-950'
                            : 'border-slate-700 bg-slate-200 text-slate-700',
                          isEditable && 'cursor-pointer hover:scale-105'
                        )}
                        title={
                          isEditable
                            ? 'Klik untuk mengubah status akses'
                            : undefined
                        }
                      >
                        {item.status}
                      </button>

                      {isEditable && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhase(item.id);
                          }}
                          className="p-1 text-destructive hover:scale-110 transition-transform"
                          title="Hapus Fase"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Judul Fase */}
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleUpdatePhase(item.id, 'title', e.target.value)
                      }
                      placeholder="Judul Fase..."
                      className="w-full font-heading text-xs font-bold uppercase text-foreground bg-transparent outline-none border-b border-dashed border-border/60 focus:border-border"
                    />
                  ) : (
                    <h5 className="font-heading text-xs font-black uppercase leading-snug">
                      {item.title}
                    </h5>
                  )}

                  {/* Deskripsi Fase */}
                  {isEditable ? (
                    <textarea
                      value={
                        typeof item.description === 'string'
                          ? item.description
                          : ''
                      }
                      onChange={(e) =>
                        handleUpdatePhase(
                          item.id,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder="Deskripsi singkat fase..."
                      rows={2}
                      className="w-full text-[11px] leading-normal opacity-80 bg-transparent outline-none resize-y border-b border-dashed border-transparent hover:border-border"
                    />
                  ) : (
                    <p className="text-[11px] leading-normal opacity-85 font-medium">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom Arrow / Lock Icon */}
                <div className="mt-3 flex justify-end pt-1">
                  <span className="border-2 border-border bg-background p-1 shadow-[1px_1px_0_var(--border)] text-foreground group-hover:bg-primary transition-colors">
                    {isOpen ? (
                      <Play className="size-3.5 fill-foreground text-foreground" />
                    ) : (
                      <Lock className="size-3.5 text-muted-foreground" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Phase Button */}
        {isEditable && (
          <button
            type="button"
            onClick={handleAddPhase}
            className="flex items-center justify-center gap-1.5 w-full border-2 border-dashed border-border bg-background p-2 font-heading text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:border-solid transition-all"
          >
            <Plus className="size-4" />
            <span>Tambah Tahapan Fase</span>
          </button>
        )}
      </div>
    </div>
  );
}
