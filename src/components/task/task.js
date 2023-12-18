import React, { Component } from "react";
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    onDeleted: PropTypes.func,
    todo: PropTypes.object,
    onToggleCheck: PropTypes.func,
    onChangeEditing: PropTypes.func,
  };

  state = {
    value: this.props.todo.label,
  };

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit=(e)=> {
    e.preventDefault();
    this.props.onEditTask(this.props.todo.id, this.state.value);
  }

  render() {
    const { onDeleted, todo, onToggleCheck, onChangeEditing } = this.props;
    const { id, label, checked, date } = todo;

    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => onToggleCheck(id)}
            checked={checked}
            id={id}
          />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">{formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onChangeEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.onLabelChange}
          />
        </form>
      </>
    );
  }
}
