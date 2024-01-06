import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

export default class Task extends Component {
  static propTypes = {
    onDeleted: PropTypes.func,
    todo: PropTypes.object,
    onToggleCheck: PropTypes.func,
    onChangeEditing: PropTypes.func,
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
    tickTac: PropTypes.func,
  };

  state = {
    value: this.props.todo.label,
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.props.tickTac(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEditTask(this.props.todo.id, this.state.value);
  };

  render() {
    const {
      onDeleted,
      todo,
      onToggleCheck,
      onChangeEditing,
      onStartTimer,
      onStopTimer,
    } = this.props;
    const { id, label, checked, date, timer } = todo;
    const minutes = Math.floor(timer / 1000 / 60);
    const seconds = (timer / 1000) % 60;
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
            <span className="title">{label}</span>
            <span className="description">
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
              <button
                className="icon icon-play"
                onClick={onStartTimer}
              ></button>
              <button
                className="icon icon-pause"
                onClick={onStopTimer}
              ></button>
            </span>
            <span className="description">
              {formatDistanceToNow(date, { includeSeconds: true })}
            </span>
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
