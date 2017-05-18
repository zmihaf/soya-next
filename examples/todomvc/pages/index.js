import React from 'react'
import { render } from 'react-dom'
import App from '../containers/App'
// import 'todomvc-app-css/index.css'

import { createPage } from 'soya-next';

const Index = () => <App />;

export default createPage()(Index);
