import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Loading from '../components/loading/Loading';
import { useBookList } from '../context/BookListContext';
import classes from './Lists.module.css';

const Lists = () => {
  const { list, loading } = useBookList();
  return (
    <>
      <Header title="Book categories to check" />
      {loading ? (
        <Loading />
      ) : (
        <ul className={classes.list}>
          {list.map(({ display_name, list_name_encoded }, i, arr) => (
            <li key={list_name_encoded} className={classes.item}>
              <Link
                to={`/best-sellers/${list_name_encoded}`}
                className={classes.link}
              >
                {display_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Lists;
