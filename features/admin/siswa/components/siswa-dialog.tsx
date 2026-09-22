"use client";

import { useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/generated/prisma/client";

export interface SiswaFormData {
  id?: string;
  name: string;
  email: string;
  nisn?: string;
  password?: string;
  class?: string;
  rollNumber?: string;
}

interface SiswaDialogProps {
  open: boolean;
  siswa?: User | null;
  onClose: () => void;
  onSubmit?: (data: SiswaFormData) => void;
  isLoading?: boolean;
}

export function SiswaDialog({
  open,
  siswa,
  onClose,
  onSubmit,
  isLoading = false,
}: SiswaDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) {
      formRef.current?.reset();
    }
  }, [open]);

  if (!open) return null;

  const isEdit = Boolean(siswa);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const passwordVal = String(formData.get("password") ?? "");

    const data: SiswaFormData = {
      id: siswa?.id,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      nisn: String(formData.get("nisn") ?? ""),
      ...(passwordVal ? { password: passwordVal } : {}),
      class: String(formData.get("class") ?? ""),
      rollNumber: String(formData.get("rollNumber") ?? ""),
    };

    onSubmit?.(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto border-4 border-border bg-background shadow-[7px_7px_0_var(--border)]">
        <div className="flex items-center justify-between border-b-4 border-border bg-primary px-4 py-3">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-wider">
              LEMBAR DATA SISWA
            </p>
            <h2 className="mt-1 font-heading text-xl font-black uppercase leading-none">
              {isEdit ? "Edit Siswa" : "Tambah Siswa"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Tutup"
            className="flex size-9 items-center justify-center border-2 border-border bg-background shadow-[2px_2px_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-5 p-5">
            <Input
              title="Nama Lengkap"
              name="name"
              placeholder="Masukkan nama siswa"
              defaultValue={siswa?.name ?? ""}
              required
            />

            <Input
              title="Email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              defaultValue={siswa?.email ?? ""}
              required
            />

            <Input
              title="NISN"
              name="nisn"
              placeholder="Contoh: 0012345678"
              defaultValue={siswa?.nisn ?? ""}
            />

            <Input
              title={isEdit ? "Password Baru (Opsional)" : "Password"}
              name="password"
              type="password"
              required={!isEdit}
              placeholder={isEdit ? "Kosongkan jika tidak diubah" : "Masukkan password"}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                title="Kelas"
                name="class"
                placeholder="Contoh: XII IPA 1"
                defaultValue={siswa?.class ?? ""}
              />

              <Input
                title="Nomor Absen"
                name="rollNumber"
                placeholder="Contoh: 12"
                defaultValue={siswa?.rollNumber ?? ""}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t-4 border-border bg-secondary p-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 border-2 border-border bg-background px-5 font-heading text-xs font-black uppercase shadow-[3px_3px_0_var(--border)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 items-center justify-center gap-2 border-2 border-border bg-primary px-5 font-heading text-xs font-black uppercase text-primary-foreground shadow-[3px_3px_0_var(--border)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>{isEdit ? "Simpan Perubahan" : "Tambah Siswa"} →</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
