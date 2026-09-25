import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { api } from '@/lib/api/axios';
import { Module } from '@/lib/generated/prisma/client';
import { ApiErrorResponse, ApiSuccessResponse } from '@/types/api';

export type ModuleWithScenes = Module & {
  scenes?: { id: string }[];
};

export type CreateModuleInput = {
  code: string;
  title: string;
  description?: string;
  isPublished?: boolean;
  thumbnail?: File | null;
};

export type UpdateModuleInput = {
  code?: string;
  title?: string;
  description?: string;
  isPublished?: boolean;
  thumbnail?: File | null;
};

export type UpdateModuleMutationInput = {
  id: string;
  data: UpdateModuleInput;
};

const MODULES_QUERY_KEY = ['admin/modules'] as const;

async function getModules(): Promise<ModuleWithScenes[]> {
  const response = await api.get<ApiSuccessResponse<ModuleWithScenes[]>>(
    '/api/v1/admin/modules'
  );

  return response.data.data;
}

function createModuleFormData(payload: CreateModuleInput): FormData {
  const formData = new FormData();

  formData.append('code', payload.code.trim());
  formData.append('title', payload.title.trim());

  if (payload.description) {
    formData.append('description', payload.description.trim());
  }

  if (payload.isPublished !== undefined) {
    formData.append('isPublished', String(payload.isPublished));
  }

  if (payload.thumbnail) {
    formData.append('thumbnail', payload.thumbnail);
  }

  return formData;
}

function updateModuleFormData(payload: UpdateModuleInput): FormData {
  const formData = new FormData();

  if (payload.code !== undefined) {
    formData.append('code', payload.code);
  }

  if (payload.title !== undefined) {
    formData.append('title', payload.title);
  }

  if (payload.description !== undefined) {
    formData.append('description', payload.description);
  }

  if (payload.isPublished !== undefined) {
    formData.append('isPublished', String(payload.isPublished));
  }

  if (payload.thumbnail) {
    formData.append('thumbnail', payload.thumbnail);
  }

  return formData;
}

async function createModule(payload: CreateModuleInput): Promise<Module> {
  const formData = createModuleFormData(payload);

  const response = await api.post<ApiSuccessResponse<Module>>(
    '/api/v1/admin/modules',
    formData,
    {
      headers: {
        'Content-Type': undefined,
      },
    }
  );

  return response.data.data;
}

async function updateModule({
  id,
  data,
}: UpdateModuleMutationInput): Promise<Module> {
  const formData = updateModuleFormData(data);

  const response = await api.patch<ApiSuccessResponse<Module>>(
    `/api/v1/admin/modules/${id}`,
    formData
  );

  return response.data.data;
}

async function deleteModule(
  id: string
): Promise<ApiSuccessResponse<{ id: string }>> {
  const response = await api.delete<ApiSuccessResponse<{ id: string }>>(
    `/api/v1/admin/modules/${id}`
  );

  return response.data;
}

export function useModules() {
  return useQuery<ModuleWithScenes[], AxiosError<ApiErrorResponse>>({
    queryKey: MODULES_QUERY_KEY,
    queryFn: getModules,
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation<Module, AxiosError<ApiErrorResponse>, CreateModuleInput>({
    mutationFn: createModule,

    onSuccess: (data) => {
      toast.success('Modul berhasil dibuat', {
        description: `Modul "${data.title}" berhasil ditambahkan.`,
      });

      queryClient.invalidateQueries({
        queryKey: MODULES_QUERY_KEY,
      });
    },

    onError: (error) => {
      toast.error(error?.message ?? 'Gagal membuat modul baru.');
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation<
    Module,
    AxiosError<ApiErrorResponse>,
    UpdateModuleMutationInput
  >({
    mutationFn: updateModule,

    onSuccess: (data) => {
      toast.success('Modul berhasil diperbarui', {
        description: `Modul "${data.title}" berhasil diperbarui.`,
      });

      queryClient.invalidateQueries({
        queryKey: MODULES_QUERY_KEY,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? 'Gagal memperbarui modul.');
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<{ id: string }>,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: deleteModule,

    onSuccess: (data) => {
      toast.success(data.message ?? 'Modul berhasil dihapus.');

      queryClient.invalidateQueries({
        queryKey: MODULES_QUERY_KEY,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? 'Gagal menghapus modul.');
    },
  });
}
