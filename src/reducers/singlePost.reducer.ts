import { ISinglePostState } from '../typings/reduxStates';
import produce from 'immer';
import { IBlogAction } from '../typings/IBlogAction';
import { actionTypes } from './actionTypes';
import { SinglePostHandler } from './hanlders/singlePost.handler';

export const initialState: ISinglePostState = {
    /** singlePost */
    singlePost: null,
    loadSinglePostErrorReason: '',
    /** post loading  */
    loadingPost: false,
    // isSinglePost: false,
    // currentCategory: '',
};

const reducer = (state: ISinglePostState = initialState, action: IBlogAction) =>
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

export default reducer;
