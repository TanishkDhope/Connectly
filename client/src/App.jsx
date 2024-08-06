import React, { useEffect, useState, useMemo, createElement} from 'react'
import "./App.css"
import {io} from "socket.io-client"
import { Avatar, Button, Container, TextField } from '@mui/material';

function App() {
  const socket=useMemo(()=>io("http://localhost:3000"), []);

  useEffect(()=>{
    //Asking for Name from user
    // const name=prompt("Whats Your Name");
    socket.on("connect", ()=>{
      appendGeneralMessage(`You Joined`);

    })
    //Sending Name of User
    socket.emit("new-user", name);

    //User Greeting on Connection
    socket.on("user-connect", data=>{
      appendGeneralMessage(`${data} Connected`);
    })

    //Recieve Message
    socket.on("message", (data)=>{
      appendMessage(`${data.name}: ${data.message}`);
    })

    socket.on("personal-message", (msg)=>{
      appendYourMessage(msg);
    })

    socket.on("user-disconnect", data=>{
       appendGeneralMessage(`${data} Disconnected`);
    })

    //On disconnect
    return()=>{
      socket.disconnect();
      
      
    }
  },[])

  const [mssg, setMssg]=useState("");

  //Function to Append Message in text Area of other person
  function appendMessage(message)
  {
    const messageContainer=document.getElementById("message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("otherMessage");
    messageElement.innerHTML=`<div class="inner-message-other">${message}</div>`;
    messageContainer.append(messageElement);
  }

  //Functio to append Message in your chat
  function appendYourMessage(message)
  {
    const messageContainer=document.getElementById("message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("myMessage");
    messageElement.innerHTML=`<div class="inner-message-personal">${message}</div>`;
    messageContainer.append(messageElement);

  }

  //function to append general messages
  function appendGeneralMessage(message)
  {
    const messageContainer=document.getElementById("message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("generalMessage");
    messageElement.innerHTML=`${message}`;
    messageContainer.append(messageElement);

  }

//Function to handle form submit
  const handleSubmit=(e)=>{
    e.preventDefault();
    var message=mssg;
    socket.emit("chat-message", message)
    setMssg("");
  }
  return (

    
      <Container className='screen'>
        <form onSubmit={handleSubmit}>
          <div id='message-area' className='message-area'>
            <div className='info-bar'>
              <div className='info-bar-left'>
                <Avatar src="https://www.shitpostbot.com/img/sourceimages/happy-doggo-57b1df2fb27db.jpeg" sx={{ width: "4rem", height: "4rem" }}/>
                <div className='name'>Jeremy Lewis </div>
              </div>
              <div className='info-bar-right'></div>
            </div>
            <div className="message-input">
          <TextField size="Normal" id="filled-basic" label="Enter Your Message" variant="filled"  type='text' value={mssg} onChange={(e)=>setMssg(e.target.value)}></TextField>
          <Button className='send_bttn'  type="submit" variant="contained" >Send</Button>
          </div>
          </div>
          
        </form>
      </Container>
  
  )
}

export default App
