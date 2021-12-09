import React,{useContext} from 'react';
import { SocketContext } from '../SocketContext';

const Player = () => {
  const {name,callAccepted,myVideo,userVideo,callEnded,stream,call} = useContext(SocketContext)
  return (
    <>
        <div style={{display:'flex',flexDirection:'row'}}>
    {
      stream && (
        <div><h2>{name}</h2><video playsInline muted ref={myVideo} autoPlay/></div>
      )
    }
    {
     callAccepted && !callEnded && (
      <div><h2>{call.name}</h2><video playsInline muted ref={userVideo} autoPlay/></div>
     ) 
    }

    
   
    
    </div>
    
    </>
  )
};

export default Player;
