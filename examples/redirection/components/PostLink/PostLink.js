import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./PostLink.module.css";

const PostLink = props => (
  <li className={styles.postLink}>
    <Link as={`/pos/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

PostLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PostLink;
