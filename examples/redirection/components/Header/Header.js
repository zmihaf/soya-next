import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.header}>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link as='/tentang-kami' href='/about'>
      <a>About</a>
    </Link>
  </div>
);

export default Header;
