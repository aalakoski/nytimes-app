import { Book } from './book';
import { UpdateInterval } from './update-interval';

export interface BestSellersResponse {
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
