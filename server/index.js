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

server.listen(5000, () => console.log('Server listening on port 5000'));

app.get('/', (req, res) => {
  res.send('Running');
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});
