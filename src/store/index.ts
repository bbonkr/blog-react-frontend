import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';
import { MakeStoreOptions } from 'next-redux-wrapper';
import { IBlogAction } from '../typings/IBlogAction';
import { IRootState } from '../typings/reduxStates';
import axios from 'axios';

export const configureStore = (
    initialState: IRootState,
    options: MakeStoreOptions,
): Store<IRootState, IBlogAction> => {
    const isProd = process.env.NODE_ENV === 'production';

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [setTokenMiddleware, loggingMiddleware, sagaMiddleware];

    const composeEnhancers =
        (!options.isServer &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
        compose;

    const enhancers = isProd
        ? compose(applyMiddleware(...middlewares))
        : composeEnhancers(applyMiddleware(...middlewares));

    const store: Store<IRootState, IBlogAction> = createStore(
        rootReducer,
        initialState,
        enhancers,
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const loggingMiddleware = (store) => (next) => (action) => {
    // 액션확인
    // console.log(action);

    console.debug('\u001b[34m[REDUX]: dispatch ==> \u001b[0m', action.type);

    next(action);
};

const setTokenMiddleware = (store: Store<IRootState, IBlogAction>) => (
    next,
) => (action: IBlogAction) => {
    if (/_CALL$/.test(action.type)) {
        const state = store.getState();
        const { token } = state.user;

        console.debug(
            '\u001b[34m[REDUX]: Set token middleware ==> \u001b[0m',
            action.type,
        );

        if (token) {
            axios.defaults.headers = {
                ...axios.defaults.headers,
                Authorization: `bearer ${token}`,
            };
        }
    }

    next(action);
};
