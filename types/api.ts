export interface ApiPaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message?: string;
  data: T;
  code: HttpStatusCode;
  meta?: ApiPaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  code: HttpStatusCode;
  details?: Record<string, string[]> | unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface FileUploadData {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

export type FileUploadResponse = ApiSuccessResponse<FileUploadData>;

export type ServerActionResponse<T = void> =
  | { success: true; message?: string; data?: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}
