import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../api';
import { Book } from '../interfaces/book';

const useBooks = (list: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBooks(list);
      setBooks(data);
    } catch (e) {
      console.log('fetchBooks error: ', e);
      // TODO error handling
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, list]);

  return { books, loading };
};

export default useBooks;
