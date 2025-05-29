import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import type {  LoginUserForm } from "../types/auth";
import { useAppStore } from "../stores/UseAppStore";

const initialState: LoginUserForm = {
    usernameOrEmail: "",
    password: ""
}


const LoginUser = () => {
    const [userLogin, setUserLogin] = useState<LoginUserForm>(initialState);
    const { loginUser,isAuthenticated} = useAppStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(userLogin);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/books');
        }
    }, [navigate,isAuthenticated]);
        

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
                {/* Imagen lateral - Solo visible en pantallas grandes */}
                <div className="hidden md:flex md:w-1/2 bg-slate-950 p-8 flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Bienvenido a Nuestra Plataforma de reseñas de libros</h2>
                        <p className="text-indigo-100 mt-4">
                            Únete a miles de usuarios que ya están compartiendo sus opiniones sobre los mejores libros. Crea tu cuenta y empieza a explorar reseñas, recomendaciones y mucho más.
                        </p>
                    </div>

                </div>

                {/* Formulario */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Inicia Sesión</h1>
                        <p className="text-gray-600">Ingresa usuario/email y contraseña si no tienes cuenta puedes crear una facilmente  </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario o Correo Electronico</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={userLogin.usernameOrEmail}
                                onChange={(e) => setUserLogin({ ...userLogin, usernameOrEmail: e.target.value })}
                                required
                            />
                        </div>


                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <a href="#" className="text-xs text-slate-950 hover:text-slate-800">¿Olvidaste tu contraseña?</a>
                            </div>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={userLogin.password}
                                onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-slate-950 text-white py-3 px-4 rounded-lg cursor-pointer font-medium hover:bg-slate-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Iniciar Sesión
                        </button>

                        <div className="text-center text-sm text-slate-600 mt-4">
                            ¿No tienes cuenta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="font-medium text-indigo-600 hover:text-slate-950 transition duration-200 cursor-pointer"
                            >
                                Crear Cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;