import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { bestSellers, lists, reviews } from './routes';

const { SERVER_PORT } = process.env;

const port = SERVER_PORT || 4000;
const app = express();
app.use(cors());

app.use('/lists', lists);
app.use('/best-sellers', bestSellers);
app.use('/reviews', reviews);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
