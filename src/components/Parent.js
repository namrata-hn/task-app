import { React, useState } from "react";
import TaskForm from "./TaskForm";
import Tasks from "./Tasks";

function ParentComponent() {
    const [showForm, setShowForm] = useState(false);
  
    return (
      <div>
        <Tasks showForm={showForm} setShowForm={setShowForm} />
        <TaskForm showForm={showForm} />
      </div>
    );
}

export default ParentComponent;