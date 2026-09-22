import { AccessCard } from "@/components/ui/access-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/features/auth/components/login-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";


export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 py-8">
      <div className="max-w-7xl">
        <AccessCard
          title="PORTAL MASUK ETNOSAINS"
          description="Masuk ke dalam platform pembelajaran untuk melanjutkan penyelidikan ilmiah berbasis kearifan lokal pada budaya Cidomo dan Gendang Beleq."
          note="Gunakan akun terdaftar Anda untuk melanjutkan"
          phase="ETNO-01"
        >
          <LoginForm />
          <div className="text-center">
            <Link href="/signup">
              <Button type="button" className="w-full" variant="link">
                Belum punya akun? Daftar sekarang
              </Button>
            </Link>
          </div>
        </AccessCard>
      </div>
    </div>
  );
}
