import PropTypes from 'prop-types';
import styles from './Title.module.css';

const Title = ({ children }) => (
  <h1 className={styles.root}>
    {children}
  </h1>
);

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
