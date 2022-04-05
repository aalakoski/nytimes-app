import Reviews from '../reviews/Reviews';
import classes from './Book.module.css';

type BookProps = {
  title: string;
  author: string;
  isbn: number;
  image?: string;
};

const Book = ({ image, title, isbn, author }: BookProps) => {
  return (
    <div className={classes.book}>
      {image && <img src={image} alt={title} />}
      <div className={classes['book-content']}>
        <div className={classes.title}>{title}</div>
        <div className={classes.author}>by: {author}</div>
        <div className={classes.isbn}>ISBN: {isbn}</div>
        <Reviews isbn={isbn} />
      </div>
    </div>
  );
};

export default Book;
