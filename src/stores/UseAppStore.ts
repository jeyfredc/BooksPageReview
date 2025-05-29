import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, type UserSliceType } from './UserSlice';
import { createBooksSlice, type BooksSliceType } from './BooksSlice';



export const useAppStore = create<UserSliceType & BooksSliceType>()(devtools((...a)=> ({
    ...createUserSlice(...a),
    ...createBooksSlice(...a)
})))