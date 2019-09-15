import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 180000,
    withCredentials: true,
    // headers: { crossDomain: true, 'Content-Type': 'application/json' },
});
