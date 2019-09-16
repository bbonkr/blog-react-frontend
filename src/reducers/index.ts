import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import user from './user';
import post from './post';
import category from './category';
import settings from './settings';
import me from './me';
import { IBlogAction } from '../typings/IBlogAction';
import { IRootState } from '../typings/reduxStates';

export type BlogReducer = Reducer<IRootState, IBlogAction>;

const map: ReducersMapObject = {
    user,
    post,
    category,
    settings,
    me,
};

export const rootReducer = combineReducers<IRootState, IBlogAction>(map);
