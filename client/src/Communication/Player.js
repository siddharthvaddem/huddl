import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";

const Player = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  const handleHide = (mode) => {
    var track;
    if (mode === "video")
      track = stream.getTracks().find((track) => track.kind === "video");
    if (mode === "audio")
      track = stream.getTracks().find((track) => track.kind === "audio");

    console.log(stream.getTracks());
    if (track.enabled) {
      track.enabled = false;
    } else track.enabled = true;
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {stream && (
          <div className="v1">
            <h2>{name}</h2>
            <video playsInline muted ref={myVideo} autoPlay />
            <button onClick={() => handleHide("video")}>
              Hide/unhide Video
            </button>
            <button onClick={() => handleHide("audio")}>
              mute/unmute audio
            </button>
          </div>
        )}
        {callAccepted && !callEnded && (
          <div className="v2">
            <h2>{call.name}</h2>
            <video playsInline muted ref={userVideo} autoPlay />
          </div>
        )}
      </div>
    </>
  );
};

export default Player;
