import * as Redux from 'redux';
import { Task } from 'redux-saga';
import { Persistor } from 'redux-persist';

declare module 'redux' {
    export interface Store {
        sagaTask: Task;
        persistStore: Persistor;
    }

    export interface IAction {
        type: string;
        data?: any | null;
    }
}
