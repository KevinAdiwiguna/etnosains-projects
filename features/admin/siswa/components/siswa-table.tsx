"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { SiswaActions } from "./siswa-actions";
import { SiswaDialog, SiswaFormData } from "./siswa-dialog";
import { SiswaDeleteDialog } from "./siswa-delete-dialog";
import {
  useStudents,
  useUpdateStudent,
  useDeleteStudent,
} from "@/features/admin/siswa/hooks/use-siswa";
import { User } from "@/lib/generated/prisma/client";

interface SiswaTableProps {
  searchQuery?: string;
}

export function SiswaTable({ searchQuery = "" }: SiswaTableProps) {
  const { data: students = [], isLoading, isError } = useStudents();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();

  const [selectedSiswa, setSelectedSiswa] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [siswaToDelete, setSiswaToDelete] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredStudents = students.filter((siswa) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      siswa.id.toLowerCase().includes(q) ||
      siswa.name.toLowerCase().includes(q) ||
      siswa.email.toLowerCase().includes(q) ||
      (siswa.class && siswa.class.toLowerCase().includes(q)) ||
      (siswa.nisn && siswa.nisn.toLowerCase().includes(q))
    );
  });

  function handleEdit(siswa: User) {
    setSelectedSiswa(siswa);
    setDialogOpen(true);
  }

  function handleDelete(siswa: User) {
    setSiswaToDelete(siswa);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (!siswaToDelete) return;

    deleteMutation.mutate(siswaToDelete.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSiswaToDelete(null);
      },
    });
  }

  function handleUpdateSubmit(data: SiswaFormData) {
    if (!selectedSiswa) return;

    updateMutation.mutate(
      { id: selectedSiswa.id, data },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setSelectedSiswa(null);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-4 border-border bg-card p-12 text-muted-foreground shadow-[4px_4px_0_var(--border)]">
        <Loader2 className="mr-2 size-6 animate-spin" />
        <span className="font-heading text-sm font-bold uppercase">
          Memuat Data Siswa...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-4 border-border bg-destructive/10 p-6 text-center shadow-[4px_4px_0_var(--border)]">
        <p className="font-heading text-sm font-bold uppercase text-destructive">
          Gagal mengambil data siswa dari server.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="hidden overflow-x-auto border-4 border-border bg-card shadow-[5px_5px_0_var(--border)] md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-4 border-border bg-primary">
                <th className="px-4 py-3 text-left font-heading text-xs font-black uppercase">
                  ID / NISN
                </th>
                <th className="px-4 py-3 text-left font-heading text-xs font-black uppercase">
                  Nama
                </th>
                <th className="px-4 py-3 text-left font-heading text-xs font-black uppercase">
                  Kelas
                </th>
                <th className="px-4 py-3 text-left font-heading text-xs font-black uppercase">
                  No. Absen
                </th>
                <th className="px-4 py-3 text-left font-heading text-xs font-black uppercase">
                  Role
                </th>
                <th className="w-[110px] px-4 py-3 text-right font-heading text-xs font-black uppercase">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    Belum ada data siswa.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((siswa) => (
                  <tr
                    key={siswa.id}
                    className="border-b-2 border-border last:border-b-0 hover:bg-secondary"
                  >
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs font-bold">
                        {siswa.nisn || siswa.id.slice(0, 8)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <p className="font-heading text-sm font-bold">
                          {siswa.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {siswa.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold">
                      {siswa.class || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {siswa.rollNumber || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge role={siswa.role} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        <SiswaActions
                          onEdit={() => handleEdit(siswa)}
                          onDelete={() => handleDelete(siswa)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {filteredStudents.length === 0 ? (
            <div className="border-4 border-border bg-card px-4 py-10 text-center shadow-[4px_4px_0_var(--border)]">
              <p className="text-sm text-muted-foreground">
                Belum ada data siswa.
              </p>
            </div>
          ) : (
            filteredStudents.map((siswa) => (
              <div
                key={siswa.id}
                className="border-4 border-border bg-card p-4 shadow-[4px_4px_0_var(--border)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] font-bold text-muted-foreground">
                      {siswa.nisn || siswa.id.slice(0, 8)}
                    </p>

                    <h3 className="mt-1 font-heading text-base font-black uppercase">
                      {siswa.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {siswa.email}
                    </p>
                  </div>

                  <StatusBadge role={siswa.role} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t-2 border-border pt-3">
                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase text-muted-foreground">
                      Kelas
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {siswa.class || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase text-muted-foreground">
                      No. Absen
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {siswa.rollNumber || "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end border-t-2 border-border pt-3">
                  <SiswaActions
                    onEdit={() => handleEdit(siswa)}
                    onDelete={() => handleDelete(siswa)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <SiswaDialog
        open={dialogOpen}
        siswa={selectedSiswa}
        onClose={() => {
          setDialogOpen(false);
          setSelectedSiswa(null);
        }}
        onSubmit={handleUpdateSubmit}
        isLoading={updateMutation.isPending}
      />

      <SiswaDeleteDialog
        open={deleteDialogOpen}
        siswa={siswaToDelete}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSiswaToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}

function StatusBadge({ role }: { role: string }) {
  const isStudent = role === "STUDENT";

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "border-2 border-border",
        "px-2 py-1",
        "font-heading text-[10px]",
        "font-black uppercase",
        isStudent
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
      ].join(" ")}
    >
      <span
        className={[
          "size-2 rounded-full border border-border",
          isStudent ? "bg-primary-foreground" : "bg-muted-foreground",
        ].join(" ")}
      />
      {role}
    </span>
  );
}
