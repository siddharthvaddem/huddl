import { createContext,useEffect, useState } from "react";

export const RoomContext = createContext({
    roomId:null,
    setRoomId: () => {},
    isRoomCreated:false,
    setIsRoomCreated: () => {}
})

export const RoomProvider = ({children}) => {
    const [roomId, setRoomId] = useState(null);
    const [isRoomCreated, setIsRoomCreated] = useState(false);

    const value = {roomId, setRoomId, isRoomCreated,setIsRoomCreated};
    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>

}