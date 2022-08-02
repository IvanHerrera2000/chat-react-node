import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { PORT } from './config.js';

const app = express();
//convierto el servidor express a htpp para que sea compatible con socket.io
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
  },
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log(`user connected with id: '${socket.id}'`);
});

server.listen(PORT);
console.log(`Server started on port ${PORT}`);
