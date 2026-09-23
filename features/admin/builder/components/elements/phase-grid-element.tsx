'use client';

import React from 'react';
import { Play, Lock } from 'lucide-react';

export interface PhaseItem {
  code: string;
  title: string;
  description: string;
  status: 'TERBUKA' | 'TERKUNCI';
}

interface PhaseGridElementProps {
  title?: string;
  phases?: PhaseItem[];
  isEditable?: boolean;
  onUpdate?: (field: string, val: any) => void;
  onSelectPhase?: (phaseCode: string) => void;
}

export function PhaseGridElement({
  title = '4 TEMA TAHAPAN PEMBELAJARAN',
  phases = [
    {
      code: 'FASE 01',
      title: 'ORIENTASI BUDAYA, TARGET BELAJAR, DAN PREDIKSI AWAL',
      description:
        'Penetapan target SRL, pemetaan asumsi awal, serta formulasi hipotesis matematis gaya-massa.',
      status: 'TERBUKA',
    },
    {
      code: 'FASE 02',
      title: 'EKSPLEORASI ETNOSAINS DAN KONSTRUKSI KONSEP',
      description:
        'Dekomposisi konsep gerak lurus, terminologi kearifan Sasak, serta klasifikasi fakta versus model fisis.',
      status: 'TERKUNCI',
    },
    {
      code: 'FASE 03',
      title: 'SIMULASI, BANK BUKTI, DAN MONITORING PEMAHAMAN',
      description:
        'Simulasi eksperimen 3+ trial, variasi beban kargo kuintal, stopwatch digital, dan kurva v-t realtime.',
      status: 'TERKUNCI',
    },
    {
      code: 'FASE 04',
      title: 'ARGUMENTASI, REFLEKSI, DAN TRANSFER PENGETAHUAN',
      description:
        'Penyusunan klaim berbasis data uji, penarikan kesimpulan Hukum II Newton, dan evaluasi portofolio.',
      status: 'TERKUNCI',
    },
  ],
  isEditable = true,
  onUpdate,
  onSelectPhase,
}: PhaseGridElementProps) {
  const handleUpdatePhase = (
    index: number,
    field: keyof PhaseItem,
    value: string
  ) => {
    const updatedPhases = [...phases];
    updatedPhases[index] = { ...updatedPhases[index], [field]: value };
    onUpdate?.('phases', updatedPhases);
  };

  const handleToggleStatus = (index: number) => {
    const updatedPhases = [...phases];
    const currentStatus = updatedPhases[index].status;
    updatedPhases[index] = {
      ...updatedPhases[index],
      status: currentStatus === 'TERBUKA' ? 'TERKUNCI' : 'TERBUKA',
    };
    onUpdate?.('phases', updatedPhases);
  };

  return (
    <div className="rounded-lg border-2 border-border bg-card p-4 shadow-[3px_3px_0_var(--border)] space-y-3">
      {/* Header Grid */}
      <div className="border-b-2 border-border pb-2">
        {isEditable ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onUpdate?.('title', e.target.value)}
            placeholder="JUDUL GRID TAHAPAN..."
            className="w-full font-heading text-xs font-black uppercase tracking-wider text-foreground bg-transparent outline-none border-b border-dashed border-border/60 focus:border-border"
          />
        ) : (
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-foreground">
            {title}
          </h4>
        )}
      </div>

      {/* Grid Item 2x2 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {phases.map((item, idx) => {
          const isOpen = item.status === 'TERBUKA';

          return (
            <div
              key={idx}
              onClick={() => !isEditable && isOpen && onSelectPhase?.(item.code)}
              className={`group flex flex-col justify-between rounded-md border-2 border-border p-3 shadow-[3px_3px_0_var(--border)] transition-all ${
                isOpen
                  ? 'bg-emerald-100/60 hover:bg-emerald-200/80 cursor-pointer'
                  : 'bg-background opacity-85 cursor-not-allowed'
              }`}
            >
              <div className="space-y-2">
                {/* Kode Fase & Toggle Status Button */}
                <div className="flex items-center justify-between pb-1">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.code}
                      onChange={(e) =>
                        handleUpdatePhase(idx, 'code', e.target.value)
                      }
                      className="w-20 border-2 border-border bg-background px-1.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-foreground shadow-[1px_1px_0_var(--border)] outline-none"
                    />
                  ) : (
                    <span className="border-2 border-border bg-background px-2 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-foreground shadow-[1px_1px_0_var(--border)]">
                      {item.code}
                    </span>
                  )}

                  {/* Badges Status Terbuka/Terkunci */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isEditable) handleToggleStatus(idx);
                    }}
                    className={`border px-1.5 py-0.5 font-mono text-[9px] font-bold transition-all ${
                      isOpen
                        ? 'border-emerald-800 bg-emerald-200 text-emerald-950'
                        : 'border-slate-700 bg-slate-200 text-slate-700'
                    } ${isEditable ? 'hover:scale-105 cursor-pointer' : ''}`}
                    title={
                      isEditable ? 'Klik untuk mengubah status akses fase' : ''
                    }
                  >
                    {item.status}
                  </button>
                </div>

                {/* Judul Fase */}
                {isEditable ? (
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleUpdatePhase(idx, 'title', e.target.value)
                    }
                    placeholder="Judul Fase..."
                    className="w-full font-heading text-xs font-bold uppercase text-foreground bg-transparent outline-none border-b border-dashed border-border/60 focus:border-border"
                  />
                ) : (
                  <h5 className="font-heading text-xs font-bold uppercase leading-snug text-foreground">
                    {item.title}
                  </h5>
                )}

                {/* Deskripsi Singkat Fase */}
                {isEditable ? (
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      handleUpdatePhase(idx, 'description', e.target.value)
                    }
                    placeholder="Deskripsi singkat fase..."
                    rows={2}
                    className="w-full text-[11px] leading-normal text-muted-foreground bg-transparent outline-none resize-none border-b border-dashed border-transparent hover:border-border/40 focus:border-border"
                  />
                ) : (
                  <p className="text-[11px] leading-normal text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Bottom Icon Action */}
              <div className="mt-3 flex justify-end pt-1">
                <span className="border-2 border-border bg-background p-1 shadow-[1px_1px_0_var(--border)] group-hover:bg-primary transition-colors">
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
    </div>
  );
}
