import React, { useState } from 'react';
import DetailCommentsBook from './DetailCommentsBook';
import type { CreateReview } from '../../types/book';
import { useAppStore } from '../../stores/UseAppStore';
import { StarRating } from './StartRating';

interface FormReviewProps {
    book_Id: string;
}

// Componente para las estrellas de valoración


const FormReview: React.FC<FormReviewProps> = ({ book_Id }) => {
    const { createReview } = useAppStore();
    const objUser = JSON.parse(localStorage.getItem('user') || '{}');

    const [formCreateReview, setFormCreateReview] = React.useState<CreateReview>({
        bookId: book_Id,
        rating: 0,
        comment: '',
        userId: objUser.id,
    });

    const handleRatingChange = (newRating: number) => {
        setFormCreateReview(prev => ({
            ...prev,
            rating: newRating
        }));
    };

    const onHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormCreateReview(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formCreateReview.rating === 0) {
            alert('Por favor, selecciona una calificación');
            return;
        }
        await createReview(formCreateReview);
        // Opcional: resetear el formulario después de enviar
        setFormCreateReview(prev => ({
            ...prev,
            rating: 0,
            comment: ''
        }));
    };

    return (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Deja tu reseña</h3>
            <DetailCommentsBook />
            <form onSubmit={onHandleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calificación
                    </label>
                    <StarRating 
                        rating={formCreateReview.rating} 
                        onRatingChange={handleRatingChange} 
                    />
                    {formCreateReview.rating > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                            Has seleccionado {formCreateReview.rating} {formCreateReview.rating === 1 ? 'estrella' : 'estrellas'}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Tu comentario
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formCreateReview.comment}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Escribe tu reseña aquí..."
                        onChange={onHandleChange}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={formCreateReview.rating === 0 || !formCreateReview.comment.trim()}
                >
                    Publicar reseña
                </button>
            </form>
        </div>
    );
};

export default FormReview;