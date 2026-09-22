import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/auth/auth-validation";
import { User } from "@/lib/generated/prisma/client";
import {
  ApiSuccessResponse,
  ApiErrorResponse,
  HttpStatusCode,
} from "@/types/api";

export type UpdateStudentInput = {
  name?: string;
  email?: string;
  nisn?: string;
  class?: string;
  rollNumber?: string;
};

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak. Hanya admin yang diizinkan.",
          error: "UNAUTHORIZED",
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    const { id } = await params;

    const student = await prisma.user.findUnique({
      where: { id, role: "STUDENT" },
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Data siswa tidak ditemukan",
          error: "NOT_FOUND",
        },
        { status: HttpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Detail siswa berhasil diambil",
        data: student as User,
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: "INTERNAL_SERVER_ERROR",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak. Hanya admin yang diizinkan.",
          error: "UNAUTHORIZED",
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    const { id } = await params;
    const body: UpdateStudentInput = await request.json();

    const existingStudent = await prisma.user.findUnique({
      where: { id, role: "STUDENT" },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Data siswa tidak ditemukan",
          error: "NOT_FOUND",
        },
        { status: HttpStatusCode.NOT_FOUND }
      );
    }

    const updatedStudent = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.nisn !== undefined && { nisn: body.nisn }),
        ...(body.class !== undefined && { class: body.class }),
        ...(body.rollNumber !== undefined && { rollNumber: body.rollNumber }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data siswa berhasil diperbarui",
        data: updatedStudent as User,
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: "INTERNAL_SERVER_ERROR",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak. Hanya admin yang diizinkan.",
          error: "UNAUTHORIZED",
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    const { id } = await params;

    const existingStudent = await prisma.user.findUnique({
      where: { id, role: "STUDENT" },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Data siswa tidak ditemukan",
          error: "NOT_FOUND",
        },
        { status: HttpStatusCode.NOT_FOUND }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Siswa berhasil dihapus",
        data: null,
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: "INTERNAL_SERVER_ERROR",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
