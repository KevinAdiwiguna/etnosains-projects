import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusCode,
} from "@/types/api";

export async function GET(): Promise<
  NextResponse<ApiSuccessResponse | ApiErrorResponse>
> {
  try {
    const modules = await prisma.module.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        scenes: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data modul berhasil diambil",
        data: modules,
        code: HttpStatusCode.OK,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    console.error("[MODULES_GET_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data modul",
        error: "MODULES_GET_ERROR",
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const body = await req.json();

    const {
      code,
      title,
      description,
      isPublished = false,
    } = body;

    if (!code || !title) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode dan judul modul wajib diisi",
          code: HttpStatusCode.BAD_REQUEST,
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const existingModule = await prisma.module.findUnique({
      where: {
        code,
      },
    });

    if (existingModule) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode modul sudah digunakan",
          code: HttpStatusCode.BAD_REQUEST,
          details: {
            code: ["Kode modul sudah digunakan"],
          },
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const newModule = await prisma.module.create({
      data: {
        code,
        title,
        description,
        isPublished,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Modul berhasil dibuat",
        data: newModule,
        code: HttpStatusCode.CREATED,
      },
      {
        status: HttpStatusCode.CREATED,
      }
    );
  } catch (error) {
    console.error("[MODULES_POST_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat modul baru",
        error: "MODULES_POST_ERROR",
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
