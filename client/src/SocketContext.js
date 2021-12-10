import React, { createContext, useState, useRef, useEffect } from 'react';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext(); //creating our context for global access of data

//initial instance of socket.io
const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  ///our use states for handling call states
  const [ stream, setStream ] = useState();
  const [ me, setMe ] = useState('');
  const [ call, setCall ] = useState({});
  const [ callAccepted, setCallAccepted ] = useState(false);
  const [ callEnded, setCallEnded ] = useState(false);
  const [ name, setName ] = useState('');

  //immediately populate the audio stream
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  //as page loads this will help in getting permission for audio from user
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []); // only once dont want it to run again, must have any empty dependency array

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer; //current connection is the current peer inside the connection
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer; //current connection is the current peer inside the connection
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload(); //reload page after call ends so that a new user id can be set if you want to call someone again immediately after leaving call
  };

  return (
    //context provider for accesing data globally in our app
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
