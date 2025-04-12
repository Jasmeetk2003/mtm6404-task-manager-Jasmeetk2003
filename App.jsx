import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import ListManager from "./components/ListManager";
import Footer from "./components/Footer";
import TaskProvider from "./context/TaskContext";
import "./index.css";
const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<ListManager />} />
              <Route path="/list/:id" element={<TaskList />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
