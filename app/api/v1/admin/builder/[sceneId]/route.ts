import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sceneId: string }> }
) {
  try {
    const { sceneId } = await params;

    const builderContent = await prisma.builderContent.findUnique({
      where: { sceneId },
    });

    if (!builderContent) {
      return NextResponse.json({ content: [] }, { status: 200 });
    }

    return NextResponse.json(builderContent, { status: 200 });
  } catch (error) {
    console.error('[BUILDER_GET_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil konten builder' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ sceneId: string }> }
) {
  try {
    const { sceneId } = await params;
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Format data items tidak valid' }, { status: 400 });
    }

    const savedContent = await prisma.builderContent.upsert({
      where: { sceneId },
      update: { content: items },
      create: {
        sceneId,
        content: items,
      },
    });

    return NextResponse.json(
      { message: 'Modul berhasil disimpan!', data: savedContent },
      { status: 200 }
    );
  } catch (error) {
    console.error('[BUILDER_SAVE_ERROR]', error);
    return NextResponse.json({ error: 'Gagal menyimpan konten builder' }, { status: 500 });
  }
}
