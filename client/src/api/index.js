import axios from 'axios';

const url = 'http://localhost:5000';

const pyServerUrl = 'http://127.0.0.1:8000';

export const createRoom = (roomId) => axios.post(`${pyServerUrl}/room`, roomId);

export const checkRoom = (roomId) => axios.get(`${pyServerUrl}/room/check/${roomId}`);

export const joinRoom = async (joinRoomId) => axios.post(`${pyServerUrl}/room/joinRoom`, joinRoomId);

export const saveDoc = (data) => axios.post(`${pyServerUrl}/docs`, data);

export const updateDoc = (data) => axios.patch(`${pyServerUrl}/docs`, data);

export const getDoc = (data) => axios.get(`${pyServerUrl}/docs/fetch/${data.id}`);

export const deleteDoc = (data) => axios.delete(`${pyServerUrl}/docs/${data.id}`);
