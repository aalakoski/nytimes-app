import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getList } from '../api';

type UpdateInterval = 'WEEKLY' | 'MONTHLY';

type BookListProviderType = {
  children: ReactElement;
};

interface BookList {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: UpdateInterval;
}

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

const BookListContext = createContext(ctxDefaultValue);

export const useBookList = () => {
  const { list, loading } = useContext(BookListContext);

  return {
    list,
    loading,
  };
};

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
