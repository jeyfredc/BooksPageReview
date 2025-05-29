// Tipos específicos de tu API
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string | number;
  };
}

// Tipos de error personalizados
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  data?: any;
}