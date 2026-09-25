import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusCode,
} from '@/types/api';

type RouteContext = {
  params: Promise<{
    sceneid: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  const { sceneid } = await params;
  const body = await req.json();

  try {
    const { code, title, order, status, workTime } = body;

    const existingScene = await prisma.scene.findUnique({
      where: {
        id: sceneid,
      },
    });

    if (!existingScene) {
      return NextResponse.json(
        {
          success: false,
          message: 'Fase pembelajaran tidak ditemukan',
          code: HttpStatusCode.NOT_FOUND,
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    const updatedScene = await prisma.scene.update({
      where: {
        id: sceneid,
      },
      data: {
        code,
        title,
        workTime,
        order,
        status,
      },
    });

    const response: ApiSuccessResponse<typeof updatedScene> = {
      success: true,
      message: 'Fase pembelajaran berhasil diperbarui.',
      data: updatedScene,
      code: HttpStatusCode.OK,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    console.error('[SCENE_UPDATE_ERROR]', error);

    const response: ApiErrorResponse = {
      success: false,
      message: 'Gagal memperbarui fase pembelajaran.',
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

export async function DELETE(
  _req: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  const { sceneid } = await params;

  try {
    const existingScene = await prisma.scene.findUnique({
      where: {
        id: sceneid,
      },
    });

    if (!existingScene) {
      return NextResponse.json(
        {
          success: false,
          message: 'Fase pembelajaran tidak ditemukan',
          code: HttpStatusCode.NOT_FOUND,
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    await prisma.scene.delete({
      where: {
        id: sceneid,
      },
    });

    const response: ApiSuccessResponse<{ id: string }> = {
      success: true,
      message: 'Fase pembelajaran berhasil dihapus.',
      data: { id: sceneid },
      code: HttpStatusCode.OK,
    };

    return NextResponse.json(response, {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    console.error('[SCENE_DELETE_ERROR]', error);

    const response: ApiErrorResponse = {
      success: false,
      message: 'Gagal menghapus fase pembelajaran.',
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
