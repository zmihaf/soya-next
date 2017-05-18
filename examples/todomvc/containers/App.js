import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

import { createComponent } from 'soya-next';
import todos from '../reducers/todos'

const App = ({todos, actions}) => (
  <div className='todoapp'>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default createComponent(
  mapStateToProps,
  mapDispatchToProps
)(App, { todos })
