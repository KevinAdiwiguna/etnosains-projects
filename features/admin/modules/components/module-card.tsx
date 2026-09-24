'use client';

import Link from 'next/link';
import { ArrowRight, Folder, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleWithScenes } from '../hooks/use-modules';

interface ModuleCardProps {
  module: ModuleWithScenes;
  onEdit: (module: ModuleWithScenes) => void;
  onDelete: (module: ModuleWithScenes) => void;
}

export function ModuleCard({ module, onEdit, onDelete }: ModuleCardProps) {
  return (
    <div className="border-4 border-border bg-background p-4 shadow-[4px_4px_0_var(--border)] space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Folder className="size-5 text-primary" />
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-muted border border-border">
            {module.code}
          </span>

          {module.isPublished ? (
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-primary border border-border">
              TERLIHAT
            </span>
          ) : (
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-muted border border-border">
              TIDAK TERLIHAT
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="size-7 p-0 border border-border"
            onClick={() => onEdit(module)}
            title="Edit Modul"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            size="sm"
            className="size-7 p-0 border border-border bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onDelete(module)}
            title="Hapus Modul"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <h3 className="font-heading font-black uppercase text-lg">
        {module.title}
      </h3>

      <p className="text-xs text-muted-foreground font-mono">
        {module.description || 'Tidak ada deskripsi'}
      </p>

      <p className="text-xs text-muted-foreground font-mono">
        {module.scenes?.length || 0} Fase Pembelajaran
      </p>

      <Link href={`/dashboard/modules/${module.id}`}>
        <Button variant={"accent"} className="w-full">
          Kelola Fase & Content
          <ArrowRight size={"14"} />
        </Button>
      </Link>
    </div>
  );
}
