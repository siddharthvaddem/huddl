import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as api from "../../api/index";
import Example from "../../components/Navbar/NavBar";

const HomePage = ({ isRoomCreated, setIsRoomCreated }) => {
  const [roomId, setRoomId] = useState();
  const [idToCall, setIdToCall] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    // console.log(uuidv4())
    const currentRoomId = uuidv4();
    try {
      const { data } = await api.createRoom({ id: currentRoomId });
      if (data === currentRoomId) {
        setIsRoomCreated(true);
        navigate(`room/${currentRoomId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const { data } = await api.joinRoom({ id: idToCall });
      if (data === "successfull") {
        setIsRoomCreated(true);
        navigate(`room/${idToCall}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d1">
        <Example />

        <button className="b1" onClick={handleCreateRoom}>
          {roomId}CREATE ROOM
        </button>
        <div className="join-room">
          <input
            type="text"
            value={idToCall}
            className="in1"
            placeholder="ENTER ROOM CODE"
            onChange={(e) => {
              setIdToCall(e.target.value);
            }}
          />
          <button className="b2" onClick={handleJoinRoom}>
            Join room
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
