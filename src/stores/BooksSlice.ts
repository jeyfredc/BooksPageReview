import type { StateCreator } from "zustand";
import type { Book, CreateReview, Review, SearchBooksParams } from "../types/book";
import { GetAllBooks, GetBookById, GetReviewsByBookId, GetSearchBooks, PostCreateReview } from "../api/BookAPI";
import { toast } from "react-toastify";

export type BooksSliceType = {
    books: Book[] | null;
    currentBook: Book | null;  
    totalBooks: number;
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
    reviews: Review[];
    
    fetchBooks: () => Promise<void>;
    searchBooks: (params: SearchBooksParams) => Promise<void>;
    getBookById: (id: string) => Promise<Book | null>;
    clearCurrentBook: () => void; 
    getReviewsByBookId: (bookId: string) => Promise<Review[] >;
    createReview: (review: CreateReview) => Promise<void>;
    printAlert: (isError: boolean | undefined, message: string) => void,

}

export const createBooksSlice: StateCreator<BooksSliceType> = (set, get) => ({
    books: null,
    currentBook: null,
    totalBooks: 0,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
    reviews: [],
    
    fetchBooks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await GetAllBooks();
            set({ 
                books: response,
                isLoading: false
            });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error fetching books',
                isLoading: false
            });
        }
    },
    
    searchBooks: async (params: SearchBooksParams) => {
        set({ isLoading: true, error: null });
        try {
            if (!params.query?.trim()) {
                await get().fetchBooks();
                return;
            }

            const response = await GetSearchBooks(params);
            const booksSearch: Book[] = response.items || [];

            set({
                books: booksSearch,
                totalBooks: response.total || 0,
                currentPage: response.page || 1,
                totalPages: response.totalPages || 1,
                isLoading: false
            });
            get().printAlert(false, 'Consulta exitosa');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error searching books';
            set({ 
                error: errorMessage,
                books: [],
                isLoading: false
            });
        }
    },

    getBookById: async (bookId: string) => {
        set({ isLoading: true, error: null });
        try {
            // 1. Primero obtenemos el libro
            const book = await GetBookById(bookId);
            
            if (!book) {
                throw new Error("Book not found");
            }
    
            // 2. Actualizamos el estado con el libro
            set({ 
                currentBook: book,
                isLoading: true // Mantenemos el loading mientras cargamos las reseñas
            });
    
            try {
                // 3. Luego obtenemos las reseñas
                await get().getReviewsByBookId(bookId);
            } catch (error) {
                console.error('Error cargando reseñas:', error);
                // No lanzamos el error para no fallar la carga del libro
            }
    
            // 4. Finalizamos el loading
            set({ isLoading: false });
    
            return book;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error fetching book';
            get().printAlert(true, errorMessage);
            set({ 
                error: errorMessage,
                isLoading: false
            });
            return null;
        }
    },

    getReviewsByBookId: async (bookId: string) => {
        set({ isLoading: true, error: null });
        try {
            const reviews = await GetReviewsByBookId(bookId);
            console.log(reviews);
            
            if (!reviews) {
                throw new Error("Reviews not found");
            }

            set({ 
                reviews: reviews,
                isLoading: false
            });

            return reviews;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error fetching reviews';
            get().printAlert(true, errorMessage);
            set({ 
                error: errorMessage,
                isLoading: false
            });
            return [];
        }
    },

    createReview: async (review: CreateReview) => {
        set({ isLoading: true, error: null });
        try {
            const response = await PostCreateReview(review);
            if(response) {
                get().printAlert(false, 'Se ha creado la reseña correctamente'); 
                get().getReviewsByBookId(review.bookId);
            }
            set({ isLoading: false });
        } catch (error) {
            console.log(error);
            
            const errorMessage = error instanceof Error ? error.message : 'Error creating review';
            get().printAlert(true, errorMessage);
            set({ 
                error: errorMessage,
                isLoading: false
            });
        }
    },    printAlert: (isError, message) => {
            if (isError) {
                toast.error(message)
            } else {
                toast.success(message)
            }
        },

    clearCurrentBook: () => {
        set({ currentBook: null });
    }
});