import { useState } from 'react';
import classes from './Reviews.module.css';
import useReviews from '../../hooks/useReviews';
import Loading from '../loading/Loading';
import Review from './Review';
const Reviews = ({ isbn }: { isbn: number }) => {
  const [show, setShow] = useState(false);
  const { reviews, loading, fetchReviews, fetched } = useReviews(isbn);

  return (
    <div className={`${classes.reviews} ${show ? classes.show : ''}`}>
      <button
        onClick={() => {
          if (!show) fetchReviews();
          setShow(!show);
        }}
      >
        <span className={classes.text}>Read reviews</span>
        <span
          className={`${classes.icon} ${
            show ? classes.normal : classes.rotated
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div className={classes.content}>
        {loading ? (
          <Loading size="small" />
        ) : fetched && reviews.length ? (
          <ul className={classes['review-list']}>
            {reviews.map(({ url, byline }) => (
              <Review key={url} author={byline} url={url} />
            ))}
          </ul>
        ) : (
          <p className={classes.empty}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
