import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

type UpdateInterval = 'WEEKLY' | 'MONTHLY';

interface ReviewResponse {
  status: 'OK';
  copyright: string;
  num_results: number;
  results: Review[];
}

interface Review {
  url: string;
  publication_dt: string;
  byline: string;
  book_title: string;
  book_author: string;
  summary: string;
  isbn13: string[];
}

interface ListNameResponse {
  results: ListName[];
}

interface BestSellersResponse {
  list_name: string;
  bestsellers_date: string;
  published_date: string;
  display_name: string;
  normal_list_ends_at: number;
  updated: UpdateInterval;
  results: {
    books: Book[];
  };
}

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

interface ListName {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: UpdateInterval;
}

const { SERVER_PORT, NY_TIMES_API_HOST, NY_TIMES_API_KEY } = process.env;
const port = SERVER_PORT || 4000;
const app = express();
app.use(cors());

app.get('/lists', async (req: Request, res: Response) => {
  const apiKey = `api-key=${NY_TIMES_API_KEY}`;
  const url = `${NY_TIMES_API_HOST}/lists/names.json?${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const { results } = (await response.json()) as ListNameResponse;
    return res.json({ lists: results });
  }
});

app.get('/best-sellers/:list', async (req: Request, res: Response) => {
  // cors
  res.header('Access-Control-Allow-Origin', '*');

  const apiKey = `api-key=${NY_TIMES_API_KEY}`;

  // IMPL NOTE: ?limit=0 will return full data which we act it's fine sicne limit=0 would be equvalent to "limit nothing"
  const limit: number = parseInt(req.query.limit as string) || undefined;
  const { list } = req.params;
  if (!list) {
    return res
      .status(409)
      .json({ message: `Bad request. Missing parameter 'list'.` });
  }

  const url = `${NY_TIMES_API_HOST}/lists/current/${list}.json?${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const { results } = (await response.json()) as BestSellersResponse;
    const sorted = results.books
      .sort((a, b) => a.rank - b.rank)
      .slice(0, limit);

    // const withReviews = await sorted.reduce(async (acc, book) => {
    //   const books = await acc;
    //   const { primary_isbn10 } = book;
    //   const reviews = await getReviews(primary_isbn10);
    //   return Promise.resolve([...books, { ...book, reviews: reviews || [] }]);
    // }, Promise.resolve([]));

    return res.json({
      bestSellers: sorted,
    });
  }
});

// async function getReviews(isbn: number) {
//   const apiKey = `api-key=${NY_TIMES_API_KEY}`;
//   const url = `${NY_TIMES_API_HOST}/reviews.json?isbn=${isbn}&${apiKey}`;
//   const response = await fetch(url);
//   if (response.ok) {
//     const data = (await response.json()) as ReviewResponse;
//     console.log(data);
//     const { results } = data;
//     return results;
//   }
// }

app.get('/reviews/:isbn', async (req: Request, res: Response) => {
  // cors
  res.header('Access-Control-Allow-Origin', '*');

  const apiKey = `api-key=${NY_TIMES_API_KEY}`;
  const { isbn } = req.params;
  if (!isbn) {
    return res
      .status(409)
      .json({ message: `Bad request. Missing parameter 'isbn'.` });
  }

  const url = `${NY_TIMES_API_HOST}/reviews.json?isbn=${isbn}&${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = (await response.json()) as ReviewResponse;
    const { results } = data;
    return res.json({ reviews: results });
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
