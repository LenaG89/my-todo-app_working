import React from "react";
import PropTypes from 'prop-types';
import TasksFilter from "../tasks-filter-in-footer";


const Footer = ({left, onCliearCompleted, onChangeActiveFilter, activeFilter  }) => {
  const filterData = [
    {filterName: 'all', label: "All", id: 1},
    {filterName: 'active', label: "Active", id: 2},
    {filterName: 'complite', label: "Completed", id: 3},
  ]
  const elements = filterData.map(({filterName, label, id}) => {
    

    return (
      <li key={id}>
      <TasksFilter 
      label={label}
      filterName={filterName}
      activeFilter={activeFilter}
      onChangeActiveFilter={()=>onChangeActiveFilter(filterName)}/>
      </li>
    )
  })


    return (
        <footer className="footer">
        <span className="todo-count">{left} items left</span>
        <ul className="filters">{elements}</ul>
        <button 
        className="clear-completed"
        onClick={onCliearCompleted}>Clear completed</button>
      </footer>   
    )
};
Footer.defaultProps = {
  onChangeActiveFilter: () =>{return alert('To change active filter, pass the function');},
  onCliearCompleted: ()=>{return alert('To delite the completed tasks, pass the function');},
  left: 0,
};
Footer.propTypes = {
  onChangeActiveFilter: PropTypes.func,
  onCliearCompleted: PropTypes.func,
  left: PropTypes.number,
  filterData: PropTypes.arrayOf(PropTypes.object),
};
export default Footer