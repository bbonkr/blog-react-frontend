import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import { rootReducer, IRootState } from '../reducers';
import { rootSaga } from '../sagas';
import { MakeStoreOptions } from 'next-redux-wrapper';
import { BlogAction } from 'reducers/BlogAction';

export const configureStore = (
    initialState: any,
    options: MakeStoreOptions,
): Store<any, BlogAction> => {
    const isProd = process.env.NODE_ENV === 'production';

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        loggingMiddleware,
        sagaMiddleware
        ];

    const composeEnhancers =
        (!options.isServer &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
        compose;

    const enhancers = isProd
        ? compose(applyMiddleware(...middlewares))
        : composeEnhancers(applyMiddleware(...middlewares));

    const store: Store<IRootState,BlogAction> = createStore(rootReducer, initialState, enhancers);

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const loggingMiddleware = (store) => next => action => {
    // 액션확인
    // console.log(action);
    // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
    next(action);
};