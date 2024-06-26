import React, { useState, useEffect } from "react";
import axios from "axios";
import "../task.css";
  
const TaskForm = () => {
    const [showForm, setshowform] = useState(true);
    const [showNew, setshowNew] = useState(true);
    const [showDelete, setshowDelete] = useState(true);
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null);
    const [showList, setshowList] = useState(true);
    const [deleteMessage, setdeleteMessage] = useState(false);
    const [addedMessage, setAddedMessage] = useState(false);
    const [addedMessagesuccess, setAddedMessagesuccess] = useState(false);
    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [inputDate, setinputDate] = useState(Date.now());
    const [priority, setPriority] = useState("LOW");
    const [status, setStatus] = useState("TO DO");
    const [items, setitems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`)
            .then(response => {
                setitems(response.data)
            }).catch(error =>{
                console.error(error);
            });
        },[]);

    useEffect(() => {
        axios.get(`http://localhost:8080/tasks/users/${sessionStorage.getItem('user_id')}`)
            .then(response => {
                setitems(response.data)
            }).catch(error =>{
                console.error(error);
            });
        },[showForm, isEditItem, addedMessage]);
    
    //   HANDLING INPUT FIELDS
    const handleInputTitle = (e) => {
        setinputTitle(e.target.value);
    };
    const handleInputDesc = (e) => {
        setinputDesc(e.target.value);
    };
    const handleInputDate = (e) => {
        setinputDate(e.target.value)
    }
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
                setAddedMessage(true);
                setTimeout(() => {
                    setAddedMessage(false);
                }, 2000);
                setAddedMessagesuccess(false);
            });
        }
    };
    //   SUBMITTING FORM
    
    // ADD NEW TASK
    // ADD NEW TASK
    
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
                <p className="text-center text-danger">Item Added Successfully</p>
                ) : (
                ""
                )}
            </div>
        </>
        ) : (
        ""
        )}
    </div>
    );
};
  
export default TaskForm;