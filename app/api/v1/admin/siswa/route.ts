import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { isAdmin } from '@/lib/auth/auth-validation';
import { User } from '@/lib/generated/prisma/client';
import {
  ApiSuccessResponse,
  ApiErrorResponse,
  HttpStatusCode,
} from '@/types/api';
import { auth } from '@/lib/auth/auth';

export type CreateStudentInput = {
  name: string;
  email: string;
  password: string;
  nisn?: string;
  class?: string;
  rollNumber?: string;
};

export type StudentResponse = Omit<CreateStudentInput, 'password'> & {
  id: string;
  role: string;
};

export const GET = async (
  request: Request
): Promise<
  NextResponse<ApiSuccessResponse<Omit<User, 'password'>[]> | ApiErrorResponse>
> => {
  try {
    const adminAccess = await isAdmin(request);
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.UNAUTHORIZED,
          message: 'Akses ditolak. Hanya admin yang diizinkan.',
          error: 'UNAUTHORIZED',
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        nisn: true,
        class: true,
        rollNumber: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        code: HttpStatusCode.OK,
        message: 'Data siswa berhasil diambil',
        data: students,
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Terjadi kesalahan pada server',
        error: 'INTERNAL_SERVER_ERROR',
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const POST = async (
  request: Request
): Promise<
  NextResponse<ApiSuccessResponse<StudentResponse> | ApiErrorResponse>
> => {
  try {
    const adminAccess = await isAdmin(request);
    if (!adminAccess) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.UNAUTHORIZED,
          message: 'Akses ditolak. Hanya admin yang diizinkan.',
          error: 'UNAUTHORIZED',
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    const body: CreateStudentInput = await request.json();

    if (!body.email || !body.name || !body.password) {
      return NextResponse.json(
        {
          success: false,
          code: HttpStatusCode.BAD_REQUEST,
          message: 'Nama, email, dan password wajib diisi.',
          error: 'BAD_REQUEST',
        },
        { status: HttpStatusCode.BAD_REQUEST }
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
          message: 'Email sudah digunakan.',
          error: 'CONFLICT',
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const newStudent = await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const updatedStudent = await prisma.user.update({
      where: { id: newStudent.user.id },
      data: {
        role: 'STUDENT',
        nisn: body.nisn || null,
        class: body.class || null,
        rollNumber: body.rollNumber || null,
      },
    });

    const outputFormat: StudentResponse = {
      id: updatedStudent.id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      role: updatedStudent.role,
      nisn: updatedStudent.nisn ?? undefined,
      class: updatedStudent.class ?? undefined,
      rollNumber: updatedStudent.rollNumber ?? undefined,
    };

    return NextResponse.json(
      {
        success: true,
        code: HttpStatusCode.CREATED,
        message: 'Siswa berhasil ditambahkan',
        data: outputFormat,
      },
      { status: HttpStatusCode.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Terjadi kesalahan pada server',
        error: 'INTERNAL_SERVER_ERROR',
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
