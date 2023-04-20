import React from "react";
import "./Page1.css";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (

    <div className="main" >
      <div className="content">
        <h1>BLOCKCHAIN DEVLOPER</h1>
        <p>
          I am an aspiring blockchain developer. Researcher as well as patent 
          writer. I always try to make myself one step forward in every 
          situation. I am always ready to learn and to adapt myself in new 
          technology mapping <span>(technology =innovation)x=boom;</span>
        </p>
        <Link to="/Project" className="Button">
          {" "}
          Project
        </Link>
        <Link to="/Contact" className="Button2">
          {" "}
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Page1;