'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface BottomActionBarProps {
  leftText?: string;
  rightText?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export function BottomActionBarElement({
  leftText = 'PILIHAN MODUL LAIN',
  rightText = 'MULAI SCENE 1',
  onLeftClick,
  onRightClick,
}: BottomActionBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={onLeftClick}
        className="border-2 border-border bg-background font-heading text-xs font-bold uppercase shadow-[3px_3px_0_var(--border)] hover:bg-muted py-5"
      >
        {leftText}
      </Button>

      <Button
        type="button"
        onClick={onRightClick}
        className="border-2 border-border bg-primary font-heading text-xs font-black uppercase text-primary-foreground shadow-[3px_3px_0_var(--border)] hover:bg-primary/90 py-5 px-6"
      >
        {rightText}
      </Button>
    </div>
  );
}
