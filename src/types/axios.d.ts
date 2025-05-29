import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    _retryCount?: number;
    _maxRetries?: number;
    _retryDelay?: number;
    [key: string]: any;
  }
}

// Extender el tipo de error global
interface Error {
  isNetworkError?: boolean;
  status?: number;
  data?: any;
}