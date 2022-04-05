import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { ListNameResponse } from '../interfaces';
const lists = Router();

const { NY_TIMES_API_HOST, NY_TIMES_API_KEY } = process.env;

console.log(process.env);

lists.get('/', async (_: Request, res: Response) => {
  const apiKey = `api-key=${NY_TIMES_API_KEY}`;
  const url = `${NY_TIMES_API_HOST}/lists/names.json?${apiKey}`;
  const response = await fetch(url);
  if (response.ok) {
    const { results } = (await response.json()) as ListNameResponse;
    return res.json({ lists: results });
  }
});

export default lists;
