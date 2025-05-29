
export type ApiError<T = unknown> = {
    isAxiosError?: boolean;
    response?: {
        data: T;
        status: number;
        statusText: string;
    };
    message: string;
};
