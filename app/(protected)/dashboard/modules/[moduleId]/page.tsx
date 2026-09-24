'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Plus, Layers, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Scene {
  id: string;
  code: string;
  title: string;
  status: string;
}

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  // Unwrap params menggunakan React.use()
  const resolvedParams = use(params);
  const moduleId = resolvedParams.moduleId;

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleId) return;

    fetch(`/api/v1/admin/modules/${moduleId}/scenes`)
      .then((res) => res.json())
      .then((data) => {
        setScenes(data);
        setLoading(false);
      });
  }, [moduleId]);

  const handleCreateScene = async () => {
    const code = prompt('Masukkan Kode Fase (contoh: FASE_01):');
    const title = prompt('Masukkan Judul Fase:');
    if (!code || !title) return;

    const res = await fetch(`/api/v1/admin/modules/${moduleId}/scenes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, title }),
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  if (loading) return <div className="p-8 font-heading font-bold">MEMUAT FASE...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-4 border-border p-4 bg-card shadow-[4px_4px_0_var(--border)]">
        <div>
          <h1 className="font-heading font-black uppercase text-xl">DAFTAR FASE PEMBELAJARAN</h1>
          <p className="font-mono text-xs text-muted-foreground">Pilih fase untuk membuka Canvas Builder</p>
        </div>
        <Button onClick={handleCreateScene} className="font-heading font-bold uppercase border-2 border-border bg-primary shadow-[2px_2px_0_var(--border)]">
          <Plus className="size-4 mr-2" />
          Tambah Fase Baru
        </Button>
      </div>

      <div className="space-y-3">
        {scenes.map((scene) => (
          <div key={scene.id} className="flex items-center justify-between border-4 border-border bg-background p-4 shadow-[4px_4px_0_var(--border)]">
            <div className="flex items-center gap-3">
              <Layers className="size-5 text-accent" />
              <div>
                <span className="font-mono text-xs font-bold bg-amber-200 px-2 py-0.5 border border-border mr-2">{scene.code}</span>
                <span className="font-heading font-black uppercase text-sm">{scene.title}</span>
              </div>
            </div>

            <Link href={`/dashboard/builder/${scene.id}`}>
              <Button className="font-heading font-bold uppercase text-xs border-2 border-border bg-emerald-400 text-slate-950 hover:bg-emerald-500 shadow-[2px_2px_0_var(--border)] flex items-center gap-2">
                <Edit3 className="size-4" />
                Edit di Canvas Builder
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
