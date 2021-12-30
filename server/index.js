//use npm run dev to start server with nodemon - used for restarting server when changes are made
//es6 init
//https://socket.io/docs/v3/server-initialization/

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { disconnect } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Deta } = require('deta');
import bodyParser from 'body-parser';

const deta = Deta('c0n3pup7_D4aKMCt5wDckurk9wJrk2RB5tgnwhww7'); // configure your Deta project
const db = deta.Base('testdb'); // access your DB

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: [ 'GET', 'POST' ]
  }
});

const test = {
  name: 'Geordi',
  title: 'Chief Engineer',
  has_visor: true
};
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

server.listen(5000, () => console.log('Server listening on port 5000'));

app.get('/', (req, res) => {
  res.send('Running');
});

app.post('/docs', async (req, res) => {
  const { doc } = req.body;
  console.log(req.body);
  const insertedDoc = await db.put(doc);
  console.log(insertedDoc);
});

io.on('connection', (socket) => {
  socket.emit('myself', socket.id);

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
