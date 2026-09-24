'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useDeleteModule, ModuleWithScenes } from '../hooks/use-modules';

interface ModuleDeleteDialogProps {
  module: ModuleWithScenes | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModuleDeleteDialog({
  module,
  isOpen,
  onOpenChange,
}: ModuleDeleteDialogProps) {
  const { mutate: deleteModule, isPending } = useDeleteModule();

  if (!module) return null;

  const handleDelete = () => {
    deleteModule(module.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-border bg-background shadow-[6px_6px_0_var(--border)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading font-black uppercase text-lg text-destructive">
            HAPUS MODUL
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs md:text-sm font-medium leading-relaxed">
          Apakah Anda yakin ingin menghapus modul{' '}
          <strong className="font-black uppercase">{module.title}</strong>? Seluruh
          fase dan konten builder di dalamnya akan dihapus secara permanen.
        </p>

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
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="border-2 border-border bg-destructive text-destructive-foreground hover:bg-destructive/90 font-heading text-xs font-bold uppercase shadow-[2px_2px_0_var(--border)]"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1.5" />
                <span>Menghapus...</span>
              </>
            ) : (
              <span>Ya, Hapus</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
