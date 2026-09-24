"use client";

import Link from "next/link";
import { Edit3, Layers, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Scene } from "@/lib/generated/prisma/client";

interface SceneCardProps {
  scene: Scene;
  onEdit: (scene: Scene) => void;
  onDelete: (scene: Scene) => void;
}

export function SceneCard({
  scene,
  onEdit,
  onDelete,
}: SceneCardProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-4 border-border bg-background p-4 shadow-[4px_4px_0_var(--border)]">
      <div className="flex items-center gap-3">
        <Layers className="size-5 text-accent" />

        <div>
          <span className="mr-2 border border-border bg-amber-200 px-2 py-0.5 font-mono text-xs font-bold">
            {scene.code}
          </span>

          <span className="font-heading text-sm font-black uppercase">
            {scene.title}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/dashboard/builder/${scene.id}`}>
          <Button
            type="button"
            className="flex cursor-pointer items-center gap-2 border-2 border-border bg-emerald-400 font-heading text-xs font-bold uppercase text-slate-950 shadow-[2px_2px_0_var(--border)] hover:bg-emerald-500"
          >
            <Edit3 className="size-4" />
            Edit di Canvas Builder
          </Button>
        </Link>

        <Button
          type="button"
          onClick={() => onEdit(scene)}
          variant="outline"
          className="flex cursor-pointer items-center gap-2 border-2 border-border font-heading text-xs font-bold uppercase shadow-[2px_2px_0_var(--border)]"
        >
          <Edit3 className="size-4" />
          Edit
        </Button>

        <Button
          type="button"
          onClick={() => onDelete(scene)}
          className="flex cursor-pointer items-center gap-2 border-2 border-border bg-destructive font-heading text-xs font-bold uppercase text-destructive-foreground shadow-[2px_2px_0_var(--border)] hover:bg-destructive/90"
        >
          <Trash2 className="size-4" />
          Hapus
        </Button>
      </div>
    </div>
  );
}
