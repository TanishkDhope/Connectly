import React from 'react'
import '@fontsource/roboto/300.css';
import './Chat.css'
import { Avatar } from '@mui/material';

function Chat() {
  return (
    <div className='Chat'>
        <Avatar className='badge' sx={{ width: 60, height: 60 }}></Avatar>
        <div className='info'>
        <div className='name'>Jeremy</div>
        <div className='last-message'>Yess😊</div>
        </div>
    </div>
  )
}

export default Chat;
