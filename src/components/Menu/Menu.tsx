import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../stores/UseAppStore';
import type { User } from '../../types/auth';



const Menu = () => {
const state = useAppStore();




const user = state.user as User;


const usernameLetters = user.username.split('@')[0]; 

const firstLetterName = usernameLetters.charAt(0).toUpperCase(); 

const lastLetterName = usernameLetters.charAt(usernameLetters.length - 1).toUpperCase(); 

const initialLetterName = `${firstLetterName}${lastLetterName}`;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Función para cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-end mr-4 bg-slate-950" ref={menuRef}>
      {/* Botón del menú de usuario */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-medium">{initialLetterName}</span>
        </div>
        <span className="text-white">{user.username}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-700">{user.email}</p>
          </div>
          
          <Link
            to="/perfil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Mi perfil
          </Link>
          
          <Link
            to="/configuracion"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Configuración
          </Link>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center cursor-pointer"
            onClick={() => state.onLogout()}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;