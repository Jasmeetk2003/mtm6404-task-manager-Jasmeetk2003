import React from "react";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span>{task.text} - <strong>{task.priority}</strong></span>
      <button className="toggle-btn" onClick={onToggle}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button className="delete-btn" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
