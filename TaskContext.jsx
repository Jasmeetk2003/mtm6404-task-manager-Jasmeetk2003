import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("taskLists");
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, [lists]);

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, tasks: [] }]);
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const addTask = (listId, task, priority) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, { id: Date.now(), task, priority, completed: false }] }
          : list
      )
    );
  };

  const toggleTaskCompletion = (listId, taskId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : list
      )
    );
  };

  const deleteTask = (listId, taskId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  return (
    <TaskContext.Provider value={{ lists, addList, deleteList, addTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
