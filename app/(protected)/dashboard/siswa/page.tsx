"use client";

import { useState } from "react";
import { Plus, Search, Users } from "lucide-react";

import { SiswaTable } from "@/features/admin/siswa/components/siswa-table";
import { SiswaDialog } from "@/features/admin/siswa/components/siswa-dialog";
import { useCreateStudent } from "@/features/admin/siswa/hooks/use-siswa";

export default function SiswaPage() {
  const createMutation = useCreateStudent();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCreateSubmit(data: {
    name: string;
    email: string;
    nisn?: string;
    class?: string;
    rollNumber?: string;
  }) {
    createMutation.mutate(data, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  }

  return (
    <>
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Users className="size-5" />
                <span className="font-heading text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Database Penelitian
                </span>
              </div>

              <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Data Siswa
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Kelola data peserta penelitian dan informasi siswa yang
                terdaftar pada Etnosains LMS.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="
                flex h-11 shrink-0 items-center justify-center gap-2
                border-2 border-border
                bg-primary
                px-5
                font-heading text-xs
                font-black uppercase
                text-primary-foreground
                shadow-[4px_4px_0_var(--border)]
                active:translate-x-[4px]
                active:translate-y-[4px]
                active:shadow-none
              "
            >
              <Plus className="size-4" />
              Tambah Siswa
            </button>
          </header>

          <section
            className="
              flex flex-col gap-3
              border-4 border-border
              bg-card
              p-3
              shadow-[4px_4px_0_var(--border)]
              sm:flex-row
            "
          >
            <div className="relative flex-1">
              <Search
                className="
                  pointer-events-none
                  absolute left-3 top-1/2
                  size-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID, nama, NISN, atau kelas..."
                className="
                  h-11 w-full
                  border-2 border-border
                  bg-background
                  pl-10 pr-3
                  text-sm
                  outline-none
                  placeholder:text-muted-foreground
                  focus:ring-2
                  focus:ring-ring
                "
              />
            </div>

            <button
              type="button"
              className="
                h-11
                border-2 border-border
                bg-secondary
                px-5
                font-heading text-xs
                font-black uppercase
                shadow-[2px_2px_0_var(--border)]
              "
            >
              Semua Status
            </button>
          </section>

          <SiswaTable searchQuery={searchQuery} />
        </div>
      </div>

      <SiswaDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateSubmit}
        isLoading={createMutation.isPending}
      />
    </>
  );
}
