export interface ResponseDto<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}

export interface PaginatedResponseDto<T> extends ResponseDto<T> {
  total?: number;
}

export interface CustomError extends Error {
  status?: number;
}
