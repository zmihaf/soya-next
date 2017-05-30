import Header from './Header'
import logo from './logo.png';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <img src={logo} />
    <Header />
    {props.children}
  </div>
)

export default Layout
