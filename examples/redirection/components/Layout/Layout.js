import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import logo from './logo.jpeg';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <link rel='shortcut icon' href='/static/favicon.ico' />
    </Head>
    <img src={logo} />
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
