import { Sidebar } from "@/components/shared/sidebar";

export default function DashboardPage() {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 py-8">
      <div className="max-w-7xl">
        <h1 className="text-2xl font-bold">Selamat datang di Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ini adalah halaman dashboard yang dilindungi. Hanya pengguna yang
          terautentikasi yang dapat mengakses halaman ini.
        </p>
      </div>
    </div>
    </>
  );
}
