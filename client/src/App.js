import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage/RoomPage";
import HomePage from "./pages/HomePage/HomePage";
import { ContextProvider } from "./SocketContext";
import "./pages/HomePage/HomePage.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/room"
          element={
            <ContextProvider>
              <RoomPage />
            </ContextProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
