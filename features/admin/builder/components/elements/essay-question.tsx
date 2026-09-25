'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface EssayQuestionProps {
  questionNumber?: string;
  questionText?: string;
  placeholderText?: string;
  correctAnswerRubric?: string; // Rubrik / Kunci Jawaban
  cardBgColor?: string;
  isEditable?: boolean;
  onChange?: (data: {
    questionNumber?: string;
    questionText?: string;
    placeholderText?: string;
    correctAnswerRubric?: string;
  }) => void;
  className?: string;
}

export function EssayQuestion({
  questionNumber = 'SOAL ISIAN 01',
  questionText = 'Jelaskan hubungan antara massa total beban Cidomo dengan percepatan gerak berdasarkan Hukum II Newton!',
  placeholderText = 'Tuliskan jawaban Anda di sini...',
  correctAnswerRubric = 'Kunci Jawaban: Semakin besar massa (m), maka percepatan (a) akan semakin kecil jika gaya tarik (F) bernilai konstan (a = F/m).',
  cardBgColor = 'bg-card',
  isEditable = false,
  onChange,
  className,
}: EssayQuestionProps) {
  const [studentAnswer, setStudentAnswer] = React.useState('');

  return (
    <div
      className={cn(
        'rounded-lg border-2 border-border p-4 shadow-[4px_4px_0_var(--border)] space-y-3',
        cardBgColor,
        className
      )}
    >
      {/* Header & Question */}
      <div className="space-y-1 border-b-2 border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="border-2 border-border bg-secondary px-2 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-secondary-foreground shadow-[1px_1px_0_var(--border)]">
            {isEditable ? (
              <input
                type="text"
                value={questionNumber}
                onChange={(e) => onChange?.({ questionNumber: e.target.value })}
                className="bg-transparent outline-none w-24"
              />
            ) : (
              questionNumber
            )}
          </span>
        </div>

        {isEditable ? (
          <textarea
            value={questionText}
            onChange={(e) => onChange?.({ questionText: e.target.value })}
            placeholder="Tuliskan pertanyaan soal isian..."
            rows={2}
            className="w-full font-heading text-xs md:text-sm font-bold text-foreground bg-transparent outline-none resize-y border-b border-dashed border-border focus:border-solid pt-2"
          />
        ) : (
          <p className="font-heading text-xs md:text-sm font-bold text-foreground pt-1">
            {questionText}
          </p>
        )}
      </div>

      {/* Answer Input Area */}
      <div className="space-y-2">
        <textarea
          value={studentAnswer}
          onChange={(e) => !isEditable && setStudentAnswer(e.target.value)}
          placeholder={placeholderText}
          rows={3}
          disabled={isEditable}
          className="w-full rounded border-2 border-border bg-background p-3 text-xs md:text-sm font-medium outline-none shadow-[2px_2px_0_var(--border)] focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Rubrik / Kunci Jawaban (Hanya muncul saat Mode Editable Admin) */}
      {isEditable && (
        <div className="mt-2 rounded border-2 border-dashed border-emerald-600 bg-emerald-50 p-2.5 text-xs text-emerald-950 space-y-1">
          <span className="font-heading font-black uppercase text-[10px] block text-emerald-800">
            [ KUNCI JAWABAN / RUBRIK EVALUASI ]
          </span>
          <textarea
            value={correctAnswerRubric}
            onChange={(e) => onChange?.({ correctAnswerRubric: e.target.value })}
            placeholder="Tuliskan referensi kunci jawaban..."
            rows={2}
            className="w-full bg-transparent outline-none resize-y border-b border-dashed border-emerald-400 font-medium"
          />
        </div>
      )}
    </div>
  );
}
