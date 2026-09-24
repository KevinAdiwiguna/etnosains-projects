'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Module {
  id: string;
  code: string;
  title: string;
  description: string;
  scenes: { id: string }[];
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/admin/modules')
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
        setLoading(false);
      });
  }, []);

  const handleCreateModule = async () => {
    const code = prompt('Masukkan Kode Modul (contoh: MODUL-01):');
    const title = prompt('Masukkan Judul Modul:');
    if (!code || !title) return;

    const res = await fetch('/api/v1/admin/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, title }),
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  if (loading) return <div className="p-8 font-heading font-bold">MEMUAT MODUL...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-4 border-border p-4 bg-card shadow-[4px_4px_0_var(--border)]">
        <div>
          <h1 className="font-heading font-black uppercase text-xl">MANAJEMEN MODUL ETNOSAINS</h1>
          <p className="font-mono text-xs text-muted-foreground">Pilih modul untuk mengelola fase pembelajaran</p>
        </div>
        <Button onClick={handleCreateModule} className="font-heading font-bold uppercase border-2 border-border bg-primary shadow-[2px_2px_0_var(--border)]">
          <Plus className="size-4 mr-2" />
          Tambah Modul
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <div key={mod.id} className="border-4 border-border bg-background p-4 shadow-[4px_4px_0_var(--border)] space-y-3">
            <div className="flex items-center gap-2">
              <Folder className="size-5 text-primary" />
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-muted border border-border">{mod.code}</span>
            </div>
            <h3 className="font-heading font-black uppercase text-lg">{mod.title}</h3>
            <p className="text-xs text-muted-foreground">{mod.scenes?.length || 0} Fase Pembelajaran</p>
            <Link href={`/dashboard/modules/${mod.id}`}>
              <Button className="w-full mt-2 font-heading font-bold uppercase text-xs border-2 border-border bg-accent text-accent-foreground shadow-[2px_2px_0_var(--border)]">
                Kelola Fase & Content →
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
