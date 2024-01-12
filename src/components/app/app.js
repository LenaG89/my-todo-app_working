import React, { useState } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  const createTodoItem = (label, timer) => {
    return {
      id: "id" + Math.random().toString(16).slice(2),
      label,
      checked: false,
      edited: false,
      date: new Date(),
      timer,
      isRunning: false,
    };
  };
  const [todoData, setTodoData] = useState([
    createTodoItem("Learn React", 3000000),
    createTodoItem("Drink coffee", 300000),
  ]);
  const [filterData, setFilterData] = useState([
    { filtername: "All", id: 1, active: true },
    { filtername: "Active", id: 2, active: false },
    { filtername: "Completed", id: 3, active: false },
  ]);
  const [activeFilter, setActiveFilter] = useState(1);

  const tickTac = (todoId) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) => {
        return todo.id === todoId && todo.timer > 0 && todo.isRunning
          ? { ...todo, timer: todo.timer - 1000 }
          : todo;
      })
    );
  };

  const onStopTimer = (todoId) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id === todoId ? { ...todo, isRunning: false } : todo
      )
    );
  };

  const onStartTimer = (todoId) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id === todoId ? { ...todo, isRunning: true } : todo
      )
    );
  };

  const addItem = (text, timer) => {
    const newItem = createTodoItem(text, timer);
    setTodoData((prevTodoData) => [...prevTodoData, newItem]);
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const indx = prevTodoData.findIndex((item) => item.id === id);
      return [...prevTodoData.slice(0, indx), ...prevTodoData.slice(indx + 1)];
    });
  };

  const onToggleCheck = (id) => {
    setTodoData((prevTodoData) => {
      const indx = prevTodoData.findIndex((item) => item.id === id);
      const oldItem = prevTodoData[indx];
      const newItem = {
        ...oldItem,
        checked: !oldItem.checked,
        isRunning: false,
      };
      return [
        ...prevTodoData.slice(0, indx),
        newItem,
        ...prevTodoData.slice(indx + 1),
      ];
    });
  };

  const onChangeEditing = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[idx];
      const newItem = { ...oldItem, edited: !oldItem.edited };
      const newData = [
        ...prevTodoData.slice(0, idx),
        newItem,
        ...prevTodoData.slice(idx + 1),
      ];
      return newData;
    });
  };

  const onCliearCompleted = () => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.filter((el) => !el.checked);
      return newArray;
    });
  };

  const editTask = (id, text) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[idx];
      const newItem = { ...oldItem, edited: false, label: text };
      const newData = [
        ...prevTodoData.slice(0, idx),
        newItem,
        ...prevTodoData.slice(idx + 1),
      ];

      return newData;
    });
  };

  const onChangeActiveFilter = (id) => {
    setFilterData((prevFilterData) => {
      const newData = prevFilterData.map((el) => ({
        ...el,
        active: el.id === id,
      }));
      return newData;
    });
    setActiveFilter(id);
  };

  const leftCount = todoData.filter((el) => !el.checked).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onToggleCheck={onToggleCheck}
          onEditTask={editTask}
          onChangeEditing={onChangeEditing}
          activeFilter={activeFilter}
          tickTac={tickTac}
          onStopTimer={onStopTimer}
          onStartTimer={onStartTimer}
        />
        <Footer
          left={leftCount}
          filterData={filterData}
          onCliearCompleted={onCliearCompleted}
          onChangeActiveFilter={onChangeActiveFilter}
        />
      </section>
    </section>
  );
};

export default App;
