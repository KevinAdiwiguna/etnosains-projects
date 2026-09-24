import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma'; // Sesuaikan lokasi penamaan instance prisma kamu

export async function GET(
  req: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    // Unwrap params dengan await
    const { moduleId } = await params;

    const scenes = await prisma.scene.findMany({
      where: { moduleId },
      orderBy: { order: 'asc' },
      include: {
        builderContent: true,
      },
    });

    return NextResponse.json(scenes, { status: 200 });
  } catch (error) {
    console.error('[SCENES_GET_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil data fase' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await req.json();
    const { code, title, order, status } = body;

    if (!code || !title) {
      return NextResponse.json({ error: 'Kode dan Judul fase wajib diisi' }, { status: 400 });
    }

    const newScene = await prisma.scene.create({
      data: {
        moduleId,
        code,
        title,
        order: order ?? 1,
        status: status ?? 'TERKUNCI',
      },
    });

    return NextResponse.json(newScene, { status: 201 });
  } catch (error) {
    console.error('[SCENE_CREATE_ERROR]', error);
    return NextResponse.json({ error: 'Gagal membuat fase baru' }, { status: 500 });
  }
}
