import { SinglePostState } from '../typings/reduxStates';
import produce from 'immer';
import { BaseAction } from '../typings/BaseAction';
import { actionTypes } from './actionTypes';
import { SinglePostHandler } from './hanlders/singlePost.handler';

export const initialState: SinglePostState = {
    /** singlePost */
    singlePost: null,
    loadSinglePostErrorReason: '',
    /** post loading  */
    loadingPost: false,
    // isSinglePost: false,
    // currentCategory: '',
};

export const singlePost = (
    state: SinglePostState = initialState,
    action: BaseAction,
) =>
    produce(state, (draft) => {
        const handler = new SinglePostHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_SINGLE_POST_CALL:
                // draft.singlePost = null;
                // draft.isSinglePost = true;
                // draft.loadSinglePostErrorReason = '';
                // draft.loadingPost = true;
                handler.loadSinglePostCall();
                break;
            case actionTypes.LOAD_SINGLE_POST_DONE:
                // draft.singlePost = action.data;
                // draft.loadingPost = false;
                handler.loadSinglePostDone();
                break;
            case actionTypes.LOAD_SINGLE_POST_FAIL:
                // draft.loadSinglePostErrorReason = action.reason;
                // draft.loadingPost = false;
                handler.loadSinglePostFail();
                break;
            case actionTypes.UPDATE_SINGLE_POST_LIKERS:
                handler.updateSinglePostLikers();
                break;
            default:
                break;
        }
    });
