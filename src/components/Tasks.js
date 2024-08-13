import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Card, CardGroup } from 'react-bootstrap';
import "../task.css";
  
const Tasks = () => {
    const [showForm, setshowform] = useState(false);
    const [showNew, setshowNew] = useState(true);
    const [showDelete, setshowDelete] = useState(true);
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null);
    const [showList, setshowList] = useState(true);
    const [editMessage, seteditMessage] = useState(false);
    const [deleteMessage, setdeleteMessage] = useState(false);
    const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [inputDate, setinputDate] = useState(Date.now());
    const [priority, setPriority] = useState("LOW");
    const [status, setStatus] = useState("TO DO");
    const [items, setitems] = useState([]);
    const [addedMessage, setAddedMessage] = useState(false);
    const [toDoTask, setToDoTask] = useState([]);
    const [ipTask, setIpTask] = useState([]);
    const [doneTask, setDoneTask] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`)
            .then(response => {
                setitems(response.data);
                setToDoTask(response.data.filter((task) => task.status === 'TO DO'))
                setIpTask(response.data.filter((task) => task.status === 'IN PROGRESS'))
                setDoneTask(response.data.filter((task) => task.status === 'DONE'))
            }).catch(error =>{
                console.error(error);
            });
        },[]);

    useEffect(() => {
        axios.get(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`)
            .then(response => {
                setitems(response.data)
                setToDoTask(response.data.filter((task) => task.status === 'TO DO'))
                setIpTask(response.data.filter((task) => task.status === 'IN PROGRESS'))
                setDoneTask(response.data.filter((task) => task.status === 'DONE'))
            }).catch(error =>{
                console.error(error);
            });
        },[showForm, isEditItem, deleteMessage]);
    
    //  HANDLING INPUT FIELDS
    const handleInputTitle = (e) => {
        setinputTitle(e.target.value);
    };
    const handleInputDesc = (e) => {
        setinputDesc(e.target.value);
    };
    //   HANDLING INPUT FIELDS
    
    //   SUBMITTING FORM
    const handleSubmit = (e) => {
        setshowList(true);
        setshowNew(true);
        
        e.preventDefault();
        if (!inputTitle || !inputDesc) {
            alert("fill data");
            showList(false);
        } else if (inputTitle && !toggleSubmit) {
            items.map((elem) => {
                if (elem.id === isEditItem) {
                    const task = { "id":elem.id, "title": inputTitle, "description": inputDesc, "dueDate": inputDate, "priority": priority, "status": status };
                    axios.put(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}/${elem.id}`, task)
                    .then(response => {
                        console.log(response.data)
                        setinputTitle("");
                        setinputDesc("");
                        settoggleSubmit(true);
                        setshowform(false);
                        setshowDelete(true);
                        return { ...elem, title: inputTitle, desc: inputDesc, duedate: inputDate, priority: priority, status: status};
                    });
                }
                return elem;
            });
        } else {
            const task = { "title": inputTitle, "description": inputDesc, "dueDate": inputDate, "priority": priority, "status": status };
            console.log(task);
            axios.post(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`, task)
            .then(response => {
                console.log(response.data)
                setinputTitle("");
                setinputDesc("");
                setshowform(false);
            });
        }
    };
    // SUBMITTING FORM

    //   DELETE
    const handleDelete = (index) => {
        axios.delete(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}/${index}`);
        console.log(index);
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setdeleteMessage(true);
        
        setTimeout(() => {
            setdeleteMessage(false);
        }, 2000);
        setdeleteMessagesuccess(false);
    };
    //   DELETE
    
    //   EDIT
    const handleEdit = (id) => {
        setshowList(false);
        setshowDelete(false);
        setshowNew(false);
        setshowform(true);

        settoggleSubmit(false);
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setinputTitle(newEditItem.title);
        setinputDesc(newEditItem.description);
        setinputDate(newEditItem.dueDate);
        setPriority(newEditItem.priority);
        setStatus(newEditItem.status);
        setshowDelete(true)
        
        setisEditItem(id);
        console.log(newEditItem);
    };
    //   EDIT

    // RENDER STATUS/PRIORITY COLORS
    const renderPriorityColor = (priority) => {
        let color;
        if (priority === 'HIGH') {
          color = '#E81310';
        } else if (priority === 'MEDIUM') {
          color = '#DB9620';
        } else if (priority === 'LOW') {
          color = '#13B723';
        }
        return <span style={{ color }}>{priority}</span>;
    };
      
    const renderStatusColor = (status) => {
        let color;
        if (status === 'DONE') {
          color = '#13B723';
        } else if (status === 'IN PROGRESS') {
          color = '#DB9620';
        } else if (status === 'TO DO') {
          color = '#E81310';
        }
        return <span style={{ color  }}>{status}</span>;
    };
    
    return (
    <div className="task-form">
        {showForm ? (
        <>
            <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
                <div className="row">
                    <div className="text-center">
                    <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
                    </div>
                    <form className="col-12 p-2" onSubmit={handleSubmit}>
                    <label htmlFor="title" className="my-2">
                        Enter Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        className="w-100 my-1 p-2"
                        onChange={handleInputTitle}
                        value={inputTitle}
                    />
                    <label className="my-2" htmlFor="description">
                        Enter Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        className="w-100 my-1 p-2"
                        onChange={handleInputDesc}
                        value={inputDesc}
                    />
                    <label className="my-2" htmlFor="due date">
                        Enter Due Date
                    </label>
                    <input
                        type="date"
                        name="duedate"
                        id="duedate"
                        placeholder="Due Date"
                        className="w-100 my-1 p-2"
                        value={inputDate}
                        onChange={(e)=>setinputDate(e.target.value)}
                    />
                    <label className="my-2" htmlFor="priority">
                        Task Priority
                    </label>
                    <select 
                        className="select" 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                    <label className="my-2" htmlFor="priority">
                        Task Status 
                    </label>
                    <select 
                        className="select" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="TO DO">TO DO</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                    {/* <div className="text-center"> */}
                    {toggleSubmit ? (
                        <button className="btn btn-primary my-2">Save</button>
                    ) : (
                        <button className="btn btn-primary my-2">Update</button>
                    )}
                    {/* </div> */}
                    </form>
                </div>
            </div>
            <div>
            {addedMessage ? (
                <Alert variant="success">Item Added Successfully</Alert>
            ) : (
                ""
            )}
            </div>
        </>
        ) : (
        ""
        )}
        
        {!showForm && (
            <CardGroup className="group3"> 
                <Card>
                    <Card.Body>
                        <Card.Title>To Do</Card.Title>
                        <Card.Text>
                            <p>___________________</p>
                            {toDoTask.map((toDoTask) => (
                                <div key={toDoTask.id}>
                                    <h2>{toDoTask.title}</h2>
                                    <h5>{toDoTask.dueDate}</h5>
                                    <p>___________________</p>
                                </div>
                            ))}
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
                            <p>___________________</p>
                            {ipTask.map((ipTask) => (
                                <div key={ipTask.id}>
                                    <h2>{ipTask.title}</h2>
                                    <h5>{ipTask.dueDate}</h5>
                                    <p>___________________</p>
                                </div>
                            ))}
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
                            <p>___________________</p>
                            {doneTask.map((doneTask) => (
                                <div key={doneTask.id}>
                                    <h2>{doneTask.title}</h2>
                                    <h5>{doneTask.dueDate}</h5>
                                    <p>___________________</p>
                                </div>
                            ))}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">You did it!</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        )}

        {showList ? (
        <div className="container py-2 ">
            {items.map((elem, index) => {
            return (
                <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={elem.id}
                >
                <div className="col-12 d-flex justify-content-between align-items-left">
                    <div>
                    <h4>{elem.title}</h4>
                    <p>Description: {elem.description}</p>
                    <div className="d-flex">
                        <div className="mr-3">
                            <p>Due Date: {elem.dueDate}</p>
                        </div>
                        <div className="mr-3">
                            <p>Priority: {renderPriorityColor(elem.priority)}</p>
                        </div>
                        <div>
                            <p>Status: {renderStatusColor(elem.status)}</p>
                        </div>
                    </div>
                    </div>
                        <div className="d-flex">
                            <button
                            className="btn btn-primary btn-md text-left"
                            onClick={() => handleEdit(elem.id)}
                            >
                                Edit
                            </button>
                            {showDelete ? (
                                <button
                                className="btn btn-danger btn-md text-left"
                                onClick={() => handleDelete(elem.id)}
                                >
                                    Delete
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            );
            })}
            <div>
            {deleteMessage ? (
                <Alert variant="danger">Item Deleted Successfully</Alert>
            ) : (
                ""
            )}
            </div>
        </div>
        ) : (
        ""
        )}
    </div>
    );
};
  
export default Tasks;