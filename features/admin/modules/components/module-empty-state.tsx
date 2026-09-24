'use client';

export function ModuleEmptyState() {
  return (
    <div className="col-span-full border-4 border-dashed border-border p-12 text-center text-muted-foreground">
      <p className="font-heading font-bold uppercase text-sm">
        Belum Ada Modul Etnosains
      </p>
      <p className="font-mono text-xs mt-1">
        Klik tombol "Tambah Modul" untuk membuat modul pembelajaran pertama.
      </p>
    </div>
  );
}
