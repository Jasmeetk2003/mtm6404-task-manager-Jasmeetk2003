import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";

const ListManager = () => {
  const { lists, addList, deleteList } = useContext(TaskContext);
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      addList(listName);
      setListName("");
    }
  };

  return (
    <div>
      <h2>Manage Lists</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button className="add-btn" type="submit">Add List</button>
      </form>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <Link to={`/list/${list.id}`}>{list.name}</Link>
            <button className="delete-btn" onClick={() => deleteList(list.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListManager;