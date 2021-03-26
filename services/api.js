import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sid.anubz.io',
});

export default api;


// const axiosInstance = axios.create({
//     baseURL: '/api/',
//     timeout: 2000,
//     headers: { 'X-Custom-Header': 'foobar' }
//   });