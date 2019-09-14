import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import user, { IUserState } from './user';
import post, { IPostState } from './post';
import category, { ICategoryState } from './category';
import settings, { ISettingState } from './settings';
import me, { IMeState } from './me';
import { BlogAction } from './BlogAction';

export interface IRootState {
    user: IUserState;
    post: IPostState;
    category: ICategoryState;
    settings: ISettingState;
    me: IMeState;
}

export type BlogReducer 
    = Reducer<IRootState, BlogAction>

    const map : ReducersMapObject= {
        user,
        post,
        category,
        settings,
        me,
    }

export const rootReducer = combineReducers<IRootState, BlogAction>(map);
