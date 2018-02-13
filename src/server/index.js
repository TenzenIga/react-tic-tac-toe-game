const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const index = require("./routes/route");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let roomName = '';
let rooms = [];
io.on("connection", socket => {
socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('MOVE', data=>{
      socket.on(data, (d)=>{
        console.log(d);
        socket.broadcast.emit(data, d);
      })
})

socket.on('messages', roomName=>{
  socket.on(`Chat-${roomName}`, (mes)=>{
    socket.broadcast.emit(`Chat-${roomName}`, mes)
  })
})

socket.on("allrooms", data => {
  console.log(data);
io.emit("allrooms",rooms);
})

  socket.on('room', data=>{
    console.log(data);
    rooms.push(data);
    io.emit("allrooms",rooms);
    socket.broadcast.emit("room",data)

  });

  socket.on('join', data=>{
    socket.join(data);
    rooms =rooms.filter(key=> key!==data)
    io.emit("allrooms",rooms);
    console.log("!!!!!");
    io.sockets.to(data).emit('m', 'in room');
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));
