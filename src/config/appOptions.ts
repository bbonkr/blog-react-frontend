import { IAppOptions } from '../typings/IAppOptions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const appOptions: IAppOptions = {
    title: 'Blog Service',
    fbAdmin: '',
    apiBaseUrl: publicRuntimeConfig.apiBaseUrl || 'http://localhost:5000',
};
