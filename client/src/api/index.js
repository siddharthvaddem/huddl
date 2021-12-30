import axios from 'axios';

const url = 'http://localhost:5000/docs';

export const saveDoc = (doc) => axios.post(url, doc);
