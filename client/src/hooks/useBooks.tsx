import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../api';

interface Book {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: number;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: number;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: ISBN[];
}

interface ISBN {
  isbn10: number;
  isbn13: string;
}

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
