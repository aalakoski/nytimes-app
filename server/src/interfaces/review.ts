export interface ReviewResponse {
  status: 'OK';
  copyright: string;
  num_results: number;
  results: Review[];
}

export interface Review {
  url: string;
  publication_dt: string;
  byline: string;
  book_title: string;
  book_author: string;
  summary: string;
  isbn13: string[];
}
