import  { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Search from '../components/Search/Search';
import { useAppStore } from '../stores/UseAppStore';
import CardBook from '../components/Book/CardBook';
import type { Book } from '../types/book';

const BookPage = () => {

  const { books, fetchBooks } = useAppStore();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    if (!user) {
        navigate('/');
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetchBooks();
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
      fetchData();
    }, [fetchBooks]);

  return (
    <><Search />
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {books?.map((book: Book) => (
            <CardBook key={book.book_Id} book={book} />
        ))}
    </div>
    </>
  )
}

export default BookPage