import React from 'react';
import "./card.css";
import Projectacard from './Projectacard';
import Data from './dataapi';

const Work = () => {
  return (
    <div className='cont'>
      <div className='data-cont'>

      {Data.map((val,key) =>{
  return (
    <Projectacard
      key={key} 
      image={val.imageLink}
      Title={val.Title}
      about={val.about}
    />
  )
})}

      </div>
    </div>
  )
}

export default Work

