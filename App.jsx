import React from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <TaskList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
