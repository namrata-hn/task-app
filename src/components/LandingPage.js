import '../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';

function LandingPage() {
    const [login, setLogin] = useState(true);
    return (
    <div className='landingPage'>
        {login ? <LoginForm/>:<RegisterForm/>}
        <div class='text-center'>
            <Button type="button" class="btn btn-primary" variant="dark" onClick={()=>setLogin(!login)}>
                {login ? "Sign Up":"Sign In"}
            </Button>
        </div>
    </div>
    );
}
export default LandingPage;