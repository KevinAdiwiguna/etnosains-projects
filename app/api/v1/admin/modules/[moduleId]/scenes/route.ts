import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusCode,
} from '@/types/api';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;

    const scenes = await prisma.scene.findMany({
      where: {
        moduleId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        builderContent: true,
      },
    });

    const response: ApiSuccessResponse<typeof scenes> = {
      success: true,
      message: 'Data fase pembelajaran berhasil diambil.',
      data: scenes,
      code: HttpStatusCode.OK,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    console.error('[SCENES_GET_ERROR]', error);

    const response: ApiErrorResponse = {
      success: false,
      message: 'Gagal mengambil data fase pembelajaran.',
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan yang tidak diketahui.',
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await req.json();

    const {
      code,
      title,
      order,
      status,
    } = body;

    if (!code || !title) {
      const response: ApiErrorResponse = {
        success: false,
        message: 'Kode dan judul fase wajib diisi.',
        code: HttpStatusCode.BAD_REQUEST,
      };

      return NextResponse.json(response, {
        status: HttpStatusCode.BAD_REQUEST,
      });
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

    const response: ApiSuccessResponse<typeof newScene> = {
      success: true,
      message: 'Fase pembelajaran berhasil dibuat.',
      data: newScene,
      code: HttpStatusCode.CREATED,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.CREATED,
    });
  } catch (error) {
    console.error('[SCENE_CREATE_ERROR]', error);

    const response: ApiErrorResponse = {
      success: false,
      message: 'Gagal membuat fase baru.',
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan yang tidak diketahui.',
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}
