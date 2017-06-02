import styles from './Par.module.scss';

export default (props) => (
  <p className={styles.root}>
    {props.children}
  </p>
);
