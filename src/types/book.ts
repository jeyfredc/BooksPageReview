export type Book = {
    book_Id: string | null;
    title: string;
    author: string;
    description: string;
    coverImageUrl: string;
    publishedDate: string;
    category: string | null;
    averageRating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    review_Id: string | null;
    userId: string | null;
}

export interface SearchBooksParams {
    query: string;
    page?: number;
    pageSize?: number;
}

// Esta es la interfaz que coincide con tu respuesta de búsqueda
export interface SearchBooksResponse {
    items: Book[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Si necesitas un tipo genérico para respuestas paginadas
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
}



export interface Review {
    id: string;
    bookId: string;
    bookTitle: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateReview {
    bookId: string;
    rating: number;
    comment: string;
    userId: string;
}