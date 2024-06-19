import { React, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import "../global.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
    
    const username = sessionStorage.getItem('user_id');
    const navigate = useNavigate();
    const [toDoTask, setToDoTask] = useState([]);
    const [ipTask, setIpTask] = useState([]);
    const [doneTask, setDoneTask] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`)
            .then(response => {
                setToDoTask(response.data.filter((task) => task.status === 'TO DO'))
                setIpTask(response.data.filter((task) => task.status === 'IN PROGRESS'))
                setDoneTask(response.data.filter((task) => task.status === 'DONE'))
            }).catch(error =>{
                console.error(error);
            });
        },[]);

    const handleDelete = () => {
        if (toDoTask.length === 0 & ipTask.length === 0 & doneTask.length === 0){
            axios.delete(`http://localhost:8080/users/${sessionStorage.getItem('user_id')}`)
                .then((response) => {
                    alert('This user has been deleted');
                    navigate('/register')
                }).catch(error =>{
                console.error(error);
            });
        } else {
            alert('Please delete all tasks');
            navigate('/tasks');
        }
    }

    const handleLogOut = () => {
        sessionStorage.removeItem('user_id');
    }

    return (
        <div className="group2"> 
            <h1>Welcome, User #{username}</h1>
            <Container>
                <Row>
                    <Col xs={1}>
                        <Link to="/log_in">
                            <Button className="logoutbutton" variant="secondary" onClick={handleLogOut}>
                                Log Out
                            </Button>
                        </Link>
                        <Button className="logoutbutton" variant="dark" onClick={handleDelete}>
                            Delete User
                        </Button>  
                    </Col>
                    <Col xs={1}>
                        <Link to='/tasks'>  
                            <Button className="taskbutton" variant="primary" size="lg">
                                Add Tasks
                            </Button>
                            <Button className="taskbutton" variant="primary" size="lg">
                                View Tasks
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <CardGroup className="group"> 
                        <Card>
                            <Card.Body>
                                <Card.Title>To Do</Card.Title>
                                <Card.Text>
                                    {toDoTask.length}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Get started!</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>In Progress</Card.Title>
                                <Card.Text>
                                    {ipTask.length}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Keep going!</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Done</Card.Title>
                                <Card.Text>
                                    {doneTask.length}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">You did it!</small>
                            </Card.Footer>
                        </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>    
        </div>
    );
}

export default Home;