import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/auth/auth-validation";
import { User } from "@/lib/generated/prisma/client";
import {
  ApiSuccessResponse,
  ApiErrorResponse,
  HttpStatusCode,
} from "@/types/api";
import { auth } from "@/lib/auth/auth";

export type CreateStudentInput = {
  name: string;
  email: string;
  password: string;
  nisn?: string;
  class?: string;
};

export const GET = async (
  request: Request,
): Promise<NextResponse<ApiSuccessResponse<User[]> | ApiErrorResponse>> => {
  try {
    const adminAccess = await isAdmin(request);
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.UNAUTHORIZED,
          message: "Akses ditolak. Hanya admin yang diizinkan.",
          error: "UNAUTHORIZED",
        },
        { status: HttpStatusCode.UNAUTHORIZED },
      );
    }

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
    });

    return NextResponse.json(
      {
        success: true,
        code: HttpStatusCode.OK,
        message: "Data siswa berhasil diambil",
        data: students,
      },
      { status: HttpStatusCode.OK },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Terjadi kesalahan pada server",
        error: "INTERNAL_SERVER_ERROR",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
    );
  }
};

export const POST = async (
  request: Request,
): Promise<NextResponse<ApiSuccessResponse<User> | ApiErrorResponse>> => {
  try {
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.UNAUTHORIZED,
          message: "Akses ditolak. Hanya admin yang diizinkan.",
          error: "UNAUTHORIZED",
        },
        { status: HttpStatusCode.UNAUTHORIZED },
      );
    }

    const body: CreateStudentInput = await request.json();

    if (!body.email || !body.name) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.BAD_REQUEST,
          message: "Nama dan email wajib diisi.",
          error: "BAD_REQUEST",
        },
        { status: HttpStatusCode.BAD_REQUEST },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.BAD_REQUEST,
          message: "Email sudah digunakan.",
          error: "CONFLICT",
        },
        { status: HttpStatusCode.BAD_REQUEST },
      );
    }

    const newStudent = await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const updateStudentRole = await prisma.user.update({
      where: { id: newStudent.user.id },
      data: {
        nisn: body.nisn,
        class: body.class,
      },
    });

    return NextResponse.json(
      {
        success: true,
        code: HttpStatusCode.CREATED,
        message: "Siswa berhasil ditambahkan",
        data: updateStudentRole,
      },
      { status: HttpStatusCode.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Terjadi kesalahan pada server",
        error: "INTERNAL_SERVER_ERROR",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
    );
  }
};
