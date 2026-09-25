'use client';

import { useEffect, useState } from 'react';
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
  useCreateScene,
  useUpdateScene,
  CreateSceneInput,
  UpdateSceneInput,
} from '@/features/admin/scenes/hooks/use-scenes';

import { Scene } from '@/lib/generated/prisma/client';
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SceneDialogProps {
  moduleId: string;
  scene: Scene | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SceneDialog({
  moduleId,
  scene,
  open,
  onOpenChange,
}: SceneDialogProps) {
  const isEdit = Boolean(scene);

  const { mutate: createScene, isPending: isCreating } = useCreateScene();
  const { mutate: updateScene, isPending: isUpdating } = useUpdateScene();

  const isPending = isCreating || isUpdating;

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('1');
  const [status, setStatus] = useState<'TERBUKA' | 'TERKUNCI'>('TERKUNCI');

  useEffect(() => {
    if (scene) {
      setCode(scene.code);
      setTitle(scene.title);
      setOrder(String(scene.order));

      setStatus(scene.status === 'TERBUKA' ? 'TERBUKA' : 'TERKUNCI');
    } else {
      setCode('');
      setTitle('');
      setOrder('1');
      setStatus('TERKUNCI');
    }
  }, [scene, open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code.trim() || !title.trim()) {
      return;
    }

    if (scene) {
      const payload: UpdateSceneInput = {
        code: code.trim(),
        title: title.trim(),
        order: Number(order),
        status,
      };

      updateScene(
        {
          moduleId,
          sceneId: scene.id,
          payload,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );

      return;
    }

    const payload: CreateSceneInput = {
      code: code.trim(),
      title: title.trim(),
      order: Number(order),
      status,
    };

    createScene(
      {
        moduleId,
        payload,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="border-4 border-border bg-background shadow-[6px_6px_0_var(--border)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-black uppercase">
            {isEdit ? 'Edit Fase Pembelajaran' : 'Tambah Fase Pembelajaran'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              required
              title="Kode Fase"
              id="scene-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Contoh: FASE-01"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Input
              required
              title="Judul Fase"
              id="scene-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Pengenalan Materi"
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Input
                title="Urutan Fase"
                id="scene-order"
                type="number"
                min={1}
                value={order}
                onChange={(event) => setOrder(event.target.value)}
                disabled={isPending}
              />
            </div>

            <div className="space-y-4">
              <SelectField
                title="Status"
                required
                value={status}
                onValueChange={(value) =>
                  setStatus(value as 'TERBUKA' | 'TERKUNCI')
                }
              >
                <SelectItem value="TERKUNCI">Terkunci</SelectItem>

                <SelectItem value="TERBUKA">Terbuka</SelectItem>
              </SelectField>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="border-2 border-border font-heading text-xs font-bold uppercase"
            >
              Batal
            </Button>

            <Button
              type="submit"
              variant={'accent'}
              disabled={isPending || !code.trim() || !title.trim()}
              className="bg-chart-4"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-1.5 size-4 animate-spin" />
                  {isEdit ? 'Menyimpan...' : 'Menambahkan...'}
                </>
              ) : isEdit ? (
                'Simpan Perubahan'
              ) : (
                'Tambah Fase'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
