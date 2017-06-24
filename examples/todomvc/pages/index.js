import React from 'react';
import App from '../containers/App';
import 'todomvc-app-css/index.css';

import { createPage } from 'soya-next';

const Index = () => (
  <div>
    <App />
  </div>
);

export default createPage()(Index);
