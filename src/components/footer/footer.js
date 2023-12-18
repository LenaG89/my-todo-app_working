import React from "react";
import PropTypes from 'prop-types';
import TasksFilter from "../tasks-filter-in-footer";
import "./footer.css";

const Footer = ({left, onCliearCompleted, filterData, onChangeActiveFilter  }) => {

  const elements = filterData.map((el) => {
    const {id, ...filterProps} = el;
    return (
      <li key={id}>
      <TasksFilter
      id={id} 
      filterProps = {filterProps}
      onChangeActiveFilter={()=>onChangeActiveFilter(id)}/>
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