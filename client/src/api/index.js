import axios from "axios";

const url = 'http://localhost:5000/room';

export const createRoom = (roomId) => axios.post(url,roomId)

export const joinRoom = (joinRoomId) =>axios.post(`${url}/joinRoom`,joinRoomId)