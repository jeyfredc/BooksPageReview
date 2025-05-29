import api from "../lib/axios";
import type { Book, CreateReview, PaginatedResponse, Review, SearchBooksParams } from "../types/book";
import type { ApiError } from "../types";



export async function GetAllBooks(): Promise<Book[]> {
    try {
        const url = "Books";
        const { data } = await api.get<Book[]>(url);     
        return data
    } catch (error: unknown) {
            const apiError = error as ApiError<Book[]>;
            if (apiError.response?.data) {
                return apiError.response.data;
            }
            throw new Error(apiError.message || 'Error al crear el usuario');
        }
}

export async function GetSearchBooks(params: SearchBooksParams): Promise<PaginatedResponse<Book>> {
    try {
      const { query, page = 1, pageSize = 10 } = params;
      
      const url = "Search/books";
      const { data } = await api.get<PaginatedResponse<Book>>(url, {
        params: {
          query,
          page,
          pageSize,

        }
      });
      
      return data;
    } catch (error: unknown) {
            const apiError = error as ApiError<PaginatedResponse<Book>>;
            if (apiError.response?.data) {
                return apiError.response.data;
            }
            throw new Error(apiError.message || 'Error al crear el usuario');
        }
  }

export async function GetBookById(book_Id: string): Promise<Book> {
    try {
        const url = `Books/${book_Id}`;
        const { data } = await api.get<Book>(url);     
        return data;
    } catch (error: unknown) {
            const apiError = error as ApiError<Book>;
            if (apiError.response?.data) {
                return apiError.response.data;
            }
            throw new Error(apiError.message || 'Error al obtener el libro');
        }
}

export async function PostCreateReview(review: CreateReview): Promise<Review> {
    try {
        const url = "Reviews";
        const { data } = await api.post<Review>(url, review);     
        return data;
    } catch (error: unknown) {
            const apiError = error as ApiError<Review>;
            if (apiError.response?.data) {
                return apiError.response.data;
            }
            throw new Error(apiError.message || 'Error al crear el usuario');
        }
}


export async function GetReviewsByBookId(book_Id: string): Promise<Review[]> {
    try {
        const url = `Reviews/${book_Id}`;
        const { data } = await api.get<Review[]>(url);     
        return data;
    } catch (error: unknown) {
            const apiError = error as ApiError<Review[]>;
            if (apiError.response?.data) {
                return apiError.response.data;
            }
            throw new Error(apiError.message || 'Error al obtener el libro');
        }
}