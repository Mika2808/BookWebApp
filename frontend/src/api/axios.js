import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1234',
  withCredentials: true,
});

export default instance;
