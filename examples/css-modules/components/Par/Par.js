import PropTypes from "prop-types";
import styles from "./Par.module.css";

const Par = ({ children }) => <p className={styles.root}>{children}</p>;

Par.propTypes = {
  children: PropTypes.node
};

export default Par;
