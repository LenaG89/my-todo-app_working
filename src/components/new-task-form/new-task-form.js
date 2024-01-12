import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {
      return alert("To add a new task, pass the function");
    },
  };
  static propTypes = {
    onItemAdded: PropTypes.func,
  };
  state = {
    label: "",
    min: "",
    sec: "",
  };
  onLabelDo = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.label !== "" &&
      this.state.sec !== "" &&
      this.state.sec !== "0"
    ) {
      this.props.onItemAdded(
        this.state.label,
        +this.state.min * 60000 + +this.state.sec * 1000
      );
      this.setState({
        label: "",
        min: "",
        sec: "",
      });
    }
  };
  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };
  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelDo}
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          value={this.state.min}
          onChange={this.onChangeMin}
          placeholder="Min"
          autoFocus
          pattern="[0-9]*"
          onInvalid={(e) => {
            e.target.setCustomValidity("Неверный формат данных");
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onChangeSec}
          value={this.state.sec}
          placeholder="Sec"
          autoFocus
          pattern="[0-9]*"
          onInvalid={(e) => {
            e.target.setCustomValidity("Неверный формат данных");
          }}
        />
        <button style={{ display: "none" }} type="submit"></button>
      </form>
    );
  }
}
