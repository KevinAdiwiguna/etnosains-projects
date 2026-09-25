import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import {
  ApiResponse,
  HttpStatusCode,
  ApiSuccessResponse,
  ApiErrorResponse,
} from '@/types/api';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sceneId: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { sceneId } = await params;

    const builderContent = await prisma.builderContent.findUnique({
      where: { sceneId },
    });

    if (!builderContent) {
      const response: ApiSuccessResponse = {
        success: true,
        code: HttpStatusCode.OK,
        data: { content: [] },
      };
      return NextResponse.json(response, { status: HttpStatusCode.OK });
    }

    const response: ApiSuccessResponse = {
      success: true,
      code: HttpStatusCode.OK,
      data: builderContent,
    };
    return NextResponse.json(response, { status: HttpStatusCode.OK });
  } catch (error) {
    console.error('[BUILDER_GET_ERROR]', error);

    const errorResponse: ApiErrorResponse = {
      success: false,
      message: 'Gagal mengambil konten builder',
      error: error instanceof Error ? error.message : 'Unknown error',
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    return NextResponse.json(errorResponse, {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ sceneId: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { sceneId } = await params;
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: 'Format data items tidak valid',
        code: HttpStatusCode.BAD_REQUEST,
      };
      return NextResponse.json(errorResponse, {
        status: HttpStatusCode.BAD_REQUEST,
      });
    }

    const savedContent = await prisma.builderContent.upsert({
      where: { sceneId },
      update: { content: items },
      create: {
        sceneId,
        content: items,
      },
    });

    const successResponse: ApiSuccessResponse = {
      success: true,
      message: 'Modul berhasil disimpan!',
      data: savedContent,
      code: HttpStatusCode.OK,
    };
    return NextResponse.json(successResponse, { status: HttpStatusCode.OK });
  } catch (error) {
    console.error('[BUILDER_SAVE_ERROR]', error);

    const errorResponse: ApiErrorResponse = {
      success: false,
      message: 'Gagal menyimpan konten builder',
      error: error instanceof Error ? error.message : 'Unknown error',
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    return NextResponse.json(errorResponse, {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}
