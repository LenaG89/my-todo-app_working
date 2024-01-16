import React from "react";


 const TasksFilter =({ 
  label,
  filterName,
  activeFilter,
  onChangeActiveFilter} )=>
  {
    const active = filterName===activeFilter;
    return (
        <button 
        key={filterName}
        className={ active ? "selected": null }
        onClick={onChangeActiveFilter}>{label}</button>  
  )
  }
  
export default TasksFilter;