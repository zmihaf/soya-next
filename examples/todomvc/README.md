# Redux TodoMVC Example

## Usage

Clone this repository:

```bash
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/todomvc
```

Install and run it:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

This example is exactly the same as [Redux TodoMVC](https://github.com/reactjs/redux/tree/master/examples/todomvc).
The only difference is that you need not to worry about unregistered reducers anymore and they're automatically code-splitted.

To make it works, wrap every page with `createPage()` as follows:

```js
import { createPage } from 'soya-next';

const reducers = {
  uniqueName(state, action) {
    return state;
  },
};

const Page = () => {};

Page.getIntialProps = ({ store }) => {
  // you can dispatch any actions here
  // store.dispatch(actionCreator());

  // or get current store state
  // store.getState()
};

export default createPage(mapStateToProps, mapDispatchToProps)(Page, reducers);
```

To use it in your component, you can do the following:

```js
import { compose } from 'redux';
import { applyReducers } from 'soya-next/redux';
import { connect } from 'react-redux';

export default compose(
  applyReducers(reducers),                      // apply reducer first
  connect(mapStateToProps, mapDispatchToProps)  // then connect to it
)(Component);
```

> Note: ensure each reducers has unique name within your application
