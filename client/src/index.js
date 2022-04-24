import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RoomProvider } from './context/room.context';
import './index.css'


import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <RoomProvider>
      <App />
      </RoomProvider>
  </BrowserRouter>
  
  ,
  document.getElementById('root')
);
