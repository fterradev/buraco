"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deck = __importStar(require("./deck"));
exports.game = __importStar(require("./game"));
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
//# sourceMappingURL=index.js.map