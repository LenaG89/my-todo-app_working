import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

 const Task = ({
  onDeleted,
  todo,
  onToggleCheck,
  onChangeEditing,
  onEditTask,
  onStartTimer,
  onStopTimer,
  tickTac
}) => {
  Task.propTypes = {
    onDeleted: PropTypes.func,
    todo: PropTypes.object,
    onToggleCheck: PropTypes.func,
    onChangeEditing: PropTypes.func,
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
    tickTac: PropTypes.func,
  };
  const { id, label, checked, date, timer } = todo;

const [value, setValue] = useState(label)
  
  useEffect(() => {
    let timerID = setInterval(() => tickTac(), 1000);
    return () => {clearInterval(timerID)};
  }, [tickTac]
  );
 

 const onLabelChange = (e) => {
    setValue( e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onEditTask(todo.id, value);
  };

  
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            value={value}
            onChange={onLabelChange}
          />
        </form>
      </>
    );
  }

export default Task
