import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import * as api from '../../api/index'
import NavBar from '../../components/NavBar/NavBar';

import { ReactComponent as Productive} from '../../assets/scene.svg'




const HomePage =  ({isRoomCreated,setIsRoomCreated}) => {
    
    
    const [roomId,setRoomId] = useState()
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
            <div >
                <NavBar />
                <div className='container mx-auto flex justify-between items-center py-5'>
                    <div className='flex flex-col'>
                        <button className="bg-rose-700 hover:bg-rose-500 text-white font-bold py-3 px-16 rounded m-4 font-Montserrat" onClick={handleCreateRoom}>{roomId}CREATE ROOM</button>
                        <div className="flex items-center ">
                            <input
                                className = "bg-black appearance-none rounded-md border-rose-500   py-3 px-6 m-4 text-white leading-tight focus:outline-none focus:bg-rose-700 focus:border-rose-700 border-4"
                                type="text"
                                value={idToCall}
                                placeholder='ENTER ROOM CODE'
                                onChange={(e) => {setIdToCall(e.target.value)}}/>
                            <button className="flex-shrink-0 bg-rose-700 hover:bg-rose-500 font-bold py-4 px-7 m-3  text-sm text-white rounded font-Montserrat" onClick={handleJoinRoom}>JOIN ROOM</button>
                        </div>
                    </div>
                    <Productive className="h-128"/>
                </div>
            </div>
    </>
    );

};



export default HomePage;