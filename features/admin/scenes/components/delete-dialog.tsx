"use client";

import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useDeleteScene } from "@/features/admin/scenes/hooks/use-scenes";

import { Scene } from "@/lib/generated/prisma/client";

interface DeleteDialogProps {
  moduleId: string;
  scene: Scene | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({
  moduleId,
  scene,
  open,
  onOpenChange,
}: DeleteDialogProps) {
  const {
    mutate: deleteScene,
    isPending: isDeleting,
  } = useDeleteScene();

  const handleDelete = () => {
    if (!scene) return;

    deleteScene(
      {
        moduleId,
        sceneId: scene.id,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="border-4 border-border bg-background shadow-[6px_6px_0_var(--border)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-black uppercase">
            Hapus Fase Pembelajaran?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <p className="text-sm text-muted-foreground">
            Kamu akan menghapus fase:
          </p>

          {scene && (
            <div className="border-2 border-border bg-muted p-3 shadow-[2px_2px_0_var(--border)]">
              <div className="font-mono text-xs font-bold">
                {scene.code}
              </div>

              <div className="mt-1 font-heading text-sm font-black uppercase">
                {scene.title}
              </div>
            </div>
          )}

          <p className="text-xs font-bold text-destructive">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="border-2 border-border font-heading text-xs font-bold uppercase"
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || !scene}
            className="border-2 border-border bg-destructive font-heading text-xs font-bold uppercase text-destructive-foreground shadow-[2px_2px_0_var(--border)]"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-1.5 size-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="mr-1.5 size-4" />
                Hapus Fase
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
