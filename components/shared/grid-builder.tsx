'use client';

import React, { useState, useEffect } from 'react';
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
import { Plus, Save, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BuilderItem, ElementType } from '@/features/admin/builder/types/builder';
import { NestedItem } from '@/features/admin/builder/components/nested-item';
import {
  useBuilderContent,
  useSaveBuilderContent,
} from '@/features/admin/builder/hooks/use-builder';

interface GridBuilderProps {
  sceneId: string;
}

export function GridBuilder({ sceneId }: GridBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { data: initialContent, isLoading } = useBuilderContent(sceneId);
  const { mutate: saveContent, isPending: isSaving } = useSaveBuilderContent();

  const [items, setItems] = useState<BuilderItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialContent) {
      setItems(initialContent);
      if (initialContent.length > 0 && !selectedId) {
        setSelectedId(initialContent[0].id);
      }
    }
  }, [initialContent]);

  const handleSave = () => {
    saveContent({ sceneId, items });
  };

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

  const handleAddChild = (parentId: string, type: ElementType) => {
    const isContainer = type === 'ACCESS_CARD' || type === 'SUB_ACCESS_CARD';

    const newItem: BuilderItem = {
      id: `item-${Date.now()}`,
      type,
      layoutWidth: 'w-full',
      title: type === 'SUB_ACCESS_CARD' ? 'JUDUL SUB-ACCESSCARD' : undefined,
      note: type === 'SUB_ACCESS_CARD' ? 'SUB-FASE' : undefined,
      phase: type === 'SUB_ACCESS_CARD' ? 'FASE 1A' : undefined,
      children: isContainer ? [] : undefined,
      value: {},
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

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center border-4 border-border bg-card shadow-[4px_4px_0_var(--border)]">
        <div className="flex items-center gap-2 font-heading font-bold uppercase text-sm">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span>Memuat Konten Builder...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[600px] w-full pb-36">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-4 border-border p-4 bg-card shadow-[4px_4px_0_var(--border)]">
        <div>
          <h3 className="font-heading font-black uppercase text-sm tracking-wider">
            WYSIWYG ETNOSAINS BUILDER
          </h3>
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            Scene ID: {sceneId}
          </p>
        </div>

        <Button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="font-heading font-black uppercase text-xs border-2 border-border bg-emerald-400 text-slate-950 hover:bg-emerald-500 shadow-[2px_2px_0_var(--border)] px-4 py-2 flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="size-4" />
              <span>Simpan Ke Database</span>
            </>
          )}
        </Button>
      </div>

      <div className="w-full min-h-[500px] bg-background p-4 border-4 border-border shadow-[4px_4px_0_var(--border)]">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-4">
              {items.length > 0 ? (
                items.map((item) => (
                  <NestedItem
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    onSelect={setSelectedId}
                    onRemove={handleRemove}
                    onUpdate={handleUpdate}
                    onAddChild={handleAddChild}
                  />
                ))
              ) : (
                <div className="w-full py-16 text-center text-muted-foreground">
                  <p className="font-heading text-sm font-bold uppercase">
                    Kanvas Masih Kosong
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/80 mt-1">
                    Klik tombol di bawah untuk menambahkan AccessCard Utama.
                  </p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          type="button"
          onClick={handleAddRootCard}
          className="font-heading font-black uppercase text-sm flex items-center gap-2 border-4 border-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0_var(--border)] px-6 py-5 rounded-xl cursor-pointer"
        >
          <Plus className="size-5" />
          <span>Tambah AccessCard Utama</span>
        </Button>
      </div>
    </div>
  );
}
