import { Route, Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage/RoomPage';
import HomePage from './pages/HomePage/HomePage';
import { useState, useEffect } from 'react';
import * as api from './api/index';
import NavBar from './components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

// function RoomChecker({ isRoomCreated }) {
//   const loc = window.location.href;
//   const roomId = loc.substring(loc.lastIndexOf('/') + 1);
//   const [ session, setSession ] = useState(null);
//   console.log(roomId);
//   useEffect(() => {
//     async function loadSession() {
//       try {
//         const { data } = await api.checkRoom(roomId);
//         setSession(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }
//     loadSession();
//   }, []);
//   if (session) {
//     return <RoomPage />;
//   } else {
//     return <h1 style={{ color: 'white' }}>Room not created</h1>;
//   }
// }

function RoomChecker({ isRoomCreated }) {
  if (isRoomCreated) {
    return <RoomPage />;
  } else {
    return <h1 style={{ color: 'white' }}>Room not created</h1>;
  }
}

function App() {
  const [ isRoomCreated, setIsRoomCreated ] = useState(false);
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<HomePage isRoomCreated={isRoomCreated} setIsRoomCreated={setIsRoomCreated} />} />
        <Route path="/room/:1" element={<RoomChecker isRoomCreated={isRoomCreated} />} />
      </Routes>
    </div>
  );
}

export default App;
