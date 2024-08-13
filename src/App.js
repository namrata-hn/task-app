import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskForm from './components/TaskForm';
import Home from './components/Home';
import React from 'react';
import LandingPage from './components/LandingPage';


function App() {

  return (
    <BrowserRouter>
      <Navigation/>
       <Routes>
       <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add_tasks" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
