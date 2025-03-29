import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useParams } from "react-router-dom";

const TaskList = () => {
  const { lists, addTask, toggleTaskCompletion, deleteTask } = useContext(TaskContext);
  const { id } = useParams();
  const list = lists.find((list) => list.id === parseInt(id));

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [showCompleted, setShowCompleted] = useState(true);

  if (!list) return <h2>List Not Found</h2>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(list.id, task, priority);
      setTask("");
    }
  };

  return (
    <div>
      <h2>{list.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button className="add-btn" type="submit">Add Task</button>
      </form>
      <button className="toggle-btn" onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "Hide" : "Show"} Completed
      </button>
      <ul>
        {list.tasks
          .filter((task) => showCompleted || !task.completed)
          .sort((a, b) => (a.priority === "High" ? -1 : b.priority === "High" ? 1 : 0))
          .map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              {task.task} - {task.priority}
              <button className="toggle-btn" onClick={() => toggleTaskCompletion(list.id, task.id)}>
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button className="delete-btn" onClick={() => deleteTask(list.id, task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
