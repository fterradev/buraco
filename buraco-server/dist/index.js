"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deck = __importStar(require("./deck"));
exports.game = __importStar(require("./game"));
require("./control");
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