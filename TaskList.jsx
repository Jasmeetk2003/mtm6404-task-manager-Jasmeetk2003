import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import Card from "./Card";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add New Task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        text: newTask,
        priority: priority,
        completed: false,
      };
      setTasks([...tasks, newTaskObj].sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority)));
      setNewTask("");
      setPriority("Medium");
    }
  };

  // Delete Task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle Task Completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to order priority levels
  const priorityOrder = (priority) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[priority] || 3;
  };

  return (
    <Card>
      <h2>Task List</h2>

      {/* Task Input Form */}
      <input
        type="text"
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button className="add-btn" onClick={addTask}>Add Task</button>

      {/* Toggle Completed Tasks */}
      <button className="toggle-btn" onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </button>

      {/* Task List Display */}
      {tasks.length === 0 ? (
        <p>Enjoy your free time, no tasks left!</p>
      ) : (
        tasks
          .filter(task => showCompleted || !task.completed)
          .map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onToggle={() => toggleCompletion(index)}
            />
          ))
      )}
    </Card>
  );
};

export default TaskList;
