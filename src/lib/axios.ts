import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosRequestConfig
} from 'axios';

// Configuración base
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  },
  timeout: 10000
});

// Función para hacer delay
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Interceptor de solicitud
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = {
      ...config,
      _maxRetries: 5,
      _retryDelay: 10000,
      _retryCount: 0,
      ...config
    };
    return customConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config as (AxiosRequestConfig & {
      _retryCount?: number;
      _maxRetries?: number;
      _retryDelay?: number;
    }) | undefined;

    if (!config) {
      return Promise.reject(createCustomError(error));
    }

    // Incrementar contador de reintentos
    const retryCount = (config._retryCount || 0) + 1;
    const maxRetries = config._maxRetries ?? 2;

    // Si ya se intentó el máximo de veces, rechazar
    if (retryCount > maxRetries) {
      return Promise.reject(createCustomError(error));
    }

    const shouldRetry = 
      error.code === 'ECONNABORTED' || 
      error.code === 'ERR_NETWORK' || 
      (error.response && [502, 503, 504].includes(error.response.status));

    if (shouldRetry) {
      const baseDelay = config._retryDelay ?? 6000;
      const delayMs = baseDelay * Math.pow(2, retryCount - 1);
      console.log(`Reintentando petición (${retryCount}/${maxRetries}) en ${delayMs}ms...`);
      
      await delay(delayMs);
      
      // Crear una nueva configuración con el contador actualizado
      const newConfig = {
        ...config,
        _retryCount: retryCount,
        _retry: true
      };
      
      return api(newConfig);
    }

    return Promise.reject(createCustomError(error));
  }
);

// Función para crear errores personalizados
function createCustomError(error: AxiosError): Error {
  const status = error.response?.status;
  let errorMessage = 'Ocurrió un error inesperado';

  if (error.code === 'ECONNABORTED') {
    errorMessage = 'La solicitud está tardando demasiado. Por favor, verifica tu conexión e inténtalo de nuevo.';
  } else if (error.code === 'ERR_NETWORK') {
    errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
  } else if (status === 400) {
    errorMessage = (error.response?.data as any)?.message || 'Datos inválidos. Por favor, verifica la información.';
  } else if (status === 401) {
    errorMessage = 'No autorizado | Credenciales inválidas. Por favor, inicia sesión.';
  } else if (status === 403) {
    errorMessage = 'No tienes permiso para realizar esta acción.';
  } else if (status === 404) {
    errorMessage = 'Recurso no encontrado.';
  } 
else if (status === 409) {
  errorMessage = 'Ya has realizado una reseña para este libro.';
} 
else if (status && status >= 500) {
    errorMessage = 'Error en el servidor. Por favor, inténtalo más tarde.';
  } else if (!error.response) {
    errorMessage = 'El servidor no responde. Por favor, inténtalo de nuevo en unos minutos.';
  }

  const customError = new Error(errorMessage);
  (customError as any).isNetworkError = !error.response && !status;
  (customError as any).status = status;
  (customError as any).data = error.response?.data;
  
  return customError;
}

export default api;