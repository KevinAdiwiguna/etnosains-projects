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
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
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

  const [items, setItems] = useState<BuilderItem[]>([
    {
      id: 'root-card-1',
      type: 'ACCESS_CARD',
      layoutWidth: 'w-full',
      title: 'CIDOMO: DINAMIKA GERAK & VARIASI BEBAN PANTAI',
      note: 'MODUL 01: CIDOMO',
      phase: 'FASE 1',
      description: 'Kereta tradisional bertenaga kuda khas Lombok (Cidomo).',
      children: [
        {
          id: 'sub-card-1',
          type: 'SUB_ACCESS_CARD',
          layoutWidth: 'w-1/2',
          title: 'SUB-BAB A: OBSERVASI FISIKA',
          note: 'DETAIL 01',
          phase: 'FASE 1A',
        },
      ],
    },
  ]);

  const handleAddRootCard = () => {
    const newId = `card-${Date.now()}`;
    const newCard: BuilderItem = {
      id: newId,
      type: 'ACCESS_CARD',
      layoutWidth: 'w-full',
      title: 'JUDUL KARTU UTAMA BARU',
      note: 'CATATAN MODUL',
      phase: 'FASE 1',
      description: 'Tuliskan deskripsi ringkas di sini...',
      children: [],
    };
    setItems((prev) => [...prev, newCard]);
    setSelectedId(newId);
  };

  // FIX: Menggunakan parameter `type` secara dinamis sesuai tombol yang diklik
  const handleAddChild = (parentId: string, type: ElementType) => {
    const isContainer = type === 'ACCESS_CARD' || type === 'SUB_ACCESS_CARD';

    const newItem: BuilderItem = {
      id: `item-${Date.now()}`,
      type, // <-- PENTING: Menggunakan parameter `type` dinamis
      layoutWidth: 'w-full',
      title: type === 'SUB_ACCESS_CARD' ? 'JUDUL SUB-ACCESSCARD' : undefined,
      note: type === 'SUB_ACCESS_CARD' ? 'SUB-FASE' : undefined,
      phase: type === 'SUB_ACCESS_CARD' ? 'FASE 1A' : undefined,
      children: isContainer ? [] : undefined,
      value: {}, // Default value kosong untuk komponen biasa
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const isOverContainer = String(over.id).startsWith('droppable-');
    const overId = isOverContainer ? String(over.id).replace('droppable-', '') : String(over.id);

    if (activeId === overId) return;

    setItems((prevItems) => {
      let activeNode: BuilderItem | null = null;

      const removeNode = (list: BuilderItem[]): BuilderItem[] => {
        return list.filter((item) => {
          if (item.id === activeId) {
            activeNode = { ...item };
            return false;
          }
          if (item.children) {
            item.children = removeNode(item.children);
          }
          return true;
        });
      };

      const itemsWithoutActive = removeNode(prevItems);
      if (!activeNode) return prevItems;

      const insertNode = (list: BuilderItem[]): BuilderItem[] => {
        if (isOverContainer) {
          return list.map((item) => {
            if (item.id === overId) {
              return { ...item, children: [...(item.children || []), activeNode!] };
            }
            if (item.children) {
              return { ...item, children: insertNode(item.children) };
            }
            return item;
          });
        }

        const overIndex = list.findIndex((i) => i.id === overId);
        if (overIndex !== -1) {
          const updatedList = [...list];
          updatedList.splice(overIndex, 0, activeNode!);
          return updatedList;
        }

        return list.map((item) => ({
          ...item,
          children: item.children ? insertNode(item.children) : [],
        }));
      };

      return insertNode(itemsWithoutActive);
    });
  };

  return (
    <div className="relative min-h-[600px] w-full pb-36">
      <div className="w-full min-h-[500px] bg-background p-4 border-4 border-border shadow-[4px_4px_0_var(--border)]">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-4">
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

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          type="button"
          onClick={handleAddRootCard}
          className="font-heading font-black uppercase text-sm flex items-center gap-2 border-4 border-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0_var(--border)] px-6 py-5 rounded-xl"
        >
          <Plus className="size-5" />
          <span>Tambah AccessCard Utama</span>
        </Button>
      </div>
    </div>
  );
}
