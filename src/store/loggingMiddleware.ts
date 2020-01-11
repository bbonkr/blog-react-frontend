import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import getConfig from 'next/config';
import { BaseAction } from '../typings/BaseAction';


const { publicRuntimeConfig } = getConfig();

/**
 * 로깅 미들웨어
 * @param api
 */
export const loggingMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<BaseAction>>) => next => action => {
    if (publicRuntimeConfig.env !== 'production') {
        console.debug('\u001b[34m[REDUX]: [BEFORE] dispatch ==> \u001b[0m', action.type);
    }

    const returnValue = next(action);

    if (publicRuntimeConfig.env !== 'production') {
        console.debug('\u001b[34m[REDUX]: [AFTER] dispatch ==> \u001b[0m', action.type);
    }

    return returnValue;
};
