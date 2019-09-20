import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { ITagPostsState } from '../typings/reduxStates';
import { TagPostsHandler } from './hanlders/tagPosts.handler';

export const initialState: ITagPostsState = {
    /** tag posts */
    tagPosts: [],
    tagPostsPageToken: '',
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

const reducer = (state: ITagPostsState = initialState, action: IBlogAction) =>
    produce(state, (draft) => {
        const handler = new TagPostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_TAG_POSTS_CALL:
                // draft.tagPosts = action.data.pageToken ? draft.tagPosts : [];
                // draft.hasMorePost = action.data.pageToken
                //     ? draft.tagPostsHasMore
                //     : true;
                // draft.tagPostsLoading = true;
                // draft.tagPostsErrorReason = '';
                handler.loadTagPostsCall();
                break;
            case actionTypes.LOAD_TAG_POSTS_DONE:
                // action.data.records.forEach((v) => {
                //     const index = draft.tagPosts.findIndex(
                //         (x) => x.id === v.id,
                //     );
                //     if (index < 0) {
                //         draft.tagPosts.push(v);
                //         draft.tagPostsPageToken = `${v.id}`;
                //     }
                // });
                // draft.tagPostsHasMore =
                //     action.data.records.length === draft.postsLimit;
                // draft.tagPostsLoading = false;
                // draft.tagPostsKeyword = action.data.keyword;
                // draft.currentTag = action.data.tag;
                // draft.currentTagSlug = action.data.tag;
                handler.loadTagPostsDone();
                break;
            case actionTypes.LOAD_TAG_POSTS_FAIL:
                // draft.tagPostsLoading = false;
                // draft.tagPostsErrorReason = action.message;
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
