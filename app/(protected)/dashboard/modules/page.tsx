'use client';

import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  useModules,
  ModuleWithScenes,
} from '@/features/admin/modules/hooks/use-modules';

import { ModuleCard } from '@/features/admin/modules/components/module-card';
import { ModuleDialog } from '@/features/admin/modules/components/module-dialog';
import { ModuleDeleteDialog } from '@/features/admin/modules/components/delete-dialog';
import { ModuleEmptyState } from '@/features/admin/modules/components/module-empty-state';

export default function ModulesPage() {
  const { data: modules = [], isLoading } = useModules();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleWithScenes | null>(
    null
  );

  const handleOpenCreate = () => {
    setSelectedModule(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (mod: ModuleWithScenes) => {
    setSelectedModule(mod);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (mod: ModuleWithScenes) => {
    setSelectedModule(mod);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center p-8">
        <div className="flex items-center gap-2 font-heading font-bold uppercase text-sm">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span>Memuat Modul Etnosains...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-4 border-border p-4 bg-card shadow-[4px_4px_0_var(--border)]">
        <div>
          <h1 className="font-heading font-black uppercase text-xl">
            MANAJEMEN MODUL ETNOSAINS
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            Pilih modul untuk mengelola fase pembelajaran
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="font-heading font-bold uppercase border-2 border-border bg-primary shadow-[2px_2px_0_var(--border)] cursor-pointer"
        >
          <Plus className="size-4 mr-2" />
          Tambah Modul
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.length > 0 ? (
          modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))
        ) : (
          <ModuleEmptyState />
        )}
      </div>

      <ModuleDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        moduleToEdit={selectedModule}
      />

      <ModuleDeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        module={selectedModule}
      />
    </div>
  );
}
