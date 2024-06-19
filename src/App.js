import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Task from "./components/task";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter>
      <Navigation/>
       <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/log_in" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
