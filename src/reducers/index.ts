import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import user from './user';
import post from './post';
import category from './category';
import settings from './settings';
import posts from './posts.reducer';
import tagPosts from './tagPosts.reducer';
import userCategoryPosts from './userCategoryPosts.reducer';
import searchPosts from './searchPosts.reducer';
import usersPosts from './usersPosts.reducer';
import singlePost from './singlePost.reducer';
import myPosts from './myPosts.reducer';
import me from './me';
import { IBlogAction } from '../typings/IBlogAction';
import { IRootState } from '../typings/reduxStates';

export type BlogReducer = Reducer<IRootState, IBlogAction>;

const map: ReducersMapObject = {
    user,
    post, // posts, categoryPosts, tagPosts, singlePost 로 분리
    category,
    settings,
    me,
    myPosts,
    posts,
    tagPosts,
    userCategoryPosts,
    searchPosts,
    usersPosts,
    singlePost,
};

export const rootReducer = combineReducers<IRootState, IBlogAction>(map);
