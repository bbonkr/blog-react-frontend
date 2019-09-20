import * as Redux from 'redux';
import { Task } from 'redux-saga';

declare module 'redux' {
    export interface Store {
        sagaTask: Task;
    }

    export interface IAction {
        type: string;
        data?: any | null;
    }
}