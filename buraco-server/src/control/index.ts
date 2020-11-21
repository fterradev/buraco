import express from "express";
import socketIO from "socket.io";

const PORT = process.env.PORT || 4000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root:  "./src/html" }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", socket => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('setname', (name) => {
    console.log(`His/her name is ${name}`);
  });
  setTimeout(() => socket.emit('hey'), 3000);
});