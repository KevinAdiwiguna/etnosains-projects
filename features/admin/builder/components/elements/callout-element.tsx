'use client';

import React from 'react';

interface CalloutElementProps {
  badgeText?: string;
  questionText?: string;
  isEditable?: boolean;
  onUpdate?: (field: string, val: string) => void;
}

export function CalloutElement({
  badgeText = 'FISIKA INTI: KINEMATIKA, HUKUM II NEWTON & GESEKAN LINTASAN',
  questionText = 'Mengapa kusir Cidomo membatasi kapasitas penumpang ketika melintasi pasir gembur pesisir? Selidiki relasi kuantitatif antara massa total kereta (Σm), resultan gaya tarik kuda (F), dan hambatan gesek permukaan (f_k) terhadap percepatan gerak melalui telemetri empiris.',
  isEditable = false,
  onUpdate,
}: CalloutElementProps) {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 pt-6 shadow-[3px_3px_0_var(--border)]">
      {/* Red Highlight Header Badge */}
      <div className="absolute -top-3 left-4 border-2 border-border bg-destructive px-2.5 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-destructive-foreground shadow-[1px_1px_0_var(--border)] flex items-center gap-1.5">
        <span className="size-2 bg-card rounded-none inline-block" />
        <span>{badgeText}</span>
      </div>

      {/* Content Question */}
      {isEditable ? (
        <textarea
          value={questionText}
          onChange={(e) => onUpdate?.('questionText', e.target.value)}
          rows={3}
          className="w-full bg-transparent text-xs leading-relaxed font-medium text-foreground outline-none resize-y md:text-sm"
        />
      ) : (
        <p className="text-xs leading-relaxed font-medium text-foreground md:text-sm">
          {questionText}
        </p>
      )}
    </div>
  );
}
