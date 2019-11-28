import produce from 'immer';
import { actionTypes } from './actionTypes';
import { BaseAction } from '../typings/BaseAction';
import { PostsHandler } from './hanlders/posts.handler';
import { PostsState } from '../typings/reduxStates';

export const initialState: PostsState = {
    /** posts */
    posts: [],
    /** posts loading */
    loadingPosts: false,
    hasMorePost: true,
    loadPostErrorReason: '',
    postsLimit: 10,
    currentPage: 1,
    searchKeyword: '',
};

const reducer = (state: PostsState = initialState, action: BaseAction) =>
    produce(state, (draft) => {
        const handler = new PostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_POSTS_CALL:
                handler.loadPostsCall();
                break;
            case actionTypes.LOAD_POSTS_DONE:
                handler.loadPostsDone();
                break;
            case actionTypes.LOAD_POSTS_FAIL:
                handler.loadPostsFail();
                break;
            case actionTypes.UPDATE_POSTS_LIKERS:
                handler.updatePostsLikers();
                break;
            default:
                break;
        }
    });

export default reducer;
