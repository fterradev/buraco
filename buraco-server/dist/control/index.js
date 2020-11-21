"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const PORT = process.env.PORT || 4000;
const INDEX = '/index.html';
const server = express_1.default()
    .use((req, res) => res.sendFile(INDEX, { root: "./src/html" }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socket_io_1.default(server);
const clients = {};
const setClient = (id, properties) => {
    clients[id] = Object.assign(Object.assign({}, clients[id]), properties);
};
io.on("connection", socket => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('setname', (name) => {
        console.log(`His/her name is ${name}`);
        setClient(socket.id, {
            name
        });
        socket.broadcast.emit('join', clients[socket.id].name);
    });
    setTimeout(() => socket.emit('hey'), 3000);
});
//# sourceMappingURL=index.js.map