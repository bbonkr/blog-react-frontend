import axios from 'axios';
import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { appOptions } from '../config/appOptions';
import { BaseAction } from '../typings/BaseAction';

/**
 * 액세스 토큰 추가 미들웨어
 * @param api
 */
export const setAccessTokenMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<BaseAction>>) => next => action => {
    if (/_CALL$/.test(action.type)) {
        const state = api.getState();
        const { accessToken } = state.user;

        axios.defaults = {
            ...axios.defaults,
            baseURL: `${appOptions.apiBaseUrl}/api`,
            timeout: 180000,
        };

        if (accessToken) {
            axios.defaults.headers = {
                ...axios.defaults.headers,
                Authorization: `bearer ${accessToken}`,
            };
        }
    }

    return next(action);
};
