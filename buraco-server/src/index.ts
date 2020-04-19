export * as deck from "./deck";
export * as game from "./game";

// import express from "express";
// import socketIO from "socket.io";

// const PORT = process.env.PORT || 3000;
// const INDEX = "/index.html";

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: "html" }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("Client connected");
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

// setInterval(() => io.emit("time", new Date().toTimeString()), 1000);