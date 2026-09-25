import { GridBuilder } from '@/components/shared/grid-builder';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Uji Coba Grid Layout</h1>
        <p className="text-sm text-slate-500">
          Coba geser (drag) dan ubah ukuran (resize) kotak di bawah ini.
        </p>
      </div>

      <GridBuilder />
    </div>
  );
}
