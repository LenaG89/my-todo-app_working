import React, { Component } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {
  state = {
    todoDate: [
      this.createTodoItem("Completed task"),
      this.createTodoItem("Editing task"),
      this.createTodoItem("Active task"),
    ],
    filterData: [
      { filtername: "All", id: 1, active: true },
      { filtername: "Active", id: 2, active: false },
      { filtername: "Completed", id: 3, active: false },
    ],
    activeFilter: 1,
  };

  createTodoItem(label) {
    return {
      id: "id" + Math.random().toString(16).slice(2),
      label,
      checked: false,
      edited: false,
      date: new Date(),
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoDate }) => {
      return { todoDate: [...todoDate, newItem] };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoDate }) => {
      const indx = todoDate.findIndex((item) => item.id === id);
      return {
        todoDate: [...todoDate.slice(0, indx), ...todoDate.slice(indx + 1)],
      };
    });
  };

  onToggleCheck = (id) => {
    this.setState(({ todoDate }) => {
      const indx = todoDate.findIndex((item) => item.id === id);
      const oldItem = todoDate[indx];
      const newItem = { ...oldItem, checked: !oldItem.checked };

      return {
        todoDate: [
          ...todoDate.slice(0, indx),
          newItem,
          ...todoDate.slice(indx + 1),
        ],
      };
    });
  };
  onChangeEditing = (id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, edited: !oldItem.edited };
      const newData = [
        ...todoDate.slice(0, idx),
        newItem,
        ...todoDate.slice(idx + 1),
      ];

      return {
        todoDate: newData,
      };
    });
  };

  onCliearCompleted = () => {
    this.setState(({ todoDate }) => {
      const newArray = todoDate.filter((el) => !el.checked);
      return {
        todoDate: newArray,
      };
    });
  };

  editTask = (id, text) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, edited: false, label: text };
      const newData = [
        ...todoDate.slice(0, idx),
        newItem,
        ...todoDate.slice(idx + 1),
      ];

      return {
        todoDate: newData,
      };
    });
  };
  
  onChangeActiveFilter = (id) => {
    this.setState(({ filterData }) => {
      const newData = filterData.map((el) => ({
        ...el,
        active: el.id === id,
      }));
      return {
        filterData: newData
      };
    });
    this.setState({
      activeFilter: id,
    });
  };
  render() {
    const leftCount = this.state.todoDate.filter((el) => !el.checked).length;
    const { todoDate, filterData, activeFilter } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoDate}
            onDeleted={this.deleteItem}
            onToggleCheck={this.onToggleCheck}
            onEditTask={this.editTask}
            onChangeEditing={this.onChangeEditing}
            activeFilter={activeFilter}
          />
          <Footer
            left={leftCount}
            filterData={filterData}
            onCliearCompleted={this.onCliearCompleted}
            onChangeActiveFilter={this.onChangeActiveFilter}
          />
        </section>
      </section>
    );
  }
}
