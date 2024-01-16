import React from "react";
import Task from "../task";
import PropTypes from 'prop-types';


const TaskList = ({ todos, onDeleted,  onToggleCheck, onEditTask, onChangeEditing,  onStartTimer, onStopTimer}) => {
  
  const keys = Object.keys(todos);

  const elements = keys.map((key) =>{

    const { checked, edited } = todos[key];
    let classNames = null;
   if (checked){
    classNames = "completed"
   }
   if (edited){
    classNames = 'editing'
   }
    return (
      <li 
      className={classNames}
      key={key} >
        <Task 
        todo={todos[key]}
        onDeleted={()=>onDeleted(key)}  
        onToggleCheck= {() =>  onToggleCheck(key)}
        onEditTask = {onEditTask}
        onChangeEditing={() => onChangeEditing(key)}
        onStopTimer={() => onStopTimer(key)}
        onStartTimer={() => onStartTimer(key)}
        />
        </li>
   
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onToggleCheck: () => alert('To complete a task, pass the function'),
  onDeleted: () => alert('To delite a task, pass the function'),
  onEditTask: () => alert('To editing a task, pass the function'),
  onChangeEditing: () => alert('To editing status a task, pass the function'),
  activeFilter: 'all',
  timer: 30000,
  onStartTimer: () => alert('To start timer, pass the function'),
  onStopTimer: () => alert('To stop timer, pass the function'),
};
TaskList.propTypes = {
  todos: PropTypes.shape({
    todo: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      cheked: PropTypes.bool,
      edited: PropTypes.bool,
      timer: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  onToggleCheck: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditTask: PropTypes.func,
  onChangeEditing: PropTypes.func,
  activeFilter: PropTypes.string,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
};
  
 
export default TaskList;
