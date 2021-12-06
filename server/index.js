//use npm run dev to start server with nodemon - used for restarting server when changes are made
//es6 init
//https://socket.io/docs/v3/server-initialization/
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { disconnect } from 'process';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: [ 'GET', 'POST' ]
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is live');
});

server.listen(5000, () => console.log('Server listening on port 5000'));

io.on('connection', (socket) => {
  //callback function to get the specific socket
  socket.emit('myself', socket.id); //socket.id to get our own id in the frontend

  //socket handlers

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('calluser', { signal: signalData, from, name });
  });

  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal);
  });
});
