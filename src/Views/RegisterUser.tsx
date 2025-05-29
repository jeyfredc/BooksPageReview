import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { CreateuserForm } from "../types/auth";
import { useAppStore } from "../stores/UseAppStore";

const initialState: CreateuserForm = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: ""
}

const RegisterUser = () => {
    const [user, setUser] = useState<CreateuserForm>(initialState);
    const { createUser: fetchUser } = useAppStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchUser(user);
    }

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
                        <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
                        <p className="text-gray-600">Completa el formulario para registrarte</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={user.firstName}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={user.lastName}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-slate-950 text-white py-3 px-4 rounded-lg cursor-pointer font-medium hover:bg-slate-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Crear cuenta
                        </button>

                        <div className="text-center text-sm text-slate-600 mt-4">
                            ¿Ya tienes una cuenta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="font-medium text-indigo-600 hover:text-slate-950 transition duration-200 cursor-pointer"
                            >
                                Inicia sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;