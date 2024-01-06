import React from "react";
import Task from "../task";
import PropTypes from 'prop-types';


const TaskList = ({ todos, onDeleted,  onToggleCheck, onEditTask, onChangeEditing, activeFilter, tickTac, onStartTimer, onStopTimer}) => {
  
  const filtredTask = todos.filter((el) =>{
    if (activeFilter ===1) return true;
    if (activeFilter===2) return !el.checked;
    if (activeFilter===3) return el.checked;
    return true;
  })
  const elements = filtredTask.map((todo) => {

    const {id, checked, edited } = todo;
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
      key={id} >
        <Task 
        todo={todo}
        onDeleted={()=>onDeleted(id)}  
        onToggleCheck= {() =>  onToggleCheck(id)}
        onEditTask = {onEditTask}
        onChangeEditing={() => onChangeEditing(id)}
        onStopTimer={() => onStopTimer(id)}
        onStartTimer={() => onStartTimer(id)}
        tickTac={()=> tickTac(id)}
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
  activeFilter: 1,
  timer: 30000,
  onStartTimer: () => alert('To start timer, pass the function'),
  onStopTimer: () => alert('To stop timer, pass the function'),
};
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCheck: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditTask: PropTypes.func,
  onChangeEditing: PropTypes.func,
  activeFilter: PropTypes.number,
  timer: PropTypes.number,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
  tickTac: PropTypes.func
};

export default TaskList;
