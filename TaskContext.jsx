import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Import Firebase
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, where } from "firebase/firestore";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  
  // Fetch lists from Firestore
  useEffect(() => {
    const fetchLists = async () => {
      const querySnapshot = await getDocs(collection(db, "lists"));
      const fetchedLists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(fetchedLists);
    };
    fetchLists();
  }, []);

  // Add a list to Firestore
  const addList = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "lists"), {
        name,
        tasks: [],
      });
      setLists(prevLists => [
        ...prevLists,
        { id: docRef.id, name, tasks: [] },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Delete a list from Firestore
  const deleteList = async (id) => {
    try {
      await deleteDoc(doc(db, "lists", id));
      setLists(prevLists => prevLists.filter(list => list.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  // Add a task to a list in Firestore
  const addTask = async (listId, task, priority) => {
    const listRef = doc(db, "lists", listId);
    const newTask = { id: Date.now(), task, priority, completed: false };
    await updateDoc(listRef, {
      tasks: [...lists.find(list => list.id === listId).tasks, newTask]
    });
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  };

  // Delete a task from a list in Firestore
  const deleteTask = async (listId, taskId) => {
    const listRef = doc(db, "lists", listId);
    const list = lists.find(list => list.id === listId);
    const updatedTasks = list.tasks.filter(task => task.id !== taskId);
    await updateDoc(listRef, { tasks: updatedTasks });

    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: updatedTasks }
          : list
      )
    );
  };

  // Toggle task completion in Firestore
  const toggleTaskCompletion = async (listId, taskId) => {
    const listRef = doc(db, "lists", listId);
    const list = lists.find(list => list.id === listId);
    const updatedTasks = list.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    await updateDoc(listRef, { tasks: updatedTasks });

    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: updatedTasks }
          : list
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ lists, addList, deleteList, addTask, toggleTaskCompletion, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
