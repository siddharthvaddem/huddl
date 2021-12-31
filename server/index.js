//use npm run dev to start server with nodemon - used for restarting server when changes are made
//es6 init
//https://socket.io/docs/v3/server-initialization/
import express from 'express';

import cors from 'cors';


const app = express();




app.use(cors());

app.listen(5000, () => console.log('Server listening on port 5000'));

app.get('/', (req, res) => {
  res.send('Running');
});

