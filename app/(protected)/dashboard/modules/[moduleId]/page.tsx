"use client";

import { use, useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Scene } from "@/lib/generated/prisma/client";

import { Button } from "@/components/ui/button";

import { useScenes } from "@/features/admin/scenes/hooks/use-scenes";

import { SceneCard } from "@/features/admin/scenes/components/scene-card";
import { SceneDialog } from "@/features/admin/scenes/components/scene-dialog";
import { DeleteDialog } from "@/features/admin/scenes/components/delete-dialog";
import { SceneEmptyState } from "@/features/admin/scenes/components/scene-empty-state";

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);

  const {
    data: scenes = [],
    isLoading,
    isError,
    error,
  } = useScenes(moduleId);

  const [selectedScene, setSelectedScene] =
    useState<Scene | null>(null);

  const [isSceneDialogOpen, setIsSceneDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const handleCreate = () => {
    setSelectedScene(null);
    setIsSceneDialogOpen(true);
  };

  const handleEdit = (scene: Scene) => {
    setSelectedScene(scene);
    setIsSceneDialogOpen(true);
  };

  const handleDelete = (scene: Scene) => {
    setSelectedScene(scene);
    setIsDeleteDialogOpen(true);
  };

  const handleSceneDialogChange = (open: boolean) => {
    setIsSceneDialogOpen(open);

    if (!open) {
      setSelectedScene(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open);

    if (!open) {
      setSelectedScene(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center p-8">
        <div className="flex items-center gap-2 font-heading text-sm font-bold uppercase">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span>Memuat Fase Pembelajaran...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="border-4 border-destructive p-8 text-center">
          <p className="font-heading text-sm font-black uppercase">
            Gagal Memuat Fase Pembelajaran
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message ??
              "Terjadi kesalahan saat mengambil data."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-4 border-border bg-background p-5 shadow-[4px_4px_0_var(--border)]">
        <div>
          <h1 className="font-heading text-xl font-black uppercase">
            Fase Pembelajaran
          </h1>

          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Kelola fase pembelajaran pada modul ini.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleCreate}
          className="flex cursor-pointer items-center gap-2 border-2 border-border bg-primary font-heading text-xs font-bold uppercase text-primary-foreground shadow-[2px_2px_0_var(--border)]"
        >
          <Plus className="size-4" />
          Tambah Fase
        </Button>
      </div>

      {scenes.length === 0 ? (
        <SceneEmptyState />
      ) : (
        <div className="space-y-3">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <SceneDialog
        moduleId={moduleId}
        scene={selectedScene}
        open={isSceneDialogOpen}
        onOpenChange={handleSceneDialogChange}
      />

      <DeleteDialog
        moduleId={moduleId}
        scene={selectedScene}
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
      />
    </div>
  );
}
