import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import React, { useState } from 'react';
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
        <Route path="/log_in" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
