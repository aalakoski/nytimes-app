import { useParams } from 'react-router-dom';
import Book from '../components/book/Book';
import Header from '../components/header/Header';
import Loading from '../components/loading/Loading';
import useBooks from '../hooks/useBooks';
import classes from './BestSellers.module.css';

const BestSellers = () => {
  const { list } = useParams();
  const { books, loading } = useBooks(list!);
  return (
    <>
      <Header title="Best sellers from this category" back />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.grid}>
          {books.map(({ title, primary_isbn10, author, book_image }) => (
            <Book
              key={primary_isbn10}
              isbn={primary_isbn10}
              title={title}
              image={book_image}
              author={author}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BestSellers;
