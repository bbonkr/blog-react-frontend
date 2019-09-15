import { actionTypes } from '../reducers/actionTypes';
import { Action } from 'redux';
import { IDictionary } from './IDictionary';

export interface IBlogAction extends Action<actionTypes> {
    data?: IDictionary<any>;
    error?: Error;
    message?: string;
}
