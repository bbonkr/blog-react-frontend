import { actionTypes } from '../reducers/actionTypes';
import { Action } from 'redux';
import { Dictionary } from './Dictionary';

export interface BaseAction extends Action<actionTypes> {
    data?: Dictionary<any>;
    error?: Error;
    message?: string;
}
