import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusCode,
} from '@/types/api';

type RouteContext = {
  params: Promise<{
    moduleId: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const { moduleId } = await params;
    const body = await req.json();

    const { code, title, description, isPublished } = body;

    const existingModule = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!existingModule) {
      return NextResponse.json(
        {
          success: false,
          message: 'Modul tidak ditemukan',
          code: HttpStatusCode.NOT_FOUND,
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    if (code !== undefined && code !== existingModule.code) {
      const moduleWithSameCode = await prisma.module.findUnique({
        where: {
          code,
        },
      });

      if (moduleWithSameCode) {
        return NextResponse.json(
          {
            success: false,
            message: 'Kode modul sudah digunakan',
            code: HttpStatusCode.BAD_REQUEST,
            details: {
              code: ['Kode modul sudah digunakan'],
            },
          },
          {
            status: HttpStatusCode.BAD_REQUEST,
          }
        );
      }
    }

    const updatedModule = await prisma.module.update({
      where: {
        id: moduleId,
      },
      data: {
        ...(code !== undefined && {
          code,
        }),

        ...(title !== undefined && {
          title,
        }),

        ...(description !== undefined && {
          description,
        }),

        ...(isPublished !== undefined && {
          isPublished,
        }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Modul berhasil diperbarui',
        data: updatedModule,
        code: HttpStatusCode.OK,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    console.error('[MODULE_UPDATE_ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal memperbarui modul',
        error: 'MODULE_UPDATE_ERROR',
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const { moduleId } = await params;

    const existingModule = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!existingModule) {
      return NextResponse.json(
        {
          success: false,
          message: 'Modul tidak ditemukan',
          code: HttpStatusCode.NOT_FOUND,
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    await prisma.module.delete({
      where: {
        id: moduleId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Modul berhasil dihapus',
        data: {
          id: moduleId,
        },
        code: HttpStatusCode.OK,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    console.error('[MODULE_DELETE_ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menghapus modul',
        error: 'MODULE_DELETE_ERROR',
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
