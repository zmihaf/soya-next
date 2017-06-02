import styles from './Title.module.css';

export default (props) => (
  <h1 className={styles.root}>
    {props.children}
  </h1>
);
