import styles from './Title.module.scss';

export default (props) => (
  <h1 className={styles.root}>
    {props.children}
  </h1>
);
