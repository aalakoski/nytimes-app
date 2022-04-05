import classes from './Loading.module.css';

type LoadingProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

const Loading = (props: LoadingProps) => {
  const { variant = 'primary', size = 'medium' } = props;
  return (
    <div className={classes.container}>
      <span
        className={`${classes['base']} ${classes[variant]} ${classes[size]}`}
        data-testid="loading"
      />
    </div>
  );
};

export default Loading;
