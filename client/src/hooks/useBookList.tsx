import { useContext } from 'react';
import { BookListContext } from '../context/BookListContext';

const useBookList = () => {
  const { list, loading } = useContext(BookListContext);
  return {
    list,
    loading,
  };
};

export default useBookList;
