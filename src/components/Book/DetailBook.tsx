import { useParams } from 'react-router-dom';
import { useAppStore } from '../../stores/UseAppStore';
import { useEffect } from 'react';
import FormReview from './FormReview';



export default function DetailBook() {
  const { book_Id } = useParams<{ book_Id: string }>();


  const { getBookById, currentBook } = useAppStore();



  useEffect(() => {
    const fetchBook = async () => {
      try {
        await getBookById(book_Id!);
      } catch (error) {
        console.error('Error fetching currentBook:', error);
      }
    }
    fetchBook();
  }, [getBookById, book_Id]);




  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Botón de volver */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver atrás
      </button>

      {/* Información del libro */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          {/* Portada del libro */}
          <div className="md:flex-shrink-0 p-6">
            <img
              className="h-64 w-48 object-cover md:h-96 md:w-64 rounded"
              src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31_qY1Cb9k_jCa_Cpkd6UV_uT4k271KEv5Pp4yuC0JB9yD9D1g9CgQwPvspKpkIF128g&usqp=CAU'}
              alt={currentBook?.title}
            />
          </div>

          {/* Detalles del libro */}
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              {currentBook?.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{currentBook?.title}</h1>
            <p className="text-xl text-gray-600 mt-1">por {currentBook?.author}</p>

            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(currentBook?.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-2">
                  {currentBook?.averageRating} ({currentBook?.reviewCount} reseñas)
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                <p className="mt-1 text-gray-600">{currentBook?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha de publicación</h4>
                  <p className="text-gray-900">{new Date(currentBook?.publishedDate || '').toLocaleDateString()}</p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentarios</h2>


        <FormReview book_Id={book_Id!} />

      </div>
    </div>
  );
}