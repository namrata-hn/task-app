import React from "react"
import { TfiAgenda } from "react-icons/tfi";
import { IconContext } from 'react-icons/lib';
import ReactDOM from 'react-dom';

function Header() {
    return (
      <div>
        <nav className="nav">
          <div className="d-flex nav-center">
            <h1 className="brand" >
                Manage Your Tasks!   
            </h1>
            <IconContext.Provider value={{ className: "shared-class", size: 50 }}>
                <TfiAgenda />
            </IconContext.Provider>
          </div>
        </nav>
      </div>
    );
}
  
export default Header;