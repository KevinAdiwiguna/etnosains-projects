import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { api } from "@/lib/api/axios";
import { Scene } from "@/lib/generated/prisma/client";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/types/api";

export type CreateSceneInput = {
  code: string;
  title: string;
  order?: number;
  status?: "TERBUKA" | "TERKUNCI";
};

export type UpdateSceneInput = {
  code?: string;
  title?: string;
  order?: number;
  status?: "TERBUKA" | "TERKUNCI";
};

type CreateSceneMutationInput = {
  moduleId: string;
  payload: CreateSceneInput;
};

type UpdateSceneMutationInput = {
  moduleId: string;
  sceneId: string;
  payload: UpdateSceneInput;
};

const SCENES_QUERY_KEY = ["admin", "scenes"] as const;

async function getScenes(moduleId: string): Promise<Scene[]> {
  const response = await api.get<ApiSuccessResponse<Scene[]>>(
    `/api/v1/admin/modules/${moduleId}/scenes`
  );

  return response.data.data;
}

async function createScene({
  moduleId,
  payload,
}: CreateSceneMutationInput): Promise<Scene> {
  const response = await api.post<ApiSuccessResponse<Scene>>(
    `/api/v1/admin/modules/${moduleId}/scenes`,
    payload
  );

  return response.data.data;
}

async function updateScene({
  moduleId,
  sceneId,
  payload,
}: UpdateSceneMutationInput): Promise<Scene> {
  const response = await api.patch<ApiSuccessResponse<Scene>>(
    `/api/v1/admin/modules/${moduleId}/scenes/${sceneId}`,
    payload
  );

  return response.data.data;
}

async function deleteScene({
  moduleId,
  sceneId,
}: {
  moduleId: string;
  sceneId: string;
}): Promise<ApiSuccessResponse<{ id: string }>> {
  const response = await api.delete<
    ApiSuccessResponse<{ id: string }>
  >(`/api/v1/admin/modules/${moduleId}/scenes/${sceneId}`);

  return response.data;
}

export function useScenes(moduleId: string) {
  return useQuery<Scene[], AxiosError<ApiErrorResponse>>({
    queryKey: [...SCENES_QUERY_KEY, moduleId],
    queryFn: () => getScenes(moduleId),
    enabled: Boolean(moduleId),
  });
}

export function useCreateScene() {
  const queryClient = useQueryClient();

  return useMutation<
    Scene,
    AxiosError<ApiErrorResponse>,
    CreateSceneMutationInput
  >({
    mutationFn: createScene,

    onSuccess: (data, variables) => {
      toast.success("Fase berhasil ditambahkan", {
        description: `Fase "${data.title}" berhasil ditambahkan.`,
      });

      queryClient.invalidateQueries({
        queryKey: [...SCENES_QUERY_KEY, variables.moduleId],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "Gagal membuat fase baru."
      );
    },
  });
}

export function useUpdateScene() {
  const queryClient = useQueryClient();

  return useMutation<
    Scene,
    AxiosError<ApiErrorResponse>,
    UpdateSceneMutationInput
  >({
    mutationFn: updateScene,

    onSuccess: (data, variables) => {
      toast.success("Fase berhasil diperbarui", {
        description: `Fase "${data.title}" berhasil diperbarui.`,
      });

      queryClient.invalidateQueries({
        queryKey: [...SCENES_QUERY_KEY, variables.moduleId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.message ??
          "Gagal memperbarui fase."
      );
    },
  });
}

export function useDeleteScene() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<{ id: string }>,
    AxiosError<ApiErrorResponse>,
    {
      moduleId: string;
      sceneId: string;
    }
  >({
    mutationFn: deleteScene,

    onSuccess: (data, variables) => {
      toast.success(
        data.message ?? "Fase berhasil dihapus."
      );

      queryClient.invalidateQueries({
        queryKey: [...SCENES_QUERY_KEY, variables.moduleId],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "Gagal menghapus fase."
      );
    },
  });
}
