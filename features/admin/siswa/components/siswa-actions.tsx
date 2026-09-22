"use client";

import { Pencil, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SiswaActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function SiswaActions({
  onEdit,
  onDelete,
}: SiswaActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit siswa"
        className={cn(
          "flex size-9 items-center justify-center",
          "border-2 border-border",
          "bg-background text-foreground",
          "shadow-[2px_2px_0_var(--border)]",
          "hover:bg-secondary",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-none",
        )}
      >
        <Pencil className="size-4" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Hapus siswa"
        className={cn(
          "flex size-9 items-center justify-center",
          "border-2 border-border",
          "bg-destructive text-destructive-foreground",
          "shadow-[2px_2px_0_var(--border)]",
          "hover:opacity-90",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-none",
        )}
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
