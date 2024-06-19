import React, { useState } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { TfiAgenda } from "react-icons/tfi";
import { TfiHome } from "react-icons/tfi";
import { TfiClipboard } from "react-icons/tfi";
import { IconContext } from 'react-icons/lib';
import LoginForm from './LoginForm';
import ReactDOM from 'react-dom';

export const Navigation = () => {
    return (
        <>
        <Navbar expand="md">
            <Container>
            <Navbar.Brand href="/">
                <IconContext.Provider value={{ className: "shared-class", size: 40 }}>
                    <h2>Manage Your Tasks!<TfiAgenda /></h2>
                </IconContext.Provider>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                </Nav>
                <span className="navbar-text">
                <div className="social-icon">
                    <a href="home">
                        <IconContext.Provider value={{ className: "shared-class", size: 25 }}>
                            <TfiHome />
                        </IconContext.Provider>
                    </a>
                    <a href="tasks">
                        <IconContext.Provider value={{ className: "shared-class", size: 25 }}>
                            <TfiClipboard />
                        </IconContext.Provider>
                    </a>
                </div>
                <a href="log_in">
                    <button className="vvd">
                    <span>Log In</span>
                    </button>
                </a>
                <a href="register">
                    <button className="vvd">
                    <span>Register</span>
                    </button>
                </a>
                </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}