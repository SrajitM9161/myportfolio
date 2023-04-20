import React from 'react';
import "./card.css";
import {NavLink} from "react-router-dom";

const Projectacard = ({ image, Title, about, }) => {
  return (
    <div className='card'>
    <img src={image} alt="image"/>
    <h2 className='Title'>{Title}</h2>
    <div className='about'>
        <p>{about}</p>
    <div>
        <div/>
    <NavLink to= "abcjb" className="Button">view</NavLink>
    <NavLink to= "abcjb" className="Button"> SrcCode</NavLink>
    </div>
    </div>
    </div>
  )
}

export default Projectacard

