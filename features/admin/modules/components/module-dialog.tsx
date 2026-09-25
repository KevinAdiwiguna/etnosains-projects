'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import Image from 'next/image';

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const isEdit = !!moduleToEdit;
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (!isOpen) return;

    if (moduleToEdit) {
      setCode(moduleToEdit.code);
      setTitle(moduleToEdit.title);
      setDescription(moduleToEdit.description || '');
      setIsPublished(moduleToEdit.isPublished);
      setThumbnailPreview(`http://20.189.93.251:8333/etnosciense${moduleToEdit.thumbnail}` || null);
    } else {
      setCode('');
      setTitle('');
      setDescription('');
      setIsPublished(false);
      setThumbnailPreview(null);
    }

    setThumbnail(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [moduleToEdit, isOpen]);

  useEffect(() => {
    if (!thumbnail) return;

    const previewUrl = URL.createObjectURL(thumbnail);
    setThumbnailPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [thumbnail]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setThumbnail(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim() || !title.trim()) return;

    if (isEdit && moduleToEdit) {
      updateModule(
        {
          id: moduleToEdit.id,
          data: {
            code,
            title,
            description,
            isPublished,
            thumbnail,
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createModule(
        {
          code,
          title,
          description,
          isPublished,
          thumbnail,
        },
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
          <div className="space-y-2">
            <Input
              ref={fileInputRef}
              title="Thumbnail"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required={!isEdit}
              onChange={handleThumbnailChange}
            />

            {thumbnailPreview && (
              <div className="overflow-hidden border-2 border-border shadow-[3px_3px_0_var(--border)]">
                <Image
                  width={400}
                  height={400}
                  src={thumbnailPreview}
                  unoptimized
                  alt="Preview thumbnail"
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}
          </div>

          <Input
            title="Kode Modul"
            placeholder="misal: MODUL-01"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <Input
            title="Judul Modul"
            placeholder="misal: CIDOMO - DINAMIKA GERAK"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            title="Deskripsi Modul"
            placeholder="deskripsi modul"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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
              disabled={isPending || !code.trim() || !title.trim()}
              variant="accent"
              className="bg-chart-4"
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
