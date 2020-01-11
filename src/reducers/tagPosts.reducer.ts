import { BaseAction } from '../typings/BaseAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { TagPostsState } from '../typings/reduxStates';
import { TagPostsHandler } from './hanlders/tagPosts.handler';

export const initialState: TagPostsState = {
    /** tag posts */
    tagPosts: [],
    tagPostsLoading: false,
    tagPostsErrorReason: '',
    tagPostsHasMore: false,
    tagPostsKeyword: '',
    currentTag: null,
    currentTagSlug: '',
    hasMorePost: false,
    postsLimit: 10,
    currentPage: 1,
};

const reducer = (state: TagPostsState = initialState, action: BaseAction) =>
    produce(state, (draft) => {
        const handler = new TagPostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_TAG_POSTS_CALL:
                handler.loadTagPostsCall();
                break;
            case actionTypes.LOAD_TAG_POSTS_DONE:
                handler.loadTagPostsDone();
                break;
            case actionTypes.LOAD_TAG_POSTS_FAIL:
                handler.loadTagPostsFail();
                break;
            case actionTypes.UPDATE_TAG_POSTS_LIKERS:
                handler.updateTagPostsLikers();
                break;
            default:
                break;
        }
    });

export default reducer;
