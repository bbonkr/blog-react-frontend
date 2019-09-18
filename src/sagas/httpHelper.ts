import axios, { AxiosInstance } from 'axios';

export const http = (): AxiosInstance => {
    const axiosInstance: AxiosInstance = axios.create({
        ...axios.defaults,
        baseURL: 'http://localhost:5000/api',
        timeout: 180000,
        withCredentials: true,
        // headers: { crossDomain: true, 'Content-Type': 'application/json' },
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    });

    console.debug('[AXIOS] request config:', axiosInstance.defaults);

    return axiosInstance;
};
