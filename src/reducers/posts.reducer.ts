import produce from 'immer';
import { actionTypes } from './actionTypes';
import { IBlogAction } from '../typings/IBlogAction';
import { PostsHandler } from './hanlders/posts.handler';
import { IPostsState } from '../typings/reduxStates';

export const initialState: IPostsState = {
    /** posts */
    posts: [],
    /** posts loading */
    loadingPosts: false,
    hasMorePost: true,
    loadPostErrorReason: '',
    postsLimit: 10,
    nextPageToken: '',
    currentPage: 1,
    searchKeyword: '',
};

const reducer = (state: IPostsState = initialState, action: IBlogAction) =>
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
            default:
                break;
        }
    });

export default reducer;
