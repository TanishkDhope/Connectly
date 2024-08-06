import React, { useEffect, useState, useMemo, createElement } from 'react'
import "./App.css"
import { io } from "socket.io-client"
import Rooms from './Rooms.jsx'
import { Button, Container, TextField } from '@mui/material';
import ChatBar from './ChatBar.jsx';



function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    //Asking for Name from user
    // const name=prompt("Whats Your Name");
    appendYourMessage(`You Joined`);

    //Sending Name of User
    socket.emit("new-user", name);

    //User Greeting on Connection
    socket.on("user-connect", data => {
      appendMessage(`${data} Connected`);
    })

    //Recieve Message
    socket.on("message", (data) => {
      appendMessage(`${data.name}: ${data.message}`);
    })

    socket.on("personal-message", (msg) => {
      appendYourMessage(msg);
    })

    socket.on("user-disconnect", data => {
      appendMessage(`${data} Disconnected`);
    })

    //On disconnect
    return () => {
      socket.disconnect();


    }
  }, [])

  const [mssg, setMssg] = useState("");

  //Function to Append Message in text Area of other person
  function appendMessage(message) {
    const messageContainer = document.getElementById("message-area");
    const messageElement = document.createElement('div');
    messageElement.classList.add("otherMessage");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  //Functio to append Message in your chat
  function appendYourMessage(message) {
    const messageContainer = document.getElementById("message-area");
    const messageElement = document.createElement('div');
    messageElement.classList.add("myMessage");
    messageElement.innerText = message;
    messageContainer.append(messageElement);

  }

  //Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    var message = mssg;
    socket.emit("chat-message", message)
    setMssg("");
  }
  return (

    <div className="chat_body">
      <Rooms />
      <div className='screen'>
        <form onSubmit={handleSubmit}>
          <div id='message-area' className='message-area'>
           <ChatBar></ChatBar>
          </div>
          <div style={{ padding: "2em", width: "100rem" }}>
            <TextField id="outlined-basic" label="Enter Your Message" variant="outlined" type='text' value={mssg} onChange={(e) => setMssg(e.target.value)}></TextField>
            <Button className='send_bttn' type="submit" variant="contained" >Send</Button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default App
