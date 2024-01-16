import React, {useState, useEffect} from "react";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";

 const Task =  ({
  onDeleted,
  todo,
  onToggleCheck,
  onChangeEditing,
  onEditTask,
  onStartTimer,
  onStopTimer,

}) => {
  Task.propTypes = {
    onDeleted: PropTypes.func,
    todo: PropTypes.object,
    onToggleCheck: PropTypes.func,
    onChangeEditing: PropTypes.func,
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
  };
  const { id, label, checked, date, timer } = todo;
  const [currentDate, setCurrentDate] = useState(new Date());
const [value, setValue] = useState(label)


const handleDateChange = () => {
  setCurrentDate(new Date());
};


useEffect(() => {
  const interval = setInterval(() => handleDateChange(), 10000);

  return () => {
    clearInterval(interval);
  };
}, [currentDate]);


const timeCheck = () =>
    formatDistance(date, currentDate, { includeSeconds: true });

 const onLabelChange = (e) => {
    setValue( e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
      onEditTask(todo.id, value);
      onChangeEditing(todo.id)
    
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
           { `${timeCheck()} ago`}
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

  export default Task;

