'use client';

import { useState } from 'react';
import { GridWidget, WidgetType } from '../types/builder';

export function useBuilder(initialWidgets: GridWidget[] = []) {
  const [widgets, setWidgets] = useState<GridWidget[]>(initialWidgets);
  const [editingWidget, setEditingWidget] = useState<GridWidget | null>(null);

  const addWidget = (type: WidgetType) => {
    const newId = `widget-${Date.now()}`;
    const newWidget: GridWidget = {
      i: newId,
      x: 0,
      y: Infinity,
      w: type === 'FLIP_CARD' ? 4 : 6,
      h: type === 'FLIP_CARD' ? 3 : 2,
      type,
      content: {
        title: 'Judul Komponen',
        text: 'Isi deskripsi...',
      },
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.i !== id));
  };

  const updateWidgetContent = (id: string, newContent: Record<string, any>) => {
    setWidgets((prev) =>
      prev.map((w) => (w.i === id ? { ...w, content: { ...w.content, ...newContent } } : w))
    );
  };

  return {
    widgets,
    setWidgets,
    editingWidget,
    setEditingWidget,
    addWidget,
    removeWidget,
    updateWidgetContent,
  };
}
