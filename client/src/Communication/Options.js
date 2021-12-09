import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';
const Options = ({ children }) => {
  const { myself, callAccepted, callEnded, name, setName, leaveCall, callUser } = useContext(SocketContext);
  const [ idToCall, setIdToCall ] = useState('');

  return (
    <div>
      <form noValidate autoComplete="off">
        <input type="text" value={name} style={{ background: '#ffffe7' }} onChange={(e) => setName(e.target.value)} />
        <CopyToClipboard text={myself}>
          <button type="button">Copy your ID</button>
        </CopyToClipboard>
        <input
          type="text"
          label="ID to call"
          value={idToCall}
          style={{ background: '#ffffe7' }}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>Hang Up</button>
        ) : (
          <button type="button" onClick={() => callUser(idToCall)}>
            Call
          </button> //why use callback function for this -> it doesnt wait for the onclick if its direct function
        )}
      </form>
      {children}
    </div>
  );
};

export default Options;
