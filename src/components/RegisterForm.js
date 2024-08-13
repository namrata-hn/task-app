import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import "../global.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password || !email) {
      alert('Please fill in all fields.');
      return;
    }
    const user = {
        "username": username,
        "password": password,
        "email": email
    }
    axios.post(`http://localhost:8080/users`, user)
            .then(response => {
              sessionStorage.setItem('user_id', response.data.id);
              sessionStorage.setItem('username', response.data.username);
              navigate('/home')
            }).catch(error =>{
            console.error(error);
            });
  };

  return (
    <div className="center-page">
      <h2>Create Account</h2>
      <Form className="login" onSubmit={handleFormSubmit}>
        <Form.Group>
          <FloatingLabel 
            controlId="floatingInput"
            label="email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
      
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

        <Button className="button" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default RegisterForm;