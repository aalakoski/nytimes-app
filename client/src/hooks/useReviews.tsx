import { useState } from 'react';
import { getReviews } from '../api/index';
import { Review } from '../interfaces/review';

const useReviews = (isbn: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchReviews = async () => {
    if (fetched) return;
    try {
      setLoading(true);
      const data = await getReviews(isbn);
      setReviews(data);
    } catch (e) {
      console.log('fetchReviews err: ', e);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  };

  return { reviews, loading, fetchReviews, fetched };
};

export default useReviews;
