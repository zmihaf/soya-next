import Header from './Header'
import logo from './logo.png';
import styles from './MyLayout.module.css';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <img src={logo} />
    <Header />
    <div className={styles.content}>
      {props.children}
    </div>
    <style modules>{styles}</style>
  </div>
)

export default Layout
