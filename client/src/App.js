import { Route, Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage/RoomPage';
import HomePage from './pages/HomePage/HomePage';
import AboutPage  from './pages/AboutPage/AboutPage';
import Error404 from './pages/Error404/Error404';
import NavBar from './components/NavBar/NavBar';
import { useState, useEffect, useContext } from 'react';
import * as api from './api/index';

import { RoomContext } from './context/room.context';

function RoomChecker({ isRoomCreated , roomId }) {

  const [ session, setSession ] = useState(null);


  useEffect(() => {
    async function loadSession() {
      try {
        const { data } = await api.checkRoom(roomId);
        setSession(data);
      } catch (error) {
        console.error(error.message);
      } 
    }
    loadSession();
  }, []);
  if (isRoomCreated) {
    return <RoomPage />;
  } else {
    return <Error404 />;
  }
}



const  App = ()  => {


  const {roomId, isRoomCreated, setIsRoomCreated} = useContext(RoomContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />} >
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/room/:1" element={<RoomChecker isRoomCreated={isRoomCreated} roomId={roomId} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
