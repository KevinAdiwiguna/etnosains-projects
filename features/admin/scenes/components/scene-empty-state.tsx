'use client';

export function SceneEmptyState() {
  return (
    <div className="col-span-full border-4 border-dashed border-border p-12 text-center text-muted-foreground">
      <p className="font-heading font-bold uppercase text-sm">
        Belum Ada scenes
      </p>
      <p className="font-mono text-xs mt-1">
        Klik tombol "Tambah scenes" untuk membuat scenes pembelajaran pertama.
      </p>
    </div>
  );
}
