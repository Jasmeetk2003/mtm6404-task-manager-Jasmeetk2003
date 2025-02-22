import React from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import './index.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <TaskList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
