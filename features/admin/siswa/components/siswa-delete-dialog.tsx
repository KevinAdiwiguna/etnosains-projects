"use client";

import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma/client";

interface SiswaDeleteDialogProps {
  open: boolean;
  siswa: User | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function SiswaDeleteDialog({
  open,
  siswa,
  onClose,
  onConfirm,
  isLoading = false,
}: SiswaDeleteDialogProps) {
  if (!siswa) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent showCloseButton={!isLoading}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center border-2 border-border bg-destructive text-destructive-foreground shadow-[2px_2px_0_var(--border)]">
              <Trash2 className="size-5" />
            </div>
            <DialogTitle>Hapus Data Siswa</DialogTitle>
          </div>
          <DialogDescription className="mt-2">
            Apakah Anda yakin ingin menghapus data siswa{" "}
            <span className="font-bold text-foreground">{siswa.name}</span>
            {siswa.nisn && (
              <span>
                {" "}
                (NISN: <code className="font-mono">{siswa.nisn}</code>)
              </span>
            )}
            ? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-2 border-border font-heading font-bold uppercase shadow-[2px_2px_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Batal
          </Button>

          <Button
            type="button"
            variant="accent"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive border-2 border-border font-heading font-bold uppercase shadow-[2px_2px_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
