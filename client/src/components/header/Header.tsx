import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import classes from './Header.module.css';

type HeaderProps = {
  title: string;
  back?: boolean;
};

const Header = ({ title, back }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      {back && <BackButton onClick={() => navigate(-1)} />}
      <h3 style={{ marginLeft: back ? 0 : '4.5rem' }}>{title}</h3>
    </header>
  );
};

export default Header;
