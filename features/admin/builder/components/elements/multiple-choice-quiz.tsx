'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export interface QuizOption {
  id: string;
  label: string; // e.g. 'A', 'B', 'C'
  text: string;
}

export interface MultipleChoiceQuizProps {
  questionNumber?: string;
  questionText?: string;
  options?: QuizOption[];
  correctAnswerId?: string; // ID opsi yang benar
  cardBgColor?: string;
  isEditable?: boolean;
  onChange?: (data: {
    questionNumber?: string;
    questionText?: string;
    options?: QuizOption[];
    correctAnswerId?: string;
  }) => void;
  className?: string;
}

export function MultipleChoiceQuiz({
  questionNumber = 'SOAL 01',
  questionText = 'Apa faktor utama yang mempengaruhi gaya gesek kinetis pada roda Cidomo saat melintasi pasir pantai Senggigi?',
  options = [
    { id: 'opt-a', label: 'A', text: 'Koefisien gesek permukaan pasir dan gaya normal total' },
    { id: 'opt-b', label: 'B', text: 'Warna cat kayu pada roda Cidomo' },
    { id: 'opt-c', label: 'C', text: 'Panjang tali kekang kuda' },
    { id: 'opt-d', label: 'D', text: 'Jumlah cambukan kusir' },
  ],
  correctAnswerId = 'opt-a',
  cardBgColor = 'bg-card',
  isEditable = false,
  onChange,
  className,
}: MultipleChoiceQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);

  const handleAddOption = () => {
    const nextChar = String.fromCharCode(65 + options.length); // A, B, C, D...
    const newOpt: QuizOption = {
      id: `opt-${Date.now()}`,
      label: nextChar,
      text: 'Pilihan jawaban baru...',
    };
    const newOptions = [...options, newOpt];
    onChange?.({ options: newOptions });
  };

  const handleRemoveOption = (id: string) => {
    const newOptions = options.filter((o) => o.id !== id);
    // Re-index label A, B, C...
    const reindexed = newOptions.map((o, idx) => ({
      ...o,
      label: String.fromCharCode(65 + idx),
    }));
    onChange?.({ options: reindexed });
  };

  const handleUpdateOption = (id: string, text: string) => {
    const newOptions = options.map((o) => (o.id === id ? { ...o, text } : o));
    onChange?.({ options: newOptions });
  };

  return (
    <div
      className={cn(
        'rounded-lg border-2 border-border p-4 shadow-[4px_4px_0_var(--border)] space-y-4',
        cardBgColor,
        className
      )}
    >
      {/* Question Header & Number */}
      <div className="flex items-start justify-between gap-3 border-b-2 border-border pb-3">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <span className="border-2 border-border bg-primary px-2 py-0.5 font-heading text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-[1px_1px_0_var(--border)]">
              {isEditable ? (
                <input
                  type="text"
                  value={questionNumber}
                  onChange={(e) => onChange?.({ questionNumber: e.target.value })}
                  className="bg-transparent outline-none w-16"
                />
              ) : (
                questionNumber
              )}
            </span>
            <span className="font-heading text-[10px] font-bold text-muted-foreground uppercase">
              PILIKAN GANDA
            </span>
          </div>

          {/* Question Text */}
          {isEditable ? (
            <textarea
              value={questionText}
              onChange={(e) => onChange?.({ questionText: e.target.value })}
              placeholder="Tuliskan pertanyaan soal..."
              rows={2}
              className="w-full font-heading text-xs md:text-sm font-bold text-foreground bg-transparent outline-none resize-y border-b border-dashed border-border focus:border-solid pt-2"
            />
          ) : (
            <p className="font-heading text-xs md:text-sm font-bold text-foreground pt-1">
              {questionText}
            </p>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2">
        {options.map((opt) => {
          const isCorrect = correctAnswerId === opt.id;
          const isStudentSelected = selectedAnswer === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => !isEditable && setSelectedAnswer(opt.id)}
              className={cn(
                'flex items-center gap-3 border-2 border-border p-2.5 rounded-md transition-all shadow-[2px_2px_0_var(--border)] select-none',
                !isEditable && 'cursor-pointer hover:bg-muted/50',
                isStudentSelected && 'bg-accent/20 border-accent',
                isEditable && isCorrect && 'bg-emerald-100 border-emerald-600'
              )}
            >
              {/* Option Label Badge (A/B/C) */}
              <div
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center border-2 border-border font-heading text-xs font-black shadow-[1px_1px_0_var(--border)]',
                  isCorrect ? 'bg-emerald-400 text-slate-950' : 'bg-background text-foreground'
                )}
              >
                {opt.label}
              </div>

              {/* Option Text */}
              <div className="flex-1">
                {isEditable ? (
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleUpdateOption(opt.id, e.target.value)}
                    placeholder="Teks pilihan..."
                    className="w-full text-xs font-medium bg-transparent outline-none border-b border-dashed border-border/60 focus:border-border"
                  />
                ) : (
                  <span className="text-xs font-medium text-foreground">{opt.text}</span>
                )}
              </div>

              {/* Editable Toolbar for Options */}
              {isEditable && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange?.({ correctAnswerId: opt.id })}
                    className={cn(
                      'p-1 text-[10px] font-heading font-bold border rounded uppercase transition-colors',
                      isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-700'
                        : 'bg-background text-muted-foreground border-border hover:bg-muted'
                    )}
                    title="Jadikan Kunci Jawaban Benar"
                  >
                    {isCorrect ? '✓ KUNCI' : 'KUNCI'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveOption(opt.id)}
                    className="p-1 text-destructive hover:scale-110 transition-transform"
                    title="Hapus Opsi"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditable && (
        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center justify-center gap-1.5 w-full border-2 border-dashed border-border bg-background p-2 font-heading text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:border-solid transition-all"
        >
          <Plus className="size-3.5" />
          <span>Tambah Opsi Pilihan</span>
        </button>
      )}
    </div>
  );
}
