import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1', // uses the env variable
  withCredentials: true,
});

export default api;
