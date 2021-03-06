import { AppOptions } from '../typings/AppOptions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const appOptions: AppOptions = {
    title: 'Blog Service',
    description: '',
    fbAdmin: '',
    apiBaseUrl: publicRuntimeConfig.apiBaseUrl || 'http://localhost:5000',
    googleAnalyticsTraceId: publicRuntimeConfig.googleAnalyticsTraceId,
};
