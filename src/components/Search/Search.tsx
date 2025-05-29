import { useState, useEffect, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useAppStore } from '../../stores/UseAppStore';
import type { SearchBooksParams } from '../../types/book';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const { searchBooks } = useAppStore();

  // Función para limpiar el timeout si existe
  const clearExistingTimeout = useCallback(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  }, [typingTimeout]);

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      clearExistingTimeout();
    };
  }, [clearExistingTimeout]);

  const onHandleSearch = (query: string) => {
    setSearchQuery(query);
    clearExistingTimeout();
  
    // Crear un nuevo timeout
    const timeoutId = setTimeout(() => {
      const searchParams: SearchBooksParams = { 
        query: query.trim(),
        page: 1,
        pageSize: 10
      };
      searchBooks(searchParams);
    }, 500); // 500ms de retraso
  
    setTypingTimeout(timeoutId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder="Buscar libros, autores, categorías..."
            value={searchQuery}
            onChange={(e) => onHandleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;