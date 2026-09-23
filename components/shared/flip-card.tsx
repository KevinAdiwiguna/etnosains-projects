'use client';

import * as React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  flipButtonText?: string;
}

function FlipCard({
  front,
  back,
  className,
  flipButtonText = 'Lihat Detail',
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleToggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={cn('relative w-full [perspective:1000px]', className)}
      {...props}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-lg border-4 border-border bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--border)] transition-transform duration-500 [transform-style:preserve-3d]',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden]">
          <div className="space-y-2 overflow-y-auto pr-1">{front}</div>

          <div className="pt-3 border-t-2 border-dashed border-border flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={handleToggleFlip}
              className="font-heading font-bold uppercase text-[11px] h-8 flex items-center gap-1.5 border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-[2px_2px_0_var(--border)]"
            >
              <RefreshCw className="size-3.5" />
              <span>{flipButtonText}</span>
            </Button>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="space-y-2 overflow-y-auto pr-1">{back}</div>

          <div className="pt-3 border-t-2 border-dashed border-border flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={handleToggleFlip}
              className="font-heading font-bold uppercase text-[11px] h-8 flex items-center gap-1.5 border-2 border-border bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[2px_2px_0_var(--border)]"
            >
              <RefreshCw className="size-3.5" />
              <span>Kembali</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FlipCard };
