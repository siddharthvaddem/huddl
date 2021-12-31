//use npm run dev to start server with nodemon - used for restarting server when changes are made
//es6 init
//https://socket.io/docs/v3/server-initialization/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import roomRoutes from './routes/room.js';
import docRoute from './routes/docs.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/room', roomRoutes);
app.use('/docs', docRoute);
app.listen(5000, () => console.log('Server listening on port 5000'));

app.get('/', (req, res) => {
  res.send('Running');
});
