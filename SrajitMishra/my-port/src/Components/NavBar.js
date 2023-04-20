import "./NavBar.css"
import React from 'react'
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

import { useState } from "react";

const NavBar = () => {
    const [Click, setClick] = useState(false);
  const Clicking = () => setClick(!Click);
  return (
    <div className="Header">
      <Link to={"/"}>
        <h1 className="logo">SRAJIT</h1>
      </Link>
      <ul className={Click? "nm1 active" :"nm1"} >
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/project"}>Project</Link>
        </li>
        <li>
          <Link to={"/experience"}>Experience</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        
      </ul>
      <div className="icon" onClick={Clicking}>
        {Click ? ( <CloseIcon/>
        
        ) : (
           <ViewHeadlineIcon />
        )}
      </div>
    </div>
  );
}

export default NavBar
