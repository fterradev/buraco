import io, { Socket } from "socket.io-client";

let socket: typeof Socket;

export const connect = () => {
  socket = io("http://localhost:4000");
  socket.on('connect', () => {
    console.log('connected')
  });
  socket.on('hey', () => {
    console.log('got a `hey`');
  });
}

export const disconnect = () => {
  socket.disconnect();
}

export const setPlayerName = (name: string) => {
  socket.emit("setname", name);
}
