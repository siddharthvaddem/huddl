import axios from 'axios';

const url = 'http://localhost:5000';

export const createRoom = (roomId) => axios.post(`${url}/room`, roomId);

export const joinRoom = (joinRoomId) => axios.post(`${url}/room/joinRoom`, joinRoomId);

export const saveDoc = (data) => axios.post(`${url}/docs`, data);

export const updateDoc = (data) => axios.patch(`${url}/docs`, data);

export const getDoc = (id) => axios.post(`${url}/docs/fetch`, id);

//export const deleteDoc = (id) => axios.delete(`${url}/docs`, id);
