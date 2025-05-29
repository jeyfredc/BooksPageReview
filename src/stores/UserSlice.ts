
import { postCreateUser, postLoginUser } from "../api/AuthAPI";
import { toast } from "react-toastify";
import type {  Auth, User,CreateuserForm,LoginUserForm } from "../types/auth";
import type { StateCreator } from "zustand";


export type UserSliceType = {
    user: Auth | User| null
    createUser: (createUserForm:CreateuserForm) => Promise<void>
    loginUser: (loginUserForm:LoginUserForm) => Promise<void>
    loading: boolean
    messageUser: string,
    setLoading: (loading: boolean) => void,
    printAlert: (isError: boolean | undefined, message: string) => void,
    isAuthenticated: boolean
    onLogout: () => void
}
console.log(localStorage.getItem('user'));

export const createUserSlice: StateCreator<UserSliceType> = (set, get) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    messageUser: '',
    isAuthenticated: localStorage.getItem('user') ? true : false,
createUser: async (createUserForm:CreateuserForm) => {
    get().setLoading(true);
    try {
        const response = await postCreateUser(createUserForm);
            
        set({ 
            user: response.user,  
            messageUser: response.message 
        });
        get().printAlert(false, response.message);
        
    } catch (error: any) {
        console.error('Error en fetchUser:', error);
        
        // Manejo de errores HTTP
        if (error.response) {
            // Error con respuesta del servidor (4xx, 5xx)
            const errorMessage = error.response.data?.message || 
                               error.message || 
                               'Error en la solicitud';
            
            set({ 
                user: null,
                messageUser: errorMessage
            });
            
            get().printAlert(true, errorMessage);
            
            // Si necesitas acceder a más detalles del error:
            console.log('Status:', error.response.status);
            console.log('Datos del error:', error.response.data);
            
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            get().printAlert(true, 'No se recibió respuesta del servidor');
        } else {
            // Error al hacer la petición
            get().printAlert(true, `Error: ${error.message}`);
        }
    } finally {
        get().setLoading(false);
    }
},

loginUser: async (userLoginForm:LoginUserForm) => {
    get().setLoading(true);
    try {
        const response = await postLoginUser(userLoginForm);
        set({
            user: response.user,
            messageUser: response.message
        });
        localStorage.setItem('user', JSON.stringify(response.user)); 
        set({
            isAuthenticated: true
        });
        get().printAlert(false, response.message);
    } catch (error: any) {
        console.error('Error en loginUser:', error);
        // Manejo de errores HTTP
        if (error.response) {   
            // Error con respuesta del servidor (4xx, 5xx)
            const errorMessage = error.response.data?.message || 
                               error.message || 
                               'Error en la solicitud';
            
            set({ 
                user: null,
                messageUser: errorMessage
            });
            
            get().printAlert(true, errorMessage);
            
            // Si necesitas acceder a más detalles del error:
            console.log('Status:', error.response.status);
            console.log('Datos del error:', error.response.data);
            
        }
        else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            get().printAlert(true, 'No se recibió respuesta del servidor');
        }
        else {  
            // Error al hacer la petición
            get().printAlert(true, `Error: ${error.message}`);
        }
    } finally {
        get().setLoading(false);
    }
},

    loading: false,
    setLoading: (loading: boolean) => {
        set({ loading });
    },
    printAlert: (isError, message) => {
        if (isError) {
            toast.error(message)
        } else {
            toast.success(message)
        }
    },
    onLogout: () => {
        localStorage.removeItem('user');
        set({
            user: null,
            isAuthenticated: false
        });
    }
})