import "./Maincomp.css";
import React from 'react';

const Maincomp = (props) => {
  return (
    <div className="Maincomp">
      <div className="heading">
        <h1>{props.heading}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default Maincomp;
