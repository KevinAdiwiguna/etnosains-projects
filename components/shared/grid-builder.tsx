'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BuilderItem, ElementType } from '@/features/admin/builder/types/builder';
import { NestedItem } from '@/features/admin/builder/components/nested-item';

export function GridBuilder() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [selectedId, setSelectedId] = useState<string | null>('root-card-1');

  // Tree Structure State: Mengizinkan AccessCard di dalam AccessCard
  const [items, setItems] = useState<BuilderItem[]>([
    {
      id: 'root-card-1',
      type: 'ACCESS_CARD',
      title: 'CIDOMO: DINAMIKA GERAK',
      note: 'MODUL 01',
      phase: 'FASE 1',
      description: 'Kereta tradisional bertenaga kuda khas Lombok.',
      children: [
        {
          id: 'sub-text-1',
          type: 'TEXT',
          value: { title: 'KONTEKS OBSERVASI', text: 'Penjelasan fenomena fisik...' },
        },
        {
          id: 'nested-card-1',
          type: 'ACCESS_CARD',
          title: 'SUB-KARTU: ANALISIS GAYA',
          note: 'DETAIL FAKTA',
          phase: 'FASE 1A',
          description: 'Kartu bersarang di dalam Modul Utama.',
          children: [
            {
              id: 'sub-flip-1',
              type: 'FLIP_CARD',
              value: {
                frontTitle: 'GLB',
                frontText: 'Klik untuk detail...',
                backTitle: 'DEFINISI GLB',
                backText: 'Kecepatan konstan tanpa percepatan.',
              },
            },
          ],
        },
      ],
    },
  ]);

  // Handler Tambah Item Utama di Root
  const handleAddRootCard = () => {
    const newId = `card-${Date.now()}`;
    const newCard: BuilderItem = {
      id: newId,
      type: 'ACCESS_CARD',
      title: 'KARTU MODUL BARU',
      note: 'MODUL BARU',
      phase: 'FASE 1',
      description: 'Deskripsi modul baru...',
      children: [],
    };
    setItems((prev) => [...prev, newCard]);
    setSelectedId(newId);
  };

  // Handler Tambah Anak ke dalam Target Parent ID (Rekursif)
  const handleAddChild = (parentId: string, type: ElementType) => {
    const newItem: BuilderItem = {
      id: `item-${Date.now()}`,
      type,
      title: type === 'ACCESS_CARD' ? 'SUB-ACCESS CARD' : undefined,
      note: type === 'ACCESS_CARD' ? 'SUB-FASE' : undefined,
      phase: type === 'ACCESS_CARD' ? 'FASE 1' : undefined,
      children: type === 'ACCESS_CARD' ? [] : undefined,
      value:
        type === 'TEXT'
          ? { title: 'JUDUL TEKS', text: 'Isi deskripsi...' }
          : { frontTitle: 'JUDUL DEPAN', backTitle: 'JUDUL BELAKANG' },
    };

    const updateTree = (list: BuilderItem[]): BuilderItem[] => {
      return list.map((node) => {
        if (node.id === parentId) {
          return { ...node, children: [...(node.children || []), newItem] };
        }
        if (node.children && node.children.length > 0) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setItems((prev) => updateTree(prev));
  };

  // Handler Hapus Item (Rekursif)
  const handleRemove = (id: string) => {
    const removeFromTree = (list: BuilderItem[]): BuilderItem[] => {
      return list
        .filter((node) => node.id !== id)
        .map((node) => ({
          ...node,
          children: node.children ? removeFromTree(node.children) : [],
        }));
    };
    setItems((prev) => removeFromTree(prev));
  };

  // Handler Update Value Node (Rekursif)
  const handleUpdate = (id: string, field: string, val: any) => {
    const updateTree = (list: BuilderItem[]): BuilderItem[] => {
      return list.map((node) => {
        if (node.id === id) {
          return { ...node, [field]: val };
        }
        if (node.children && node.children.length > 0) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setItems((prev) => updateTree(prev));
  };

  // Reorder Item via DnD Kit
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prev, oldIndex, newIndex);
        }
        return prev;
      });
    }
  };

  return (
    <div className="relative min-h-[600px] w-full pb-36">
      <div className="w-full min-h-[500px] bg-background p-4 border-4 border-border shadow-[4px_4px_0_var(--border)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {items.map((item) => (
                <NestedItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={setSelectedId}
                  onRemove={handleRemove}
                  onUpdate={handleUpdate}
                  onAddChild={handleAddChild}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Floating Toolbar Utama */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          type="button"
          onClick={handleAddRootCard}
          className="font-heading font-black uppercase text-sm flex items-center gap-2 border-4 border-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0_var(--border)] px-6 py-5 rounded-xl"
        >
          <Plus className="size-5" />
          <span>Tambah AccessCard Utuh</span>
        </Button>
      </div>
    </div>
  );
}
