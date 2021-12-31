import {Route, Routes} from 'react-router-dom'
import RoomPage from './pages/RoomPage/RoomPage';
import HomePage from './pages/HomePage/HomePage';
import {useState} from 'react'


function RoomChecker({isRoomCreated}){
  if(isRoomCreated){

    return <RoomPage />
  } else{
    return <h1>Room not created</h1>
  }
}




function App() {
  const [isRoomCreated,setIsRoomCreated] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage isRoomCreated={isRoomCreated} setIsRoomCreated={setIsRoomCreated}/>} />
        <Route path='/room/:1' element={<RoomChecker isRoomCreated={isRoomCreated} />} />
      </Routes>
    </div>
  );
}

export default App;