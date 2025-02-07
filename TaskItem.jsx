import React, { useState } from "react";

const TaskItem = ({ task, index, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  return (
    <li className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span>{task}</span>
      )}

      <div className="buttons">
        {isEditing ? (
          <button
            className="save-btn"
            onClick={() => {
              updateTask(index, newTask);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
