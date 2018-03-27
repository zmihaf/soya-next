import Par from "../Par/Par";
import Title from "../Title/Title";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.root}>
    <Title>CSS Modules Example</Title>
    <Par>This is how CSS Modules works in soya-next.</Par>
    <Title>CSS Modules Example</Title>
    <Par>This is how CSS Modules works in soya-next.</Par>
  </div>
);

export default App;
