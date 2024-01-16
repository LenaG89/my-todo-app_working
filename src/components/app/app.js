import React, { useState,useEffect, useRef } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  
  const [todoData, setTodoData] = useState({
 100: {
  id: 100,
  label: "Learn React",
  checked: false,
  edited: false,
  date: new Date(),
  timer: 3000000, 
},
  },
);
  
  const [activeFilter, setActiveFilter] = useState('');

  const timersIdRef = useRef({ });
  const idRef = useRef(101);

  useEffect(() => {
    Object.values(todoData).forEach((todo) => {
      if (todo.timer === 0 && timersIdRef.current[todo.id]) {
        clearInterval(timersIdRef.current[todo.id]);
        timersIdRef.current = { ...timersIdRef.current, [todo.id]: "" };
      }
    });
  }, [todoData]);

  const tickTac = (id) => {
    setTodoData((todoData) =>({
      ...todoData,
      [id]: { ...todoData[id], timer: todoData[id].timer - 1000 },
    }));
  };

  const handlerStartTimer = (id) => {
    const timerId = setInterval(() => tickTac(id), 1000);
    timersIdRef.current = { ...timersIdRef.current, [id]: timerId };
  };

  const useAddItem = (text, timer) => {
    const newTodo =
    {
      id: idRef.current,
      label: text,
      timer,
      checked: false,
      edited: false,
      date: new Date(),
    };
    idRef.current += 1;
    setTodoData((todoData) => ({ ...todoData, [newTodo.id]: newTodo }));
  };

  const onStopTimer = (id) => {
    clearInterval(timersIdRef.current[id]);
    timersIdRef.current = { ...timersIdRef.current, [id]: "" };
  };

  const onStartTimer = (id) => {
    if (!todoData[id].timer) return;
    if (timersIdRef.current[id]) return;

    handlerStartTimer(id);
  };

  const deleteItem = (id) => {
    const newTodoData = Object.keys(todoData).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = todoData[key];
      }
      return acc;
    }, {});

    clearInterval(timersIdRef.current[id]);
    delete timersIdRef.current[id];

    setTodoData(newTodoData);
  };

  const onToggleCheck = (id) => {
      setTodoData((todoData) => ({
        ...todoData,
        [id]: { ...todoData[id], checked: !todoData[id].checked },
      }));
      if(timersIdRef.current[id]){
        onStopTimer(id)
      }
    };
  

  const onChangeEditing = (id) => {
    setTodoData((todoData) => ({
      ...todoData,
      [id]: { ...todoData[id], edited: !todoData[id].edited },
    }));
  };

  const filterObject = (todosList, bool) =>
  Object.entries(todosList).reduce((acc, todo) => {
    const [key, value] = todo;
    const { checked } = value;
    if (checked === bool) {
      acc[key] = value;
    }

    return acc;
  }, {});

const filterTask = (filter) => {
  switch (filter) {
    case "active":
      return filterObject(todoData, false);

    case "complite":
      return filterObject(todoData, true);

    default:
      return todoData;
  }
};
  

  const editTask = (id, text) => {
    setTodoData((todoData)=>({ ...todoData, [id]: { ...todoData[id], label: text } }) )
  }

  const countTasks = () =>
  Object.entries(todoData).reduce((acc, todo) => {
    const [, value] = todo;
    const { checked } = value;
    if (!checked) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const onChangeActiveFilter = (filter) => {
    setActiveFilter(filter);
  };

  const onCliearCompleted = () => {
    const activeTasks = filterObject(todoData, false);
    const checkedTasks = Object.values(todoData).filter((todo) => todo.checked);
    const checkedTasksIds = checkedTasks.map((todo) => `${todo.id}`);

    checkedTasksIds.forEach((timerId) => {
      clearInterval(timersIdRef.current[timerId]);
      delete timersIdRef.current[timerId];
    });

    setTodoData(activeTasks);
  };

  const active = countTasks(todoData);
  const visibleTasks = filterTask(activeFilter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={useAddItem} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleTasks}
          onDeleted={deleteItem}
          onToggleCheck={onToggleCheck}
          onEditTask={editTask}
          onChangeEditing={onChangeEditing}
          onStopTimer={onStopTimer}
          onStartTimer={onStartTimer}
        />
        <Footer
          left={active}
          activeFilter={activeFilter}
          onCliearCompleted={onCliearCompleted}
          onChangeActiveFilter={onChangeActiveFilter}
        />
      </section>
    </section>
  );
};


export default App;
