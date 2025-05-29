import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import type { Book } from '../../types/book';
import { useNavigate } from 'react-router-dom';


interface CardBookProps {
  book: Book;
}

const CardBook: React.FC<CardBookProps> = ({ book }) => {
  // Función para renderizar las estrellas de calificación
const navigate = useNavigate();
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Media estrella
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Estrellas vacías
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Cortar el texto de la descripción si es muy largo
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen de portada */}
      <div className="h-64 overflow-hidden">
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31_qY1Cb9k_jCa_Cpkd6UV_uT4k271KEv5Pp4yuC0JB9yD9D1g9CgQwPvspKpkIF128g&usqp=CAU'}
          alt={`Portada de ${book.title}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Sin+portada';
          }}
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Título y autor */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 h-14" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">por {book.author}</p>

        {/* Calificación */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(book.averageRating || 0)}
          </div>
          <span className="text-sm text-gray-600">
            ({book.reviewCount || 0} {book.reviewCount === 1 ? 'reseña' : 'reseñas'})
          </span>
        </div>

        {/* Fecha de publicación */}
        <p className="text-xs text-gray-500 mb-3">
          Publicado el: {formatDate(book.publishedDate)}
        </p>

        {/* Descripción */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3 h-16">
          {truncateDescription(book.description || 'Sin descripción disponible')}
        </p>

        {/* Categoría */}
        {book.category && (
          <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.category}
          </div>
        )}
      </div>

      {/* Botón de acción */}
      <div className="px-4 pb-4">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300" onClick={() => navigate(`/books/${book.book_Id}`)}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CardBook;