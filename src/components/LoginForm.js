import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import "../global.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
    axios.get(`http://localhost:8080/users/${username}`)
            .then(response => {
              if(response.data.password===password) {
                sessionStorage.setItem('user_id', response.data.id);
                sessionStorage.setItem('username', username);
                navigate('/home');
              } else
              alert('Please check username and password.');
            }).catch(error =>{
            console.error(error);
            });
  };

  return (
    <div className="center-page">
      <h2>Login</h2>
      <Form className="login" onSubmit={handleFormSubmit}>
        <Form.Group>
          <FloatingLabel 
            controlId="floatingInput"
            label="username"
            className="mb-3"
          >
          <Form.Control
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel 
            controlId="floatingInput"
            label="password"
            className="mb-3"
          >
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </FloatingLabel>
        </Form.Group>
        <Button className="button" type="submit">Log In</Button>
      </Form>
    </div>
  );
}

export default LoginForm;