
import type { Auth, CreateuserForm, LoginUserForm, LoginUserResponse } from "../types/auth";
import api from "../lib/axios";
import type { ApiError } from "../types";



export async function postCreateUser(createUserForm: CreateuserForm): Promise<Auth> {
    try {
        const url = "Auth/register";
        const { data } = await api.post<Auth>(url, createUserForm);     
        return data;
    } catch (error: unknown) {
        const apiError = error as ApiError<Auth>;
        if (apiError.response?.data) {
            return apiError.response.data;
        }
        throw new Error(apiError.message || 'Error al crear el usuario');
    }
}

export async function postLoginUser(userLoginForm: LoginUserForm): Promise<LoginUserResponse> {
    try {
        const url = "Auth/login";
        const { data } = await api.post<LoginUserResponse>(url, userLoginForm);     
        return data;
    } catch (error: unknown) {
        const apiError = error as ApiError<LoginUserResponse>;
        if (apiError.response?.data) {
            return apiError.response.data;
        }
        throw new Error(apiError.message || 'Error al iniciar sesión');
    }
}