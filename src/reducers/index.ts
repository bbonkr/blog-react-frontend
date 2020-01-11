import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import user from './user';
import post from './post';
import category from './category';
import settings from './settings';
import posts from './posts.reducer';
import tagPosts from './tagPosts.reducer';
import { userCategoryPosts } from './userCategoryPosts.reducer';
import { searchPosts } from './searchPosts.reducer';
import { usersPosts } from './usersPosts.reducer';
import { singlePost } from './singlePost.reducer';
import { myPosts } from './myPosts.reducer';
import { myCategories } from './myCategories.reducer';
import { mediaFiles } from './mediaFiles.reducer';
import { me } from './me';
import { BaseAction } from '../typings/BaseAction';
import { RootState } from '../typings/reduxStates';

export type BlogReducer = Reducer<RootState, BaseAction>;

const map: ReducersMapObject = {
    user,
    post, // posts, categoryPosts, tagPosts, singlePost 로 분리
    category,
    settings,
    me,
    myPosts,
    myCategories,
    mediaFiles,
    posts,
    tagPosts,
    userCategoryPosts,
    searchPosts,
    usersPosts,
    singlePost,
};

export const rootReducer = combineReducers<RootState, BaseAction>(map);
