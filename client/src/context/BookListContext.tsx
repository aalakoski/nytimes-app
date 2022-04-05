import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getList } from '../api';
import { BookList } from '../interfaces/book-list';

type BookListProviderType = {
  children: ReactElement;
};

type BookListContextType = {
  list: BookList[];
  setList: Dispatch<SetStateAction<BookList[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const ctxDefaultValue: BookListContextType = {
  list: [],
  setList: () => {},
  loading: true,
  setLoading: () => {},
};

export const BookListContext = createContext(ctxDefaultValue);

const BookListProvider = ({ children }: BookListProviderType) => {
  const [list, setList] = useState<BookList[]>(ctxDefaultValue.list);
  const [loading, setLoading] = useState(ctxDefaultValue.loading);

  const fetchList = async () => {
    try {
      setLoading(true);
      const data = await getList();
      setList(data);
    } catch (e) {
      console.log('fetchList error: ', e);
      // TODO: Error handling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <BookListContext.Provider
      value={{
        list,
        setList,
        loading,
        setLoading,
      }}
    >
      {children}
    </BookListContext.Provider>
  );
};

export default BookListProvider;
