import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    "Complete React Assignment",
    "Review UX Project",
    "Submit Capstone Iteration 1",
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button
          onClick={addTask}
          className="add-btn"
        >
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            index={index}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
