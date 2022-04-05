import classes from './Review.module.css';
type ReviewProps = {
  author: string;
  url: string;
};

const Review = ({ author, url }: ReviewProps) => {
  return (
    <li>
      <a href={url} rel="noreferrer" target="_blank">
        {author}
      </a>
      <span className={classes.external}>
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </li>
  );
};

export default Review;
