import Link from "next/link";
// components
import { AccessCard } from "@/components/ui/access-card";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/features/auth/components/register-form";



export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 py-8">
      <div className="max-w-7xl">
        <AccessCard
          title="REGISTRASI AKUN ETNOSAINS"
          description="Daftarkan akun atau masukkan ID unik yang diberikan oleh guru fisika Anda untuk memulai eksplorasi interaktif hukum gerak pada Cidomo dan dinamika akustik Gendang Beleq."
          note="Buat akun baru Anda untuk mengakses modul pembelajaran"
          phase="ETNO-01"
        >
          <RegisterForm />
          <div className="text-center">
            <Link href="/signup">
              <Button type="button" className="w-full" variant="link">
                Sudah Punya akun? Masuk sekarang
              </Button>
            </Link>
          </div>
        </AccessCard>
      </div>
    </div>
  );
}
