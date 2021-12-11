import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';
const Notification = () => {
  
  const {answerCall,call,callAccepted}=useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling</h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </>
  )
};

export default Notification;
