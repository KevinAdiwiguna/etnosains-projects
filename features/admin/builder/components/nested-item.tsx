'use client';

import React from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';

import { BuilderItem, ElementType } from '../types/builder';
import { AccessCard } from '@/components/ui/access-card';
import { Button } from '@/components/ui/button';
import { BuilderElementRenderer } from './builder-elements';

interface NestedItemProps {
  item: BuilderItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, val: any) => void;
  onAddChild: (parentId: string, type: ElementType) => void;
}

export function NestedItem({
  item,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
  onAddChild,
}: NestedItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `droppable-${item.id}`,
    disabled: item.type !== 'ACCESS_CARD',
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (item.type === 'ACCESS_CARD') {
    return (
      <div
        ref={setSortableRef}
        style={style}
        className="my-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
      >
        <AccessCard
          title={item.title}
          note={item.note}
          phase={item.phase}
          description={item.description}
          isSelected={isSelected}
          isEditable={true}
          onUpdateHeader={(field, val) => onUpdate(item.id, field, val)}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t-2 border-border">
              <div className="flex items-center gap-2">
                <div
                  {...attributes}
                  {...listeners}
                  className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="size-4" />
                </div>
                <span className="text-[10px] font-heading font-bold uppercase text-muted-foreground">
                  {isSelected ? '● KARTU AKTIF' : 'KLIK UNTUK MEMILIH'}
                </span>
              </div>

              {/* Menu Tombol Tambah Komponen Ke Dalam Kartu */}
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'MODULE_HEADER');
                  }}
                >
                  + Header Modul
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'MEDIA_CONTAINER');
                  }}
                >
                  + Media/Diagram
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'CALLOUT');
                  }}
                >
                  + Callout Fisika
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'LEARNING_OBJECTIVES');
                  }}
                >
                  + Tujuan Belajar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'PHASE_GRID');
                  }}
                >
                  + Grid Fase
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-7 font-heading uppercase border border-border bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(item.id, 'ACCESS_CARD');
                  }}
                >
                  + Sub-AccessCard
                </Button>

                <Button
                  type="button"
                  size="sm"
                  className="font-heading font-bold uppercase text-xs border-2 border-border bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[2px_2px_0_var(--border)] ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          }
        >
          {/* Zona Drop Anak */}
          <div
            ref={setDroppableRef}
            className={`min-h-[100px] p-2 rounded-lg border-2 border-dashed transition-colors space-y-3 ${
              isOver
                ? 'border-primary bg-primary/10'
                : 'border-border/40 bg-background/50'
            }`}
          >
            <SortableContext
              items={(item.children || []).map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {(item.children || []).length > 0 ? (
                item.children?.map((child) => (
                  <NestedItem
                    key={child.id}
                    item={child}
                    isSelected={isSelected}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    onAddChild={onAddChild}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p className="text-xs font-heading font-bold uppercase">
                    Zona Komponen Kosong
                  </p>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">
                    Gunakan tombol di footer kartu untuk menambahkan komponen modul etnosains.
                  </p>
                </div>
              )}
            </SortableContext>
          </div>
        </AccessCard>
      </div>
    );
  }

  // Render Sub-Element non-AccessCard
  return (
    <div
      ref={setSortableRef}
      style={style}
      className="relative group border-2 border-border p-3 rounded-md bg-background shadow-[2px_2px_0_var(--border)] my-2"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-border">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground select-none"
        >
          <GripVertical className="size-4" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            {item.type.replace('_', ' ')}
          </span>
        </div>

        <button
          type="button"
          className="p-1 bg-destructive text-destructive-foreground border border-border rounded hover:bg-destructive/90 transition-all cursor-pointer"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      <BuilderElementRenderer item={item} onUpdate={onUpdate} isEditable={true} />
    </div>
  );
}
