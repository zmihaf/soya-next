# `applyReducers([reducers])`

Registers reducers to a component to enable code splitting.

> Ensure `applyReducers([reducers])` is rendered within [`createPage([...connectArgs])(Page, [reducers])`](create-page.md) hierarchy.

## Arguments

- [`reducers`] *(Object)*: An object of reducers which will be registered into a component.

  > Make sure each reducers has unique name within your application reducers.

## Returns

*(Function)*: A higher order React component class that loads or unloads registered reducers dynamically within the component lifecycle.

## Examples

```js
import { bindActionCreators, compose } from 'redux';
import { applyReducers } from 'soya-next/redux';

const reducers = {
  todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat(action.text);
      default:
        return state;
    }
  }
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTodo: text => ({
    type: 'ADD_TODO',
    text,
  }),
}, dispatch);

export default compose(
  applyReducers(reducers),
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
```
