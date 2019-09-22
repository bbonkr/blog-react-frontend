import { IMyPostsState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { MyPostsHanlder } from './hanlders/myPosts.handler';

export const initialState: IMyPostsState = {
    // myPosts
    myPosts: [],
    loadingMyPosts: false,
    postsLimit: 10,
    hasMorePost: false,
    searchKeyword: '',
    postsCount: 0,
    postsCurrentPage: 1,
};

const reducer = (state: IMyPostsState = initialState, action: IBlogAction) =>
    produce(state, (draft) => {
        const handler = new MyPostsHanlder({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_MY_POSTS_CALL:
                handler.loadMyPostCall();
                break;
            case actionTypes.LOAD_MY_POSTS_DONE:
                handler.loadMyPostsDone(action);
                break;
            case actionTypes.LOAD_MY_POSTS_FAIL:
                draft.loadingMyPosts = false;
                draft.loadMyPostsErrorReason = action.message;
                break;
            case actionTypes.DELETE_POST_CALL:
                draft.loadingMyPosts = true;
                break;
            case actionTypes.DELETE_POST_DONE:
                const index = draft.myPosts.findIndex(
                    (x) => x.id === action.data.id,
                );
                draft.myPosts.splice(index, 1);
                draft.loadingMyPosts = false;
                break;
            case actionTypes.DELETE_POST_FAIL:
                draft.loadingMyPosts = false;
                break;
            default:
                break;
        }
    });

export default reducer;
