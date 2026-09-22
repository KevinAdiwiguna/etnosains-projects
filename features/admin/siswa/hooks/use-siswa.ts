import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "@/lib/api/axios";
import { User } from "@/lib/generated/prisma/client";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export type CreateStudentInput = {
  name: string;
  email: string;
  password?: string;
  nisn?: string;
  class?: string;
  rollNumber?: string;
};

export type UpdateStudentInput = Partial<CreateStudentInput>;

const STUDENTS_QUERY_KEY = ["admin/siswa"] as const;

async function getStudents(): Promise<User[]> {
  const response = await api.get<ApiSuccessResponse<User[]>>("/api/v1/admin/siswa");
  return response.data.data;
}

async function getStudentById(id: string): Promise<User> {
  const response = await api.get<ApiSuccessResponse<User>>(`/api/v1/admin/siswa/${id}`);
  return response.data.data;
}

async function createStudent(payload: CreateStudentInput): Promise<User> {
  const response = await api.post<ApiSuccessResponse<User>>(
    "/api/v1/admin/siswa",
    payload
  );
  return response.data.data;
}

async function updateStudent({
  id,
  data,
}: {
  id: string;
  data: UpdateStudentInput;
}): Promise<User> {
  const response = await api.patch<ApiSuccessResponse<User>>(
    `/api/v1/admin/siswa/${id}`,
    data
  );
  return response.data.data;
}

async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/api/v1/admin/siswa/${id}`);
}


export function useStudents() {
  return useQuery<User[], AxiosError<ApiErrorResponse>>({
    queryKey: STUDENTS_QUERY_KEY,
    queryFn: getStudents,
  });
}

export function useStudent(id: string) {
  return useQuery<User, AxiosError<ApiErrorResponse>>({
    queryKey: [...STUDENTS_QUERY_KEY, id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ApiErrorResponse>, CreateStudentInput>({
    mutationFn: createStudent,
    onSuccess: (data) => {
      toast.success(`Siswa ${data.name} berhasil ditambahkan!`);

      queryClient.invalidateQueries({
        queryKey: STUDENTS_QUERY_KEY,
        exact: false,
        refetchType: "active",
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Gagal menambahkan data siswa.";
      toast.error(message);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ApiErrorResponse>, { id: string; data: UpdateStudentInput }>({
    mutationFn: updateStudent,
    onSuccess: (data, variables) => {
      toast.success(`Data ${data.name || "siswa"} berhasil diperbarui!`);
      queryClient.invalidateQueries({
        queryKey: STUDENTS_QUERY_KEY,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [...STUDENTS_QUERY_KEY, variables.id],
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Gagal memperbarui data siswa.";
      toast.error(message);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiErrorResponse>, string>({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success("Data siswa berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: STUDENTS_QUERY_KEY,
        exact: false,
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Gagal menghapus data siswa.";
      toast.error(message);
    },
  });
}
