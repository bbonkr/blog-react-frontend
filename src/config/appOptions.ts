import { IAppOptions } from '../typings/IAppOptions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const appOptions: IAppOptions = {
    title: 'Blog Service',
    description: '',
    fbAdmin: '',
    apiBaseUrl: publicRuntimeConfig.apiBaseUrl || 'http://localhost:5000',
    googleAnalyticsTraceId: publicRuntimeConfig.googleAnalyticsTraceId,
};
