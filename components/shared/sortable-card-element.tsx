'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { CardElement } from '@/features/admin/builder/types/builder';

interface SortableCardElementProps {
  element: CardElement;
  onRemove: (id: string) => void;
  children: React.ReactNode;
}

export function SortableCardElement({
  element,
  onRemove,
  children,
}: SortableCardElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group/sub border-2 border-border p-4 rounded-lg bg-background shadow-[2px_2px_0_var(--border)] mb-3"
    >
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-dashed border-border">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground select-none"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical className="size-4" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            {element.type.replace('_', ' ')}
          </span>
        </div>

        <button
          type="button"
          title="Hapus Sub-Komponen"
          className="p-1 bg-destructive text-destructive-foreground border border-border shadow-[1px_1px_0_var(--border)] rounded hover:bg-destructive/90 transition-all cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(element.id);
          }}
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      {children}
    </div>
  );
}
