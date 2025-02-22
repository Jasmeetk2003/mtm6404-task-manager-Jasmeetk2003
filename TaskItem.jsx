import React from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <span>{task}</span>
      <button className="edit-btn" onClick={onEdit}>Edit</button>
      <button className="delete-btn" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
