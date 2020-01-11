import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';
import { MakeStoreOptions } from 'next-redux-wrapper';
import { BaseAction } from '../typings/BaseAction';
import { RootState } from '../typings/reduxStates';
import axios from 'axios';
import { appOptions } from '../config/appOptions';
import getConfig from 'next/config';
import { createLogger } from 'redux-logger';
import { setAccessTokenMiddleware } from './setAccessTokenMiddleware';
import { loggingMiddleware } from './loggingMiddleware';

const { publicRuntimeConfig } = getConfig();

interface ReduxStore {
    store?: Store;
}

const bindMiddlewares = (middleware: Middleware[]) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        const reduxLoggerMiddleware = createLogger();
        const middlewareIncludesReduxLogger = [...middleware, reduxLoggerMiddleware];

        return composeWithDevTools(applyMiddleware(...middlewareIncludesReduxLogger));
    }

    return applyMiddleware(...middleware);
};

export const configureStore = (initialState: RootState, options: MakeStoreOptions): Store<RootState, BaseAction> => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [setAccessTokenMiddleware, loggingMiddleware, sagaMiddleware];
    const returnValue: ReduxStore = {};

    if (options.isServer) {
        returnValue.store = createStore(rootReducer, initialState, bindMiddlewares(middlewares));
    } else {
        const persistConfig = {
            key: 'root',
            storage,
            blacklist: [
                'form',
                'connection',
                //'initialization',
                'messaging',
            ],
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer);

        returnValue.store = createStore(persistedReducer, initialState, bindMiddlewares(middlewares));
        const persistedStore = persistStore(returnValue.store);
        returnValue.store.persistStore = persistedStore;
    }

    returnValue.store.sagaTask = sagaMiddleware.run(rootSaga);

    return returnValue.store;
};
