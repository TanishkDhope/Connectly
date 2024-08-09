import React, { useEffect, useState, useMemo, createElement} from 'react'
import "./App.css"
import {io} from "socket.io-client"
import { Box, Avatar, Button, Container, TextField, colors } from '@mui/material';
import { MdEmojiEmotions } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { IoIosShareAlt } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";


function App() {
  const socket=useMemo(()=>io("http://localhost:3000"), []);

  useEffect(()=>{
    //Asking for Name from user
    // appendGeneralMessage(`You Joined`);

    // const name=prompt("Whats Your Name");
    socket.on("connect", ()=>{
      // appendGeneralMessage(`You Joined`);
    })
    //Sending Name of User
    socket.emit("new-user", name);

    //User Greeting on Connection
    socket.on("user-connect", data=>{
      document.getElementById('green-dot').style.display= "block";
      // appendGeneralMessage(`${data} Connected`);
    })

    //Recieve Message
    socket.on("message", (data)=>{
      // appendMessage(`${data.name}: ${data.message}`);
      appendMessage(data.message);
    })

    socket.on("personal-message", (msg)=>{
      appendYourMessage(msg);
    })

    socket.on("user-disconnect", data=>{
       document.getElementById('green-dot').style.display= "none";
      //  appendGeneralMessage(`${data} Disconnected`);
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
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("otherMessage");
    messageElement.innerHTML=`<div class="inner-message-other">${message}</div>`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);
  }

  //Functio to append Message in your chat
  function appendYourMessage(message)
  {
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("myMessage");
    messageElement.innerHTML=`<div class="inner-message-personal">${message}</div>`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);

  }

  //function to append general messages
  function appendGeneralMessage(message)
  {
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("generalMessage");
    messageElement.innerHTML=`${message}`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);
  }

//Function to handle form submit
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(mssg=="")
    {
      alert("Cannot Send Empty Message");
      return;
    }

    var message=mssg;
    
    socket.emit("chat-message", message)
    setMssg("");
    
  }

  //function to scroll in view
  function scrollToBottom(targetElm){
      targetElm.scrollIntoView()
  }
  return (

    
      <div disableGutters maxWidth={false} className='screen'>
        <form onSubmit={handleSubmit}>
          <div id='message-area' className='message-area'>
            <div className='info-bar'>
              <div className='info-bar-left'>
              <div id='green-dot'></div>
                <Avatar className='avatar' src="https://www.shitpostbot.com/img/sourceimages/happy-doggo-57b1df2fb27db.jpeg" sx={{ width: "4.5rem", height: "4.5rem" }}>
               
                </Avatar>
                <div className='name'>Jeremy Lewis </div>
              </div>
              <div className='info-bar-right'>
              <HiMiniVideoCamera className='info-bar-icon'/>
              <IoIosShareAlt className='info-bar-icon'/>
              <CiMenuKebab className='info-bar-icon'/>

              </div>
             
            </div>
            <div id='actual-message-area'></div>
            <div className="message-input">
          <MdEmojiEmotions className='icon'/>
          <input placeholder='Enter Your Message' className="input" type='text' value={mssg} onChange={(e)=>setMssg(e.target.value)}></input>
          <GrGallery className='gallery-icon'/>
          <Button className='send_bttn' type="submit"> <IoSendSharp className='icon'/></Button>
         
          </div>
          </div>
          
        </form>
      </div>
  
  )
}

export default App
