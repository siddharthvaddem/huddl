import {Route, Routes} from 'react-router-dom'
import RoomPage from './pages/RoomPage/RoomPage';
import HomePage from './pages/HomePage/HomePage';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/room' element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
