import React from 'react';
import "./Rooms.css";
import Chat from './Chat.jsx';
import Nav from './Nav.jsx';


function box() {
  return (
    
    <div className='Room-list'>
      <Nav className='nav'/>
      <div className='rooms'>
        <Chat/>
        <Chat/>
        <Chat/>
      </div>
    </div>
  )
}

export default box;
