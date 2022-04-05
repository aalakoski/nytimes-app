const host = process.env.REACT_APP_API_HOST;

export const getList = async () => {
  const res = await fetch(`${host}/lists`, {
    headers: { 'Content-type': 'application/json' },
  });
  const { lists } = await res.json();
  return lists;
};

export const getBooks = async (list: string) => {
  const res = await fetch(`${host}/best-sellers/${list}?limit=10`, {
    headers: { 'Content-type': 'application/json' },
  });
  const { bestSellers } = await res.json();
  return bestSellers;
};

export const getReviews = async (isbn: number) => {
  const res = await fetch(`${host}/reviews/${isbn}`, {
    headers: { 'Content-type': 'application/json' },
  });
  const { reviews } = await res.json();
  return reviews;
};
