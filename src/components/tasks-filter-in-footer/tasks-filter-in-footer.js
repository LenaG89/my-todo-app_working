import React from "react";
import "./tasks-filter-in-footer.css";

 const TasksFilter =({filterProps, onChangeActiveFilter} )=>{
  const {filtername, active} = filterProps;
    return (
        <button 
        className={ active ? "selected": null }
        onClick={onChangeActiveFilter}>{filtername}</button>  
  )

}

export default TasksFilter;