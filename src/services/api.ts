import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;

//emulador android  http://10.0.2.2:3333
// fisico 192.168.0.26
