import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { ReviewResponse } from '../interfaces';
const { NY_TIMES_API_HOST, NY_TIMES_API_KEY } = process.env;
const reviews = Router();

reviews.get('/:isbn', async (req: Request, res: Response) => {
  const apiKey = `api-key=${NY_TIMES_API_KEY}`;
  const { isbn } = req.params;
  if (!isbn) {
    return res
      .status(400)
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

export default reviews;
