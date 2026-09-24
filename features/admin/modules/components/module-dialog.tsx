'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useCreateModule,
  useUpdateModule,
  ModuleWithScenes,
} from '../hooks/use-modules';
import { Checkbox } from '@/components/ui/checkbox';

interface ModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  moduleToEdit?: ModuleWithScenes | null;
}

export function ModuleDialog({
  isOpen,
  onOpenChange,
  moduleToEdit,
}: ModuleDialogProps) {
  const { mutate: createModule, isPending: isCreating } = useCreateModule();
  const { mutate: updateModule, isPending: isUpdating } = useUpdateModule();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const isEdit = !!moduleToEdit;
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (moduleToEdit) {
      setCode(moduleToEdit.code);
      setTitle(moduleToEdit.title);
      setDescription(moduleToEdit.description || '');
      setIsPublished(moduleToEdit.isPublished);
    } else {
      setCode('');
      setTitle('');
      setDescription('');
      setIsPublished(false);
    }
  }, [moduleToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;

    if (isEdit && moduleToEdit) {
      updateModule(
        { id: moduleToEdit.id, data: { code, title, description, isPublished } },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createModule(
        { code, title, description, isPublished },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-border bg-background shadow-[6px_6px_0_var(--border)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading font-black uppercase text-lg">
            {isEdit ? 'EDIT MODUL ETNOSAINS' : 'TAMBAH MODUL BARU'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Input
              title="Kode Modul"
              placeholder="misal: MODUL-01"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Input
              title="Judul Modul"
              placeholder="misal: CIDOMO - DINAMIKA GERAK"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Input
              title="Deskripsi Modul"
              placeholder="deskripsi modul"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              title="Publikasikan Modul"
              id="is-published"
              checked={isPublished}
              onCheckedChange={(checked) => setIsPublished(checked as boolean)}
            />
            <label htmlFor="is-published" className="text-sm font-medium">
              Publikasikan Modul
            </label>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2 border-border font-heading text-xs font-bold uppercase"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="border-2 border-border bg-emerald-400 text-slate-950 hover:bg-emerald-500 font-heading text-xs font-bold uppercase shadow-[2px_2px_0_var(--border)]"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Modul'}</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
