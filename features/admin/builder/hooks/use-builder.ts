import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "@/lib/api/axios";
import { BuilderContent } from "@/lib/generated/prisma/client";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import { BuilderItem } from "../types/builder";

export interface BuilderResponse {
  id?: string;
  sceneId: string;
  content: BuilderItem[];
}

const BUILDER_QUERY_KEY = ["admin/builder"] as const;

async function getBuilderContent(sceneId: string): Promise<BuilderItem[]> {
  const response = await api.get<ApiSuccessResponse<BuilderContent>>(
    `/api/v1/admin/builder/${sceneId}`
  );

  const content = response.data.data?.content;

  if (Array.isArray(content)) {
    return content as unknown as BuilderItem[];
  }

  return [];
}

async function updateBuilderContent({
  sceneId,
  items,
}: {
  sceneId: string;
  items: BuilderItem[];
}): Promise<BuilderContent> {
  const response = await api.put<ApiSuccessResponse<BuilderContent>>(
    `/api/v1/admin/builder/${sceneId}`,
    { items }
  );
  return response.data.data;
}

export function useBuilderContent(sceneId: string) {
  return useQuery<BuilderItem[], AxiosError<ApiErrorResponse>>({
    queryKey: [...BUILDER_QUERY_KEY, sceneId],
    queryFn: () => getBuilderContent(sceneId),
    enabled: !!sceneId,
  });
}

export function useSaveBuilderContent() {
  const queryClient = useQueryClient();

  return useMutation<
    BuilderContent,
    AxiosError<ApiErrorResponse>,
    { sceneId: string; items: BuilderItem[] }
  >({
    mutationFn: updateBuilderContent,
    onSuccess: (_, variables) => {
      toast.success("Konten Modul Etnosains Berhasil Disimpan!");
      queryClient.invalidateQueries({
        queryKey: [...BUILDER_QUERY_KEY, variables.sceneId],
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Gagal menyimpan konten builder.";
      toast.error(message);
    },
  });
}
