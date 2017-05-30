import styles from './Par.module.scss';

export default (props) => (
  <p className={styles.root}>
    {props.children}
    <style modules>{styles}</style>
  </p>
);
