import Par from '../Par/Par';
import Title from '../Title/Title';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.root}>
    <Title>CSS Modules with SCSS Example 1</Title>
    <Par>This is how CSS Modules with SCSS 1 works in soya-next.</Par>
    <hr />
    <Title>CSS Modules with SCSS Example 2</Title>
    <Par>This is how CSS Modules with SCSS 2 works in soya-next.</Par>
  </div>
);

export default App;
