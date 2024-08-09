import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const names=["Jeremy lewis", "Cristiano Ronaldo", "Ansal Chaubey", "Lewis Hamilton"];
const User={};
const app = express();
const PORT = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);
  //Store Name in Array
  socket.on("new-user", (name) => {
    User[socket.id] = name;
    socket.broadcast.emit("user-connect", User[socket.id]);
  });

  socket.on("chat-message", (message) => {
    socket.broadcast.emit("message", {
      name: User[socket.id],
      message: message,
    });
    socket.emit("personal-message", `${message}`)
  });

  //On Disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnect", User[socket.id]);
    console.log("User Disconnectd");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
