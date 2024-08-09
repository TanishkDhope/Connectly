import React, { useEffect, useState, useMemo, createElement } from 'react'
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
  const names=[ {
                name: "Robert Downey jr.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnDv9-LrAurxTcEzWQfNnMqcx0bM-WcnivQ&s"
                },

                {
                 name: "Cristiano Ronaldo",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/640px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                },

                {
                  name: "Lionel Messi",
                  image: "https://www.google.com/imgres?q=Messi&imgurl=https%3A%2F%2Ffcb-abj-pre.s3.amazonaws.com%2Fimg%2Fjugadors%2FMESSI.jpg&imgrefurl=https%3A%2F%2Fplayers.fcbarcelona.com%2Fen%2Fplayer%2F548-messi-lionel-andres-messi-cuccitini&docid=I3XxI_RjJW0CWM&tbnid=QlE-WMW-0yhrnM&vet=12ahUKEwiAu5ib_eeHAxWrV2wGHfrDINsQM3oECH8QAA..i&w=332&h=498&hcb=2&ved=2ahUKEwiAu5ib_eeHAxWrV2wGHfrDINsQM3oECH8QAA"
                }, 

                { name: "Lewis Hamilton",
                  image: "https://cdn-4.motorsport.com/images/mgl/YEQ1pGwY/s8/lewis-hamilton-mercedes.jpg",
                }, 

                {
                  name: "Charles Lecrec",
                  image: "https://cdn-6.motorsport.com/images/mgl/YMdm7R32/s8/charles-leclerc-ferrari.jpg"
                }  ];
  const [username, setUsername]= useState("DefaultGuy");
  const [image, setImage]= useState("https://pbs.twimg.com/profile_images/1304752924610850817/4eIlt6oT_400x400.jpg");


  useEffect(() => {
    //Asking for Name from user
    // appendGeneralMessage(`You Joined`);
    giveRandomName();

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

    socket.on("personal-message", (msg) => {
      appendYourMessage(msg);
    })

    socket.on("user-disconnect", data=>{
       document.getElementById('green-dot').style.display= "none";
      //  appendGeneralMessage(`${data} Disconnected`);
    })

    //On disconnect
    return () => {
      socket.disconnect();


    }
  }, [])

  const [mssg, setMssg] = useState("");

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
  const handleSubmit = (e) => {
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

  //function to temporarily give random name to user
  function giveRandomName(){
    const random=names[(Math.floor(Math.random()*names.length))];
    setUsername(random.name);
    setImage(random.image)
    
  }

  //function to scroll in view
  function scrollToBottom(targetElm){
      targetElm.scrollIntoView()
  }
  return (

    
      <div className='screen'>
        <form onSubmit={handleSubmit}>
          <div id='message-area' className='message-area'>
            <div className='info-bar'>
              <div className='info-bar-left'>
              <div id='green-dot'></div>
                <Avatar className='avatar' src={image} sx={{ width: "4.5rem", height: "4.5rem" }}>
               
                </Avatar>
                <div className='name'>{username}</div>
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
