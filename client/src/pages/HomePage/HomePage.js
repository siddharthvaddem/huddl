import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import * as api from '../../api/index'




import './HomePage.css'


const HomePage =  ({isRoomCreated,setIsRoomCreated}) => {
    
    
    const [roomId,setRoomId] = useState(10)
    const [ idToCall, setIdToCall ] = useState('');

    const navigate = useNavigate();


    const handleCreateRoom = async () => {
       // console.log(uuidv4())
        const currentRoomId = uuidv4() 
        try{
            
            const {data} = await api.createRoom({id:currentRoomId})
            if(data === currentRoomId){
                setIsRoomCreated(true)
                navigate(`room/${currentRoomId}`)
            }
        }catch(error){
            console.log(error)
        }
    }

     const handleJoinRoom = async () => {
        try{
            const {data} = await api.joinRoom({id:idToCall})
            if(data === "successfull"){
                setIsRoomCreated(true)
                navigate(`room/${idToCall}`)
            }
        }catch(error){
            console.log(error)
        }
        
        
     }


    return(
        <>
            <div>
                <h1>Welcome to huddl</h1>
                <button onClick={handleCreateRoom}>{roomId}CREATE ROOM</button>
                <div className="join-room">
                    <input
                        type="text"
                        value={idToCall}
                        style={{ background: '#ffffe7' }}
                        placeholder='ENTER ROOM CODE'
                        onChange={(e) => {setIdToCall(e.target.value)}
                    }
                    />
                    <button onClick={handleJoinRoom}>JOIN ROOM</button>
                    
                </div>
            
            </div>
    </>
    );

};



export default HomePage;