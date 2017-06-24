import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  handleCompleteTodo = () => {
    this.props.completeTodo(this.props.todo.id);
  }

  handleDeleteTodo = () => {
    this.props.deleteTodo(this.props.todo.id);
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  }

  handleSave = text => {
    const id = this.props.todo.id;
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.completed}
                 onChange={this.handleCompleteTodo}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy'
                  onClick={this.handleDeleteTodo}
          />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing,
      })}
      >
        {element}
      </li>
    );
  }
}
