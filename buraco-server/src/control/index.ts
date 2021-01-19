import express from "express";
import socketIO from "socket.io";
import randomstring from "randomstring";

const PORT = process.env.PORT || 4000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: "./src/html" }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

const clients: Record<string, any> = {};

const setClient = (id: string, properties: Record<string, any>) => {
  clients[id] = {
    ...clients[id],
    ...properties
  }
}

io.on("connection", socket => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('setname', (name) => {
    console.log(`His/her name is ${name}`);
    setClient(socket.id, {
      name
    });
    socket.broadcast.emit('join', name);
  });
  socket.on('create-match', (data, cb) => {
    const matchCode = randomstring.generate({
      length: 8,
      capitalization: 'lowercase',
    });

    console.log({ matchCode });
    cb({ matchCode });
    
  });
  setTimeout(() => socket.emit('hey'), 3000);
});