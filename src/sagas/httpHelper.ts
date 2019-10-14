import axios, { AxiosInstance } from 'axios';

export const http = (): AxiosInstance => {
    const axiosInstance: AxiosInstance = axios.create({
        ...axios.defaults,
    });

    // console.debug('[AXIOS] request config:', axiosInstance.defaults);

    return axiosInstance;
};
