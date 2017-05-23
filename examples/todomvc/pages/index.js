import React from 'react'
import { render } from 'react-dom'
import App from '../containers/App'
import stylesheet from 'todomvc-app-css/index.css'

import { createPage } from 'soya-next';

const Index = () => (
  <div>
    <App />
    <style jsx global>{stylesheet}</style>
  </div>
);

export default createPage()(Index);
