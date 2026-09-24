// app/api/modules/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET: Ambil semua modul beserta urutannya
export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        scenes: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    console.error('[MODULES_GET_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil data modul' }, { status: 500 });
  }
}

// POST: Buat modul etnosains baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, title, description, isPublished } = body;

    if (!code || !title) {
      return NextResponse.json({ error: 'Kode dan Judul modul wajib diisi' }, { status: 400 });
    }

    const newModule = await prisma.module.create({
      data: {
        code,
        title,
        description,
        isPublished: isPublished ?? false,
      },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    console.error('[MODULE_CREATE_ERROR]', error);
    return NextResponse.json({ error: 'Gagal membuat modul baru' }, { status: 500 });
  }
}
