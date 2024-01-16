import React, { useState } from "react";
import PropTypes from "prop-types";

const NewTaskForm = ({ onItemAdded }) => {
  NewTaskForm.defaultProps = {
    onItemAdded: () => {
      return alert("To add a new task, pass the function");
    },
  };
  NewTaskForm.propTypes = {
    onItemAdded: PropTypes.func,
  };

  const [label, setLabel] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onLabelDo = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label !== "" && sec !== "" ) {
      onItemAdded(label, Number(min) * 60000 + Number(sec) * 1000);
      setLabel("");
      setMin("");
      setSec("");
    }
  };
  const onChangeMin = (e) => {
    setMin(e.target.value);
  };

  const onChangeSec = (e) => {
    setSec(e.target.value);
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelDo}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        value={min}
        onChange={onChangeMin}
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
        onChange={onChangeSec}
        value={sec}
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
};

export default NewTaskForm;
