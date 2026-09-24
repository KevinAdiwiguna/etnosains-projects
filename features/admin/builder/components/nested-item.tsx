'use client';

import React from 'react';
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';

import { BuilderItem, ElementType, LayoutWidth } from '../types/builder';
import { AccessCard, CardColorTheme } from '@/components/ui/access-card';
import { CardSection, SectionColorTheme } from '@/components/ui/card-section';
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

const WIDTH_CLASSES: Record<LayoutWidth, string> = {
  'w-full': 'w-full',
  'w-1/2': 'w-full md:w-[calc(50%-0.375rem)]',
  'w-1/3': 'w-full md:w-[calc(33.333%-0.5rem)]',
  'w-2/3': 'w-full md:w-[calc(66.666%-0.25rem)]',
};

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

  const isContainer =
    item.type === 'ACCESS_CARD' || item.type === 'SUB_ACCESS_CARD';
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `droppable-${item.id}`,
    disabled: !isContainer,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const currentWidthClass = WIDTH_CLASSES[item.layoutWidth || 'w-full'];

  // Sub-component toolbar helper
  const renderAddButtons = (parentId: string) => (
    <div className="flex flex-wrap items-center gap-1">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'ETHNOGRAPHIC_DESCRIPTION');
        }}
      >
        + Deskripsi Etnografis
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'MEDIA_CONTAINER');
        }}
      >
        + Media Diagram
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'PHYSICS_CALLOUT');
        }}
      >
        + Fisika Inti
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'LEARNING_OBJECTIVES');
        }}
      >
        + Tujuan Belajar
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'PHASE_GRID');
        }}
      >
        + Grid Fase
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border bg-primary/30 font-bold"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'SUB_ACCESS_CARD');
        }}
      >
        + Sub-AccessCard
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'MULTIPLE_CHOICE');
        }}
      >
        + Soal Pilihan Ganda
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'ESSAY_QUESTION');
        }}
      >
        + Soal Isian
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'INFO_CALLOUT_BAR');
        }}
      >
        + Info Callout Bar
      </Button>
       <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-[10px] h-6 font-heading uppercase border border-border"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild(parentId, 'FLIP_CARD');
        }}
      >
        + Flip Card
      </Button>
    </div>
  );

  // 1. KARTU UTAMA: ACCESS_CARD
  if (item.type === 'ACCESS_CARD') {
    return (
      <div
        ref={setSortableRef}
        style={style}
        className={`my-3 cursor-pointer ${currentWidthClass}`}
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
          colorTheme={(item.colorTheme as CardColorTheme) || 'default'}
          isSelected={isSelected}
          isEditable={true}
          onUpdateHeader={(field, val) => onUpdate(item.id, field, val)}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t-2 border-border">
              <div className="flex items-center gap-2">
                <div
                  {...attributes}
                  {...listeners}
                  className="p-1.5 border border-border bg-background cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shadow-[1px_1px_0_var(--border)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="size-4" />
                </div>
                <span className="text-[10px] font-heading font-bold uppercase text-muted-foreground">
                  {isSelected ? '● KARTU UTAMA AKTIF' : 'KLIK UNTUK MEMILIH'}
                </span>
              </div>

              {/* Flex Width Selector */}
              <div className="flex items-center gap-1 bg-muted/40 p-1 border border-border rounded">
                {(['w-full', 'w-1/2', 'w-1/3'] as LayoutWidth[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(item.id, 'layoutWidth', w);
                    }}
                    className={`px-1.5 py-0.5 text-[9px] font-mono font-bold border ${
                      (item.layoutWidth || 'w-full') === w
                        ? 'bg-primary text-primary-foreground border-border'
                        : 'bg-background text-muted-foreground border-transparent'
                    }`}
                  >
                    {w.replace('w-', '')}
                  </button>
                ))}
              </div>

              {/* Toolbar Tambah Komponen */}
              <div className="flex items-center gap-2">
                {renderAddButtons(item.id)}

                <Button
                  type="button"
                  size="sm"
                  className="font-heading font-bold uppercase text-xs border-2 border-border bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[2px_2px_0_var(--border)] h-6"
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
          {/* Droppable Zone untuk Komponen Anak */}
          <div
            ref={setDroppableRef}
            className={`min-h-[100px] p-2 rounded-lg border-2 border-dashed transition-colors flex flex-wrap gap-3 ${
              isOver
                ? 'border-primary bg-primary/10'
                : 'border-border/40 bg-background/50'
            }`}
          >
            <SortableContext
              items={(item.children || []).map((c) => c.id)}
              strategy={rectSortingStrategy}
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
                <div className="w-full py-8 text-center text-muted-foreground">
                  <p className="text-xs font-heading font-bold uppercase">
                    Zona Komponen AccessCard Kosong
                  </p>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">
                    Gunakan tombol di footer untuk menambahkan komponen
                    etnosains.
                  </p>
                </div>
              )}
            </SortableContext>
          </div>
        </AccessCard>
      </div>
    );
  }

  // 2. SUB-ACCESSCARD (CARD_SECTION)
  if (item.type === 'SUB_ACCESS_CARD') {
    return (
      <div
        ref={setSortableRef}
        style={style}
        className={`my-2 cursor-pointer ${currentWidthClass}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
      >
        <CardSection
          title={item.title || 'JUDUL SUB-ACCESSCARD'}
          note={item.note || 'SUB-FASE'}
          phase={item.phase || 'FASE 1A'}
          colorTheme={(item.colorTheme as SectionColorTheme) || 'default'}
          isSelected={isSelected}
          titleAs={item.titleAs || 'h3'}
          isEditable={true}
          onUpdateHeader={(field, val) => onUpdate(item.id, field, val)}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  {...attributes}
                  {...listeners}
                  className="p-1 border border-border bg-background cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="size-4" />
                </div>
                <span className="text-[10px] font-heading font-bold uppercase text-muted-foreground">
                  SUB-ACCESSCARD ({item.titleAs || 'H3'})
                </span>
              </div>

              {/* Flex Width Selector */}
              <div className="flex items-center gap-1 bg-muted/40 p-1 border border-border rounded">
                {(['w-full', 'w-1/2', 'w-1/3'] as LayoutWidth[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(item.id, 'layoutWidth', w);
                    }}
                    className={`px-1.5 py-0.5 text-[9px] font-mono font-bold border ${
                      (item.layoutWidth || 'w-full') === w
                        ? 'bg-primary text-primary-foreground border-border'
                        : 'bg-background text-muted-foreground border-transparent'
                    }`}
                  >
                    {w.replace('w-', '')}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {renderAddButtons(item.id)}

                <Button
                  type="button"
                  size="sm"
                  className="font-heading font-bold uppercase text-xs border-2 border-border bg-destructive text-destructive-foreground hover:bg-destructive/90 shrink-0 h-6"
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
          {/* Droppable Zone Bersarang */}
          <div
            ref={setDroppableRef}
            className={`min-h-[80px] p-2 rounded-lg border-2 border-dashed transition-colors flex flex-wrap gap-2 ${
              isOver
                ? 'border-primary bg-primary/10'
                : 'border-border/40 bg-background/50'
            }`}
          >
            <SortableContext
              items={(item.children || []).map((c) => c.id)}
              strategy={rectSortingStrategy}
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
                <div className="w-full py-4 text-center text-muted-foreground">
                  <p className="text-[10px] font-heading font-bold uppercase">
                    Area Bersarang Sub-AccessCard
                  </p>
                </div>
              )}
            </SortableContext>
          </div>
        </CardSection>
      </div>
    );
  }

  return (
    <div
      ref={setSortableRef}
      style={style}
      className={`relative group border-2 border-border p-3 rounded-md bg-background shadow-[2px_2px_0_var(--border)] my-1 ${currentWidthClass}`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-border">
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground select-none"
          >
            <GripVertical className="size-4" />
          </div>
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            {item.type.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted/30 p-0.5 rounded border border-border">
            {(['w-full', 'w-1/2', 'w-1/3'] as LayoutWidth[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onUpdate(item.id, 'layoutWidth', w)}
                className={`px-1 text-[8px] font-mono font-bold ${
                  (item.layoutWidth || 'w-full') === w
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground'
                }`}
              >
                {w.replace('w-', '')}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="p-1 bg-destructive text-destructive-foreground border border-border rounded hover:bg-destructive/90 transition-all cursor-pointer"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      <BuilderElementRenderer
        item={item}
        onUpdate={onUpdate}
        isEditable={true}
      />
    </div>
  );
}
