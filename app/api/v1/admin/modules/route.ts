import { NextResponse } from "next/server";

import { uploadToS3 } from "@/lib/storage/s3";
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
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          message: "Request harus menggunakan format multipart/form-data",
          code: HttpStatusCode.BAD_REQUEST,
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const formData = await req.formData();

    const code = formData.get("code") as string | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const isPublished = formData.get("isPublished") as string | null;
    const thumbnail = formData.get("thumbnail");

    if (!code?.trim() || !title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode dan judul modul wajib diisi",
          code: HttpStatusCode.BAD_REQUEST,
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const existingModule = await prisma.module.findUnique({
      where: { code: code.trim() },
    });

    if (existingModule) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode modul sudah digunakan",
          code: HttpStatusCode.BAD_REQUEST,
          details: { code: ["Kode modul sudah digunakan"] },
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    let thumbnailPath: string | null = null;

    if (thumbnail instanceof File && thumbnail.size > 0) {
      const allowedThumbnailTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedThumbnailTypes.includes(thumbnail.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Format thumbnail tidak didukung",
            code: HttpStatusCode.BAD_REQUEST,
            details: {
              thumbnail: ["Thumbnail harus berupa JPG, JPEG, PNG, atau WEBP."],
            },
          },
          { status: HttpStatusCode.BAD_REQUEST }
        );
      }

      const arrayBuffer = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      console.log("Thumbnail buffer size (bytes):", buffer.length);

      const uploadResult = await uploadToS3({
        fileBuffer: buffer,
        fileName: thumbnail.name,
        mimeType: thumbnail.type,
        folder: `modules/${code.trim()}/thumbnail`,
      });

      thumbnailPath = uploadResult.relativePath;
    }

    const newModule = await prisma.module.create({
      data: {
        code: code.trim(),
        title: title.trim(),
        description: description?.trim() || null,
        isPublished: isPublished === "true",
        thumbnail: thumbnailPath,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Modul berhasil dibuat",
        data: newModule,
        code: HttpStatusCode.CREATED,
      },
      { status: HttpStatusCode.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat modul baru",
        error: "MODULES_POST_ERROR",
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
