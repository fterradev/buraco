import io, { Socket } from "socket.io-client";

let socket: typeof Socket;

export const connect = () => {
  socket = io("http://localhost:4000");
  socket.on('connect', () => {
    console.log('connected')
  });
  socket.on('disconnect', () => {
    console.log('disconnected')
  });
  socket.on('hey', () => {
    console.log('got a `hey`');
  });
  socket.on('join', (name: string) => {
    console.log(`${name} has joined`);
  })
}

export const disconnect = () => {
  socket.disconnect();
}

export const setPlayerName = (name: string) => {
  socket.emit("setname", name);
}

export const createMatch = () => {
  socket.emit("create-match", undefined, ({ matchCode }: any) => {
    console.log({ matchCode });
  });
}