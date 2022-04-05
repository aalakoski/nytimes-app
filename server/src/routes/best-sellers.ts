import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { BestSellersResponse } from '../interfaces';
const bestSellers = Router();

const { NY_TIMES_API_HOST, NY_TIMES_API_KEY } = process.env;

bestSellers.get('/:list', async (req: Request, res: Response) => {
  const apiKey = `api-key=${NY_TIMES_API_KEY}`;

  // IMPL NOTE:
  // ?limit=0 will return full data. We act it's fine since limit=0 would be equvalent to "limit nothing"
  // in reality, this will evaluate to 0 || undefined -> undefined.
  // A way to solve this would be to use the ?? operator instesd of ||
  // but then we'd need to handle things like NaN if user does ?limit=foo etc.
  // I'm aiming for the easiest solution here.

  const limit: number = parseInt(req.query.limit as string) || undefined;
  const { list } = req.params;
  if (!list) {
    return res
      .status(400)
      .json({ message: `Bad request. Missing parameter 'list'.` });
  }

  const url = `${NY_TIMES_API_HOST}/lists/current/${list}.json?${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const { results } = (await response.json()) as BestSellersResponse;
    const sorted = results.books
      .sort((a, b) => a.rank - b.rank)
      .slice(0, limit);

    // IMPL NOTE:
    // Initially thought of pre-fetching reviews for each 10 books,
    // but this seemed to be a bit of a performance bottleneck and in addition
    // seem to hit NY API limits easily.
    // Leaving the implementation commented here just for inspection purposes.
    // other option would've been to map Promise.all() isbns of the books and fetch
    // all reviews at the same time rather than in sequence with the .reduce() here.

    /* const withReviews = await sorted.reduce(async (acc, book) => {
      const books = await acc;
      const { primary_isbn10 } = book;
      const reviews = await getReviews(primary_isbn10);
      return Promise.resolve([...books, { ...book, reviews: reviews || [] }]);
    }, Promise.resolve([])); */

    return res.json({
      bestSellers: sorted,
    });
  }
});

// used with the reduce for pre-fetching the reviews
/* async function getReviews(isbn: number) {
  const apiKey = `api-key=${NY_TIMES_API_KEY}`;
  const url = `${NY_TIMES_API_HOST}/reviews.json?isbn=${isbn}&${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = (await response.json()) as ReviewResponse;
    console.log(data);
    const { results } = data;
    return results;
  }
} */

export default bestSellers;
